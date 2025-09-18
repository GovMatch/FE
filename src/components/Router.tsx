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
  onNavigate: (page: PageType) => void;
}

export function Router({ currentPage, onNavigate }: RouterProps) {
  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage onNavigate={onNavigate} />;
      case 'matching':
        return <MatchingPage onNavigate={onNavigate} />;
      case 'guide':
        return <GuidePage onNavigate={onNavigate} />;
      case 'success':
        return <SuccessPage onNavigate={onNavigate} />;
      case 'admin':
        return <AdminPage onNavigate={onNavigate} />;
      case 'mypage':
        return <MyPage onNavigate={onNavigate} />;
      case 'login':
        return <LoginPage onNavigate={onNavigate} />;
      case 'signup':
        return <SignupPage onNavigate={onNavigate} />;
      case 'program-detail':
        return <ProgramDetailPage onNavigate={onNavigate} />;
      case 'voucher-detail':
        return <VoucherDetailPage onNavigate={onNavigate} />;
      default:
        return <MainPage onNavigate={onNavigate} />;
    }
  };

  return <>{renderPage()}</>;
}