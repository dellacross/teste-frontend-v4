import React from 'react'
import './equipmentsnav.css'

interface EquipmentsNavProps {
    handleVisibleEquipments: (id: string) => void;
    visibleEquipmentsIds: string[];
    toggleAllEquipments: () => void;
    equipments: {
        equipmentId: string
        name: string
        equipmentModelName: string
        positions: { date: string, lat: number, lon: number }[]
        statesIdByTime: { date: string, equipmentStateId: string, name: string, color: string }[]
        color: string
        lastUpdate: string,
        earningByTime: { date: string, earning: number }[],
        totalEarnings: number
    }[];
    colors: string[]
};

const EquipmentsNav: React.FC<EquipmentsNavProps> = ({ handleVisibleEquipments, visibleEquipmentsIds, toggleAllEquipments, equipments, colors }) => {

    return (
        <div id="equipments-nav">
            <header>
                <h1>Equipments</h1>
            </header>
            <article>
                {
                    equipments?.map((equipment, index) => (
                        <div
                            key={equipment.equipmentId}
                            className='equipment'
                            style={{ borderLeft: `5px solid ${colors[index]}` }}
                        >
                            <div className='equipment-name'>
                                <p>{`${equipment.name} - ${equipment?.equipmentModelName}`}</p>
                                <b>Equipment</b>
                            </div>
                            <div className='equipment-infos'>
                                <section>
                                    <p>{equipment?.statesIdByTime[equipment?.statesIdByTime?.length-1]?.name}</p>
                                    <b>State</b>
                                </section>
                                <section>
                                    <p>{equipment?.statesIdByTime[equipment?.statesIdByTime?.length-1]?.name}</p>
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