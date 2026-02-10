import { useState } from "react";
import { Image } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function AlbumCover({ src, alt }: { src: string; alt: string }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className="size-12 rounded bg-muted flex items-center justify-center shrink-0 overflow-hidden">
      {status === "loading" && <Spinner className="size-4" />}
      {status === "error" && <Image className="size-5 text-muted-foreground" />}
      <img
        src={src}
        alt={alt}
        className={`size-12 rounded object-cover ${status === "loaded" ? "" : "hidden"}`}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
