import React from 'react'
import './equipmentsnav.css'
import useHandleEquipamentMoviment from '../../hooks/useHandleEquipamentMoviment';

interface EquipmentsNavProps {
    handleVisibleEquipments: (id: string) => void;
    visibleEquipmentsIds: string[];
    toggleAllEquipments: () => void;
}

const EquipmentsNav: React.FC<EquipmentsNavProps> = ({ handleVisibleEquipments, visibleEquipmentsIds, toggleAllEquipments }) => {

    const { equipments } = useHandleEquipamentMoviment()

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
                        >   
                            <button 
                                onClick={() => handleVisibleEquipments(equipment.equipmentId)}
                                className='toggle-button'
                                style={{color: equipment.color}}
                            >
                                <span>a</span>
                            </button>
                            <p>{equipment.name}</p>
                            <button
                                className=''
                            >
                                {`>`}
                            </button>
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