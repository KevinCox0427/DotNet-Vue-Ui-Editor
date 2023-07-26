import dotenv from 'dotenv';
import { readdirSync, lstatSync, rmSync } from 'fs';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Emptying public directory
  if(mode === 'client') rmSync('./dist/public', { recursive: true, force: true });

  // Creating an entry object to only bundle the pages that are sent client side.
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
      // If the file ends with .vue, then we must bundle it.
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
    build: {
      outDir: mode === 'server' ? 'dist/views' : 'dist',
      emptyOutDir: false,
      ssr: mode === 'server',
      manifest: mode === 'client',
      rollupOptions: {
        input: entryObject,
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
    minify: process.env.mode === 'production' ? 'terser' : false
  }
});