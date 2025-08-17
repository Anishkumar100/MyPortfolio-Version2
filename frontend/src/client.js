// In src/client.js

import { createClient } from '@sanity/client'; // Correct import
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({ // Use createClient instead of sanityClient
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Find this in your sanity.json or sanity.cli.ts file
  dataset: 'production',
  apiVersion: '2025-08-08', // Use a recent date
  useCdn: false, 
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);