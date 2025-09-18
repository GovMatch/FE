import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { 
  AlertTriangle, 
  Calendar, 
  Building2, 
  X,
  Eye,
  ExternalLink
} from "lucide-react";

interface UrgentProgram {
  id: string;
  title: string;
  organization: string;
  deadline: string;
  daysLeft: number;
  budget: string;
  category: string;
  applicants: number;
  maxApplicants?: number;
}

interface UrgentNotificationBannerProps {
  onNavigate?: (page: string) => void;
}

export function UrgentNotificationBanner({ onNavigate }: UrgentNotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // 10일 내 마감되는 지원사업 데이터
  const urgentPrograms: UrgentProgram[] = [
    {
      id: "1",
      title: "AI 융합 얼라이언스 프로젝트",
      organization: "과학기술정보통신부", 
      deadline: "2024.12.28",
      daysLeft: 3,
      budget: "5천만원",
      category: "기술혁신",
      applicants: 156,
      maxApplicants: 200
    },
    {
      id: "2", 
      title: "청년창업사관학교 14기",
      organization: "창업진흥원",
      deadline: "2024.12.31", 
      daysLeft: 6,
      budget: "1억원",
      category: "창업지원",
      applicants: 89,
      maxApplicants: 150
    },
    {
      id: "3",
      title: "K-글로벌 스타트업 육성",
      organization: "중소벤처기업부",
      deadline: "2025.01.02",
      daysLeft: 8,
      budget: "3억원", 
      category: "글로벌진출",
      applicants: 234,
      maxApplicants: 300
    },
    {
      id: "4",
      title: "소부장 기술개발 R&D",
      organization: "산업통상자원부",
      deadline: "2025.01.03",
      daysLeft: 9,
      budget: "10억원",
      category: "R&D",
      applicants: 67,
      maxApplicants: 100
    },
    {
      id: "5",
      title: "디지털뉴딜 혁신바우처",
      organization: "과학기술정보통신부",
      deadline: "2025.01.04",
      daysLeft: 10,
      budget: "2천만원",
      category: "디지털혁신", 
      applicants: 145,
      maxApplicants: 200
    },
    {
      id: "6",
      title: "스마트공장 고도화 사업",
      organization: "중소벤처기업부",
      deadline: "2025.01.05",
      daysLeft: 10,
      budget: "5천만원",
      category: "제조혁신",
      applicants: 78,
      maxApplicants: 120
    },
    {
      id: "7",
      title: "ESG 경영혁신 지원사업",
      organization: "중소벤처기업부",
      deadline: "2025.01.06",
      daysLeft: 10,
      budget: "3천만원", 
      category: "ESG",
      applicants: 92,
      maxApplicants: 150
    },
    {
      id: "8",
      title: "혁신형 소상공인 육성",
      organization: "소상공인시장진흥공단",
      deadline: "2025.01.07",
      daysLeft: 10,
      budget: "1천만원",
      category: "소상공인",
      applicants: 123,
      maxApplicants: 200
    }
  ];

  // 마감이 임박한 순으로 정렬
  const sortedPrograms = [...urgentPrograms].sort((a, b) => a.daysLeft - b.daysLeft);

  if (!isVisible) return null;

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 3) return "text-red-600";
    if (daysLeft <= 7) return "text-orange-600"; 
    return "text-yellow-600";
  };

  const getDaysLeftBg = (daysLeft: number) => {
    if (daysLeft <= 3) return "bg-red-50 border-red-200";
    if (daysLeft <= 7) return "bg-orange-50 border-orange-200";
    return "bg-yellow-50 border-yellow-200";
  };

  return (
    <div className="relative mb-6 w-full">
      {/* Geometric background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-50/80 via-orange-50/60 to-yellow-50/80 rounded-[30px] transform -skew-x-1" />
      
      <Card className="relative border-0 shadow-2xl bg-white/90 rounded-[30px] overflow-hidden">
        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />
        
        <CardHeader className="pb-3 relative">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-red-600">
              <div className="p-2 bg-red-100 rounded-[15px] transform rotate-12">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                🚨 긴급 마감 알림 (10일 이내)
              </span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 p-0 hover:bg-red-50 rounded-[12px]"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-700 mt-2 font-medium">
            마감이 임박한 정부지원사업 {urgentPrograms.length}개를 놓치지 마세요!
          </p>
        </CardHeader>
      <CardContent className="p-6 pt-0 overflow-hidden">
        <div className="w-full h-80 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pr-4 pb-4">
              {sortedPrograms.map((program) => (
              <div
                key={program.id}
                className={`p-4 rounded-[20px] border-0 transition-all hover:shadow-xl hover:scale-105 bg-white/80 shadow-lg transform hover:-rotate-1 ${getDaysLeftBg(program.daysLeft)}`}
                style={{ 
                  background: `linear-gradient(135deg, ${
                    program.daysLeft <= 3 ? 'rgba(252, 165, 165, 0.3)' :
                    program.daysLeft <= 7 ? 'rgba(253, 186, 116, 0.3)' :
                    'rgba(254, 240, 138, 0.3)'
                  }, rgba(255, 255, 255, 0.8))`
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    variant="destructive" 
                    className={`${getDaysLeftColor(program.daysLeft)} bg-white/80 border-0 text-xs font-medium rounded-[12px] shadow-md`}
                  >
                    D-{program.daysLeft}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/60 rounded-[8px]">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/60 rounded-[8px]">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <h4 className="font-medium text-sm mb-2 leading-tight overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {program.title}
                </h4>
                
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span className="truncate">{program.organization}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{program.deadline}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#58d674]">{program.budget}</span>
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-white/60 border-0 rounded-[8px]">
                      {program.category}
                    </Badge>
                  </div>
                  
                  {program.maxApplicants && (
                    <div className="flex items-center justify-between text-xs">
                      <span>신청자</span>
                      <span className={program.applicants / program.maxApplicants > 0.8 ? "text-red-600 font-medium" : "text-gray-500"}>
                        {program.applicants}/{program.maxApplicants}
                      </span>
                    </div>
                  )}
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full mt-3 h-8 text-xs bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-0 rounded-[12px] shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={() => onNavigate?.('matching')}
                >
                  긴급 매칭 분석
                </Button>
              </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      </Card>
    </div>
  );
}