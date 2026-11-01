"use client";

import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import FromTo from "./FromTo";
import { useEffect, useState, useCallback } from "react";
import L from "leaflet";
import { MapClickHandler } from "./MapClickHandler";
import { coordinate, LatLngCoord } from "@/types/types";

export default function MapBox() {
    const [coordinates, setCoordinates] = useState<LatLngCoord[]>([]);
    const [start, setStart] = useState<L.LatLngLiteral | null>(null);
    const [end, setEnd] = useState<L.LatLngLiteral | null>(null);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";

    const iconFix = () => {
        // Fix Leaflet default icon URLs in Next.js bundler
        const DefaultIcon = L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown };
        delete DefaultIcon._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
    };

    const fetchRoute = useCallback(async (startPoint: L.LatLngLiteral, endPoint: L.LatLngLiteral) => {
        try {
            const url = `${baseUrl}/route/pathByLatlng?lat1=${startPoint.lat}&lng1=${startPoint.lng}&lat2=${endPoint.lat}&lng2=${endPoint.lng}`;
            const response = await fetch(url, { method: "GET" });

            if (response.ok) {
                const coords: coordinate[] = await response.json();
                if (coords && Array.isArray(coords) && coords.length > 0) {
                    const leafletCoords: LatLngCoord[] = coords.map((c) => [c.lat, c.lon]);
                    setCoordinates(leafletCoords);
                } else {
                    setCoordinates([]);
                }
            }
        } catch (err) {
            console.error("Error fetching route by coordinates:", err);
        }
    }, [baseUrl]);

    const handleMapClick = (latlng: L.LatLng) => {
        const point: L.LatLngLiteral = { lat: latlng.lat, lng: latlng.lng };

        if (!start) {
            setStart(point);
            setEnd(null);
            setCoordinates([]);
        } else if (!end) {
            setEnd(point);
            fetchRoute(start, point);
        } else {
            setStart(point);
            setEnd(null);
            setCoordinates([]);
        }
    };

    useEffect(() => {
        iconFix();
    }, []);

    return (
        <div className="h-full w-full relative">
            <MapContainer
                center={[12.87, 74.88]}
                zoom={13}
                className="w-full h-full z-0"
                scrollWheelZoom={true}
            >
                <FromTo setCoordinate={setCoordinates} setStart={setStart} setEnd={setEnd} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler onClick={handleMapClick} />

                {start && <Marker position={start} />}
                {end && <Marker position={end} />}

                {coordinates.length > 0 && (
                    <Polyline positions={coordinates} weight={4} color="#2563eb" opacity={0.8} />
                )}
            </MapContainer>
        </div>
    );
}
