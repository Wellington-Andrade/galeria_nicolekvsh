import { useEffect, useState } from "react"
import VantaBackground from "./components/VantaBackground"
import Header from "./components/Header"
import Hero from "./components/Hero"
import GallerySection from "./components/GallerySection"
import ArtworkFeature from "./components/ArtworkFeature"
import MatarazzoSection from "./components/MatarazzoSection"
import CollectionsSection from "./components/CollectionsSection"
import ExtrasSection from "./components/ExtrasSection"
import ContactSection from "./components/ContactSection"
import BottomNav from "./components/BottomNav"
import { getArtworks, getFeaturedArtwork } from "./lib/sanityClient"
import "./styles.css"

export default function App() {
  const [artworks, setArtworks] = useState([])
  const [featuredArtwork, setFeaturedArtwork] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function loadContent() {
      try {
        const [artworksData, featuredData] = await Promise.all([
          getArtworks(),
          getFeaturedArtwork(),
        ])

        if (!active) return

        const safeArtworks = Array.isArray(artworksData) ? artworksData : []

        setArtworks(safeArtworks)
        setFeaturedArtwork(featuredData || safeArtworks[0] || null)
      } catch (err) {
        console.error(err)
        if (active) setError("Não foi possível carregar as obras.")
      } finally {
        if (active) setLoading(false)
      }
    }

    loadContent()

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <VantaBackground />
      <Header />

      <main className="site-main">
        <Hero artwork={featuredArtwork} loading={loading} />
        <GallerySection artworks={artworks} loading={loading} error={error} />
        <ArtworkFeature artwork={featuredArtwork || artworks[0]} total={artworks.length} />
        <MatarazzoSection />
        <CollectionsSection artworks={artworks} />
        <ExtrasSection artworks={artworks} />
        <ContactSection />
      </main>

      <BottomNav />
    </>
  )
}
