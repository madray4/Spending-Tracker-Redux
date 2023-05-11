import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import './css/Navbar.css'

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Spending Tracker</h1>
        </Link>
        <nav>
          {user && (
            <div className='nav-routes'>
              <span>{user.email}</span>
              <Link to="/add-entry"><button>Create</button></Link>
              <button onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
          {!user && (
            <div className = 'nav-routes'>
              <Link to="/login"><button>Log in</button></Link>
              <Link to="/signup"><button>Sign Up</button></Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
};

export default NavBar;