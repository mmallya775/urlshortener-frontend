import {LoginForm} from "@/components/login-form"
import {useAuth} from "@/auth/AuthContext"
import {useNavigate} from "react-router";
import {useState} from "react";
import {ModeToggle} from "@/components/mode-toggle";

export default function LoginPage() {
  const {login} = useAuth();
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const username = formData.get("username") as string
    const password = formData.get("password") as string

    setSubmitting(true);

    try {
      await login(username, password);

      navigate("/", {replace: true,});
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Login Failed!");
      }
    } finally {
      setSubmitting(false);
    }
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
            <LoginForm onSubmit={event => void handleSubmit(event)}
                       submitting={submitting}
                       error={error}/>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img src="/background.png" alt="Smallify Background Image"
             className="absolute inset-0 h-full w-full object-cover"/>
      </div>
    </div>
  )
}