import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null, // Adjust this if needed
      precompress: false,
      strict: true
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/project2' : ''
    },
    prerender: {
      handleHttpError: ({ status, path, referrer, referenceType }) => {
        if (status === 404) {
          // Ignore 404 errors on specific routes
          return;
        }
        // Throw an error for other statuses
        throw new Error(`${status} ${path}`);
      }
    }
  }
};

export default config;