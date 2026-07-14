import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2026-07-13',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);