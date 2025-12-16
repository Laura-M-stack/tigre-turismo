export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
        <p>
          Hecho con fines educativos. Información sujeta a cambios.{" "}
          <span className="text-slate-400">© {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
}
