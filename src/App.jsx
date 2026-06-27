import { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import VantaBackground from "./components/VantaBackground"
import Header from "./components/Header"
import BottomNav from "./components/BottomNav"
import ScrollManager from "./components/ScrollManager"
import HomePage from "./pages/HomePage"
import GalleryPage from "./pages/GalleryPage"
import MatarazzoPage from "./pages/MatarazzoPage"
import CollectionsPage from "./pages/CollectionsPage"
import CollectionDetailPage from "./pages/CollectionDetailPage"
import ExtrasPage from "./pages/ExtrasPage"
import ContactPage from "./pages/ContactPage"
import { getArtworks, getFeaturedArtwork } from "./lib/sanityClient"
import "./styles.css"

// O menu inferior é o índice da home: só aparece na própria home.
function HomeBottomNav() {
  const location = useLocation()
  if (location.pathname !== "/") return null
  return <BottomNav />
}

export default function App() {
  const [artworks, setArtworks] = useState([])
  const [featuredArtwork, setFeaturedArtwork] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Busca única no topo: home, galeria e coleções compartilham as mesmas obras.
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
    <BrowserRouter>
      {/* Vanta e Header ficam fora das rotas: uma única instância, sem reinicializar. */}
      <VantaBackground />
      <Header />
      <ScrollManager />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              artworks={artworks}
              featuredArtwork={featuredArtwork}
              loading={loading}
              error={error}
            />
          }
        />
        <Route
          path="/galeria"
          element={
            <GalleryPage artworks={artworks} loading={loading} error={error} />
          }
        />
        <Route path="/matarazzo" element={<MatarazzoPage />} />
        <Route
          path="/colecoes"
          element={<CollectionsPage artworks={artworks} />}
        />
        <Route
          path="/colecoes/:slug"
          element={<CollectionDetailPage artworks={artworks} />}
        />
        <Route path="/extras" element={<ExtrasPage />} />
        <Route path="/contato" element={<ContactPage />} />
        {/* Qualquer rota desconhecida cai na home. */}
        <Route
          path="*"
          element={
            <HomePage
              artworks={artworks}
              featuredArtwork={featuredArtwork}
              loading={loading}
              error={error}
            />
          }
        />
      </Routes>

      <HomeBottomNav />
    </BrowserRouter>
  )
}
