import { SupportProgramCard } from "./SupportProgramCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";
import { useState } from "react";

interface SupportProgramsSectionProps {
  onNavigate?: (page: string) => void;
}

export function SupportProgramsSection({ onNavigate }: SupportProgramsSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const supportPrograms = [
    {
      id: "1",
      title: "2024년 청년창업사관학교 14기 모집",
      organization: "창업진흥원",
      category: "창업지원",
      amount: "최대 1억원",
      deadline: "2024.12.31",
      daysLeft: 5,
      description: "예비창업자 및 창업 3년 이내 기업을 대상으로 체계적인 창업교육과 사업화 자금을 지원하여 성공적인 창업 생태계 조성을 목표로 합니다.",
      requirements: ["만 39세 이하", "사업자등록", "창업 3년 이내"],
      matchScore: 92,
      applicants: 156,
      maxApplicants: 200,
      status: "deadline-soon" as const
    },
    {
      id: "2", 
      title: "AI 융합 얼라이언스 프로젝트 지원사업",
      organization: "과학기술정보통신부",
      category: "기술혁신",
      amount: "최대 5천만원",
      deadline: "2024.12.28",
      daysLeft: 3,
      description: "AI 기술을 활용한 융합 서비스 개발 및 상용화를 지원하여 AI 생태계 활성화와 디지털 전환을 촉진하는 사업입니다.",
      requirements: ["AI 기술보유", "3년 이상 업력", "기술인증서"],
      matchScore: 87,
      applicants: 89,
      maxApplicants: 100,
      status: "deadline-soon" as const
    },
    {
      id: "3",
      title: "스마트제조 혁신바우처 지원사업",
      organization: "중소벤처기업부",
      category: "제조혁신",
      amount: "최대 2천만원",
      deadline: "2025.01.15",
      daysLeft: 18,
      description: "제조업체의 스마트팩토리 구축 및 디지털 전환을 위한 컨설팅, 솔루션 도입비용을 지원하는 바우처 방식의 지원사업입니다.",
      requirements: ["제조업", "직원 10명 이상", "매출 10억 이상"],
      matchScore: 78,
      applicants: 234,
      maxApplicants: 300,
      status: "active" as const
    },
    {
      id: "4",
      title: "글로벌 K-스타트업 육성사업",
      organization: "창업진흥원",
      category: "글로벌",
      amount: "최대 3억원",
      deadline: "2025.01.31",
      daysLeft: 35,
      description: "국내 유망 스타트업의 해외진출을 체계적으로 지원하여 글로벌 시장에서 경쟁력을 갖춘 K-스타트업으로 성장시키는 것이 목표입니다.",
      requirements: ["스타트업", "해외진출 계획", "영어 가능"],
      applicants: 67,
      maxApplicants: 150,
      status: "active" as const
    },
    {
      id: "5",
      title: "소부장 기술개발사업 R&D 지원",
      organization: "산업통상자원부",
      category: "R&D",
      amount: "최대 10억원",
      deadline: "2025.02.14",
      daysLeft: 48,
      description: "소재·부품·장비 분야의 핵심기술 개발을 통해 기술자립도를 높이고 산업경쟁력을 강화하는 대규모 R&D 지원사업입니다.",
      requirements: ["제조업", "R&D 조직", "특허 보유"],
      matchScore: 65,
      applicants: 45,
      maxApplicants: 80,
      status: "active" as const
    },
    {
      id: "6",
      title: "여성기업 디지털 전환 지원사업",
      organization: "여성기업종합지원센터",
      category: "디지털 전환",
      amount: "최대 3천만원",
      deadline: "2025.01.20",
      daysLeft: 23,
      description: "여성기업의 디지털 역량 강화와 온라인 비즈니스 모델 구축을 지원하여 포스트 코로나 시대 경쟁력을 제고합니다.",
      requirements: ["여성기업", "디지털화 계획", "업력 1년 이상"],
      applicants: 123,
      maxApplicants: 200,
      status: "active" as const
    }
  ];

  return (
    <section className="py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-8">
      <div className="w-full lg:max-w-7xl lg:mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              매칭 가능한 정부지원사업
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              총 <span className="font-bold text-[#58d674]">{supportPrograms.length}개</span>의 지원사업이 매칭되었습니다
            </p>
          </div>

          {/* View Controls - 모바일에서는 숨김 */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Programs Grid */}
        <div className={`grid gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {supportPrograms.map((program) => (
            <SupportProgramCard key={program.id} {...program} onNavigate={onNavigate} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <Button variant="outline" size="sm" className="px-2 sm:px-3 text-xs sm:text-sm h-8 sm:h-9">
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden sm:inline">이전</span>
          </Button>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className="w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button variant="outline" size="sm" className="px-2 sm:px-3 text-xs sm:text-sm h-8 sm:h-9">
            <span className="hidden sm:inline">다음</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}