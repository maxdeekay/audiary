import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { searchMusic, type MusicSearchResult } from "@/api/music";
import AlbumCover from "./album-cover";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MusicSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const data = await searchMusic(query.trim());
        setResults(data);
        console.log(data);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="flex flex-col gap-4 py-4">
      <Input
        placeholder="Search albums..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {isLoading && (
        <div className="flex justify-center py-8">
          <Spinner className="size-6" />
        </div>
      )}

      {!isLoading && results.length === 0 && query.trim() && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No results found
        </p>
      )}

      {!isLoading && results.length > 0 && (
        <div className="flex flex-col gap-3">
          {results.map((result) => (
            <div
              key={result.musicBrainzId}
              className="flex gap-3 items-center rounded-lg border p-3 hover:bg-muted transition-colors cursor-pointer"
            >
              <AlbumCover src={result.coverUrl!} alt={result.title} />
              <div className="flex flex-col min-w-0">
                <p className="font-medium truncate">{result.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {result.artist}
                  {result.releaseYear && ` · ${result.releaseYear}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
