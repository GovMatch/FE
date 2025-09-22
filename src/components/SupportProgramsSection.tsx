import { SupportProgramCard } from "./SupportProgramCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";
import { useState, useEffect } from "react";

interface SupportProgramsSectionProps {
  onNavigate?: (page: string, programId?: string) => void;
  activeFilter?: string | null;
  selectedField?: string | null;
  searchTerm?: string | null;
  onStatsUpdate?: (totalPrograms: number, deadlineSoonCount: number) => void;
  onFilteredCountUpdate?: (count: number) => void;
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
  categoryCode?: string; // 필터링용 카테고리 코드
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
    category: apiData.categoryLabel || apiData.category, // UI에서 표시할 때는 라벨 사용
    amount: apiData.amount || "지원금액 미정",
    deadline: apiData.deadline || "마감일 미정",
    daysLeft: apiData.daysLeft || 0,
    description: apiData.description,
    requirements: apiData.requirements || [],
    matchScore: apiData.matchScore,
    applicants: apiData.applicants || 0,
    maxApplicants: apiData.maxApplicants || 100,
    status: apiData.status || "active",
    // 필터링을 위해 원본 카테고리 코드도 보존
    categoryCode: apiData.category
  };
};

export function SupportProgramsSection({ onNavigate, activeFilter, selectedField, searchTerm, onStatsUpdate, onFilteredCountUpdate }: SupportProgramsSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [supportPrograms, setSupportPrograms] = useState<ProgramData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrgentCount = async (): Promise<number> => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      if (!apiBaseUrl) return 0;

      const response = await fetch(`${apiBaseUrl}/api/programs/urgent`);
      if (!response.ok) return 0;

      const data = await response.json();
      return data.programs?.length || 0;
    } catch (error) {
      console.error('마감 임박 개수 조회 실패:', error);
      return 0;
    }
  };

  const fetchPrograms = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      // 환경변수 확인
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      if (!apiBaseUrl) {
        throw new Error('API_BASE_URL이 설정되지 않았습니다.');
      }

      let response;

      if (activeFilter === 'deadline-soon') {
        // 마감 임박 필터일 때는 전용 엔드포인트 사용
        response = await fetch(`${apiBaseUrl}/api/programs/urgent`);
      } else if (searchTerm) {
        // 검색어가 있는 경우 검색 엔드포인트 사용
        response = await fetch(`${apiBaseUrl}/api/programs?search=${encodeURIComponent(searchTerm)}&limit=50`);
      } else {
        // 일반 필터일 때는 기존 엔드포인트 사용
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '6',
          sortBy: 'deadline',
          sortOrder: 'asc'
        });

        // 지원 분야 필터가 선택된 경우 추가 파라미터
        if (selectedField) {
          params.append('category', selectedField);
        }

        response = await fetch(`${apiBaseUrl}/api/programs?${params}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProgramsResponse = await response.json();


      // 응답 데이터를 UI 컴포넌트용 형태로 변환
      let transformedPrograms = Array.isArray(data.programs)
        ? data.programs.map(transformApiData)
        : [];


      // 지원 분야 필터링 (클라이언트 사이드)
      if (selectedField) {
        transformedPrograms = transformedPrograms.filter((program) => {
          // categoryCode(원본 코드)로 필터링
          return program.categoryCode === selectedField;
        });
      }

      if (activeFilter === 'deadline-soon' || searchTerm) {
        // 마감 임박 필터나 검색일 때는 클라이언트에서 페이징 처리
        const totalFiltered = transformedPrograms.length;
        const itemsPerPage = 6;
        const totalPagesFiltered = Math.ceil(totalFiltered / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        setSupportPrograms(transformedPrograms.slice(startIndex, endIndex));
        setTotalCount(totalFiltered);
        setTotalPages(totalPagesFiltered);
        setCurrentPage(page);
      } else {
        setSupportPrograms(transformedPrograms);
        setTotalCount(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.page || 1);
      }

      // 통계 데이터를 MainPage로 전달 (필터가 적용되지 않은 원본 데이터 기준)
      if (onStatsUpdate && !activeFilter && !selectedField && !searchTerm) {
        // 마감 임박 개수를 별도로 가져오기
        fetchUrgentCount().then(urgentCount => {
          onStatsUpdate(data.total || 0, urgentCount);
        });
      }

      // 필터링된 결과의 개수를 MainPage로 전달
      if (onFilteredCountUpdate) {
        if (activeFilter === 'deadline-soon' || searchTerm) {
          // 마감 임박 필터나 검색일 때는 전체 개수 전달 (페이징 전)
          const allFilteredPrograms = Array.isArray(data.programs)
            ? data.programs.map(transformApiData)
            : [];

          const finalCount = selectedField
            ? allFilteredPrograms.filter(program => program.categoryCode === selectedField).length
            : allFilteredPrograms.length;

          onFilteredCountUpdate(finalCount);
        } else {
          onFilteredCountUpdate(transformedPrograms.length);
        }
      }

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
  }, [activeFilter, selectedField, searchTerm]);

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