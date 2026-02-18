"use client"
import dynamic from "next/dynamic"

const MapBox = dynamic(() => import("@/Components/Map"), {
  ssr: false
})

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <MapBox />
    </div >
  )
}