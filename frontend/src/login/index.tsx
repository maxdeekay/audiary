import LoginForm from "./login-form";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 min-h-svh">
      <h2 className="text-4xl">audiary</h2>

      <div className="w-full max-w-80">
        <LoginForm />
      </div>
    </div>
  );
}
