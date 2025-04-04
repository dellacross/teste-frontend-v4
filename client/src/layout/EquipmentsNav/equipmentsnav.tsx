import React from 'react'
import './equipmentsnav.css'
import useHandleEquipmentBehavior from '../../hooks/useHandleEquipmentBehavior';

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
        totalEarnings: number,
        hoursOfProductivity: number
    }[];
    colors: string[]
};

const EquipmentsNav: React.FC<EquipmentsNavProps> = ({ handleVisibleEquipments, visibleEquipmentsIds, toggleAllEquipments, equipments, colors }) => {

    const { totalHours } = useHandleEquipmentBehavior()

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
                                    <p>{`${equipment?.totalEarnings}$`}</p>
                                    <b>Earnings</b>
                                </section>
                                <section>
                                    <p>{`${((equipment?.hoursOfProductivity/totalHours)*100)?.toFixed(2)}%`}</p>
                                    <b>Productivity</b>
                                </section>
                            </div>
                        </div>
                    ))
                }
            </article>
        </div>
    )
}

export default EquipmentsNav