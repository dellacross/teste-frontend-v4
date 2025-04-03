import { useEffect, useState } from 'react'
import equipamentModel from '../data/equipmentModel.json'
import equipamentPositionHistory from '../data/equipmentPositionHistory.json'
import equipmentState from '../data/equipmentState.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import equipment from '../data/equipment.json'

type Equipment = {
    id: string
    equipmentModelId: string
    name: string
}

type LastsEquipmentDatas = {
    equipmentId: string
    name: string
    equipmentModelName: string
    positions: { date: string, lat: number, lon: number }[]
    statesIdByTime: { date: string, equipmentStateId: string }[]
    color: string
}

const useHandleEquipmentBehavior = () => {

    const [_equipments, setEquipments] = useState<LastsEquipmentDatas[]>([])
    const [date, setDate] = useState<Date>(new Date("2021-02-01T03:00:00.000Z"));

    const generateRandomColor = (): string => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setHours(newDate.getHours() + 1);
                return new Date(newDate.toISOString()); 
            });
        }, 2000);
    
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {

        console.log('date', date.toISOString())

        let hash: LastsEquipmentDatas[] = []

        equipment?.map(({ id, name, equipmentModelId }: Equipment) => {
            // equipment data history
            console.log('name', name)
            const _equipmentDataHistory = _equipments?.find((eq) => eq.equipmentId === id)
            
            // model 
            const _equipmentModel = equipamentModel.find((eq) => eq.id === equipmentModelId)

            // position
            const _equipmentPositionByTime = equipamentPositionHistory.find((eq) => eq.equipmentId === id)
            const _equipmentLocationAtTime = _equipmentPositionByTime?.positions.find((pos) => pos.date === date.toISOString())

            if((_equipmentDataHistory?.positions?.length ?? 0) > 5) _equipmentDataHistory?.positions.shift()
            if(_equipmentLocationAtTime) _equipmentDataHistory?.positions.push(_equipmentLocationAtTime)


            // state
            const _equipmentStateHistory = equipmentStateHistory.find((eq) => eq.equipmentId === id)
            const _equipmentStateAtTime = _equipmentStateHistory?.states.find((state) => state.date === date.toISOString())

            console.log(_equipmentStateHistory, _equipmentStateAtTime)

            if((_equipmentDataHistory?.statesIdByTime?.length ?? 0) > 5) _equipmentDataHistory?.statesIdByTime.shift()
            if(_equipmentStateAtTime) _equipmentDataHistory?.statesIdByTime.push(_equipmentStateAtTime)

            console.log(_equipmentDataHistory?.statesIdByTime)

            const newEquipmentData = {
                equipmentId: id,
                name: name || '',
                equipmentModelName: _equipmentModel?.name || '',
                positions: _equipmentDataHistory?.positions || [],
                statesIdByTime: _equipmentDataHistory?.statesIdByTime || [],
                color: _equipmentDataHistory?.color || generateRandomColor()
            }

            //console.log(newEquipmentData)

            if(_equipmentDataHistory) {
                const updatedEquipments = _equipments?.map(equipment => 
                    equipment.equipmentId === id ? newEquipmentData : equipment
                )
                hash = updatedEquipments
            } else hash.push(newEquipmentData)
            console.log('--------------------')
        })
        console.log('------------------------------------------------------------')
        setEquipments(hash)
    }, [date])

    return {
        _equipments
    }
}

export default useHandleEquipmentBehavior