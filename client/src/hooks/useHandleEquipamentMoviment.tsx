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
    equipmentModelName: string
    name: string
    equipmentId: string
    position: {date: string, lat: number, lon: number}
    lastState: {name: string, color: string}
    path: number[][] | undefined
    color: string
}

const useHandleEquipamentMoviment = () => {

    const [equipments, setEquipments] = useState<LastEquipamentPosition[]>([])

    const generateRandomColor = (): string => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {

        let hash: LastEquipamentPosition[] = []

        _equipment?.map(({ id, equipmentModelId, name }: Equipment) => {
            const equipmentPositions = equipamentPositionHistory.find((eq) => eq.equipmentId === id)
            const initialPosition = equipmentPositions?.positions[0]
            const path = equipmentPositions?.positions.map((pos) => [pos?.lat, pos?.lon])

            const _equipmentModel = equipamentModel.find((eq) => eq.id === equipmentModelId)

            const _equipmentStatesHistory = equipmentStateHistory.find((eq) => eq.equipmentId === id)
            const lastState = _equipmentStatesHistory?.states[_equipmentStatesHistory?.states?.length - 1]
            const _lastEquipmentState = equipmentState.find((eq) => eq.id === lastState?.equipmentStateId)

            const obj = {
                name: name || '',
                equipmentId: id,
                equipmentModelName: _equipmentModel?.name || '',
                position: {date: initialPosition?.date || '', lat: initialPosition?.lat || 0, lon: initialPosition?.lon || 0},
                lastState: {name: _lastEquipmentState?.name || '', color: _lastEquipmentState?.color || ''},
                path: path,
                color: generateRandomColor()
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