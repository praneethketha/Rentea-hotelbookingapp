import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhbmVldGgtNTQiLCJhIjoiY2wxbGlmMndyMDYyZjNjcHE2cWN2aHduYSJ9.aDRNT-scNLzPP3OJxxnz0A";

const Map = ({ latitude, longitude, address }) => {
  const mapContainer = useRef(null);

  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 12,
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      //   style: "mapbox://styles/mapbox/light-v10",
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    const el = document.createElement("div");
    el.className = "marker";

    const marker = new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
      offsetTop: (-viewport.zoom * 5) / 2,
    }).setLngLat([viewport.longitude, viewport.latitude]);

    marker.addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat([viewport.longitude, viewport.latitude])
      //   .setHTML(`<p class = "map_popup">${address}</p>`)
      .addTo(map);

    bounds.extend([viewport.longitude, viewport.latitude]);

    map.fitBounds(bounds, {
      padding: 250,
    });

    return () => map.remove();
  }, [viewport]);

  return <div className="map_container" ref={mapContainer}></div>;
};
export default Map;
