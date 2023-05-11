import { useState, useEffect } from 'react';
import { useNavigate, useParams  } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext';

const EditEntry = () => {
  const [date, setDate ] = useState('');
  const [store, setStore ] = useState('');
  const [item, setItem ] = useState('');
  const [cost, setCost ] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFeilds] = useState([]);

  // const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();
  const url = '/api/entries/' + id;


  const handleSubmit = async (e) => {
    e.preventDefault();
    // User Validation: If no user, set error and return
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const editedEntry = {date, store, item, totalCost: cost};
    console.log(editedEntry);

    // Authorization Headers: use user.token in headers Authorization to make authorized request
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(editedEntry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();
    console.log(json);

    if(!response.ok){
      setError(json.error);
      setEmptyFeilds(json.emptyFields);
    }
    if(response.ok){
      navigate('/');
    }
  }

  useEffect(() => {
    if (!user) {
      setError('You must be logged in');
      navigate('/');
    }
    const fetchEntry = async () =>{
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      if(response.ok){
        setDate(json.date);
        setStore(json.store);
        setItem(json.item);
        setCost(json.totalCost);
      }
      else{
        navigate('/');
      }
    }

    fetchEntry();
  },[navigate, url, user]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit an Entry</h3>
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
  );
};

export default EditEntry;