import { useState } from "react";
import { MainPage } from "../pages/MainPage";
import { MatchingPage } from "../pages/MatchingPage";
import { GuidePage } from "../pages/GuidePage";
import { SuccessPage } from "../pages/SuccessPage";
import { AdminPage } from "../pages/AdminPage";
import { MyPage } from "../pages/MyPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { ProgramDetailPage } from "../pages/ProgramDetailPage";
import { VoucherDetailPage } from "../pages/VoucherDetailPage";

export type PageType = 'main' | 'matching' | 'guide' | 'success' | 'admin' | 'mypage' | 'login' | 'signup' | 'program-detail' | 'voucher-detail';

interface RouterProps {
  currentPage: PageType;
  onNavigate: (page: PageType, programId?: string) => void;
}

export function Router({ currentPage, onNavigate }: RouterProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>();

  const handleNavigate = (page: PageType, programId?: string) => {
    if (page === 'program-detail' && programId) {
      setSelectedProgramId(programId);
    }
    onNavigate(page, programId);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'matching':
        return <MatchingPage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'guide':
        return <GuidePage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'success':
        return <SuccessPage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'admin':
        return <AdminPage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'mypage':
        return <MyPage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} currentPage={currentPage} />;
      case 'program-detail':
        return <ProgramDetailPage onNavigate={handleNavigate} programId={selectedProgramId} currentPage={currentPage} />;
      case 'voucher-detail':
        return <VoucherDetailPage onNavigate={handleNavigate} currentPage={currentPage} />;
      default:
        return <MainPage onNavigate={handleNavigate} currentPage={currentPage} />;
    }
  };

  return <>{renderPage()}</>;
}