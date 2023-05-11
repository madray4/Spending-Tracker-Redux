import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import { useDispatch, useSelector } from 'react-redux';
import { fetchEntries } from '../store/entries';

import './css/Home.css'

// components
import EntryDate from '../components/EntryDate'

const Home = () => {
  const dispatch = useDispatch();
  const currentEntries = useSelector(state => Object.values(state.entries));
  
  const { user } = useAuthContext();

  useEffect(() => {
    dispatch(fetchEntries(user.token));
  }, [dispatch]);
  
  // functions for sorting / filtering entries for display

  const getUniqueDates = () => {
    const uniqueDatesSet = new Set();
    currentEntries.forEach(entry => {
      let newDate = new Date(entry.date);
      uniqueDatesSet.add(newDate.toString());
    });

    let uniqueDates = [];
    uniqueDatesSet.forEach(date => {
      uniqueDates.push(date);
    })
    uniqueDates.sort((date1, date2) => new Date(date2)-new Date(date1));
    return uniqueDates;
  }

  const filterEntries = (date) => {
    const filteredEntries = currentEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate.toString() === date;
    })
    return filteredEntries;
  }

  // rendered component

  return(
    <div className="home">
      <div className="entries">
        {currentEntries && getUniqueDates().map((date) => {
          return <EntryDate key={date} date={date} entries={filterEntries(date)}/>
        })}
      </div>
    </div>
  )
};

export default Home;