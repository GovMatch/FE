import { useState } from "react";
import { Router, type PageType } from "./components/Router";
import { AuthProvider } from "./components/AuthContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('main');

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <AuthProvider>
      <Router currentPage={currentPage} onNavigate={handleNavigate} />
    </AuthProvider>
  );
}