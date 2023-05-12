// some constants
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// action creators
const login = (user) => ({
  type: LOGIN,
  payload: user
});

const logout = () => ({
  type: LOGOUT
});

// functions
export const logIn = (email, password) => async dispatch => {
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const json = await response.json();
  
  if (response.ok) {
    localStorage.setItem('user', JSON.stringify(json));
    dispatch(login(json));
  }
  else return json;
};

export const logOut = async dispatch => {
  localStorage.removeItem('user');
  dispatch(logout());
}

export const signUp = (email, password) => async dispatch => {
  const response = await fetch('/api/user/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const json = await response.json();

  if (response.ok) {
    localStorage.setItem('user', JSON.stringify(json));
    dispatch(login(json));
  }
  else return json;
};

// reducer

const authReducer = (state = JSON.parse(localStorage.getItem('user')), action) => {
  Object.freeze(state);

  switch (action.type){
    case 'LOGIN':
      return {...action.payload};
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export default authReducer;