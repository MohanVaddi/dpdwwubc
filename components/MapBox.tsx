import React, { useContext, useEffect, useRef, useState } from 'react';
import LocContext from '../context/LocContext';
import { Marker } from 'react-map-gl';

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import mapboxgl from 'mapbox-gl';
import { MapboxMap } from 'react-map-gl';
import { LatLngLiteral, OpenToWork, Posts } from '../types/arbeit';
//@ts-ignore
// import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken =
    'pk.eyJ1IjoibW9oYW5rZW5vYmkiLCJhIjoiY2wybGV6NDVmMGNwNjNqbmsyczIwOW1nYiJ9.PuddGS4XNYZXHDDeskldpg';

interface MapBoxProps {
    posts?: Posts[];
    profiles?: OpenToWork[];
    locateLat?: number;
    locateLng?: number;
}

const addLocationPointsToPosts = (arr: Posts[]) => {
    const modArr = arr.map((post) => {
        return {
            ...post,
            locationPoint: {
                lat: parseFloat(post.location.split(' ')[0] as string),
                lng: parseFloat(post.location.split(' ')[1] as string),
            },
        };
    });
    return modArr;
};

// let customMarker: mapboxgl.Marker | undefined = undefined;

const MapBox: React.FC<MapBoxProps> = ({
    posts,
    profiles,
    locateLat = undefined,
    locateLng = undefined,
}) => {
    const locCtx = useContext(LocContext);
    const map = useRef<MapboxMap | null>(null);

    const [pageIsMounted, setPageIsMounted] = useState(false);

    const [lat, setLat] = useState<number>(locCtx.state.location.lat);
    const [lng, setLng] = useState<number>(locCtx.state.location.lng);
    const [zoom, setZoom] = useState<number>(10);

    useEffect(() => {
        if (locateLat === undefined || locateLng === undefined) {
        } else {
            console.log('came here');
            map.current?.setCenter([locateLng, locateLat]);
            map.current?.setZoom(17);
        }
    }, [locateLat, locateLng]);

    useEffect(() => {
        setPageIsMounted(true);

        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: 'my-map',
            style: 'mapbox://styles/mapbox/satellite-v9',
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
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                    `<h3>${'Your Location'}</h3>`
                )
            )
            .setLngLat([lng, lat])
            .addTo(map.current);

        if (posts) {
            const modPosts = addLocationPointsToPosts(posts);
            modPosts.map((ele) => {
                new mapboxgl.Marker({
                    color: 'blue',
                })
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }).setHTML(
                            `<h3>${ele.title}</h3><p>${ele.description}</p>`
                        )
                    )
                    .setLngLat([ele.locationPoint.lng, ele.locationPoint.lat])
                    .addTo(map.current!);
            });
        }

        // map.current.on('click', (e) => {
        //     if (customMarker) {
        //         customMarker.remove();
        //     }
        //     console.log(e.lngLat);
        //     customMarker = new mapboxgl.Marker({
        //         color: 'red',
        //     })
        //         .setLngLat([e.lngLat.lng, e.lngLat.lat])
        //         .addTo(map.current!);
        // });
    }, []);
    return (
        <div>
            <div className='sidebar' style={{ zIndex: 0 }}>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div
                id='my-map'
                style={{ height: 400, width: '100%', zIndex: 0 }}
            />
        </div>
    );
};

export default MapBox;
