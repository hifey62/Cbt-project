import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Test from "./test";
import ResultPage from "./resultPage";
import TestPage from "./testPage";
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
          <Route path="/test" element={ <ProtectedRoute><Test /></ProtectedRoute>} />
          <Route path="/result" element={ <ProtectedRoute><ResultPage /></ProtectedRoute>} />
          <Route path="/testPage" element={ <TestPage />} />
          
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
