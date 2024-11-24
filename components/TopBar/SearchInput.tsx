"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("q")?.toString() || "");

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams();

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    replace(`/search?${params.toString()}`);
  }, 1000);

  useEffect(() => {
    if (!searchParams.get("q")) {
      setSearch("");
    }
  }, [searchParams.get("q")]);

  return (
    <Input
      type="search"
      id="search-games"
      placeholder="Find a game..."
      className="mx-2 h-full w-full rounded-full border-none text-secondary placeholder:text-secondary focus:border-none focus-visible:ring-0"
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default SearchInput;
