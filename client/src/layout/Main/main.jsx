import React, { useEffect, useState } from 'react';
import './main.css'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useHandleEquipamentMoviment from '../../hooks/useHandleEquipamentMoviment';

// Fix for default marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const Main = () => {

    const { equipments } = useHandleEquipamentMoviment()

    useEffect(() => { console.log('eq', equipments) }, [equipments])

    const [center, setCenter] = useState([0, 0]);
    const [timeCount, setTimeCount] = useState(1);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (equipments?.length === 0) return

        const firstEquipment = equipments[0];
        const lat = firstEquipment?.position?.lat;
        const lon = firstEquipment?.position?.lon;
        setCenter([lat, lon]);
        setLoading(false)
    }, [equipments])

    const [zoom] = useState(11);

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        if(!equipments) return

        const interval = setInterval(() => {
            setTimeCount(prev => prev + 1)
        }, 10000);
      
        return () => clearInterval(interval);
    }, [equipments])

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
                            equipments.map(item => (
                                <React.Fragment key={item.equipmentId}>
                                    <Marker 
                                        position={[
                                            item?.path?.slice(0, timeCount)[timeCount-1][0], 
                                            item?.path?.slice(0, timeCount)[timeCount-1][1]
                                        ]} 
                                        color={item?.lastState?.color}
                                    >
                                        <Popup>
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>Status: {item?.lastState?.name}</p>
                                                <p>Latitude: {item?.path?.slice(0, timeCount)[timeCount-1][0].toFixed(6)}</p>
                                                <p>Longitude: {item?.path?.slice(0, timeCount)[timeCount-1][1].toFixed(6)}</p>
                                                <p>Last update: {item?.position?.date}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                    <Polyline
                                        positions={item?.path?.slice(0, timeCount)}
                                        color={item?.lastState?.color}
                                    />
                                </React.Fragment>
                            ))
                        }

                    </MapContainer>
                </div>
            }
        </div>
    )
}

export default Main