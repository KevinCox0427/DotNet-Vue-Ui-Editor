const dotenv = require('dotenv');
const { resolve } = require('path');
const { spawn, execSync } = require('child_process');
const { readdirSync, watch, lstatSync, existsSync, mkdirSync } = require('fs');

dotenv.config();
const viewsDirectory = process.env.viewsDirectory || 'views';

/**
 * Keeping track of when the node server started and is running.
 */
let currentCompileTimestamp = Date.now();
let currentNodeProcess = null;

try {
    /**
     * Running the typescript, vite and sass CLI commands to start the build.
     */
    process.stdout.write(`${redText('Compiling...')}  ${redText('X')} Typescript ${redText('X')} Vite ${redText('X')} Sass`);

    execSync('tsc');
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${redText('Compiling...')}  ${greenText('\u2713')} Typescript ${redText('X')} Vite ${redText('X')} Sass`);

    if(!existsSync(`./${viewsDirectory}`)) mkdirSync(`./${viewsDirectory}`);
    execSync('vite build --mode server && vite build --mode client');
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${redText('Compiling...')}  ${greenText('\u2713')} Typescript ${greenText('\u2713')} Vite ${greenText('\u2713')} Vite`);

    

    if(!existsSync('./styles')) mkdirSync('./styles');
    execSync('sass styles:dist/public');
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${redText('Compiling...')}  ${greenText('\u2713')} Typescript ${greenText('\u2713')} Vite ${redText('X')} Sass`);

    /**
     * Recursively watching each folder for changes.
     */
    watchDirectory();
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${greenText('Watching!')}  ${greenText('\u2713')} Typescript ${greenText('\u2713')} Vite ${greenText('\u2713')} Sass\n`);

    /**
     * Starting node process
     */
    currentNodeProcess = spawn('node', [resolve('dist/server.js')], {stdio: 'inherit'});
} catch (e) {
    /**
     * If there are errors from the intial commands, log them.
     * The filtering is for cleaning up the error messages.
     */
    if(Array.isArray(e.output)) {
        process.stdout.write(
            e.output
                .filter(err => err instanceof Buffer)
                .map(buffer => {
                    return `Error:\n\n${buffer.toString()}`
                })
                .filter(errStr => errStr.length > 'Error:\n\n '.length)
                .join('\n')
            + '\n'
        );
    }

    process.kill(0);
}

/**
 * A function that recursively reads directories and sets event listeners to run CLI commands when a user saves.
 * @param folder The root folder to start with. Default is the root folder.
 */
function watchDirectory(folder = '.') {
    // Recursive callback for sub-folders.
    readdirSync(folder).forEach(file => {
        if(lstatSync(`${folder}/${file}`).isDirectory() && (folder !== 'node_modues' || folder !== 'dist')) {
            watchDirectory(`${folder}/${file}`);
        }
    });

    // Adding an event to fire when a user saves anything in this directory with fs's watch()
    watch(folder === '.' ? './' : folder, (_, file) => {
        if(!file) return;
        // If it's in the views directory, it needs to be bundled for client side.
        if(folder.startsWith(`./${viewsDirectory}`)) {
            runProcess('tsc && vite build --mode server && vite build --mode client && sass styles:dist/public', file);
        }
        // For Sass.
        if(file.endsWith('.scss')) {
            runProcess('sass styles:dist/public', file);
        }
        // For Typescript.
        if(file.endsWith('.ts')) {
            runProcess('tsc && vite build --mode server', file);
        }
    });
}

/**
 * A function to run a CLI command. If it succeeds, it'll restart the node server.
 * @param command The CLI command to run
 * @param fileName The file name to print.
 */
function runProcess(command, fileName) {
    // Since fs's watch event is called several times when a file is saved, we'll apply a 200ms buffer to each time this is called.
    if(Date.now() - currentCompileTimestamp < 200) return;
    process.stdout.write(`\n${redText('Compiling:')} ${yellowHighlight(fileName)}  ${italic(`> ${command}`)}`);

    // Kills the current node process to run the CLI .
    if(currentNodeProcess) currentNodeProcess.kill('SIGTERM');
    
    // Running the command.
    let compiler = spawn(command, {shell: true});
    let compilerMessage = '';

    // Setting event listeners to store outgoing messages
    if(compiler.stderr) compiler.stderr.on('data', data => {
        compilerMessage = data.toString();
    });
    if(compiler.stdout) compiler.stdout.on('data', data => {
        compilerMessage = data.toString();
    });

    // Recording this process's start timestamp.
    // Then we'll assign it to the global variable to compare it when it's finished.
    const processTimestamp = Date.now();
    currentCompileTimestamp = processTimestamp;

    // Callback function to check the success of the process when it finishes.
    compiler.on('exit', code => {
        // If the global timestamp is different than this one, then that means this process is stale.
        if(processTimestamp != currentCompileTimestamp) return;

        // If fails, then print it's error message and return.
        if(code !== 0 && compilerMessage) {
            process.stdout.write(`\n\n${redHighlight('Error')}\n\n${compilerMessage}\n${greenText('Waiting for changes...')}\n`);
            return;
        }
        
        // Otherwise if sucessful, start a new node process.
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`${greenText('Done!')} ${yellowHighlight(fileName)}  ${italic(`> ${command}`)}\n`);
        currentNodeProcess = spawn('node', [resolve('dist/server.js')], {stdio: 'inherit'});
    });
}

/**
 * Styling functions for console logs.
 */

function redText(text) {
    return `\x1b[95m\x1b[1m${text}\x1b[0m`;
}

function greenText(text) {
    return `\x1b[92m\x1b[1m${text}\x1b[0m`;
}

function redHighlight(text) {
    return `\n\x1b[41m\x1b[30m\x1b[1m ${text} \x1b[0m`
}

function yellowHighlight(text) {
    return `\x1b[43m\x1b[1m\x1b[30m ${text} \x1b[0m`
}

function italic(text) {
    return `\x1b[3m\x1b[2m${text}\x1b[0m`
}