import './filtercontainer.css'
import useFilterEquipmentsToShow from '../../hooks/useFilterEquipmentsToShow'
import { Eye, EyeClosed } from 'lucide-react'

const FilterContainer = () => {

    const {
        modelFilter,
        stateFilter,
        handleModelFilter,
        handleStateFilter
    } = useFilterEquipmentsToShow()

    return (
        <div id="filter-container">
            <section>
                <h2>Model</h2>
                <div id="model-filter">
                    {
                        modelFilter.map((model) => (
                            <div 
                                key={model.id} 
                                className="filter-option"
                            >

                                <input
                                    type="checkbox"
                                    id={model.id}
                                    checked={model.display}
                                    onChange={() => handleModelFilter(model.id)}
                                />
                                <label htmlFor={model.id}>
                                    <span onClick={() => handleModelFilter(model.id)}>
                                    {
                                        model?.display ?
                                        <Eye />
                                        :
                                        <EyeClosed />
                                    }
                                    </span>
                                    {model.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section>
                <h2>State</h2>
                <div id="state-filter">
                    {
                        stateFilter.map((state) => (
                            <div 
                                key={state.id} 
                                className="filter-option"
                            >
                                <input
                                    type="checkbox"
                                    id={state.id}
                                    checked={state.display}
                                    onChange={() => handleStateFilter(state.id)}
                                />
                                <label htmlFor={state.id}>
                                    <span>
                                    {
                                        state?.display ?
                                        <Eye />
                                        :
                                        <EyeClosed />
                                    }
                                    </span>
                                    {state.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default FilterContainer