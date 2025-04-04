import { useState } from 'react'
import './navbar.css'
import AikoLogo from '../../assets/img/aiko.png'
import { Filter } from 'lucide-react';
import FilterContainer from '../../components/Filter/filtercontainer';

const NavBar = () => {

  const [showFilter, setShowFilter] = useState<boolean>(false)

  return (
    <div id="nav-bar">
      <img 
        src={AikoLogo} 
        alt='aiko-logo'
      />    
      <button 
        id="filter-btn"
        onClick={() => setShowFilter(!showFilter)}
      >
        <Filter 
          id='filter-icon'
          size={30} 
          color="white" 
        />
      </button>
      { showFilter && <FilterContainer /> }
    </div>
  )
}

export default NavBar