import "./tabs.css";
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/taskSlice';

export default function Tabs() {
  const filters=['All', 'Pending', 'OverDue', 'Completed']
  const selectedFilter = useSelector((state)=>state.tasks.filter);
  const dispatch = useDispatch();

  return (
    <div className='filtersContainer'>
      <p>Filters</p>
      <ul className='filtersList'>
        {filters.map((filter)=>(
          <li className={(selectedFilter == filter)? `active`:``} key={`filter${filter}`} onClick={()=>dispatch(setFilter(filter))}>{filter}</li>
        ))}
      </ul>
    </div>
  )
}
