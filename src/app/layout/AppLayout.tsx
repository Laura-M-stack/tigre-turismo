import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import PageLoading from "../../components/PageLoading";
import { useScrollToHash } from "../../lib/useScrollToHash";

import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout() {
  useScrollToHash();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Suspense acá (no arriba del layout): al cambiar de página, header y footer quedan fijos */}
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
