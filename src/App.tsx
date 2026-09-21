import "./App.css";

import {Route, Routes} from "react-router";

import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import ProtectedRoute from "@/auth/ProtectedRoute";
import SignupPage from "@/pages/SignupPage.tsx";
import AppLayout from "@/pages/AppLayout.tsx";

function App() {
  return (
    <Routes>
      <Route path={"/signin"} element={<LoginPage/>}/>
      <Route path={"/signup"} element={<SignupPage/>}/>

      <Route element={<ProtectedRoute/>}>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path={"/change-password"} element={<p>Coming Soon</p>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;