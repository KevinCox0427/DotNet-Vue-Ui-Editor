import dotenv from 'dotenv';
import { readdirSync, lstatSync, rmSync } from 'fs';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Emptying public directory
  if(mode === 'client') rmSync('./dist/public', { recursive: true, force: true });

  // Creating an entry object to transpile the files for server side rendering and bundle the pages that are sent client side.
  // This will be ran different depending on the "mode"
  let entryObject = {};
  const viewsDirectory = `${process.env.viewsDirectory || 'views'}`;
  scanDirectory(viewsDirectory);

  /**
   * A function to recursively check the views directory for any views that need bundling.
   * @param directory The entry point to start scanning.
   */
  function scanDirectory(directory) {
    // Looping through each file/folder.
    readdirSync(directory).forEach(pointer => {
      // If the mode is for a server build anything that ends in .vue must be tranpiled.
      // If the mode 
      if(pointer.endsWith(mode === 'server' ? '.vue' : '.ts')) {
        // Adding this file to the entryObject with its file name.
        entryObject = {...entryObject, 
          [`${directory.replace(viewsDirectory + '/', '')}/${pointer.split(mode === 'server' ? '.vue' : '.ts')[0]}`]: `${directory}/${pointer}`
        }
      }
      // Otherwise, if it's a folder, then recursively call this function.
      else if(lstatSync(`${directory}/${pointer}`).isDirectory()) {
        scanDirectory(`${directory}/${pointer}`);
      }
    });
  }
  
  return {
    // Build configuration. This will be run twice, once to transpile the .vue files into js to be rendered on the server, and another time to bundle the .vue and .ts files that hydrate the client side.
    build: {
      outDir: mode === 'server' ? 'dist/views' : 'dist',
      emptyOutDir: false,
      // This is what transpiles the .vue files into .js
      ssr: mode === 'server',
      // A manifest file to keep track what the dependencies of each .vue file should be.
      manifest: mode === 'client',
      rollupOptions: {
        // This points to different files depending on the mode.
        input: entryObject,
        // Outing in commonjs vs es modules depending on the mode.
        output: mode === 'server' ? {
          format: 'cjs',
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        } : {
          entryFileNames: `public/[hash].js`,
          chunkFileNames: `public/[hash].js`,
          assetFileNames: `public/[hash].[ext]`
        }
      }
    },
    plugins: [vue()],
    mode: process.env.mode,
    minify: process.env.mode === 'production' ? 'esbuild' : false,
    // This is for a hot module reload to develop the front-end in real-time.
    server: {
      hmr: true,
      port: process.env.PORT || 3000,
      open: '/index.html',
    }
  }
});