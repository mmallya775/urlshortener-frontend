import './App.css'
import {getCsrfToken} from "./api/authApi.ts";
import {useEffect} from "react";

function App() {

  useEffect(() => {
    async function loadCsrfToken() {
      const csrfToken = await getCsrfToken();

      console.log(csrfToken);
    }

    loadCsrfToken();
  }, []);

  return (
    <>
      <p className={"text-center text-orange-400"}>Hi There</p>
    </>
  )
}

export default App
