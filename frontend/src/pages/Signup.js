import { useState } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { signUp } from '../store/auth';

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = await dispatch(signUp(email, password));
    if (json.error) {
      setError(json.error);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>Email: </label>
      <input 
        type="email" 
        onChange={ (e) => setEmail(e.target.value) }
        value={ email }/>
      <label>Password: </label>
      <input 
        type="password" 
        onChange={ (e) => setPassword(e.target.value) }
        value={password}/>
      <button>Sign Up</button>
      {/* <button disabled={isLoading}>Sign Up</button> */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup