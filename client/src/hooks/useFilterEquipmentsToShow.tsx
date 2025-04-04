import { useEffect, useState } from 'react'
import equipmentState from '../data/equipmentState.json'
import equipmentModel from '../data/equipmentModel.json'

const useFilterEquipmentsToShow = () => {

    const [modelFilter, setModelFilter] = useState<{ id: string, display: boolean, name: string }[]>([])
    const [stateFilter, setStateFilter] = useState<{ id: string, display: boolean, name: string }[]>([])

    useEffect(() => {

        const equipmentModelIds = equipmentModel.map((model) => ({
            id: model.id,
            name: model.name,
            display: true
        }))

        const equipmentStateIds = equipmentState.map((state) => ({
            id: state.id,
            name: state.name,
            display: true
        }))

        setModelFilter(equipmentModelIds)
        setStateFilter(equipmentStateIds)

    }, [equipmentModel, equipmentState])

    const handleModelFilter = (id: string) => {
        const newModelFilter = modelFilter.map((model) => {
            if (model.id === id) {
                return { ...model, display: !model.display }
            }
            return model
        })

        setModelFilter(newModelFilter)
    }

    const handleStateFilter = (id: string) => {
        const newStateFilter = stateFilter.map((state) => {
            if (state.id === id) {
                return { ...state, display: !state.display }
            }
            return state
        })

        setStateFilter(newStateFilter)
    }

    return {
        modelFilter,
        stateFilter,
        handleModelFilter,
        handleStateFilter
    }
}

export default useFilterEquipmentsToShow