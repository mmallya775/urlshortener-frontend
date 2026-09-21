import {useNavigate} from "react-router";

import {useAuth} from "@/auth/AuthContext";
import {Button} from "@/components/ui/button";
import {getAllUrls} from "@/api/urls.ts";
import {useEffect, useState} from "react";
import type {Urls} from "@/types/urlTypes.ts";
import {DataTable} from "@/components/url-table/UrlDataTable.tsx";
import {columns} from "@/components/url-table/columns.tsx";

export default function HomePage() {
  const {user, logout} = useAuth();
  const [urls, setUrls] = useState<Urls[]>([]);
  const navigate = useNavigate();

  async function handleLogout(): Promise<void> {
    await logout();
    navigate("/signin", {replace: true});
  }

  useEffect(() => {
    const loadUrls = async () => {
      try {
        const urls = await getAllUrls()
        setUrls(urls ?? [])
      } catch (e) {
        console.error(e)
      }
    }

    loadUrls()
  }, [])

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <h1>Home</h1>

        <p>Logged in as {user?.name}</p>

        {/*<button type="button" onClick={() => void handleLogout()}*/}
        {/*        className={"bg-gray-300 hover:bg-gray-400 transition-all rounded-[3px] w-25"}>*/}
        {/*  Logout*/}
        {/*</button>*/}
        <Button variant="destructive" onClick={() => void handleLogout()}>Logout</Button>
      </div>
      {/*<ul>*/}
      {/*  {urls.map((url) => (*/}
      {/*    <li key={url.id}>*/}
      {/*      {url.shortCode + ' -> ' + url.mainUrl}*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={urls} />
      </div>
    </>
  );
}