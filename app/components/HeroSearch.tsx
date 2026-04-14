"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface HeroSearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export function HeroSearch({ searchQuery, onSearch }: HeroSearchProps) {
  const [localSearchQuery, setLocalSearchQuery] = React.useState(searchQuery);

  // Update local state when the prop changes
  React.useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(localSearchQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(localSearchQuery);
    }
  };

  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden rounded-3xl bg-muted/20 my-8">
      <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2ois2p82ENk')] bg-cover bg-center opacity-20" />
      <div className="relative z-10 w-full max-w-2xl px-6 space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Encuentra tu hogar ideal
        </h1>
        <div className="bg-background p-2 rounded-2xl shadow-xl flex items-center gap-2">
          <Input
            className="h-14 border-none shadow-none text-lg px-4"
            placeholder="Busca la casa de tus sueños"
            value={localSearchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button className="h-14 px-8 rounded-xl font-bold" onClick={handleSearchClick}>
            <Search className="h-5 w-5 mr-2" />
            Buscar
          </Button>
        </div>
      </div>
    </section>
  );
}
