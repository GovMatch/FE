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
  TrendingUp,
  Ticket,
  Settings,
  BarChart3
} from "lucide-react";
import type { PageType } from "../components/Router";

interface VoucherDetailPageProps {
  onNavigate: (page: PageType, programId?: string) => void;
}

export function VoucherDetailPage({ onNavigate }: VoucherDetailPageProps) {
  // 실제로는 라우팅 파라미터나 상태를 통해 받아올 데이터
  const voucherData = {
    id: "1",
    title: "디지털혁신바우처",
    organization: "중소벤처기업부",
    voucherType: "기술혁신",
    period: "연중상시",
    startDate: "2024.01.01",
    endDate: "2024.12.31",
    budget: "최대 2천만원",
    maxAmount: "2,000만원",
    supportRate: "90%",
    features: ["AI/빅데이터", "IoT", "클라우드", "블록체인"],
    category: "디지털전환",
    targetCompany: "중소기업",
    requirements: ["중소기업확인서", "직원 300명 이하", "매출 400억원 이하"],
    applicationCount: 1250,
    successRate: 65,
    benefits: ["기술도입비 지원", "전문가 컨설팅", "사후관리"],
    daysLeft: 365,
    difficulty: 'medium' as const,

    // 상세 정보
    overview: "디지털혁신바우처는 중소기업의 디지털 전환을 촉진하기 위해 AI, IoT, 클라우드 등 첨단 디지털 기술 도입을 지원하는 바우처 방식의 지원사업입니다. 기업이 직접 서비스를 선택하여 이용할 수 있어 맞춤형 지원이 가능합니다.",

    supportContent: [
      "디지털 기술 도입 컨설팅",
      "AI/빅데이터 분석 시스템 구축",
      "IoT 센서 및 모니터링 시스템",
      "클라우드 인프라 구축",
      "블록체인 기술 적용",
      "디지털 보안 솔루션",
      "전자상거래 플랫폼 구축",
      "모바일 앱 개발"
    ],

    eligibilityRequirements: [
      "중소기업기본법상 중소기업 (직원 300명 이하)",
      "최근 3년 평균 매출액 400억원 이하",
      "중소기업확인서 보유 기업",
      "디지털 기술 도입 계획이 있는 기업",
      "자부담 10% 이상 투자 가능한 기업"
    ],

    applicationProcess: [
      "온라인 바우처 신청 (K-디지털 플랫폼)",
      "기업 자격 확인 및 서류 심사",
      "바우처 발급 및 승인",
      "공급기업 선정 및 계약 체결",
      "서비스 이용 및 정산",
      "성과보고서 제출 및 사후관리"
    ],

    serviceCategories: [
      { category: "AI/빅데이터", description: "인공지능 기반 데이터 분석 및 활용", providers: 45 },
      { category: "IoT", description: "사물인터넷 기반 스마트 시스템 구축", providers: 32 },
      { category: "클라우드", description: "클라우드 인프라 및 서비스 도입", providers: 28 },
      { category: "블록체인", description: "블록체인 기술 기반 서비스 개발", providers: 15 },
      { category: "보안", description: "디지털 보안 솔루션 도입", providers: 22 },
      { category: "전자상거래", description: "온라인 쇼핑몰 및 플랫폼 구축", providers: 38 }
    ],

    utilizationProcess: [
      "바우처 발급 후 서비스 공급기업 검색",
      "견적 비교 및 공급기업 선정",
      "서비스 제공계약 체결",
      "서비스 이용 및 진행상황 모니터링",
      "서비스 완료 후 정산 및 평가",
      "성과보고서 작성 및 제출"
    ],

    performanceManagement: [
      "서비스 이용 현황 실시간 모니터링",
      "중간점검을 통한 진행상황 확인",
      "서비스 완료 후 만족도 조사",
      "기업 디지털 역량 사전/사후 평가",
      "성과지표 달성도 측정",
      "사후 1년간 추적 관리"
    ],

    requiredDocuments: [
      "바우처 신청서 (온라인 작성)",
      "중소기업확인서",
      "사업자등록증",
      "디지털 기술 도입계획서",
      "재무상태표 (최근 1년)",
      "기타 증빙서류"
    ],

    schedule: [
      { phase: "상시 접수", period: "연중 상시 (예산 소진시까지)" },
      { phase: "자격심사", period: "신청 후 5~7일" },
      { phase: "바우처 발급", period: "승인 후 즉시" },
      { phase: "서비스 이용", period: "발급일로부터 12개월 이내" },
      { phase: "정산 완료", period: "서비스 완료 후 30일 이내" }
    ],

    contact: {
      department: "중소벤처기업부 디지털혁신과",
      phone: "02-2100-2345",
      email: "digital@mss.go.kr",
      website: "https://www.k-digital.go.kr",
      address: "서울시 종로구 세종대로 209",
      platform: "K-디지털 플랫폼 (www.k-digital.go.kr)"
    },

    statistics: {
      totalIssued: "15,420건",
      utilizationRate: "87%",
      averageAmount: "1,250만원",
      satisfactionScore: "4.2/5.0",
      businessImprovement: "78%"
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'; 
      case 'hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return '보통';
    }
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

          {/* 바우처 헤더 */}
          <Card className="mb-8 bg-white/80 backdrop-blur-md shadow-xl border-0 rounded-[30px]">
            <CardHeader className="pb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-purple-100 text-purple-700">
                    {voucherData.voucherType}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {voucherData.period}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getDifficultyColor(voucherData.difficulty)}`}
                  >
                    {getDifficultyText(voucherData.difficulty)}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">선정률</div>
                  <div className="text-lg font-bold text-[#58d674]">{voucherData.successRate}%</div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {voucherData.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-4">
                <Building2 className="w-5 h-5 mr-2" />
                <span className="text-lg">{voucherData.organization}</span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {voucherData.overview}
              </p>

              {/* 주요 정보 카드들 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-[#58d674]/10 to-[#58d674]/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="w-5 h-5 text-[#58d674]" />
                    <span className="text-sm font-medium">지원규모</span>
                  </div>
                  <p className="font-bold text-[#58d674]">{voucherData.budget}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-100/50 to-blue-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">지원비율</span>
                  </div>
                  <p className="font-bold text-blue-600">{voucherData.supportRate}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-100/50 to-purple-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium">신청기간</span>
                  </div>
                  <p className="font-bold text-purple-600">{voucherData.period}</p>
                </div>

                <div className="bg-gradient-to-r from-orange-100/50 to-orange-50/30 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium">신청건수</span>
                  </div>
                  <p className="font-bold text-orange-600">{voucherData.applicationCount.toLocaleString()}건</p>
                </div>
              </div>

              {/* 주요 특징 */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">지원 기술 분야</h4>
                <div className="flex flex-wrap gap-2">
                  {voucherData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 상세 정보 탭 */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview">바우처 개요</TabsTrigger>
              <TabsTrigger value="support">지원내용</TabsTrigger>
              <TabsTrigger value="requirements">신청자격</TabsTrigger>
              <TabsTrigger value="process">이용절차</TabsTrigger>
              <TabsTrigger value="management">성과관리</TabsTrigger>
              <TabsTrigger value="contact">문의처</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#58d674]" />
                      바우처 특징
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">대상기업</span>
                        <span className="font-medium">{voucherData.targetCompany}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">지원방식</span>
                        <span className="font-medium">바우처 방식</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">자부담</span>
                        <span className="font-medium">{100 - parseInt(voucherData.supportRate)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">이용기간</span>
                        <span className="font-medium">발급일로부터 12개월</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#58d674]" />
                      이용 통계
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">총 발급건수</span>
                        <span className="font-bold text-[#58d674]">{voucherData.statistics.totalIssued}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">이용률</span>
                        <span className="font-bold">{voucherData.statistics.utilizationRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">평균 이용액</span>
                        <span className="font-bold text-blue-600">{voucherData.statistics.averageAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">만족도</span>
                        <span className="font-bold text-yellow-600">{voucherData.statistics.satisfactionScore}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="support">
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-[#58d674]" />
                      지원 서비스 분야
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voucherData.serviceCategories.map((service, index) => (
                        <div key={index} className="p-4 bg-gray-50/50 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800">{service.category}</h4>
                            <Badge variant="outline" className="text-xs">
                              {service.providers}개 업체
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#58d674]" />
                      지원 혜택
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {voucherData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-xl">
                          <CheckCircle className="w-5 h-5 text-[#58d674] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="requirements">
              <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#58d674]" />
                    신청 자격 요건
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {voucherData.eligibilityRequirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl">
                        <div className="w-6 h-6 bg-[#58d674] text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h4 className="font-medium mb-4">제출 서류</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {voucherData.requiredDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process">
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#58d674]" />
                      바우처 신청 절차
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {voucherData.applicationProcess.map((step, index) => (
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
                      <Settings className="w-5 h-5 text-[#58d674]" />
                      바우처 이용 절차
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {voucherData.utilizationProcess.map((step, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 bg-purple-50/50 rounded-xl">
                          <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#58d674]" />
                      처리 일정
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {voucherData.schedule.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                          <span className="font-medium text-gray-800">{item.phase}</span>
                          <span className="text-gray-600">{item.period}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="management">
              <Card className="bg-white/80 backdrop-blur-md shadow-lg border-0 rounded-[25px]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#58d674]" />
                    성과 관리 체계
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {voucherData.performanceManagement.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-green-50/50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">성과 개선 효과</h4>
                        <p className="text-sm text-blue-700">
                          바우처 이용 기업의 {voucherData.statistics.businessImprovement}가 디지털 역량 향상 및 
                          업무 효율성 개선을 경험했습니다.
                        </p>
                      </div>
                    </div>
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
                          <p className="text-gray-800">{voucherData.contact.department}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">전화번호</label>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#58d674]" />
                            <p className="text-gray-800">{voucherData.contact.phone}</p>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#58d674]" />
                            <p className="text-gray-800">{voucherData.contact.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">신청 플랫폼</label>
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-[#58d674]" />
                            <a href={voucherData.contact.website} className="text-[#58d674] hover:underline">
                              {voucherData.contact.platform}
                            </a>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">웹사이트</label>
                          <div className="flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-[#58d674]" />
                            <a href={voucherData.contact.website} className="text-[#58d674] hover:underline">
                              {voucherData.contact.website}
                            </a>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">주소</label>
                          <p className="text-gray-800">{voucherData.contact.address}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 mb-1">신청 전 확인사항</h4>
                          <p className="text-sm text-yellow-700">
                            바우처 신청 전 반드시 K-디지털 플랫폼에서 본인 기업의 자격요건을 확인해 주시기 바랍니다.
                            중복 신청은 불가하며, 이용 중인 다른 바우처와의 중복 지원도 제한됩니다.
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
              바우처 매칭 분석하기
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-3"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              K-디지털 플랫폼 바로가기
            </Button>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}