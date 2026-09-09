import {useNavigate} from "react-router";

import {useAuth} from "@/auth/AuthContext";

export default function HomePage() {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  async function handleLogout(): Promise<void> {
    await logout();
    navigate("/signin", {replace: true});
  }

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1>Home</h1>

        <p>Logged in as {user?.name}</p>

        <button type="button" onClick={() => void handleLogout()}
                className={"bg-gray-300 hover:bg-gray-400 transition-all rounded-[3px] w-25"}>
          Logout
        </button>
      </div>
    </>
  );
}