import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import historyData from "../data/history.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5kcmVzY2FsYXB0IiwiYSI6ImNtaTNvc3lkNjFzaXYybHNjbGR0ZmUzYXEifQ.-TTIowiPraIRm9fFLFG-YA";

export default function AddressMap({ focusIndex }) {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  const moradas = historyData.moradas;

  useEffect(() => {
    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [moradas[0].lng, moradas[0].lat],
      zoom: 16,
      pitch: 45,
      bearing: -10,
      antialias: true,
    });

    return () => mapInstance.current?.remove();
  }, [moradas]);

  useEffect(() => {
    if (!mapInstance.current) return;

    mapInstance.current.on("load", () => {
      mapInstance.current.addSource("trajeto", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: moradas.map((m) => [m.lng, m.lat]),
          },
        },
      });

      mapInstance.current.addLayer({
        id: "trajeto-linha",
        type: "line",
        source: "trajeto",
        paint: {
          "line-color": "#d97706",
          "line-width": 5,
        },
      });

      moradas.forEach((m) => {
        const el = document.createElement("div");
        el.style.width = "60px";
        el.style.height = "60px";
        el.style.borderRadius = "10px";
        el.style.backgroundSize = "cover";
        el.style.border = "2px solid white";
        el.style.backgroundImage = `url(${m.imagem || ""})`;
        el.style.cursor = "pointer";

        new mapboxgl.Marker(el)
          .setLngLat([m.lng, m.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 20 }).setHTML(`
            <b>${m.nome}</b><br>
            <small>${m.periodo}</small><br>
            <a href="https://www.google.com/maps?q=${m.lat},${m.lng}" target="_blank">
              Abrir no Google Maps 🌍
            </a>
          `)
          )
          .addTo(mapInstance.current);
      });
    });
  }, [moradas]);

  useEffect(() => {
    if (focusIndex === null || !mapInstance.current) return;

    const m = moradas[focusIndex];
    mapInstance.current.flyTo({
      center: [m.lng, m.lat],
      zoom: 18,
      duration: 1200,
    });
  }, [focusIndex, moradas]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "460px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
}
