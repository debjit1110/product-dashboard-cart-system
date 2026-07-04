import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  USERS: "cartnest_users",
  SESSION: "cartnest_session",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Synchronize local authentication state with browser storage on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (savedSession) {
        setUser(JSON.parse(savedSession));
      }
    } catch (error) {
      console.error("Failed to parse authentication session:", error);
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Retrieves the current array of registered users from localStorage.
   */
  const getUsers = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error("Failed to read user directory:", error);
      return [];
    }
  };

  /**
   * Registers a new user account if the email is not already in use.
   */
  const register = ({ name, email, password }) => {
    const users = getUsers();
    const alreadyExists = users.some((u) => u.email === email);
    
    if (alreadyExists) {
      return { success: false, message: "An account with this email already exists." };
    }

    users.push({ name, email, password });
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    return { success: true };
  };

  /**
   * Authenticates user credentials against the user database.
   */
  const login = ({ email, password }) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      return { success: false, message: "Invalid email or password." };
    }

    // Exclude password field from active session details for security compliance
    const sessionUser = { name: found.name, email: found.email };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionUser));
    setUser(sessionUser);
    
    return { success: true };
  };

  /**
   * Establishes a temporary guest session for application demonstration.
   */
  const loginAsGuest = () => {
    const guest = { name: "Guest", email: "guest@cartnest.com" };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(guest));
    setUser(guest);
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setUser(null);
  };

  // Memoize the value object to prevent unnecessary re-renders of consuming components
  const contextValue = useMemo(() => ({
    user,
    isLoggedIn: !!user,
    loading,
    login,
    register,
    logout,
    loginAsGuest,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be utilized within an AuthProvider");
  }
  return context;
}