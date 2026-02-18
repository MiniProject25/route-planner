import { useMapEvents } from "react-leaflet"

export const MapClickHandler = ({ onClick }: any) => {
    useMapEvents({
        click(e) {
            onClick(e.latlng);
        }
    })

    return null;
}