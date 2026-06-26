import Hero from "../components/Hero"
import GallerySection from "../components/GallerySection"
import ArtworkFeature from "../components/ArtworkFeature"
import MatarazzoSection from "../components/MatarazzoSection"
import CollectionsSection from "../components/CollectionsSection"
import ExtrasSection from "../components/ExtrasSection"
import ContactSection from "../components/ContactSection"

// Home: continua sendo a página editorial/resumo, com as mesmas seções
// e o mesmo visual de sempre. O menu inferior navega entre estes IDs.
export default function HomePage({ artworks, featuredArtwork, loading, error }) {
  return (
    <main className="site-main">
      <Hero artwork={featuredArtwork} loading={loading} />
      <GallerySection artworks={artworks} loading={loading} error={error} />
      <ArtworkFeature
        artwork={featuredArtwork || artworks[0]}
        total={artworks.length}
      />
      <MatarazzoSection />
      <CollectionsSection artworks={artworks} />
      <ExtrasSection artworks={artworks} />
      <ContactSection />
    </main>
  )
}
