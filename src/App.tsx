import { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import Landing from "./pages/Landing";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import Inbox from "./pages/Inbox";
import Ranking from "./pages/Ranking";
import Ideas from "./pages/Ideas";

function Shell() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<Shell />}>
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<IssueDetail />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="*" element={<Landing />} />
      </Route>
    </Routes>
  );
}
