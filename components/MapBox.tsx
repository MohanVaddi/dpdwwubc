import React, { useContext, useEffect, useRef, useState } from 'react';
import LocContext from '../context/LocContext';

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import mapboxgl from 'mapbox-gl';
import { MapboxMap } from 'react-map-gl';
import { LatLngLiteral } from '../types/arbeit';
//@ts-ignore
// import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken =
    'pk.eyJ1IjoibW9oYW5rZW5vYmkiLCJhIjoiY2wybGV6NDVmMGNwNjNqbmsyczIwOW1nYiJ9.PuddGS4XNYZXHDDeskldpg';

const MapBox = () => {
    const locCtx = useContext(LocContext);
    const map = useRef<MapboxMap | null>(null);

    const [pageIsMounted, setPageIsMounted] = useState(false);

    const [lat, setLat] = useState<number>(locCtx.state.location.lat);
    const [lng, setLng] = useState<number>(locCtx.state.location.lng);
    const [zoom, setZoom] = useState<number>(10);

    const [markerPoints, setMarkerPoints] = useState<LatLngLiteral[]>(
        locCtx.state.markerPoints
    );

    useEffect(() => {
        setPageIsMounted(true);

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: 'my-map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false,
        });

        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );
        map.current.addControl(new mapboxgl.FullscreenControl());

        map.current.on('move', () => {
            setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)));
            setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)));
            setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
        });

        new mapboxgl.Marker({
            color: 'black',
            rotation: 45,
        })
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(`<h3>${'Your Location'}</h3>`)
            )
            .setLngLat([lng, lat])
            .addTo(map.current);

        console.log(markerPoints);
        markerPoints.map((ele) => {
            new mapboxgl.Marker({
                color: 'blue',
            })
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                        .setHTML(`<h3>${'Huii'}</h3><p>${'Deer'}</p>`)
                )
                .setLngLat([ele.lng, ele.lat])
                .addTo(map.current!);
        });

        // const bbox = [
        //     [-79, 43],
        //     [-73, 45],
        // ];
        // map.current.fitBounds(bbox, {
        //     padding: 20,
        // });
    }, []);
    return (
        <div>
            <div className='sidebar'>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div id='my-map' style={{ height: 400, width: '100%' }} />
        </div>
    );
};

export default MapBox;
