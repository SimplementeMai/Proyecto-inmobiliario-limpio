"use client";

import * as React from "react";
import { CategoryBar } from "./CategoryBar";

interface Category {
  id: string;
  label: string;
}

interface CategorySelectorProps {
  initialActiveId?: string;
  onCategorySelect?: (id: string) => void;
}

export function CategorySelector({ initialActiveId = "all", onCategorySelect }: CategorySelectorProps) {
  const [activeId, setActiveId] = React.useState<string>(initialActiveId);

  const categories: Category[] = [
    { id: 'all', label: 'Todas' },
    { id: 'houses', label: 'Casas' },
    { id: 'apartments', label: 'Departamentos' },
    { id: 'villas', label: 'Villas' },
    { id: 'penthouses', label: 'Penthouses' },
  ];

  const handleSelect = (id: string) => {
    setActiveId(id);
    if (onCategorySelect) {
      onCategorySelect(id);
    }
  };

  return (
    <CategoryBar categories={categories} activeId={activeId} onSelect={handleSelect} />
  );
}
