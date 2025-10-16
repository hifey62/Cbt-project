import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Profile from "./profile";
import { AuthContext } from "../context/authcontext";
import { useState } from "react";
import ProtectedRoute from "./protectectedRoute";

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>} />
          
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
