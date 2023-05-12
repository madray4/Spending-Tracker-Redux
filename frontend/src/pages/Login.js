import { useState } from 'react';

// redux 
import { useDispatch } from 'react-redux'
import { logIn } from '../store/auth';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = await dispatch(logIn(email, password));
    console.log(json);
    if (json.error) {
      setError(json.error);
    };
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
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
      <button>Log In</button>
      {/* <button disabled={isLoading}>Log In</button> */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login