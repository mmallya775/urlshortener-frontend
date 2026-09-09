import "./App.css";

import {Route, Routes} from "react-router";

import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import ProtectedRoute from "@/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<LoginPage/>}/>

      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<HomePage/>}/>
      </Route>
    </Routes>
  );
}

export default App;