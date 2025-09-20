import { SupportProgramCard } from "./SupportProgramCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";
import { useState, useEffect } from "react";

interface SupportProgramsSectionProps {
  onNavigate?: (page: string, programId?: string) => void;
}

interface ApiProgramData {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  // 실제 API 응답에 따라 추가될 수 있는 필드들
  [key: string]: any;
}

interface ProgramData {
  id: string;
  title: string;
  organization: string;
  category: string;
  amount: string;
  deadline: string;
  daysLeft: number;
  description: string;
  requirements: string[];
  matchScore?: number;
  applicants: number;
  maxApplicants: number;
  status: "deadline-soon" | "active" | "upcoming";
}

interface ProgramsResponse {
  programs: ApiProgramData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API 데이터를 UI 컴포넌트용 데이터로 변환
const transformApiData = (apiData: ApiProgramData): ProgramData => {
  return {
    id: apiData.id,
    title: apiData.title,
    organization: apiData.organization || "정부기관", // 기본값
    category: apiData.categoryLabel || apiData.category,
    amount: apiData.amount || "지원금액 미정",
    deadline: apiData.deadline || "마감일 미정",
    daysLeft: apiData.daysLeft || 0,
    description: apiData.description,
    requirements: apiData.requirements || [],
    matchScore: apiData.matchScore,
    applicants: apiData.applicants || 0,
    maxApplicants: apiData.maxApplicants || 100,
    status: apiData.status || "active"
  };
};

export function SupportProgramsSection({ onNavigate }: SupportProgramsSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [supportPrograms, setSupportPrograms] = useState<ProgramData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      // 환경변수 확인
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      if (!apiBaseUrl) {
        throw new Error('API_BASE_URL이 설정되지 않았습니다.');
      }

      // API 요청 파라미터 구성
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6',
        sortBy: 'deadline',
        sortOrder: 'asc',
        activeOnly: 'true'
      });

      const response = await fetch(`${apiBaseUrl}/api/programs?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProgramsResponse = await response.json();

      // 디버깅을 위한 로그
      console.log('API Response:', data);
      console.log('Data.programs type:', typeof data.programs);
      console.log('Data.programs isArray:', Array.isArray(data.programs));
      console.log('Data.programs content:', data.programs);
      console.log('First program structure:', data.programs?.[0]);

      // 응답 데이터를 UI 컴포넌트용 형태로 변환
      const transformedPrograms = Array.isArray(data.programs)
        ? data.programs.map(transformApiData)
        : [];

      setSupportPrograms(transformedPrograms);
      setTotalCount(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.page || 1);

    } catch (err) {
      console.error('Failed to fetch programs:', err);
      setError('지원사업 정보를 불러오는데 실패했습니다.');

      // 에러 발생 시 빈 배열로 초기화
      setSupportPrograms([]);
      setTotalCount(0);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchPrograms(page);
    }
  };

  return (
    <section className="py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-8">
      <div className="w-full lg:max-w-7xl lg:mx-auto">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#58d674]"></div>
            <span className="ml-2 text-gray-600">지원사업 정보를 불러오는 중...</span>
          </div>
        )}

        {/* Section Header */}
        {!isLoading && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                매칭 가능한 정부지원사업
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                총 <span className="font-bold text-[#58d674]">{totalCount}개</span>의 지원사업이 매칭되었습니다
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
        )}

        {/* Programs Grid */}
        {!isLoading && supportPrograms && supportPrograms.length > 0 && (
          <div className={`grid gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 ${
            viewMode === "grid"
              ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}>
            {supportPrograms.map((program) => (
              <SupportProgramCard key={program?.id || Math.random()} {...program} onNavigate={onNavigate} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && supportPrograms && supportPrograms.length === 0 && !error && (
          <div className="text-center py-8">
            <p className="text-gray-600">매칭된 지원사업이 없습니다.</p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              className="px-2 sm:px-3 text-xs sm:text-sm h-8 sm:h-9"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">이전</span>
            </Button>

            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    className="w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="px-2 sm:px-3 text-xs sm:text-sm h-8 sm:h-9"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <span className="hidden sm:inline">다음</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}