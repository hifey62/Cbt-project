import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Profile from "./profile";
import ResultPage from "./resultPage";
import { AuthContext } from "../context/authcontext";
import { useState } from "react";
import ProtectedRoute from "./protectectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, result, setResult }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/result" element={ <ProtectedRoute><ResultPage /></ProtectedRoute>} />
          
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
