import dynamic from "next/dynamic";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon for leaflet in React
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const IUT_COORDS = [23.8791, 90.2728];
const LANDMARKS = [
  { name: "Library", position: [23.8795, 90.2732] },
  { name: "Cafeteria", position: [23.8787, 90.2722] },
  { name: "Auditorium", position: [23.8793, 90.273] },
];

function MeetupPin({ onAddPin }) {
  useMapEvents({
    click(e) {
      onAddPin([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const CampusMap = () => {
  const [pins, setPins] = useState<Array<[number, number]>>([]);

  return (
    <MapContainer
      center={IUT_COORDS}
      zoom={17}
      className="h-96 w-full rounded-md"
      style={{ minHeight: "24rem" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Landmarks */}
      {LANDMARKS.map((lm) => (
        <Marker key={lm.name} position={lm.position as [number, number]}>
          <Popup>{lm.name}</Popup>
        </Marker>
      ))}
      {/* User pins */}
      {pins.map((pos, i) => (
        <Marker key={i} position={pos}>
          <Popup>Meetup Location</Popup>
        </Marker>
      ))}
      <MeetupPin onAddPin={(latlng) => setPins((p) => [...p, latlng])} />
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(CampusMap), { ssr: false });
