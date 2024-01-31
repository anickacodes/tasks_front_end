// import axios from "axios";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { useState } from "react";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Tasks from "./pages/Tasks";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <div>
      <NavBar user={user} setUser={setUser} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} setToken={setToken} />}
        />
        <Route
          path="/signup"
          element={<Signup setUser={setUser} setToken={setToken} />}
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute
              element={Tasks}
              isAuthenticated={!!user && !!token}
              user={user}
              token={token}
            />
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
