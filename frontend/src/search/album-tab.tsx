import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { searchMusic, type MusicSearchResult } from "@/api/music";
import AlbumCover from "./album-cover";
import { Search as SearchIcon, PlusCircle } from "lucide-react";
import CollectionPicker from "./collection-picker";

export default function AlbumTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MusicSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<MusicSearchResult | null>(
    null,
  );

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
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search albums and artists..."
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoComplete="off"
          inputMode="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {!query.trim() && !isLoading && (
        <p className="text-sm text-muted-foreground text-center py-12">
          Search for albums and EPs to add to your collections
        </p>
      )}

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
              className="flex gap-3 items-center rounded-lg border p-3"
            >
              <AlbumCover src={result.coverUrl!} alt={result.title} />
              <div className="flex flex-col min-w-0">
                <p className="font-medium truncate">{result.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {result.artist}
                  {result.releaseYear && ` · ${result.releaseYear}`}
                </p>
              </div>

              <div className="flex gap-2 items-center ml-auto shrink-0">
                {result.genre && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                    {result.genre.charAt(0).toUpperCase() +
                      result.genre.slice(1)}
                  </span>
                )}
                <PlusCircle
                  className="shrink-0 text-muted-foreground hover:text-foreground cursor-pointer"
                  onClick={() => setSelectedAlbum(result)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <CollectionPicker
        album={selectedAlbum}
        onOpenChange={(open) => {
          if (!open) setSelectedAlbum(null);
        }}
      />
    </div>
  );
}
