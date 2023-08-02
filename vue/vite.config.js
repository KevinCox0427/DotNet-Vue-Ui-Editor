import { readdirSync, lstatSync, rmSync } from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Creating an entry object to bundle the pages that are sent client side.
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
      console.log(pointer);
      // If it's a file that needs to be bundled.
      if(pointer.endsWith('.ts')) {
        // Adding this file to the entryObject with its file name.
        entryObject = {...entryObject, 
          [`${pointer.split('.ts')[0]}`]: `${directory}/${pointer}`
        }
      }
      // If it's a folder, then recursively call this function.
      else if(lstatSync(`${directory}/${pointer}`).isDirectory()) {
        scanDirectory(`${directory}/${pointer}`);
      }
    });
  }
  
  return {
    // Build configuration. This will be run twice, once to transpile the .vue files into js to be rendered on the server, and another time to bundle the .vue and .ts files that hydrate the client side.
    build: {
      outDir: '../wwwroot',
      emptyOutDir: false,
      copyPublicDir: false,
      rollupOptions: {
        input: entryObject,
        output: {
          entryFileNames: `js/[name].js`,
          chunkFileNames: `js/[name].js`,
          assetFileNames: `css/[name].[ext]`
        }
      }
    },
    publicDir: 'assets',
    plugins: [vue()],
    mode: process.env.mode,
    minify: process.env.mode === 'production' ? 'esbuild' : false,
    server: {
      hmr: true,
      port: process.env.PORT || 3000,
      open: '/index.html',
    }
  }
});