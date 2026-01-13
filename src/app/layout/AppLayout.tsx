import { Outlet } from "react-router-dom";

import { useScrollToHash } from "../../lib/useScrollToHash";

import Footer from "./Footer";
import Header from "./Header";

export default function AppLayout() {
  useScrollToHash();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
