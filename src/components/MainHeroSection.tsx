import { Button } from "./ui/button";
import { ArrowRight, Target, Search, Zap, Building2, Calendar, TrendingUp, LogIn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useAuth } from "./AuthContext";
import type { PageType } from "./Router";

interface MainHeroSectionProps {
  onNavigate: (page: PageType, programId?: string) => void;
}

export function MainHeroSection({ onNavigate }: MainHeroSectionProps) {
  const { user } = useAuth();
  
  const stats = [
    { label: "매칭 가능 지원사업", value: "127개", icon: Target },
    { label: "이번 주 신규 등록", value: "15개", icon: Zap },
    { label: "마감 임박 (D-7)", value: "8개", icon: Search }
  ];

  // 사용자별 매칭 정보 (로그인 시에만 표시)
  const userMatchingData = {
    totalMatches: 12,
    highProbability: 5,
    recentlyAdded: 3,
    endingSoon: 2,
    programs: [
      {
        id: "1",
        title: "AI 융합 얼라이언스 프로젝트",
        organization: "과학기술정보통신부",
        probability: 92,
        deadline: "2024.12.28",
        budget: "5천만원",
        status: "high"
      },
      {
        id: "2", 
        title: "청년창업사관학교 14기",
        organization: "창업진흥원",
        probability: 87,
        deadline: "2024.12.31",
        budget: "1억원",
        status: "high"
      },
      {
        id: "3",
        title: "K-글로벌 스타트업 육성",
        organization: "중소벤처기업부", 
        probability: 74,
        deadline: "2025.01.02",
        budget: "3억원",
        status: "medium"
      }
    ]
  };

  return (
    <section className="relative py-8 sm:py-12 lg:py-20 px-2 sm:px-4 lg:px-8">
      <div className="w-full lg:max-w-7xl lg:mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          {/* Main Title with geometric overlay */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-20 sm:h-32 bg-gradient-to-r from-[#58d674]/10 via-[#58d674]/5 to-[#58d674]/10 rounded-[30px] sm:rounded-[60px] blur-xl -skew-x-3" />
            <h1 className="relative text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6 sm:mb-8">
              <span className="block text-gray-800">맞춤형 정부지원사업을</span>
              <span className="block">
                <span className="bg-gradient-to-r from-[#58d674] via-[#45c762] to-[#58d674] bg-clip-text text-transparent">
                  AI가 찾아드립니다
                </span>
              </span>
            </h1>
          </div>

          {/* Subtitle with glass effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-[20px] sm:rounded-[30px] transform skew-x-1" />
            <p className="relative text-base sm:text-lg lg:text-xl text-gray-700 py-4 sm:py-6 px-4 sm:px-8 max-w-4xl mx-auto font-medium leading-relaxed">
              기업의 특성을 분석하여 실제 지원 가능한 사업만 정확하게 매칭하고,
              <br className="hidden sm:block" />선정 가능성까지 예측해드리는 스마트한 매칭 서비스
            </p>
          </div>

          {/* Quick Stats with geometric design and floating animation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-8 sm:mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="relative group"
                style={{
                  animation: `float-${index + 1} 6s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`
                }}
              >
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-[20px] sm:rounded-[30px] shadow-2xl border border-white/30 transform transition-all duration-300 group-hover:scale-105" />
                <Card className="relative bg-transparent border-0 transform transition-all duration-300 group-hover:-rotate-1">
                  <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-[20px] sm:rounded-[25px] mb-3 sm:mb-6 transform transition-all duration-300 group-hover:scale-110 ${
                      index === 0 
                        ? 'bg-gradient-to-br from-[#58d674]/20 to-[#45c762]/10' 
                        : index === 1 
                        ? 'bg-gradient-to-br from-blue-500/20 to-blue-400/10' 
                        : 'bg-gradient-to-br from-purple-500/20 to-purple-400/10'
                    }`}>
                      <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${
                        index === 0 
                          ? 'text-[#58d674]' 
                          : index === 1 
                          ? 'text-blue-500' 
                          : 'text-purple-500'
                      }`} />
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>



          {/* CTA Buttons with geometric design */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="relative group w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#58d674] to-[#45c762] rounded-[20px] sm:rounded-[25px] blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 transform scale-110" />
              <Button 
                size="lg" 
                onClick={() => onNavigate('matching')}
                className="relative bg-gradient-to-r from-[#58d674] to-[#45c762] hover:from-[#4bc961] hover:to-[#3bb356] text-white px-6 sm:px-10 py-3 sm:py-5 rounded-[20px] sm:rounded-[25px] shadow-2xl font-semibold w-full sm:min-w-[220px] border-0 transform transition-all duration-300 hover:scale-105 hover:-rotate-1 text-sm sm:text-base"
              >
                무료 매칭 시작하기
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-6 sm:h-6" />
              </Button>
            </div>
            <div className="relative group w-full sm:w-auto">
              <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-[20px] sm:rounded-[25px] shadow-xl border border-white/30 transform rotate-1" />
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => onNavigate('main')}
                className="relative bg-transparent hover:bg-white/50 text-gray-700 border-0 px-6 sm:px-10 py-3 sm:py-5 rounded-[20px] sm:rounded-[25px] font-semibold w-full sm:min-w-[220px] transform transition-all duration-300 hover:scale-105 hover:rotate-1 text-sm sm:text-base"
              >
                지원사업 둘러보기
              </Button>
            </div>
          </div>
        </div>

        {/* 나의 매칭정보 섹션 */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/70 backdrop-blur-md rounded-[20px] sm:rounded-[40px] shadow-2xl border border-white/30 transform -skew-x-1" />
            <Card className="relative bg-transparent border-0">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-gray-800 text-base sm:text-lg lg:text-xl">
                <div className="p-1.5 sm:p-2 bg-[#58d674]/20 rounded-[12px] sm:rounded-[15px] transform rotate-12">
                  <Target className="w-4 h-4 sm:w-6 sm:h-6 text-[#58d674]" />
                </div>
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  나의 매칭정보
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              {user ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* 매칭 통계 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#58d674] mb-1">{userMatchingData.totalMatches}</div>
                      <div className="text-xs sm:text-sm text-gray-600">총 매칭</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-1">{userMatchingData.highProbability}</div>
                      <div className="text-xs sm:text-sm text-gray-600">고확률</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 mb-1">{userMatchingData.recentlyAdded}</div>
                      <div className="text-xs sm:text-sm text-gray-600">신규 추가</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 mb-1">{userMatchingData.endingSoon}</div>
                      <div className="text-xs sm:text-sm text-gray-600">마감 임박</div>
                    </div>
                  </div>

                  {/* 추천 매칭 프로그램 */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 text-sm sm:text-base">추천 매칭 프로그램</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {userMatchingData.programs.map((program) => (
                        <div key={program.id} className="relative p-3 sm:p-4 lg:p-5 bg-white/60 backdrop-blur-sm rounded-[15px] sm:rounded-[20px] hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/30 transform hover:-rotate-1">
                          <div className="flex items-start justify-between mb-2">
                            <Badge 
                              variant={program.status === 'high' ? 'default' : 'secondary'}
                              className={`text-xs ${program.status === 'high' ? 'bg-[#58d674] hover:bg-[#4bc961]' : ''}`}
                            >
                              {program.probability}%
                            </Badge>
                          </div>
                          
                          <h5 className="font-medium text-xs sm:text-sm mb-2 leading-tight line-clamp-2">
                            {program.title}
                          </h5>
                          
                          <div className="space-y-1 sm:space-y-1.5 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{program.organization}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 flex-shrink-0" />
                              <span>{program.deadline}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-[#58d674] text-xs">{program.budget}</span>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                <span className="text-xs">{program.probability}%</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="w-full mt-2 sm:mt-3 h-6 sm:h-7 text-xs bg-[#58d674] hover:bg-[#4bc961]"
                            onClick={() => onNavigate('program-detail')}
                          >
                            상세보기
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 더보기 버튼 */}
                  <div className="text-center">
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate('mypage')}
                      className="px-4 sm:px-6 text-sm sm:text-base h-9 sm:h-10"
                    >
                      전체 매칭정보 보기
                      <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <LogIn className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
                  <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">로그인이 필요합니다</h4>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm px-4">
                    로그인 후 맞춤형 매칭정보를 확인하실 수 있습니다.
                  </p>
                  <Button 
                    onClick={() => onNavigate('login')}
                    className="bg-[#58d674] hover:bg-[#4bc961] text-white text-sm sm:text-base h-9 sm:h-10 px-4 sm:px-6"
                  >
                    로그인하기
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Alert with geometric design */}
        <div className="relative mt-8 sm:mt-12">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100/60 via-red-100/40 to-orange-100/60 backdrop-blur-sm rounded-[20px] sm:rounded-[30px] transform skew-x-2" />
          <div className="relative bg-gradient-to-r from-orange-50/80 to-red-50/80 backdrop-blur-md border border-orange-200/50 rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 lg:p-8 text-center shadow-xl">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse mr-2 sm:mr-3 shadow-lg"></div>
              <span className="font-bold text-orange-800 text-base sm:text-lg">긴급 알림</span>
            </div>
            <p className="text-orange-700 text-sm sm:text-base lg:text-lg font-medium px-2">
              <span className="font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">8개 지원사업</span>이 일주일 내 마감됩니다. 
              지금 확인하고 놓치지 마세요!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}