import { useEffect, useState } from 'react'
import equipmentState from '../data/equipmentState.json'
import equipmentModel from '../data/equipmentModel.json'

const useFilterEquipmentsToShow = () => {

    const [filter, setFilter] = useState<{ models: string[], states: string[] }>({ models: [], states: [] })

    useEffect(() => {
        const equipmentModelIds = equipmentModel.map((model) => model.id)

        const equipmentStateIds = equipmentState.map((state) => (state.id))

        setFilter({
            models: equipmentModelIds,
            states: equipmentStateIds
        })
    }, [])

    const handleModelFilter = (id: string) => {
        setFilter((prevFilter) => {
            const updatedModels = prevFilter.models.includes(id)
                ? prevFilter.models.filter((model) => model !== id)
                : [...prevFilter.models, id];
            return { ...prevFilter, models: updatedModels };
        });
    };

    const handleStateFilter = (id: string) => {
        setFilter((prevFilter) => {
            const updatedStates = prevFilter.states.includes(id)
                ? prevFilter.states.filter((state) => state !== id)
                : [...prevFilter.states, id];
            return { ...prevFilter, states: updatedStates };
        });
    };

    return {
        filter,
        handleModelFilter,
        handleStateFilter
    }
}

export default useFilterEquipmentsToShow