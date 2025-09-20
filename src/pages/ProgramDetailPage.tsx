import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { 
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Star,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
  Award,
  TrendingUp
} from "lucide-react";
import type { PageType } from "../components/Router";

interface ProgramDetailPageProps {
  onNavigate: (page: PageType, programId?: string) => void;
  programId?: string;
}

interface ApiProgramDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  target: string;
  amountMin: number | null;
  amountMax: number | null;
  supportRate: number | null;
  region: string | null;
  deadline: string;
  daysLeft: number;
  applicationUrl: string;
  attachmentUrl: string | null;
  tags: string[];
  provider: {
    id: string;
    name: string;
    type: string;
    contact: string;
    website: string | null;
  };
  createdAt: string;
}

export function ProgramDetailPage({ onNavigate, programId }: ProgramDetailPageProps) {
  const [programData, setProgramData] = useState<ApiProgramDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgramDetail = async () => {
      if (!programId) {
        setError('프로그램 ID가 제공되지 않았습니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        if (!apiBaseUrl) {
          throw new Error('VITE_API_BASE_URL이 설정되지 않았습니다.');
        }

        const response = await fetch(`${apiBaseUrl}/api/programs/${programId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiProgramDetail = await response.json();
        setProgramData(data);
      } catch (err) {
        console.error('Failed to fetch program detail:', err);
        setError('프로그램 상세 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgramDetail();
  }, [programId]);

  // API 데이터를 UI 컴포넌트용 데이터로 변환하는 함수
  const getDisplayData = () => {
    if (!programData) return null;

    const formatAmount = () => {
      if (programData.amountMin && programData.amountMax) {
        return `${programData.amountMin.toLocaleString()}원 ~ ${programData.amountMax.toLocaleString()}원`;
      } else if (programData.amountMax) {
        return `최대 ${programData.amountMax.toLocaleString()}원`;
      } else if (programData.amountMin) {
        return `최소 ${programData.amountMin.toLocaleString()}원`;
      }
      return "지원금액 정보 없음";
    };

    const formatDeadline = () => {
      if (programData.deadline) {
        return new Date(programData.deadline).toLocaleDateString('ko-KR');
      }
      return "마감일 정보 없음";
    };

    return {
      ...programData,
      amount: formatAmount(),
      deadline: formatDeadline(),
      organization: programData.provider?.name || "정보 없음",
      category: programData.categoryLabel || programData.category || "정보 없음",
      description: programData.description || "설명 정보 없음",
      tags: programData.tags || [],
      contact: {
        department: programData.provider?.name || "정보 없음",
        phone: programData.provider?.contact || "정보 없음",
        email: "정보 없음",
        website: programData.provider?.website || "정보 없음",
        address: "정보 없음"
      }
    };
  };

  const displayData = getDisplayData();

  // API에서 가져온 실제 데이터가 없을 때 대비한 기본 정보
  const getDefaultSupportContent = () => [
    "상세 지원 내용 정보 없음"
  ];

  const getDefaultRequirements = () => [
    "신청 자격 정보 없음"
  ];

  const getDefaultProcess = () => [
    "신청 절차 정보 없음"
  ];

  const getDefaultCriteria = () => [
    { criteria: "선정 기준 정보 없음", weight: "-" }
  ];

  const getDefaultDocuments = () => [
    "제출 서류 정보 없음"
  ];

  const getDefaultSchedule = () => [
    { phase: "일정 정보 없음", period: "-" }
  ];

  const getStatusBadge = () => {
    if (!displayData) return <Badge variant="secondary">정보 없음</Badge>;

    const daysLeft = displayData.daysLeft;
    if (daysLeft <= 3) {
      return <Badge variant="destructive">마감임박</Badge>;
    } else if (daysLeft <= 7) {
      return <Badge variant="destructive">마감임박</Badge>;
    } else {
      return <Badge variant="default" className="bg-blue-100 text-blue-700">접수중</Badge>;
    }
  };

  const getUrgencyColor = () => {
    if (!displayData) return "text-gray-600";
    if (displayData.daysLeft <= 3) return "text-red-600";
    if (displayData.daysLeft <= 7) return "text-orange-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onNavigate={onNavigate} />

      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 뒤로가기 버튼 */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => onNavigate('main')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로 돌아가기
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">데이터를 불러올 수 없습니다</h3>
              <p className="text-red-600">{error}</p>
              <Button
                variant="outline"
                onClick={() => onNavigate('main')}
                className="mt-4"
              >
                뒤로 가기
              </Button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58d674] mb-4"></div>
              <p className="text-gray-600">지원사업 상세 정보를 불러오는 중...</p>
            </div>
          )}

          {/* 콘텐츠는 데이터가 있고 로딩이 아닐 때만 표시 */}
          {!isLoading && !error && displayData && (
            <>
          {/* 프로그램 헤더 */}
          <Card className="mb-8 bg-white/80 backdrop-blur-md shadow-xl border-0 rounded-[30px]">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusBadge()}
                  <Badge variant="outline" className="text-xs">
                    {displayData.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#58d674] fill-current" />
                    <span className="text-sm font-medium text-[#58d674]">
                      매칭 정보 없음
                    </span>
                  </div>
                </div>
                <div className={`text-sm font-medium ${getUrgencyColor()}`}>
                  D-{displayData.daysLeft}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {displayData.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-4">
                <Building2 className="w-5 h-5 mr-2" />
                <span className="text-lg">{displayData.organization}</span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {displayData.description}
              </p>

              {/* 주요 정보 카드들 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-[#58d674]/10 to-[#58d674]/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-[#58d674]" />
                    <span className="text-sm font-medium">지원규모</span>
                  </div>
                  <p className="font-bold text-[#58d674]">{displayData.amount}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-100/50 to-blue-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">신청마감</span>
                  </div>
                  <p className="font-bold text-blue-600">{displayData.deadline}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-100/50 to-purple-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">경쟁률</span>
                  </div>
                  <p className="font-bold text-purple-600">
                    정보 없음
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-100/50 to-orange-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium">선정률</span>
                  </div>
                  <p className="font-bold text-orange-600">정보 없음</p>
                </div>
              </div>

              {/* 신청 현황 */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>신청 현황</span>
                  <span>정보 없음</span>
                </div>
                <Progress
                  value={0}
                  className="h-3"
                />
              </div>
            </CardHeader>
          </Card>

          {/* 상세 정보 탭 */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview">사업개요</TabsTrigger>
              <TabsTrigger value="support">지원내용</TabsTrigger>
              <TabsTrigger value="requirements">신청자격</TabsTrigger>
              <TabsTrigger value="process">신청절차</TabsTrigger>
              <TabsTrigger value="schedule">일정</TabsTrigger>
              <TabsTrigger value="contact">문의처</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#58d674]" />
                      사업 목표
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {displayData.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">주요 특징</h4>
                      <div className="flex flex-wrap gap-2">
                        {displayData.tags && displayData.tags.length > 0 ? (
                          displayData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            태그 정보 없음
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#58d674]" />
                      성과 지표
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">평균 지원금액</span>
                        <span className="font-bold text-[#58d674]">정보 없음</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">배출 기업</span>
                        <span className="font-bold">정보 없음</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">생존율</span>
                        <span className="font-bold text-green-600">정보 없음</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="support">
              <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#58d674]" />
                    지원 내용
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getDefaultSupportContent().map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-[#58d674] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements">
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#58d674]" />
                      신청 자격
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getDefaultRequirements().map((req, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-[#58d674] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#58d674]" />
                      선정 기준
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getDefaultCriteria().map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                          <span className="text-gray-700">{item.criteria}</span>
                          <Badge variant="outline" className="text-[#58d674]">
                            {item.weight}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="process">
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#58d674]" />
                      신청 절차
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getDefaultProcess().map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#58d674] to-[#4bc961] text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <span className="text-gray-700">{step}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#58d674]" />
                      제출 서류
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getDefaultDocuments().map((doc, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#58d674]" />
                    사업 일정
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getDefaultSchedule().map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-[#58d674]" />
                          <span className="font-medium text-gray-800">{item.phase}</span>
                        </div>
                        <span className="text-gray-600">{item.period}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#58d674]" />
                    문의처 정보
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">담당부서</label>
                          <p className="text-gray-800">{displayData.contact.department}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">전화번호</label>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#58d674]" />
                            <p className="text-gray-800">{displayData.contact.phone}</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#58d674]" />
                            <p className="text-gray-800">{displayData.contact.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">웹사이트</label>
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-[#58d674]" />
                            {displayData.contact.website !== "정보 없음" ? (
                              <a href={displayData.contact.website} className="text-[#58d674] hover:underline">
                                {displayData.contact.website}
                              </a>
                            ) : (
                              <span className="text-gray-600">{displayData.contact.website}</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">주소</label>
                          <p className="text-gray-800">{displayData.contact.address}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 mb-1">문의 시 주의사항</h4>
                          <p className="text-sm text-yellow-700">
                            정확한 답변을 위해 기업명, 사업자등록번호, 구체적인 질문내용을 함께 문의해 주시기 바랍니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA 버튼 */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#58d674] hover:bg-[#4bc961] text-white px-8 py-3"
              onClick={() => onNavigate('matching')}
            >
              <Target className="w-5 h-5 mr-2" />
              AI 매칭 분석 시작하기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3"
              disabled
            >
              <BookOpen className="w-5 h-5 mr-2" />
              신청서 다운로드
            </Button>
          </div>
            </>
          )}
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}