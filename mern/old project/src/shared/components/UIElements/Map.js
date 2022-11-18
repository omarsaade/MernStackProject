import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

const Map = (props) => {

    const { center, zoom } = props;
    const mapRef = useRef();



    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcnNvdXMxIiwiYSI6ImNsOTZ6eHFxcjA3YXYzdmw5aW8weTQ1dDcifQ.I3tZK9_R3vocnBekXFIDLw';
        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: center,
            zoom: zoom,
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        new mapboxgl.Marker({ draggable: true })
            .setLngLat(center)
            .addTo(map);

    }, [center, zoom]);


    return (
        <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>
    );
};

export default Map;

