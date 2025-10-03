import { BrowserRouter, Routes , Route  } from "react-router-dom"
import Signup from "./signup"
import Login from "./login"
function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
