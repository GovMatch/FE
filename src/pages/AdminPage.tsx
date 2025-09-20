import { useState } from "react";
import { AdminHeader } from "../components/AdminHeader";
import { Footer } from "../components/Footer";

import { CustomerFunnelManagement } from "../components/CustomerFunnelManagement";
import { VoucherProviderManagement } from "../components/VoucherProviderManagement";
import { PromoCodeManagement } from "../components/PromoCodeManagement";
import { AdminVersionInfo } from "../components/VersionInfo";
import { VoucherRecommendation } from "../components/VoucherRecommendation";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Settings, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  BarChart3,
  PieChart,
  Calendar,
  Bell,
  Ticket
} from "lucide-react";
import type { PageType } from "../components/Router";

interface AdminPageProps {
  onNavigate: (page: PageType, programId?: string) => void;
  currentPage?: PageType;
}

export function AdminPage({ onNavigate, currentPage }: AdminPageProps) {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  // Mock data
  const dashboardStats = [
    { 
      title: "총 사용자", 
      value: "2,847", 
      change: "+12.5%", 
      trend: "up", 
      icon: Users,
      color: "text-blue-600" 
    },
    { 
      title: "활성 지원사업", 
      value: "127", 
      change: "+8.2%", 
      trend: "up", 
      icon: FileText,
      color: "text-green-600" 
    },
    { 
      title: "매칭 완료", 
      value: "1,205", 
      change: "+15.3%", 
      trend: "up", 
      icon: TrendingUp,
      color: "text-purple-600" 
    },
    { 
      title: "선정 성공률", 
      value: "78.2%", 
      change: "+2.1%", 
      trend: "up", 
      icon: BarChart3,
      color: "text-orange-600" 
    }
  ];

  const users = [
    {
      id: 1,
      name: "김기업",
      email: "kim@company.co.kr",
      company: "테크이노베이션",
      registeredAt: "2024.01.15",
      lastLogin: "2024.01.20",
      status: "활성",
      matchings: 3
    },
    {
      id: 2,
      name: "박스타트",
      email: "park@startup.co.kr",
      company: "스타트업코리아",
      registeredAt: "2024.01.10",
      lastLogin: "2024.01.19",
      status: "활성",
      matchings: 5
    },
    {
      id: 3,
      name: "이제조",
      email: "lee@manufacturing.co.kr",
      company: "스마트팩토리",
      registeredAt: "2024.01.05",
      lastLogin: "2024.01.18",
      status: "비활성",
      matchings: 1
    }
  ];

  const supportPrograms = [
    {
      id: 1,
      title: "청년창업사관학교 14기",
      organization: "창업진흥원",
      category: "창업지원",
      deadline: "2024.12.31",
      budget: "1억원",
      applicants: 156,
      status: "진행중"
    },
    {
      id: 2,
      title: "AI 융합 얼라이언스 프로젝트",
      organization: "과학기술정보통신부",
      category: "기술혁신",
      deadline: "2024.12.28",
      budget: "5천만원",
      applicants: 89,
      status: "마감임박"
    },
    {
      id: 3,
      title: "스마트제조 혁신바우처",
      organization: "중소벤처기업부",
      category: "제조혁신",
      deadline: "2025.01.15",
      budget: "2천만원",
      applicants: 234,
      status: "진행중"
    }
  ];

  const recentMatches = [
    {
      id: "1",
      user: "김기업",
      company: "테크이노베이션",
      programTitle: "AI 융합 얼라이언스 프로젝트",
      organization: "과학기술정보통신부",
      category: "기술혁신",
      deadline: "2024.12.28",
      budget: "5천만원",
      matchScore: 94,
      date: "2024.01.20",
      status: "완료",
      description: "인공지능과 다양한 산업 분야의 융합을 통해 새로운 비즈니스 모델을 창출하고 AI 생태계를 조성하는 프로젝트입니다.",
      requirements: [
        "AI 관련 기술을 보유하거나 개발 계획이 있는 기업",
        "설립 7년 이내 또는 벵처기업 인증 보유",
        "직원 수 300명 이하",
        "최근 3년 평균 매출액 1000억원 이하"
      ],
      benefits: [
        "최대 5천만원 개발비 지원",
        "AI 전문 멘토링 및 컨설팅",
        "글로벌 진출 지원 프로그램 연계",
        "네트워킹 및 데모데이 참가 기회"
      ],
      selectionCriteria: [
        "기술혁신성 및 차별성 (30%)",
        "사업화 가능성 및 시장성 (25%)",
        "팀 구성 및 추진 역량 (25%)",
        "정책 기여도 및 파급효과 (20%)"
      ],
      applicationProcess: [
        "온라인 사업계획서 제출",
        "1차 서류심사 (기술성, 사업성 검토)",
        "2차 발표평가 (PT 발표 및 질의응답)",
        "최종 선정 및 협약 체결",
        "사업 수행 및 정기 점검"
      ]
    },
    {
      id: "2",
      user: "박스타트",
      company: "스타트업코리아",
      programTitle: "청년창업사관학교 14기",
      organization: "창업진흥원",
      category: "창업지원",
      deadline: "2024.12.31",
      budget: "1억원",
      matchScore: 87,
      date: "2024.01.19",
      status: "진행중",
      description: "예비창업자와 초기창업자를 대상으로 체계적인 창업교육과 사업화 지원을 통해 성공적인 창업을 도모하는 프로그램입니다.",
      requirements: [
        "만 39세 이하 예비창업자 또는 창업 3년 이내 초기창업자",
        "혁신적인 아이디어와 사업계획을 보유한 자",
        "6개월간 교육과정 참여 가능자",
        "국내 창업 의지가 있는 자"
      ],
      benefits: [
        "최대 1억원 사업화 자금 지원",
        "6개월간 체계적 창업교육",
        "전문 멘토 1:1 맞춤 멘토링",
        "사무공간 및 창업 인프라 제공"
      ],
      selectionCriteria: [
        "사업 아이디어의 혁신성 및 독창성 (35%)",
        "시장성 및 사업 실현 가능성 (30%)",
        "창업의지 및 추진 역량 (25%)",
        "사회적 가치 및 정책 부합성 (10%)"
      ],
      applicationProcess: [
        "온라인 지원서 작성 및 제출",
        "1차 서류심사",
        "2차 면접평가",
        "최종 선발 및 교육과정 시작",
        "6개월 교육 후 사업화 자금 지원"
      ]
    },
    {
      id: "3",
      user: "이제조",
      company: "스마트팩토리",
      programTitle: "스마트제조 혁신바우처",
      organization: "중소벤처기업부",
      category: "제조혁신",
      deadline: "2025.01.15",
      budget: "2천만원",
      matchScore: 91,
      date: "2024.01.18",
      status: "완료",
      description: "중소·중견 제조기업의 스마트공장 구축을 위한 컨설팅, 솔루션 도입, 고도화를 지원하는 사업입니다.",
      requirements: [
        "제조업을 영위하는 중소·중견기업",
        "직원 수 500명 미만",
        "최근 3년 평균 매출액 1500억원 이하",
        "스마트공장 구축 의지와 투자 계획 보유"
      ],
      benefits: [
        "최대 2천만원 구축비 지원",
        "스마트공장 전문 컨설팅",
        "IoT, AI 솔루션 도입 지원",
        "운영 최적화 및 사후관리"
      ],
      selectionCriteria: [
        "기업의 추진 의지 및 역량 (30%)",
        "도입 기술의 적정성 (25%)",
        "투자 계획의 구체성 (25%)",
        "기대 효과 및 파급력 (20%)"
      ],
      applicationProcess: [
        "스마트공장 현황 진단",
        "구축 계획서 작성 및 제출",
        "전문가 현장 실사",
        "최종 선정 및 협약",
        "단계별 구축 및 정기 점검"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onNavigate={onNavigate} />
      
      <div className="py-4 sm:py-8 px-2 sm:px-4">
        <div className="w-full lg:max-w-7xl lg:mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                관리자 대시보드
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                시스템 현황과 데이터를 한눈에 확인하고 관리하세요
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                데이터 내보내기
              </Button>
              <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961] text-xs sm:text-sm">
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                설정
              </Button>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 max-w-7xl">
              <TabsTrigger value="dashboard" className="text-xs lg:text-sm">대시보드</TabsTrigger>
              <TabsTrigger value="users" className="text-xs lg:text-sm">사용자</TabsTrigger>
              <TabsTrigger value="programs" className="text-xs lg:text-sm">지원사업</TabsTrigger>
              <TabsTrigger value="vouchers" className="text-xs lg:text-sm">바우쳐</TabsTrigger>
              <TabsTrigger value="providers" className="text-xs lg:text-sm">수행기관</TabsTrigger>
              <TabsTrigger value="matches" className="text-xs lg:text-sm">매칭현황</TabsTrigger>
              <TabsTrigger value="promo" className="text-xs lg:text-sm">프로모션</TabsTrigger>
              <TabsTrigger value="sales" className="text-xs lg:text-sm">세일즈</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs lg:text-sm">분석</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* System Version Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">시스템 정보</h3>
                <AdminVersionInfo />
              </div>

              {/* Dashboard Stats - Enhanced */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                  <Card key={index} className="border-2 border-gray-100 hover:border-[#58d674]/30 transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change} 전월 대비
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg bg-gray-50`}>
                          <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 전체 탭별 종합 정보 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* 사용자 관리 요약 */}
                <Card className="border-2 border-blue-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Users className="w-5 h-5" />
                      사용자 현황
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">활성 사용자</span>
                        <span className="font-medium text-blue-600">2,143명</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">신규 가입</span>
                        <span className="font-medium text-green-600">+127명</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">평균 MAU</span>
                        <span className="font-medium">85.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 지원사업 관리 요약 */}
                <Card className="border-2 border-green-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <FileText className="w-5 h-5" />
                      지원사업 현황
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">진행중 사업</span>
                        <span className="font-medium text-green-600">127개</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">마감 임박</span>
                        <span className="font-medium text-red-600">8개</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">신규 등록</span>
                        <span className="font-medium text-blue-600">+15개</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 바우쳐 & 매칭 요약 */}
                <Card className="border-2 border-purple-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-purple-700">
                      <Ticket className="w-5 h-5" />
                      바우쳐 & 매칭
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">바우쳐 매칭</span>
                        <span className="font-medium text-purple-600">1,247건</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">평균 성공률</span>
                        <span className="font-medium text-green-600">78.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">월간 성장</span>
                        <span className="font-medium text-blue-600">+15.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities - Enhanced */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      최근 매칭 현황
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMatches.slice(0, 5).map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:border-[#58d674]/30 transition-all duration-200">
                          <div>
                            <p className="font-medium">{match.user}</p>
                            <p className="text-sm text-gray-600">{match.programTitle}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={match.status === '완료' ? 'default' : 'secondary'}>
                              {match.status}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">매칭 {match.matchScore}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-yellow-600" />
                      시스템 알림
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">지원사업 마감 알림</p>
                        <p className="text-xs text-yellow-700">AI 융합 얼라이언스 프로젝트가 3일 후 마감됩니다.</p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">새 지원사업 등록</p>
                        <p className="text-xs text-blue-700">글로벌 K-스타트업 육성사업이 새로 등록되었습니다.</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">매칭 성공률 증가</p>
                        <p className="text-xs text-green-700">이번 달 매칭 성공률이 5% 증가했습니다.</p>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-sm font-medium text-purple-800">프로모션 활성화</p>
                        <p className="text-xs text-purple-700">신규 프로모션 코드 3개가 활성화되었습니다.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 실시간 통계 차트 영역 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      월별 매칭 트렌드
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                      월별 매칭 성과 차트
                      <br />
                      (실제 환경에서는 Recharts 라이브러리 사용)
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-purple-600" />
                      지원사업 분야별 분포
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                      지원사업 분야별 파이 차트
                      <br />
                      (실제 환경에서는 Recharts 라이브러리 사용)
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              {/* User Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>사용자 관리</CardTitle>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input placeholder="사용자 검색..." className="pl-10 w-64" />
                      </div>
                      <Button size="sm" variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        필터
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>이름</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>회사명</TableHead>
                        <TableHead>가입일</TableHead>
                        <TableHead>최근 로그인</TableHead>
                        <TableHead>매칭 횟수</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.company}</TableCell>
                          <TableCell>{user.registeredAt}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>{user.matchings}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === '활성' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              {/* 매칭되는 사업현황 요약 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="border-2 border-green-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">127</div>
                    <div className="text-sm text-gray-600">활성 지원사업</div>
                    <div className="text-xs text-green-600 mt-1">+15개 신규</div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-blue-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">1,205</div>
                    <div className="text-sm text-gray-600">총 매칭 건수</div>
                    <div className="text-xs text-blue-600 mt-1">이번 달 +156건</div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-orange-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">78.2%</div>
                    <div className="text-sm text-gray-600">평균 매칭 성공률</div>
                    <div className="text-xs text-orange-600 mt-1">+2.1% 상승</div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-red-100">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">8</div>
                    <div className="text-sm text-gray-600">마감 임박 사업</div>
                    <div className="text-xs text-red-600 mt-1">7일 내 마감</div>
                  </CardContent>
                </Card>
              </div>

              {/* 분야별 매칭 현황 */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    분야별 매칭 현황
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      { category: "기술혁신", count: 342, color: "bg-blue-500", percentage: 28.4 },
                      { category: "창업지원", count: 278, color: "bg-green-500", percentage: 23.1 },
                      { category: "제조혁신", count: 189, color: "bg-purple-500", percentage: 15.7 },
                      { category: "글로벌진출", count: 156, color: "bg-yellow-500", percentage: 12.9 },
                      { category: "디지털전환", count: 134, color: "bg-red-500", percentage: 11.1 },
                      { category: "기타", count: 106, color: "bg-gray-500", percentage: 8.8 }
                    ].map((item) => (
                      <div key={item.category} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className={`w-4 h-4 ${item.color} rounded-full mx-auto mb-2`}></div>
                        <div className="text-sm font-medium">{item.category}</div>
                        <div className="text-lg font-bold text-gray-800">{item.count}</div>
                        <div className="text-xs text-gray-600">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Program Management */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      지원사업 세부 리스트
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체 분야</SelectItem>
                          <SelectItem value="tech">기술혁신</SelectItem>
                          <SelectItem value="startup">창업지원</SelectItem>
                          <SelectItem value="manufacturing">제조혁신</SelectItem>
                          <SelectItem value="global">글로벌진출</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961]">
                        <Plus className="w-4 h-4 mr-2" />
                        신규 등록
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>사업명</TableHead>
                        <TableHead>주관기관</TableHead>
                        <TableHead>분야</TableHead>
                        <TableHead>마감일</TableHead>
                        <TableHead>지원규모</TableHead>
                        <TableHead>매칭 수</TableHead>
                        <TableHead>성공률</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supportPrograms.map((program, _index) => {
                        const matchCount = Math.floor(Math.random() * 50) + 10;
                        const successRate = Math.floor(Math.random() * 30) + 60;
                        return (
                          <TableRow key={program.id} className="border-b hover:bg-gray-50">
                            <TableCell className="font-medium">{program.title}</TableCell>
                            <TableCell>{program.organization}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{program.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {program.deadline}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium text-green-600">{program.budget}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                {matchCount}건
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-12 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-[#58d674] h-2 rounded-full" 
                                    style={{ width: `${successRate}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{successRate}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={
                                program.status === '마감임박' ? 'destructive' : 
                                program.status === '진행중' ? 'default' : 'secondary'
                              }>
                                {program.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost" title="상세보기">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" title="편집">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" title="매칭 현황">
                                  <TrendingUp className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" title="삭제">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* 최근 매칭 활동 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    최근 매칭 활동
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentMatches.slice(0, 3).map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-lg hover:border-[#58d674]/30 transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#58d674] flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{match.user} ({match.company})</p>
                            <p className="text-sm text-gray-600">{match.programTitle}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={match.status === '완료' ? 'default' : 'secondary'}>
                            {match.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">매칭점수: {match.matchScore}%</p>
                          <p className="text-xs text-gray-500">{match.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Button variant="outline" size="sm">
                      전체 매칭 현황 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vouchers" className="space-y-6">
              {/* AI 바우쳐 추천 시스템 */}
              <div className="mb-6">
                <VoucherRecommendation onNavigate={onNavigate} />
              </div>

              {/* Voucher Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">6</div>
                    <div className="text-sm text-gray-600">활성 바우쳐 사업</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">1,247</div>
                    <div className="text-sm text-gray-600">바우쳐 매칭 완료</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">68%</div>
                    <div className="text-sm text-gray-600">평균 선정률</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">234억</div>
                    <div className="text-sm text-gray-600">총 지원금액</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>바우쳐별 매칭 현황</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "디지털혁신바우쳐", matches: 345, rate: 72, color: "bg-blue-500" },
                        { name: "스마트제조바우쳐", matches: 234, rate: 68, color: "bg-green-500" },
                        { name: "혁신바우처(일반)", matches: 456, rate: 58, color: "bg-purple-500" },
                        { name: "온라인판로개척", matches: 178, rate: 78, color: "bg-yellow-500" },
                        { name: "해외진출바우쳐", matches: 89, rate: 45, color: "bg-red-500" },
                        { name: "컨설팅바우쳐", matches: 267, rate: 82, color: "bg-gray-500" }
                      ].map((voucher) => (
                        <div key={voucher.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${voucher.color}`}></div>
                            <span className="text-sm font-medium">{voucher.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">{voucher.matches}건</span>
                            <span className="text-sm font-medium">{voucher.rate}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>월별 바우쳐 신청 동향</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      바우쳐 신청 동향 차트
                      <br />
                      (실제 환경에서는 차트 라이브러리 사용)
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>바우쳐 매칭 고객 분석</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>고객명</TableHead>
                        <TableHead>회사</TableHead>
                        <TableHead>관심 바우쳐</TableHead>
                        <TableHead>예산</TableHead>
                        <TableHead>시급도</TableHead>
                        <TableHead>매칭점수</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          name: "김기업",
                          company: "테크이노베이션",
                          voucher: "디지털혁신",
                          budget: "2,000만원",
                          urgency: "높음",
                          score: 94,
                          status: "상담중"
                        },
                        {
                          name: "박스타트",
                          company: "스타트업코리아",
                          voucher: "혁신바우처",
                          budget: "3,000만원",
                          urgency: "보통",
                          score: 87,
                          status: "검토중"
                        },
                        {
                          name: "이제조",
                          company: "스마트팩토리",
                          voucher: "스마트제조",
                          budget: "2,000만원",
                          urgency: "낮음",
                          score: 91,
                          status: "대기"
                        }
                      ].map((customer, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.company}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{customer.voucher}</Badge>
                          </TableCell>
                          <TableCell>{customer.budget}</TableCell>
                          <TableCell>
                            <Badge variant={customer.urgency === '높음' ? 'destructive' : customer.urgency === '보통' ? 'default' : 'secondary'}>
                              {customer.urgency}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2 max-w-16">
                                <div 
                                  className="bg-[#58d674] h-2 rounded-full" 
                                  style={{ width: `${customer.score}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{customer.score}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{customer.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="providers" className="space-y-6">
              {/* Provider Management */}
              <VoucherProviderManagement />
            </TabsContent>

            <TabsContent value="matches" className="space-y-6">
              {/* Matching Status */}
              <Card>
                <CardHeader>
                  <CardTitle>매칭 현황</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>사용자</TableHead>
                        <TableHead>회사명</TableHead>
                        <TableHead>매칭 지원사업</TableHead>
                        <TableHead>매칭점수</TableHead>
                        <TableHead>매칭일시</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentMatches.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell className="font-medium">{match.user}</TableCell>
                          <TableCell>{match.company}</TableCell>
                          <TableCell>{match.program}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#58d674] h-2 rounded-full" 
                                  style={{ width: `${match.matchScore}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{match.matchScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{match.date}</TableCell>
                          <TableCell>
                            <Badge variant={match.status === '완료' ? 'default' : 'secondary'}>
                              {match.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              {/* B2B Sales Funnel Management */}
              <Card>
                <CardHeader>
                  <CardTitle>B2B 세일즈 퍼널 관리</CardTitle>
                  <p className="text-gray-600">
                    정부지원사업 매칭 서비스를 통한 B2B 고객 유치 및 AI 솔루션 판매 관리
                  </p>
                </CardHeader>
                <CardContent>
                  <CustomerFunnelManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="promo" className="space-y-6">
              {/* Promotion Code Management */}
              <Card>
                <CardHeader>
                  <CardTitle>프로모션 코드 관리</CardTitle>
                  <p className="text-gray-600">
                    사용자 할인 및 혜택을 위한 프로모션 코드를 생성하고 관리합니다
                  </p>
                </CardHeader>
                <CardContent>
                  <PromoCodeManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      월별 매칭 현황
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      차트 영역 (실제 환경에서는 차트 라이브러리 사용)
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      분야별 매칭 분포
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      파이차트 영역 (실제 환경에서는 차트 라이브러리 사용)
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>성과 지표</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#58d674] mb-2">92.3%</div>
                      <div className="text-gray-600">평균 매칭 정확도</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">78.1%</div>
                      <div className="text-gray-600">선정 성공률</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
                      <div className="text-gray-600">사용자 만족도</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}