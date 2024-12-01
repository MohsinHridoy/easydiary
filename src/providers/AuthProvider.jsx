import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const auth = getAuth(app);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up listener to monitor user's auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser)); // Store user data in localStorage
      } else {
        setUser(null);
        localStorage.removeItem("user"); // Clean up when logged out
      }
      setLoading(false); // Stop loading once we check auth state
    });

    return () => unsubscribe(); // Clean up on component unmount
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        // Provide user-friendly error message
        Swal.fire("Signup failed", error.message, "error");
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user)); // Store user data
        setUser(user); // Update state with the signed-in user
        return user;
      })
      .catch((error) => {
        Swal.fire("Login failed", error.message, "error");
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        localStorage.removeItem("user"); // Remove user data from localStorage
        setUser(null); // Clear the user state
      })
      .catch((error) => {
        Swal.fire("Logout failed", error.message, "error");
        throw error;
      })
      .finally(() => setLoading(false));
  };

  const authInfo = {
    user,
    setUser,
    loading,
    createUser,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
