import React, { useState } from 'react'
import './equipmentsnav.css'
import useHandleEquipmentBehavior from '../../hooks/useHandleEquipmentBehavior';
import { ArrowLeft, Box, DollarSign, Percent, Tractor } from 'lucide-react';

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

type LastsEquipmentDatas = {
    equipmentId: string
    name: string
    equipmentModelName: string
    positions: { date: string, lat: number, lon: number }[]
    statesIdByTime: { date: string, equipmentStateId: string, name: string, color: string }[]
    color: string
    lastUpdate: string,
    earningByTime: { date: string, earning: number }[],
    totalEarnings: number,
    equipmentModelId: string,
    hoursOfProductivity: number
}

const EquipmentsNav: React.FC<EquipmentsNavProps> = ({ equipments, colors }) => {

    const { totalHours } = useHandleEquipmentBehavior()
    const [selectedEquipment, setSelectedEquipment] = useState<LastsEquipmentDatas>()

    return (
        <div id="equipments-nav">
            {
                !selectedEquipment &&
                <header>
                    <h1>Equipments</h1>
                </header>
            }
            {
                !selectedEquipment &&
                <article id='equipments-list'>
                    {
                        equipments?.map((equipment, index) => (
                            <div
                                key={equipment.equipmentId}
                                className='equipment'
                                style={{ borderLeft: `5px solid ${colors[index]}` }}
                            >
                                <div className='equipment-name'>
                                    <p>
                                        <span 
                                            style={{backgroundColor: equipment?.statesIdByTime[equipment?.statesIdByTime?.length-1]?.color}}
                                            className='state-color'
                                        />
                                        <span>{`${equipment.name} - ${equipment?.equipmentModelName}`}</span>
                                        <button onClick={() => setSelectedEquipment({ ...equipment, equipmentModelId: '' })}>+</button>
                                    </p>
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
            }
            {
                selectedEquipment &&
                <article id='equipment-infos'>
                    <header>
                        <button onClick={() => setSelectedEquipment(undefined)}>
                            <ArrowLeft />
                        </button>
                        <h2>Equipment Datas</h2>
                    </header>
                    <section>
                        <div className="info">
                            <div 
                                className="icon"
                                style={{backgroundColor: `${selectedEquipment?.statesIdByTime[selectedEquipment?.statesIdByTime?.length-1]?.color}80`}}
                            >
                                <Tractor />
                            </div>
                            <p>
                                <span>{selectedEquipment?.name}</span>
                                <b>Equipment</b>
                            </p>
                        </div>
                        <div className="info">
                            <div 
                                className="icon"
                                style={{backgroundColor: `${selectedEquipment?.statesIdByTime[selectedEquipment?.statesIdByTime?.length-1]?.color}80`}}
                            >
                                <Box />
                            </div>
                            <p>
                                <span>{selectedEquipment?.equipmentModelName}</span>
                                <b>Model</b>
                            </p>
                        </div>
                        <div className="info">
                            <div 
                                className="icon"
                                style={{backgroundColor: `${selectedEquipment?.statesIdByTime[selectedEquipment?.statesIdByTime?.length-1]?.color}80`}}
                            >
                                <DollarSign />
                            </div>
                            <p>
                                <span style={{color: selectedEquipment?.totalEarnings < 0 ? 'red' : ''}}>{`${selectedEquipment?.totalEarnings}$`}</span>
                                <b>Earnings</b>
                            </p>
                        </div>
                        <div className="info">
                            <div 
                                className="icon"
                                style={{backgroundColor: `${selectedEquipment?.statesIdByTime[selectedEquipment?.statesIdByTime?.length-1]?.color}80`}}
                            >
                                <Percent />
                            </div>
                            <p>
                                <span>{`${((selectedEquipment?.hoursOfProductivity/totalHours)*100)?.toFixed(2)}%`}</span>
                                <b>Productivity</b>
                            </p>
                        </div>
                    </section>
                </article>
            }
        </div>
    )
}

export default EquipmentsNav