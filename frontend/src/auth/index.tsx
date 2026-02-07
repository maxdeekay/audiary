import { useState } from "react";
import LoginForm from "./login-form";
import SignUpForm from "./sign-up-form";

export default function Auth() {
  const [currentForm, setCurrentForm] = useState<"login" | "sign-up">("login");

  return (
    <div className="flex flex-col justify-center items-center gap-10 min-h-svh">
      <h2 className="text-4xl">audiary</h2>

      <div className="w-full max-w-80">
        {currentForm === "login" ? <LoginForm /> : <SignUpForm />}
      </div>

      <p>
        {currentForm === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() =>
            setCurrentForm(currentForm === "login" ? "sign-up" : "login")
          }
          className="underline cursor-pointer hover:opacity-90"
        >
          {currentForm === "login" ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}
