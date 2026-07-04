import { createContext, useContext, useEffect, useState } from "react";

// I am creating this context so that any page/component can check
// "is user logged in" and "who is logged in" without passing props everywhere
const AuthContext = createContext();

// keys I am using in localStorage, keeping them in one place so I don't
// accidentally spell them differently somewhere else in the app
const USERS_KEY = "cartnest_users";
const SESSION_KEY = "cartnest_session";

export function AuthProvider({ children }) {
  // this holds the currently logged in user (or null if nobody is logged in)
  const [user, setUser] = useState(null);
  // loading is true only for the first render, while we check localStorage
  const [loading, setLoading] = useState(true);

  // on first load, check if a session already exists in localStorage
  // this is what keeps the user logged in even after a page refresh
  useEffect(() => {
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
    setLoading(false);
  }, []);

  // helper to read the list of registered users from localStorage
  function getUsers() {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  // register a brand new account
  function register({ name, email, password }) {
    const users = getUsers();

    // don't allow two accounts with the same email
    const alreadyExists = users.some((u) => u.email === email);
    if (alreadyExists) {
      return { success: false, message: "An account with this email already exists." };
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return { success: true };
  }

  // log the user in - checks email/password against the saved users list
  function login({ email, password }) {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      return { success: false, message: "Invalid email or password." };
    }

    // don't store the password in the "session", just name + email is enough
    const sessionUser = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  }

  // quick login for people who don't want to register (demo/testing purpose)
  function loginAsGuest() {
    const guest = { name: "Sabyasachi Saha", email: "guest@cartnest.com" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(guest));
    setUser(guest);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  const value = {
    user,
    isLoggedIn: !!user,
    loading,
    login,
    register,
    logout,
    loginAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// custom hook so pages can just do useAuth() instead of importing useContext + AuthContext every time
export function useAuth() {
  return useContext(AuthContext);
}
