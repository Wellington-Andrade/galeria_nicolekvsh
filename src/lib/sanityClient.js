import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "tvqjz8gn",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2026-06-26",
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

const ARTWORK_PROJECTION = `
  _id,
  name,
  featured,
  year,
  technique,
  dimensions,
  image {
    ...,
    "assetMetadata": asset->metadata {
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  order
`

export async function getArtworks() {
  return sanityClient.fetch(`
    *[_type == "artwork" && published == true]
      | order(coalesce(order, 0) asc, _createdAt desc) {
        ${ARTWORK_PROJECTION}
      }
  `)
}

export async function getFeaturedArtwork() {
  return sanityClient.fetch(`
    *[_type == "artwork" && published == true]
      | order(featured desc, coalesce(order, 0) asc, _createdAt desc)[0] {
        ${ARTWORK_PROJECTION}
      }
  `)
}
