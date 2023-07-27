import { renderToString } from 'vue/server-renderer';
import { Component, ComputedOptions, MethodOptions, createSSRApp } from 'vue';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Getting the manifest file that's created at build time to declare what files are need for each page.
const manifest = JSON.parse(readFileSync(resolve(__dirname, '../manifest.json')).toString());

/**
 * This will structure an HTML document to render the supplied component.
 * 
 * @param component The component to be rendered.
 * @param componentName The path of the component file so it can reqeust the hydration script and dependencies from the manifest file.
 * @param stylePaths (Optional) Paths to any additional styles
 * @param scriptPaths (Optional) Paths to any additional scripts
 * @param ServerData (Optional) Allows us to pass any properties from the server to the client. This is done by parsing it into a JSON string and attaching it to the client's window.
 * @param seoOptions (Optional) Decides how to render the meta tags in the header for SEO purposes.
 */
async function serveHTML(component: Component<any, any, any, ComputedOptions, MethodOptions>, componentPath:string,  stylePaths = [], scriptPaths = [], serverData = {}, seoOptions = {
    title: 'My App',
    url: '',
    description: '',
    name: '',
    image: '',
    favicon: '#'
}) {
    // Getting the file data in the manifest to attach any dependencies.
    const fileMetaData = manifest[componentPath];
    if(!fileMetaData) return 'File path was not found.';

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${seoOptions.title}</title>
            <meta property="og:title" content="${seoOptions.title}">
            <meta name="description" content="${seoOptions.description}">
            <meta property="og:description" content="${seoOptions.description}">
            <meta property="og:site_name" content="${seoOptions.name}">
            <meta property="og:url" content="${seoOptions.url}">
            <meta property="og:image" content="${seoOptions.image}">
            <link rel="canonical" href="${seoOptions.url}">
            <link rel="icon" href="${seoOptions.favicon}" />
            <link rel="stylesheet" type="text/css" href="/globals.css" />
            ${fileMetaData.css ? fileMetaData.css.map((file:string) => `<link rel="stylesheet" type="text/css" href="${file.replace('public', '')}" />`) : ''}
            ${fileMetaData.imports ? fileMetaData.imports.map((file:string) => `<script type="module" href="${manifest[file].file.replace('public', '')}"></script>`) : ''}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            ${stylePaths.map(path => `<link rel="stylesheet" type="text/css" href="${path}" />`).join('')}
            ${scriptPaths.map(path => `<script src="${path}"></script>`).join('')}
        </head>
        <body>
            <div id="root">${await renderToString(createSSRApp(component, serverData), serverData)}</div>
            <script type="module" src="${fileMetaData.file.replace('public', '')}"></script>
        </body>
        </html>
    `;
}

export default serveHTML;