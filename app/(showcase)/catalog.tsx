"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/own/base/input";
import { Button } from "@/components/own/base/button";
import { Menu, MenuCheckboxItem, MenuCheckboxItemIndicator, MenuGroup, MenuGroupLabel, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from "@/components/own/base/menu";
import { Badge } from "@/components/own/simple/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/own/simple/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/own/simple/empty";

export interface ComponentItem {
  name: string;
  href: string;
  description: string;
  category: string;
  type: "simple" | "base" | "composed" | "dependant";
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
}

export function Catalog({ components }: { components: ComponentItem[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ComponentItem["type"][]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const categories = Array.from(new Set(components.map((item) => item.category))).sort((a, b) => a.localeCompare(b, "es"));
  const types = Array.from(new Set(components.map((item) => item.type))).sort();
  const activeFilters = selectedCategories.length + selectedTypes.length;
  const search = normalize(query.trim());
  const results = components.filter((item) => {
    const matchesSearch = normalize(`${item.name} ${item.description} ${item.category}`).includes(search);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
    return matchesSearch && matchesCategory && matchesType;
  }).sort((a, b) => a.name.localeCompare(b.name, "es"));

  function clearFilters() {
    setQuery("");
    setSelectedCategories([]);
    setSelectedTypes([]);
    inputRef.current?.focus();
  }

  return (
    <div className="space-y-10">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-bold/60" />
          <Input ref={inputRef} type="search" aria-label="Buscar componentes" placeholder="Buscar componentes..." value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9!" />
        </div>
        <Menu>
          <MenuTrigger>
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            Filtros{activeFilters > 0 && ` (${activeFilters})`}
          </MenuTrigger>
          <MenuPortal>
            <MenuPositioner align="end" sideOffset={8}>
              <MenuPopup>
                <MenuGroup>
                  <MenuGroupLabel>Categorías</MenuGroupLabel>
                  {categories.map((category) => (
                    <MenuCheckboxItem key={category} checked={selectedCategories.includes(category)} onCheckedChange={(checked) => {
                      setSelectedCategories((current) => checked ? [...current, category] : current.filter((value) => value !== category));
                    }}>
                      <MenuCheckboxItemIndicator keepMounted />
                      {category}
                    </MenuCheckboxItem>
                  ))}
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup>
                  <MenuGroupLabel>Tipo</MenuGroupLabel>
                  {types.map((type) => (
                    <MenuCheckboxItem key={type} checked={selectedTypes.includes(type)} onCheckedChange={(checked) => {
                      setSelectedTypes((current) => checked ? [...current, type] : current.filter((value) => value !== type));
                    }}>
                      <MenuCheckboxItemIndicator keepMounted />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuCheckboxItem>
                  ))}
                </MenuGroup>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </div>

      <section aria-labelledby="components-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-4 border-b border-gray-base pb-3">
          <h2 id="components-heading" className="h3">Componentes</h2>
          <p role="status" className="caption text-gray-bold/70">{results.length} {results.length === 1 ? "resultado" : "resultados"}</p>
        </div>
        {results.length > 0 ? (
          <nav aria-label="Listado de componentes" className="grid gap-3 sm:grid-cols-2">
            {results.map((item) => (
              <Link key={item.href} href={item.href} className="group min-w-0 rounded-base outline-none focus-visible:ring-2 focus-visible:ring-primary-base focus-visible:ring-offset-2 focus-visible:ring-offset-surface-soft">
                <Card className="h-full transition-colors group-hover:border-primary-base group-hover:bg-surface-bold">
                  <CardHeader>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                      <CardTitle as="h3" className="group-hover:text-primary-bold">{item.name}</CardTitle>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </nav>
        ) : (
          <Empty>
            <EmptyHeader><EmptyTitle as="h3">Sin resultados</EmptyTitle><EmptyDescription>Prueba otra búsqueda o cambia los filtros seleccionados.</EmptyDescription></EmptyHeader>
            <EmptyContent><Button variant="outline" onClick={clearFilters}>Restablecer búsqueda y filtros</Button></EmptyContent>
          </Empty>
        )}
      </section>
    </div>
  );
}
