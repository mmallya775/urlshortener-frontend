import {ModeToggle} from "@/components/mode-toggle"
import {SignupForm} from "@/components/signup-form"
import {useState} from "react";
import {httpClient} from "@/api/http.ts";
import {CircleCheckIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {useNavigate} from "react-router";
import {getCsrfToken} from "@/api/authApi.ts";
import axios from "axios";

export default function SignupPage() {
  
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [created, setCreated] = useState<boolean>(false);

  const navigate = useNavigate();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const username = formData.get("username") as string
    const password = formData.get("confirm-password") as string
    const name = formData.get("name") as string

    setSubmitting(true);
    setError(null);
    try {
      const csrf = await getCsrfToken();
      await httpClient.post(
        "/api/createUser",
        {
          name,
          username,
          password
        },
        {
          headers: {
            [csrf.headerName]: csrf.token,
          },
        }
      )
      setCreated(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(
          typeof e.response?.data === "string"
            ? e.response.data
            : "Error creating new account!"
        );
      } else {
        setError("Error creating new account!")
      }
    } finally {
      setSubmitting(false);
    }


    // console.log({
    //   "username": username,
    //   "password": password,
    //   "name": name
    // });

    setSubmitting(false);

  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2 md:justify-between">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md bg-black  shadow-sm">
              <img src={"/favicon.svg"} className={"scale-75"} alt={"Smallify Icon"}/>
            </div>
            SmallifyURL
          </a>
          <ModeToggle/>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {created ? <Alert className="max-w-md border-green-500 text-green-700 dark:text-green-400">
                <CircleCheckIcon/>
                <AlertTitle>Account creation successful, head to <a onClick={() => navigate("/signin", {replace: true,})}
                >Sign In</a></AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert> :
              <SignupForm submitting={submitting} onSubmit={handleSubmit} error={error}/>}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/background.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
