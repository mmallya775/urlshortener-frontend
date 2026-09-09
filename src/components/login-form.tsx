import {cn} from "cn"

import {Button} from "@/components/ui/button"
import {Field, FieldGroup, FieldLabel,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"

interface LoginFormProps
  extends React.ComponentProps<"form"> {
  submitting?: boolean
  error?: string
}

export function LoginForm({
                            className,
                            submitting = false,
                            error,
                            ...props
                          }: LoginFormProps) {
  return (
    <form
      className={cn(
        "flex flex-col gap-6",
        className
      )}
      {...props}
    >
      <FieldGroup>

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            Login to your account
          </h1>

          <p className="text-sm text-balance text-muted-foreground">
            Enter your credentials below to login
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="username">
            Username
          </FieldLabel>

          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">
            Password
          </FieldLabel>

          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Logging in..."
              : "Login"}
          </Button>
        </Field>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

      </FieldGroup>
    </form>
  )
}