import { useMapEvents } from "react-leaflet";
import L from "leaflet";

interface MapClickHandlerProps {
    onClick: (latlng: L.LatLng) => void;
}

export const MapClickHandler = ({ onClick }: MapClickHandlerProps) => {
    useMapEvents({
        click(e) {
            onClick(e.latlng);
        }
    });

    return null;
};
