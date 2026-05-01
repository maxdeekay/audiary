import { useState } from "react";
import AlbumTab from "./album-tab";
import PeopleTab from "./people-tab";

type Tab = "albums" | "people";

export default function Search() {
  const [tab, setTab] = useState<Tab>("albums");

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex border-b">
        <TabButton active={tab === "albums"} onClick={() => setTab("albums")}>
          Albums
        </TabButton>
        <TabButton active={tab === "people"} onClick={() => setTab("people")}>
          People
        </TabButton>
      </div>

      {tab === "albums" ? <AlbumTab /> : <PeopleTab />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer ${
        active
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
