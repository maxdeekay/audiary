import { getUser } from "@/lib/auth";

export default function Home() {
  const user = getUser();

  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-4rem)]">
      <p className="text-center">welcome {user?.username}</p>
      <p className="text-center">ready to go beyond the hits?</p>
    </div>
  );
}
