import { useEffect, useState } from 'react'
import equipamentModel from '../data/equipmentModel.json'
import equipamentPositionHistory from '../data/equipmentPositionHistory.json'
import equipmentState from '../data/equipmentState.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import _equipment from '../data/equipment.json'

type Equipment = {
    id: string
    equipmentModelId: string
    name: string
}

type LastEquipamentPosition = {
    equipamentModelName: string
    name: string
    equipmentId: string
    position: {date: string, lat: number, lon: number}
    lastState: {name: string, color: string}
    path: number[][] | undefined
}

const useHandleEquipamentMoviment = () => {

    const [equipments, setEquipments] = useState<LastEquipamentPosition[]>([])

    useEffect(() => {

        let hash: LastEquipamentPosition[] = []

        _equipment?.map(({ id, equipmentModelId, name }: Equipment) => {
            const equipmentPositions = equipamentPositionHistory.find((eq) => eq.equipmentId === id)
            const initialPosition = equipmentPositions?.positions[0]
            const path = equipmentPositions?.positions.map((pos) => [pos?.lat, pos?.lon])

            const _equipamentModel = equipamentModel.find((eq) => eq.id === equipmentModelId)

            const _equipmentStatesHistory = equipmentStateHistory.find((eq) => eq.equipmentId === id)
            const lastState = _equipmentStatesHistory?.states[_equipmentStatesHistory?.states?.length - 1]
            const _lastEquipmentState = equipmentState.find((eq) => eq.id === lastState?.equipmentStateId)

            const obj = {
                name: name || '',
                equipmentId: id,
                equipamentModelName: _equipamentModel?.name || '',
                position: {date: initialPosition?.date || '', lat: initialPosition?.lat || 0, lon: initialPosition?.lon || 0},
                lastState: {name: _lastEquipmentState?.name || '', color: _lastEquipmentState?.color || ''},
                path: path
            }

            hash.push(obj)
            return 0
        })

        setEquipments(hash)
    }, [])

    return {
        equipments
    }
}

export default useHandleEquipamentMoviment