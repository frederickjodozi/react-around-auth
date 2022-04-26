import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to='/signin' />;
}

export default ProtectedRoute;
