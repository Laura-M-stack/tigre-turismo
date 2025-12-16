import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-2 text-slate-700">No encontramos esa página.</p>
      <Link className="mt-4 inline-block underline" to="/">
        Volver al inicio
      </Link>
    </div>
  );
}
