"use client"
import { MapContainer, Marker, Polygon, Polyline, TileLayer, useMapEvent, useMapEvents } from "react-leaflet";
import FromTo from "./FromTo";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapClickHandler } from "./MapClickHandler";
import { coordinate } from "@/types/types";

export default function MapBox() {
    const [coordinates, setCoordinates] = useState([]);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const iconFix = () => {
        // Cast to 'any' because _getIconUrl is private and not in the TS types
        delete (L.Icon.Default.prototype as any)._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    };

    const fetchRoute = async (start: any, end: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/route/pathByLatlng?lat1=${start.lat}&lng1=${start.lng}&lat2=${end.lat}&lng2=${end.lng}`, {
            method: "GET"
        });

        if (response.ok) {
            const coords: coordinate[] = await response.json();
            const leafletCoords: any = coords.map((c) => [c["lat"], c["lon"]])

            // console.log(leafletCoords)

            setCoordinates(leafletCoords)
        }
    }

    const HandleMapClick = (latlng: any) => {
        if (!start) {
            setStart(latlng);
        }
        else if (!end) {
            setEnd(latlng);
            fetchRoute(start, latlng);
        }
        else {
            setStart(latlng);
            setEnd(null);
            setCoordinates([]);
        }
    }

    useEffect(() => {
        iconFix();
    }, [])

    return (
        <div className="h-full w-full relative">
            <MapContainer center={[12.87, 74.88]} zoom={13} className="w-full h-full" scrollWheelZoom={false}>
                <FromTo setCoordinate={setCoordinates} setStart={setStart} setEnd={setEnd} />
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler onClick={HandleMapClick} />

                {start && <Marker position={start} />}
                {end && <Marker position={end} />}

                {coordinates.length > 0 && <Polyline positions={coordinates} weight={2} color="blue" />}
            </MapContainer>
        </div>
    )
}