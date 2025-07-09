import { Navigate, Route, Routes } from "react-router-dom";


import { useAuthContext } from "./context/AuthContext";

import SignUp from "./pages/Signup/signup";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import ActionLogBoard from "./pages/logTask/actionlog";

function App() {
  const { authUser } = useAuthContext();

console.log("authUser =>", authUser);

  return (
    <>
      
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/logs" element={authUser ? <ActionLogBoard /> : <Navigate to="/login" />} />
          
        </Routes>
      
      
    </>
  );
}

export default App;