import { useEffect, useState, useRef } from 'react'
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
    lastUpdate: string
}

const useHandleEquipmentBehavior = () => {

    const [_equipments, setEquipments] = useState<LastsEquipmentDatas[]>([])
    const [date, setDate] = useState<Date>(new Date("2021-02-01T03:00:00.000Z"));
    const isInitialRender = useRef(true);

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
        if (isInitialRender.current) {
            // Ignora o primeiro ciclo
            isInitialRender.current = false;
            return;
        }

        console.log('date', date.toISOString())        
        let hash: LastsEquipmentDatas[] = _equipments || []

        console.log('hash', hash)
        let consoleFlag = false
        let existUpdate = false

        equipment?.map(({ id, name, equipmentModelId }: Equipment) => {

            if(id === '1c7e9615-cc1c-4d72-8496-190fe5791c8b') consoleFlag = true

            consoleFlag && console.log('name', name)
            const _equipmentDataHistory = hash?.find((eq) => eq.equipmentId === id);
            consoleFlag && console.log('edh', _equipmentDataHistory)
        
            // model
            const _equipmentModel = equipamentModel.find((eq) => eq.id === equipmentModelId);

            // location
            const _equipmentPositionByTime = equipamentPositionHistory.find((eq) => eq.equipmentId === id);
            const _equipmentLocationAtTime = _equipmentPositionByTime?.positions.find((pos) => pos.date === date.toISOString());

            if(_equipmentLocationAtTime) {
                existUpdate = true
                consoleFlag && console.log('mudanca posicao')
            }
            else consoleFlag && console.log('sem mudanca posicao')

            // Atualizar positions de forma imutável
            const updatedPositions = _equipmentDataHistory?.positions
                ? [..._equipmentDataHistory.positions]
                : [];

            if (_equipmentLocationAtTime) updatedPositions.push(_equipmentLocationAtTime);

            // states
            const _equipmentStateHistory = equipmentStateHistory.find((eq) => eq.equipmentId === id);
            const _equipmentStateAtTime = _equipmentStateHistory?.states.find((state) => state.date === date.toISOString());

            if(_equipmentStateAtTime) {
                consoleFlag && console.log('mudanca estado')
                existUpdate = true
            }
            else consoleFlag && console.log('sem mudanca estado')
        
            // Atualizar statesIdByTime de forma imutável
            const updatedStatesIdByTime = _equipmentDataHistory?.statesIdByTime
                ? [..._equipmentDataHistory.statesIdByTime]
                : [];

            if (_equipmentStateAtTime) updatedStatesIdByTime.push(_equipmentStateAtTime);

            // updated
            let newUpdatedDate = existUpdate 
                ? date.toISOString() 
                : _equipmentDataHistory?.lastUpdate || date.toISOString();
        
            const newEquipmentData = {
                equipmentId: id,
                name: name || '',
                equipmentModelName: _equipmentModel?.name || '',
                positions: updatedPositions,
                statesIdByTime: updatedStatesIdByTime,
                color: _equipmentDataHistory?.color || generateRandomColor(),
                lastUpdate: newUpdatedDate
            };

            consoleFlag && console.log('newEquipmentData', newEquipmentData)
        
            if (_equipmentDataHistory) {
                const updatedEquipments = hash?.map((equipment) =>
                    equipment.equipmentId === id ? newEquipmentData : equipment
                );
                hash = [...updatedEquipments];
                consoleFlag && console.log('achou e mudou', updatedEquipments)
            } else {
                hash.push(newEquipmentData);
                consoleFlag && console.log('nao achou')
            }
            consoleFlag && console.log('------------------------------------------------------------')
            consoleFlag = false
            existUpdate = false
        });
        
        setEquipments(hash)
    }, [date])

    return {
        _equipments
    }
}

export default useHandleEquipmentBehavior