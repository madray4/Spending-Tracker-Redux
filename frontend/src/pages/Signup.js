import { useState, useRef } from 'react';

// redux
import { useDispatch } from 'react-redux'
import { signUp } from '../store/auth';

const Signup = () => {
  const dispatch = useDispatch();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = await dispatch(signUp(emailRef.current.value, passwordRef.current.value));
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
        ref={emailRef}/>
      <label>Password: </label>
      <input 
        type="password" 
        ref={passwordRef}/>
      <button>Sign Up</button>
      {/* <button disabled={isLoading}>Sign Up</button> */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup