import React, { useEffect, useState } from 'react';
import './main.css'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useHandleEquipamentMoviment from '../../hooks/useHandleEquipamentMoviment';
import EquipmentsNav from '../EquipmentsNav/equipmentsnav';
import useHandleEquipmentBehavior from '../../hooks/useHandleEquipmentBehavior';

// Fix for default marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const createCustomMarkerIcon = (color) => {
  return L.divIcon({
    html: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="${color}" fill="${color}" stroke-width="2">
             <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
           </svg>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  });
};

const Main = () => {

    const { equipments } = useHandleEquipamentMoviment()
    const { _equipments } = useHandleEquipmentBehavior()

    //useEffect(() => { console.log('eq', _equipments) }, [_equipments])

    const [center, setCenter] = useState([0, 0]);
    const [zoom] = useState(11);
    const [timeCount, setTimeCount] = useState(1);
    const [loading, setLoading] = useState(true)
    const [visibleEquipmentsIds, setVisibleEquipmentsIds] = useState([])

    useEffect(() => {
        if (equipments?.length === 0) return

        const firstEquipment = equipments[0];
        const lat = firstEquipment?.position?.lat;
        const lon = firstEquipment?.position?.lon;
        setCenter([lat, lon]);

        setLoading(false)

        setVisibleEquipmentsIds(equipments.map(equipament => equipament.equipmentId))
    }, [equipments])


    useEffect(() => {
        if(!equipments) return

        const interval = setInterval(() => {
            setTimeCount(prev => prev + 1)
        }, 2000);
      
        return () => clearInterval(interval);
    }, [equipments])

    const handleVisibleEquipments = (equipamentId) => {
        setVisibleEquipmentsIds(prev =>
            prev.includes(equipamentId)
                ? prev.filter(id => id !== equipamentId)
                : [...prev, equipamentId]
        );
    }

    const toggleAllEquipments = () => {
        if(visibleEquipmentsIds.length > 0) setVisibleEquipmentsIds([])
        else setVisibleEquipmentsIds(equipments.map(equipament => equipament.equipmentId))
    }

    return (
        <div id="map-wrapper">
            {
                !loading &&
                <div style={{ height: '100vh', width: '100%' }}>
                    <MapContainer 
                        center={center} 
                        zoom={zoom} 
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            equipments.map(equipament => (
                                visibleEquipmentsIds.includes(equipament.equipmentId) &&
                                <React.Fragment key={equipament.equipmentId}>
                                    <Marker 
                                        position={[
                                            equipament?.path?.slice(0, timeCount)[timeCount-1][0], 
                                            equipament?.path?.slice(0, timeCount)[timeCount-1][1]
                                        ]} 
                                        icon={createCustomMarkerIcon(equipament?.lastState?.color)}
                                    >
                                        <Popup>
                                            <div>
                                                <h3>{equipament.name}</h3>
                                                <p>Status: {equipament?.lastState?.name}</p>
                                                <p>Latitude: {equipament?.path?.slice(0, timeCount)[timeCount-1][0].toFixed(6)}</p>
                                                <p>Longitude: {equipament?.path?.slice(0, timeCount)[timeCount-1][1].toFixed(6)}</p>
                                                <p>Last update: {equipament?.position?.date}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                    <Polyline
                                        positions={equipament?.path?.slice(0, timeCount)}
                                        color={equipament?.color}
                                    />
                                </React.Fragment>
                            ))
                        }

                    </MapContainer>
                </div>
            }
            <EquipmentsNav 
                handleVisibleEquipments={handleVisibleEquipments} 
                visibleEquipmentsIds={visibleEquipmentsIds}
                toggleAllEquipments={toggleAllEquipments}
                equipments={equipments}
            />
        </div>
    )
}

export default Main