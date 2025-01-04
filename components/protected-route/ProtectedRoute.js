import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
    
  useEffect(() => {
    // Check for auth data in sessionStorage
    const authData = sessionStorage.getItem("auth");
    if (authData) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
      toast.error('invalid Authentication please login')
      router.push("/auth/login"); // Redirect to login page
    }
  }, [router]);

  if (!isAuthenticated) {
    // Optionally, show a loading state or a redirect message
    return <div>Loading...</div>;
  }

  return children; // Return the wrapped page if authenticated
};

export default ProtectedRoute;
