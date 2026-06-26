import { useEffect, useRef } from "react"
import * as THREE from "three"
import FOG from "vanta/dist/vanta.fog.min"

export default function VantaBackground() {
  const ref = useRef(null)
  const effectRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion || !ref.current) return

    try {
      effectRef.current = FOG({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        highlightColor: 0xe7b85f, // dourado / âmbar
        midtoneColor: 0xb75a1a, // laranja queimado
        lowlightColor: 0x0b6f78, // azul petróleo / teal 0x0b6f78
        baseColor: 0x050505, // preto quase absoluto
        blurFactor: 0.37,
        speed: 0.3,
        zoom: 0.6,
      })
    } catch (err) {
      // Se o efeito não inicializar, o fallback CSS no .vanta-background assume.
      console.error("Vanta FOG não pôde ser inicializado:", err)
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy()
        effectRef.current = null
      }
    }
  }, [])

  return <div ref={ref} className="vanta-background" aria-hidden="true" />
}
