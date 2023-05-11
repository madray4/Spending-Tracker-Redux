// import { useEntriesContext } from '../hooks/useEntriesContext';
import { Link } from 'react-router-dom';

// redux
import { useDispatch } from 'react-redux';
import { deleteEntry } from '../store/entries'
import { useAuthContext } from '../hooks/useAuthContext';

const EntryDetails = ({ entry }) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    // User Validation: return if no user
    if (!user) return;

    // Authorization Headers: use user.token in headers Authorization to make authorized request
    dispatch(deleteEntry(entry, user.token));
  }

  return (
    <div className="entry-details">
      <p>{entry.store}</p>
      <p>{entry.item}</p>
      <p>${entry.totalCost}</p>
      <div className="entry-details-buttons">
        <Link to={'/edit-entry/' + entry._id}>
          <span className="material-symbols-outlined entry-details-button">edit</span>
        </Link>
        <span className="material-symbols-outlined entry-details-button" onClick={handleDelete}>delete</span>
      </div>
    </div>
  );
};

export default EntryDetails;