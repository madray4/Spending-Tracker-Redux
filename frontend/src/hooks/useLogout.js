import { useAuthContext } from "../hooks/useAuthContext";
import { useEntriesContext } from "../hooks/useEntriesContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: entriesDispatch } = useEntriesContext();

  const logout = () => {
    // remove use from storage
    localStorage.removeItem('user');
    // update AuthContext
    dispatch({ type: 'LOGOUT' });
    entriesDispatch({ type: 'SET_ENTRIES', payload: null});
  };

  return { logout };
};