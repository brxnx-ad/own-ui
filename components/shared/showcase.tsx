import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/own/base/button";
import { Badge } from "@/components/own/simple/badge";
import { Card } from "@/components/own/simple/card";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function ShowcasePage({ title, description, implementation, note, children }: {
  title: string;
  description: ReactNode;
  implementation: ReactNode;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-surface-soft px-6 py-12 text-content-bold sm:px-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" icon={<ArrowLeft aria-hidden="true" />} render={<Link href="/" />} nativeButton={false} role="link">Volver al catálogo</Button>
            <ThemeToggle />
          </div>
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-3"><h1 className="h1">{title}</h1><Badge>{implementation}</Badge></div>
            <p className="subtitle">{description}</p>
            {note}
          </header>
        </div>
        {children}
      </div>
    </main>
  );
}

export function ShowcaseExample({ title, description, children, contentClassName = "mx-auto w-full max-w-xl", ariaLabel }: {
  title: string;
  description: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  ariaLabel?: string;
}) {
  return (
    <section aria-label={ariaLabel} className="space-y-4">
      <div className="space-y-2"><h2 className="h3">{title}</h2><p className="body-sm text-content-base">{description}</p></div>
      <Card className="rounded-2xl! p-6! sm:p-8!">
        <div className={contentClassName}>{children}</div>
      </Card>
    </section>
  );
}

export function ShowcaseAnatomy({ id = "anatomy-heading", children }: { id?: string; children: ReactNode }) {
  return <section aria-labelledby={id} className="space-y-4"><h2 id={id} className="h3">Anatomía</h2>{children}</section>;
}

export function ShowcaseApiReference({ id = "api-heading", children }: { id?: string; children: ReactNode }) {
  return <section aria-labelledby={id} className="space-y-4"><h2 id={id} className="h3">Referencia de API</h2>{children}</section>;
}
