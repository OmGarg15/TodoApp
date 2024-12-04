/* eslint-disable react/prop-types */
import './SearchBox.css';

export default function SearchBox({setSearchValue}) {
  return (
    <div>
      <input type="text" placeholder='Search' name='search' className='searchInput' onChange={(e)=>{
        setSearchValue(e.target.value);
      }}/>
    </div>
  )
}
