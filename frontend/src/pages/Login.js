import { useState, useRef } from 'react';

// redux 
import { useDispatch } from 'react-redux'
import { logIn } from '../store/auth';

const Login = () => {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = await dispatch(logIn(emailRef.current.value, passwordRef.current.value));
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
        ref={emailRef}/>
      <label>Password: </label>
      <input 
        type="password" 
        ref={passwordRef}/>
      <button>Log In</button>
      {/* <button disabled={isLoading}>Log In</button> */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login