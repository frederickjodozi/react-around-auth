import { Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return children;
  }
  return <Navigate to='/signin' />;
}

export default ProtectedRoute;
