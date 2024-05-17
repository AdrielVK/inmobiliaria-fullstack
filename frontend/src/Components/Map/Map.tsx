import React from "react";
import { Marker,MapContainer,TileLayer } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'proj4leaflet';

interface MapProps {
  
  lat:number;
  lng:number;
  id:number;
}

export const Map: React.FC<MapProps> = ({
  lat, lng, id
}) => {

  const crs = new L.Proj.CRS(
    'EPSG:3395',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 ' +
    '+x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext ' +
    '+no_defs',
    {
      resolutions: [8192, 4096, 2048, 1024, 512, 256, 128],
      origin: [-20037508.342789244, 20037508.342789244]
    }
  );
  
  return (
    <MapContainer key={`${lat}-${lng}-${id}`} className="map" center={[lat,lng]} zoom={16} scrollWheelZoom={false}>

      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat,lng]}>
          <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker>
  </MapContainer>

  
  )
}

