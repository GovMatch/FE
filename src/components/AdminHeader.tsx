import { imgIcRoundCall, imgEntypoShare } from "../imports/svg-x25l8";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { User, Settings, LogOut, Home, Shield, Bell } from "lucide-react";
import type { PageType } from "./Router";

interface AdminHeaderProps {
  onNavigate: (page: PageType) => void;
}

export function AdminHeader({ onNavigate }: AdminHeaderProps) {
  const handleShare = (type: string) => {
    const url = window.location.href;
    const title = "정부지원사업 매칭 서비스 - 관리자";
    const text = "AI 기반 정부지원사업 매칭 관리자 시스템";

    switch (type) {
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('URL이 클립보드에 복사되었습니다!');
        });
        break;
      case 'kakaotalk':
        if (window.Kakao) {
          window.Kakao.Share.sendDefault({
            objectType: 'web',
            url: url,
            title: title,
            description: text
          });
        } else {
          alert('카카오톡 SDK가 로드되지 않았습니다.');
        }
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <header className="relative z-20 px-8 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative">
            <div className="absolute bg-white/90 backdrop-blur-md left-0 rounded-[35px] w-40 h-24 top-0 shadow-2xl border border-white/30 transform -skew-x-2" />
            <div className="relative px-8 py-4 text-lg font-bold z-10">
              <p className="leading-tight mb-0 text-gray-800">관리자</p>
              <p className="leading-tight">
                <span className="text-gray-800">시스템</span>
                <span className="bg-gradient-to-r from-[#58d674] to-[#45c762] bg-clip-text text-transparent">.</span>
              </p>
            </div>
          </div>

          {/* Admin Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <AdminNavItem label="대시보드" active />
            <AdminNavItem label="사용자 관리" />
            <AdminNavItem label="지원사업 관리" />
            <AdminNavItem label="매칭 관리" />
            <AdminNavItem label="시스템 설정" />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Home Icon */}
            <div className="relative">
              <div className="absolute bg-white/80 backdrop-blur-md rounded-[20px] w-16 h-16 top-0 left-0 shadow-xl border border-white/30 transform rotate-12" />
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 hover:bg-white/20 rounded-[12px] transition-all duration-200 hover:scale-110"
                  onClick={() => onNavigate('main')}
                >
                  <Home className="size-5 text-white" />
                </Button>
              </div>
            </div>

            {/* Notification Icon */}
            <div className="relative">
              <div className="absolute bg-white/80 backdrop-blur-md rounded-[20px] w-16 h-16 top-0 left-0 shadow-xl border border-white/30 transform -rotate-12" />
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 relative hover:bg-white/20 rounded-[12px] transition-all duration-200 hover:scale-110"
                >
                  <Bell className="size-5 text-white" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center shadow-lg">
                    3
                  </span>
                </Button>
              </div>
            </div>
            
            {/* Share Icon with Dropdown */}
            <div className="relative">
              <div className="absolute bg-white/80 backdrop-blur-md rounded-[20px] w-16 h-16 top-0 left-0 shadow-xl border border-white/30 transform rotate-6" />
              <div className="relative w-16 h-16 flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2 hover:bg-white/20 rounded-[12px] transition-all duration-200 hover:scale-110">
                      <img className="size-5 brightness-0 invert" src={imgEntypoShare} alt="Share" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-[20px]">
                    <DropdownMenuItem onClick={() => handleShare('copy')} className="rounded-[12px] hover:bg-[#58d674]/10">
                      페이지 URL 복사
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('kakaotalk')} className="rounded-[12px] hover:bg-[#58d674]/10">
                      카카오톡 공유
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('facebook')} className="rounded-[12px] hover:bg-[#58d674]/10">
                      페이스북 공유
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('twitter')} className="rounded-[12px] hover:bg-[#58d674]/10">
                      트위터 공유
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Admin Menu */}
            <div className="relative">
              <div className="absolute bg-gradient-to-br from-[#58d674]/30 to-[#45c762]/20 backdrop-blur-md rounded-[20px] w-16 h-16 top-0 left-0 shadow-xl border border-white/30 transform -rotate-6" />
              <div className="relative w-16 h-16 flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2 hover:bg-[#58d674]/20 rounded-[12px] transition-all duration-200 hover:scale-110">
                      <Shield className="size-5 text-[#58d674]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-[20px]">
                    <div className="px-3 py-2 text-sm font-medium text-gray-900 border-b border-gray-200/50 rounded-t-[20px] bg-[#58d674]/5">
                      관리자 메뉴
                    </div>
                    <DropdownMenuItem onClick={() => onNavigate('admin')} className="rounded-[12px] hover:bg-[#58d674]/10">
                      <Shield className="mr-2 h-4 w-4" />
                      관리자 대시보드
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-[12px] hover:bg-[#58d674]/10">
                      <Settings className="mr-2 h-4 w-4" />
                      시스템 설정
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200/50" />
                    <DropdownMenuItem onClick={() => onNavigate('main')} className="rounded-[12px] hover:bg-blue-50">
                      <Home className="mr-2 h-4 w-4" />
                      메인 페이지로
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200/50" />
                    <DropdownMenuItem className="rounded-[12px] hover:bg-red-50 text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

function AdminNavItem({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div className="relative">
      <div className="absolute bg-white/80 backdrop-blur-md rounded-[20px] w-32 h-16 top-0 left-1/2 transform -translate-x-1/2 shadow-lg border border-white/30" />
      <div className="relative px-6 py-3 text-center">
        <Button 
          variant="ghost" 
          onClick={onClick}
          className={`text-sm font-medium p-2 h-auto rounded-[12px] transition-all duration-200 ${
            active 
              ? 'text-[#58d674] bg-[#58d674]/20 shadow-lg transform scale-105' 
              : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
          }`}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}