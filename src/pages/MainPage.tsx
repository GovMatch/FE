import { Header } from "../components/Header";
import { MainHeroSection } from "../components/MainHeroSection";
import { UrgentNotificationBanner } from "../components/UrgentNotificationBanner";
import { VoucherSection } from "../components/VoucherSection";
import { VoucherRecommendation } from "../components/VoucherRecommendation";
import { SearchAndFilter } from "../components/SearchAndFilter";
import { SupportProgramsSection } from "../components/SupportProgramsSection";
import { ProcessSection } from "../components/ProcessSection";
import { PromoCodeInput } from "../components/PromoCodeInput";

import { Footer } from "../components/Footer";
import type { PageType } from "../components/Router";
import { imgGroup47242, imgGroup47243 } from "../imports/svg-gjy2d";

interface MainPageProps {
  onNavigate: (page: PageType, programId?: string) => void;
}

export function MainPage({ onNavigate }: MainPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-x-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* Main geometric shape */}
        <div className="absolute h-[600px] left-0 top-20 w-full">
          <img 
            className="block max-w-none size-full object-cover" 
            src={imgGroup47242}
            alt="기하학적 배경 패턴"
            style={{ 
              transform: 'skew(-5deg) scale(1.1)',
              filter: 'hue-rotate(120deg) saturate(0.3)'
            }}
          />
        </div>
        
        {/* Accent lines */}
        <div className="absolute inset-[5%_85%_20%_5%]">
          <img 
            className="block max-w-none size-full object-cover opacity-60" 
            src={imgGroup47243}
            alt="업센트 라인"
            style={{ 
              transform: 'rotate(-5deg)',
              filter: 'hue-rotate(120deg) saturate(0.5)'
            }}
          />
        </div>
        
        {/* Additional geometric elements */}
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-[#58d674]/20 to-[#58d674]/5 rounded-[50px] transform rotate-12 blur-sm" />
        <div className="absolute top-96 left-32 w-24 h-24 bg-gradient-to-tl from-blue-200/30 to-blue-100/10 rounded-[40px] transform -rotate-12" />
        <div className="absolute bottom-40 right-40 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-purple-100/5 rounded-[60px] transform rotate-45" />
      </div>

      {/* Floating geometric cards */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-32 left-16 w-20 h-20 bg-white/60 backdrop-blur-sm rounded-[30px] transform rotate-12 shadow-lg" />
        <div className="absolute top-80 right-24 w-16 h-16 bg-[#58d674]/20 backdrop-blur-sm rounded-[25px] transform -rotate-12 shadow-md" />
        <div className="absolute bottom-60 left-20 w-24 h-24 bg-blue-100/40 backdrop-blur-sm rounded-[35px] transform rotate-45 shadow-lg" />
      </div>

      {/* Content overlay with glass effect */}
      <div className="relative z-10">
        <Header onNavigate={onNavigate} />
        
        {/* Hero section with enhanced background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-sm" />
          <div className="relative z-10">
            <MainHeroSection onNavigate={onNavigate} />
          </div>
        </div>
        
        {/* Main content with glass cards */}
        <div className="w-full px-2 sm:px-4 lg:px-8 lg:max-w-7xl lg:mx-auto relative">
          <div className="bg-white/70 backdrop-blur-md rounded-[20px] sm:rounded-[40px] p-4 sm:p-6 lg:p-8 shadow-xl border border-white/30 mb-4 sm:mb-8">
            <UrgentNotificationBanner onNavigate={onNavigate} />
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-[20px] sm:rounded-[40px] p-4 sm:p-6 lg:p-8 shadow-xl border border-white/30 mb-4 sm:mb-8">
            <VoucherSection onNavigate={onNavigate} />
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-[20px] sm:rounded-[40px] p-4 sm:p-6 lg:p-8 shadow-xl border border-white/30 mb-4 sm:mb-8">
            <VoucherRecommendation onNavigate={onNavigate} />
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-[20px] sm:rounded-[40px] p-4 sm:p-6 lg:p-8 shadow-xl border border-white/30 mb-4 sm:mb-8">
            <SearchAndFilter />
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-[20px] sm:rounded-[40px] p-4 sm:p-6 lg:p-8 shadow-xl border border-white/30 mb-4 sm:mb-8">
            <SupportProgramsSection onNavigate={onNavigate} />
          </div>
        </div>
        
        {/* Process section with geometric overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80" />
          <div className="relative z-10">
            <ProcessSection />
          </div>
        </div>
        
        {/* Promotion Code Section */}
        <div className="py-8 sm:py-16 px-2 sm:px-4">
          <div className="w-full sm:max-w-4xl sm:mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                특별 혜택을 놓치지 마세요
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
                프로모션 코드를 입력하고 정부지원사업 매칭 서비스를 더욱 저렴하게 이용하세요
              </p>
            </div>
            
            <div className="w-full sm:max-w-2xl sm:mx-auto px-2">
              <PromoCodeInput />
            </div>
          </div>
        </div>
        
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
}