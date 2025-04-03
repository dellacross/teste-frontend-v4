import React from 'react'
import './equipmentsnav.css'

interface EquipmentsNavProps {
    handleVisibleEquipments: (id: string) => void;
    visibleEquipmentsIds: string[];
    toggleAllEquipments: () => void;
    equipments: {
        name: string;
        equipmentId: string;
        equipmentModelName: string;
        position: { date: string; lat: number; lon: number };
        color: string;
        lastState: { name: string; color: string };
    }[];
};

const EquipmentsNav: React.FC<EquipmentsNavProps> = ({ handleVisibleEquipments, visibleEquipmentsIds, toggleAllEquipments, equipments }) => {

    return (
        <div id="equipments-nav">
            <header>
                <h1>Equipments</h1>
            </header>
            <article>
                {
                    equipments?.map(equipment => (
                        <div
                            key={equipment.equipmentId}
                            className='equipment'
                            style={{ borderLeft: `5px solid ${equipment?.color}` }}
                        >
                            <div className='equipment-name'>
                                <p>{`${equipment.name} - ${equipment?.equipmentModelName}`}</p>
                                <b>Equipment</b>
                            </div>
                            <div className='equipment-infos'>
                                <section>
                                    <p>{equipment?.lastState?.name}</p>
                                    <b>State</b>
                                </section>
                                <section>
                                    <p>{equipment?.lastState?.name}</p>
                                    <b>State</b>
                                </section>
                            </div>
                        </div>
                    ))
                }
            </article>
            <button
                onClick={() => toggleAllEquipments()}
                className='toggle-all-button'
            >
                {`${visibleEquipmentsIds.length === 0 ? 'Show' : 'Hide'} all equipments`}
            </button>
        </div>
    )
}

export default EquipmentsNav