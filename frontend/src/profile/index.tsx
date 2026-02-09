import { Heart } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center min-h-[calc(100vh-5.5rem)]">
      <p className="text-center">
        you are an amazing person <Heart className="size-4 inline" />
      </p>
      <p className="text-xs text-muted-foreground mt-4">COMING SOON</p>
    </div>
  );
}
