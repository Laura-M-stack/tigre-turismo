export default function PageLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="page-container flex min-h-[40vh] items-center justify-center py-10 text-ink-soft"
    >
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-river-100 border-t-river-800" />
        <span>Cargando…</span>
      </div>
    </div>
  );
}
