"use client"
import { coordinate } from "@/types/types";
import { useState } from "react"

export default function FromTo({ setCoordinate, setStart, setEnd }: { setCoordinate: any, setStart: any, setEnd: any }) {
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    const handleSearch = async () => {
        // console.log("Entering handleSearch!")
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/route/path?from=${from}&to=${to}`, {
            method: "GET"
        });

        if (response.ok) {
            const coords: coordinate[] = await response.json();
            const leafletCoords: any = coords.map((c) => [c["lat"], c["lon"]])

            setStart({ lat: leafletCoords[0][0], lng: leafletCoords[0][1] })
            setEnd({ lat: leafletCoords[leafletCoords.length - 1][0], lng: leafletCoords[leafletCoords.length - 1][1] })

            // console.log(leafletCoords)

            setCoordinate(leafletCoords)
        }
    }

    return (
        <div className="w-[90%] max-w-sm left-1/15 top-1/40 bg-transparent z-1000 absolute ">
            <div className="flex flex-col gap-y-5 items-center bg-white p-10 rounded-2xl border-black border-3 hover:opacity-45 transition-all">
                <div>
                    <h1 className="text-black text-2xl tracking-wider font-bold text-center">Search Route</h1>
                </div>
                <div className="flex flex-col gap-y-4">
                    <input placeholder="Enter starting point" value={from} onChange={(t) => setFrom(t.target.value)} className="w-50 text-black placeholder:text-gray-500 outline-2 outline-black text-sm py-2 px-2" />
                    <input placeholder="Enter end point" value={to} onChange={(t) => setTo(t.target.value)} className="w-50 text-black placeholder:text-gray-500 outline-2 outline-black text-sm py-2 px-2" />
                </div>
                <button onClick={() => handleSearch()} className="text-white rounded-sm bg-black py-3 px-5 cursor-pointer">Search</button>
            </div>
        </div>
    )
} 