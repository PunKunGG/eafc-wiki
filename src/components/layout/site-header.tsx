export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex min-h-16 max-w-[1120px] items-center gap-3 px-4 sm:px-6">
        <span className="rounded bg-accent px-2 py-1 text-sm font-black italic text-accent-foreground">
          FC26
        </span>
        <span className="font-semibold tracking-wide">PLAYBOOK</span>
        <span className="ml-auto text-xs text-muted">คู่มือปุ่มกดภาษาไทย</span>
      </div>
    </header>
  );
}
