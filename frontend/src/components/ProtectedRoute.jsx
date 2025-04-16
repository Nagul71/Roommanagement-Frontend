import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    
const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  
  if (!userId) {
    navigate("/login")
  }
  
  return children;
};

export default ProtectedRoute;