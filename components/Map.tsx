import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import LocContext from '../context/LocContext';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
// import marker_icon from './../public/marker-icon.png';

export interface LatLngLiteral {
    lat: number;
    lng: number;
}

interface MapProps {}

const icon = new L.Icon({
    iconUrl: 'marker-icon.png',
    iconRetinaUrl: 'marker-icon.png',
});

const Map: React.FC<MapProps> = () => {
    const ctx = useContext(LocContext);
    const [currentLoc, setCurrentLoc] = useState<LatLngLiteral>({
        lat: ctx.state.location.lat,
        lng: ctx.state.location.lng,
    });

    // const [markerPoints, setMarkerPoints] = useState<LatLngLiteral[]>(
    //     ctx.state.markerPoints
    // );

    // console.log('mak', markerPoints);

    const markerPoints: LatLngLiteral[] = [currentLoc];
    useEffect(() => {
        if (ctx.state) {
            setCurrentLoc({
                lat: ctx.state.location.lat,
                lng: ctx.state.location.lng,
            });
            // setMarkerPoints(ctx.state.markerPoints);
        }
    }, [ctx.state]);

    return (
        <MapContainer
            center={currentLoc}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: 400, width: '100%', zIndex: '0' }}>
            <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9oYW5rZW5vYmkiLCJhIjoiY2wybGV6NDVmMGNwNjNqbmsyczIwOW1nYiJ9.PuddGS4XNYZXHDDeskldpg'
            />
            <Marker icon={icon} position={markerPoints[0]}>
                <Popup>
                    <br /> Easily customizable.
                </Popup>
            </Marker>
            {/* {markerPoints.map((point, idx) => (
                <Marker icon={icon} key={idx} position={point}>
                    <Popup>
                        <br /> Easily customizable.
                    </Popup>
                </Marker>
            ))} */}
        </MapContainer>
    );
};

export default Map;
