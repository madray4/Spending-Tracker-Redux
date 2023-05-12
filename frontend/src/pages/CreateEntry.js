import { useState } from 'react';
import { useNavigate } from "react-router-dom"

// redux
import { useDispatch, useSelector } from 'react-redux';
import { createEntry } from '../store/entries'

// import { useAuthContext } from '../hooks/useAuthContext';

const CreateEntry = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const [date, setDate ] = useState('');
  const [store, setStore ] = useState('');
  const [item, setItem ] = useState('');
  const [cost, setCost ] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);


  // const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // User Validation: if no user set error field and return
    if (!user) {
      setError('You must be logged in');
      return;
    }
    const entry = {date, store, item, totalCost:cost};
    const json = await dispatch(createEntry(entry, user.token));
    if(json.error){
      console.log(json.error);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    else{
      navigate('/');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add an Entry</h3>
      <label>Date:</label>
      <input type="date" 
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className={emptyFields.includes('date') ? "error" : ""}/>
      <label>Store Name:</label>
      <input type="text" 
              onChange={(e) => setStore(e.target.value)}
              value={store}
              className={emptyFields.includes('store') ? "error" : ""}/>
      <label>Item:</label>
      <input type="text" 
              onChange={(e) => setItem(e.target.value)}
              value={item}
              className={emptyFields.includes('item') ? "error" : ""}/>
      <label>Total Cost:</label>
      <input type="number"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              className={emptyFields.includes('totalCost') ? "error" : ""}/>
      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
};

export default CreateEntry;