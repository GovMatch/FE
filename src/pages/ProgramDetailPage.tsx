import { useState } from "react";
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
  onNavigate: (page: PageType) => void;
}

export function ProgramDetailPage({ onNavigate }: ProgramDetailPageProps) {
  // 실제로는 라우팅 파라미터나 상태를 통해 받아올 데이터
  const programData = {
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
    status: "deadline-soon" as const,
    supportPeriod: "2024.01.01 ~ 2024.12.31",
    applicationPeriod: "2024.11.01 ~ 2024.12.31",
    announcementDate: "2025.01.15",
    businessStartDate: "2025.02.01",
    tags: ["창업", "청년", "사업화", "교육"],
    
    // 상세 정보
    overview: "청년창업사관학교는 창업의지가 높은 예비창업자 및 초기창업자를 대상으로 단계별 맞춤형 창업교육과 사업화 자금을 지원하는 대표적인 창업지원 프로그램입니다. 체계적인 교육과정과 실무진의 멘토링을 통해 성공적인 창업을 지원합니다.",
    
    supportContent: [
      "창업교육 프로그램 (6개월)",
      "사업화 자금 지원 (최대 1억원)",
      "전문가 멘토링 및 컨설팅",
      "네트워킹 및 투자유치 지원",
      "창업공간 제공 (12개월)",
      "후속 지원사업 연계"
    ],
    
    eligibilityRequirements: [
      "만 39세 이하 예비창업자 또는 창업 3년 이내 기업 대표자",
      "혁신적인 창업 아이템을 보유한 자",
      "6개월간 교육과정 참여 가능한 자",
      "사업자등록증 보유 또는 등록 예정인 자",
      "국내 거주자 (외국인의 경우 별도 심사)"
    ],
    
    applicationProcess: [
      "온라인 신청서 작성 및 제출",
      "서류심사 (사업계획서, 재무계획서 등)",
      "1차 면접심사 (사업성 및 실행력 평가)",
      "2차 최종심사 (PT 발표)",
      "최종 선정 및 결과 발표"
    ],
    
    selectionCriteria: [
      { criteria: "사업성 및 혁신성", weight: "30%" },
      { criteria: "시장성 및 경쟁력", weight: "25%" },
      { criteria: "사업화 가능성", weight: "20%" },
      { criteria: "대표자 역량", weight: "15%" },
      { criteria: "기타 (팀 구성 등)", weight: "10%" }
    ],
    
    requiredDocuments: [
      "사업계획서 (양식 제공)",
      "재무계획서",
      "대표자 이력서",
      "사업자등록증 (기 보유시)",
      "기타 증빙서류 (특허, 인증서 등)"
    ],
    
    schedule: [
      { phase: "공고 및 접수", period: "2024.11.01 ~ 2024.12.31" },
      { phase: "서류심사", period: "2025.01.02 ~ 2025.01.10" },
      { phase: "면접심사", period: "2025.01.13 ~ 2025.01.20" },
      { phase: "최종발표", period: "2025.01.25" },
      { phase: "교육시작", period: "2025.02.01" }
    ],
    
    contact: {
      department: "창업진흥원 창업교육실",
      phone: "02-1234-5678",
      email: "startup@kised.or.kr",
      website: "https://www.kised.or.kr",
      address: "서울시 강남구 테헤란로 123"
    },
    
    successRate: "73%",
    averageFunding: "7,500만원",
    graduateCompanies: "1,247개사",
    survivalRate: "85%"
  };

  const getStatusBadge = () => {
    switch (programData.status) {
      case "deadline-soon":
        return <Badge variant="destructive">마감임박</Badge>;
      case "active":
        return <Badge variant="default" className="bg-blue-100 text-blue-700">접수중</Badge>;
      default:
        return <Badge variant="secondary">예정</Badge>;
    }
  };

  const getUrgencyColor = () => {
    if (programData.daysLeft <= 3) return "text-red-600";
    if (programData.daysLeft <= 7) return "text-orange-600";
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

          {/* 프로그램 헤더 */}
          <Card className="mb-8 bg-white/80 backdrop-blur-md shadow-xl border-0 rounded-[30px]">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusBadge()}
                  <Badge variant="outline" className="text-xs">
                    {programData.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#58d674] fill-current" />
                    <span className="text-sm font-medium text-[#58d674]">
                      매칭 {programData.matchScore}%
                    </span>
                  </div>
                </div>
                <div className={`text-sm font-medium ${getUrgencyColor()}`}>
                  D-{programData.daysLeft}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {programData.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-4">
                <Building2 className="w-5 h-5 mr-2" />
                <span className="text-lg">{programData.organization}</span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {programData.overview}
              </p>

              {/* 주요 정보 카드들 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-[#58d674]/10 to-[#58d674]/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-[#58d674]" />
                    <span className="text-sm font-medium">지원규모</span>
                  </div>
                  <p className="font-bold text-[#58d674]">{programData.amount}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-100/50 to-blue-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">신청마감</span>
                  </div>
                  <p className="font-bold text-blue-600">{programData.deadline}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-100/50 to-purple-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">경쟁률</span>
                  </div>
                  <p className="font-bold text-purple-600">
                    {((programData.applicants / programData.maxApplicants) * 100).toFixed(1)}%
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-100/50 to-orange-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium">선정률</span>
                  </div>
                  <p className="font-bold text-orange-600">{programData.successRate}</p>
                </div>
              </div>

              {/* 신청 현황 */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>신청 현황</span>
                  <span>{programData.applicants}/{programData.maxApplicants}명</span>
                </div>
                <Progress 
                  value={(programData.applicants / programData.maxApplicants) * 100} 
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
                      {programData.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">주요 특징</h4>
                      <div className="flex flex-wrap gap-2">
                        {programData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
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
                        <span className="font-bold text-[#58d674]">{programData.averageFunding}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">배출 기업</span>
                        <span className="font-bold">{programData.graduateCompanies}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">생존율</span>
                        <span className="font-bold text-green-600">{programData.survivalRate}</span>
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
                    {programData.supportContent.map((item, index) => (
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
                      {programData.eligibilityRequirements.map((req, index) => (
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
                      {programData.selectionCriteria.map((item, index) => (
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
                      {programData.applicationProcess.map((step, index) => (
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
                      {programData.requiredDocuments.map((doc, index) => (
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
                    {programData.schedule.map((item, index) => (
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
                          <p className="text-gray-800">{programData.contact.department}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">전화번호</label>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#58d674]" />
                            <p className="text-gray-800">{programData.contact.phone}</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#58d674]" />
                            <p className="text-gray-800">{programData.contact.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">웹사이트</label>
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-[#58d674]" />
                            <a href={programData.contact.website} className="text-[#58d674] hover:underline">
                              {programData.contact.website}
                            </a>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">주소</label>
                          <p className="text-gray-800">{programData.contact.address}</p>
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
            >
              <BookOpen className="w-5 h-5 mr-2" />
              신청서 다운로드
            </Button>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}