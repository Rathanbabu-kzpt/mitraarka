// Simple line icons keyed by service slug.
const paths: Record<string, string> = {
  "custom-software-development": "M8 9l-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12",
  "web-development": "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01",
  "mobile-app-development": "M7 2h10v20H7zM11 18h2",
  "cloud-devops": "M7 18a4 4 0 010-8 6 6 0 0111.3 1.5A3.5 3.5 0 0117.5 18z",
  "ai-automation": "M12 3v3M12 18v3M3 12h3M18 12h3M7 7h10v10H7zM10 10h4v4h-4z",
  "ui-ux-design": "M4 20l4-1 11-11-3-3L5 16zM14 7l3 3",
};

export function ServiceIcon({ slug }: { slug: string }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand-dark">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={paths[slug] ?? paths["custom-software-development"]} />
      </svg>
    </span>
  );
}
