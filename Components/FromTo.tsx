"use client";

import { coordinate, LatLngCoord } from "@/types/types";
import { useState, KeyboardEvent } from "react";
import L from "leaflet";

interface FromToProps {
    setCoordinate: (coords: LatLngCoord[]) => void;
    setStart: (latlng: L.LatLngLiteral | null) => void;
    setEnd: (latlng: L.LatLngLiteral | null) => void;
}

export default function FromTo({ setCoordinate, setStart, setEnd }: FromToProps) {
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

    const handleSearch = async () => {
        if (!from.trim() || !to.trim()) {
            setError("Please enter both starting point and destination");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const url = `${baseUrl}/route/path?from=${encodeURIComponent(from.trim())}&to=${encodeURIComponent(to.trim())}`;
            const response = await fetch(url, { method: "GET" });

            if (!response.ok) {
                setError(`Server returned error: ${response.status}`);
                return;
            }

            const coords: coordinate[] = await response.json();

            if (!coords || !Array.isArray(coords) || coords.length === 0) {
                setError("No path found between the specified locations.");
                setCoordinate([]);
                return;
            }

            const leafletCoords: LatLngCoord[] = coords.map((c) => [c.lat, c.lon]);

            setStart({ lat: leafletCoords[0][0], lng: leafletCoords[0][1] });
            setEnd({ lat: leafletCoords[leafletCoords.length - 1][0], lng: leafletCoords[leafletCoords.length - 1][1] });
            setCoordinate(leafletCoords);
        } catch (err) {
            console.error("Route search error:", err);
            setError("Failed to connect to route planner backend.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleReset = () => {
        setFrom("");
        setTo("");
        setError("");
        setCoordinate([]);
        setStart(null);
        setEnd(null);
    };

    return (
        <div className="w-[90%] max-w-sm left-4 md:left-8 top-4 z-[1000] absolute pointer-events-auto">
            <div className="flex flex-col gap-y-4 bg-white/95 backdrop-blur-sm p-6 rounded-2xl border-2 border-black shadow-xl">
                <div>
                    <h1 className="text-black text-xl md:text-2xl tracking-wider font-bold text-center">Route Planner</h1>
                    <p className="text-xs text-gray-500 text-center mt-1">Search addresses or click 2 points on the map</p>
                </div>

                <div className="flex flex-col gap-y-3">
                    <input
                        placeholder="Starting point (e.g., Kadri Mangalore)"
                        value={from}
                        onChange={(t) => setFrom(t.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="w-full text-black placeholder:text-gray-400 border border-gray-400 focus:border-black rounded-md text-sm py-2 px-3 outline-none transition-colors"
                    />
                    <input
                        placeholder="Destination (e.g., Hampankatta Mangalore)"
                        value={to}
                        onChange={(t) => setTo(t.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="w-full text-black placeholder:text-gray-400 border border-gray-400 focus:border-black rounded-md text-sm py-2 px-3 outline-none transition-colors"
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-xs text-center bg-red-50 p-2 rounded border border-red-200">
                        {error}
                    </div>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="flex-1 text-white font-medium rounded-md bg-black hover:bg-gray-800 disabled:bg-gray-400 py-2.5 px-4 cursor-pointer text-sm transition-colors"
                    >
                        {isLoading ? "Searching..." : "Find Route"}
                    </button>
                    {(from || to || error) && (
                        <button
                            onClick={handleReset}
                            type="button"
                            className="text-gray-700 font-medium rounded-md bg-gray-100 hover:bg-gray-200 py-2.5 px-3 cursor-pointer text-sm transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
