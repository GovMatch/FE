import { useState } from "react";
import { Header } from "../components/Header";
import { SubscriptionModal } from "../components/SubscriptionModal";
import { SubscriptionPlans } from "../components/SubscriptionPlans";
import { PromoCodeInput } from "../components/PromoCodeInput";
import { Footer } from "../components/Footer";
import { MatchingDetailModal } from "../components/MatchingDetailModal";
import { MyMatchingInfo } from "../components/MyMatchingInfo";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { 
  User, 
  Building2, 
  Star, 
  Calendar, 
  Bell, 
  Settings, 
  Download,
  Edit,
  Bookmark,
  Clock,
  TrendingUp,
  Award,
  Mail,
  Phone,
  Ticket,
  Target,
  Lightbulb,
  CheckSquare
} from "lucide-react";
import type { PageType } from "../components/Router";

interface MyPageProps {
  onNavigate: (page: PageType) => void;
}

export function MyPage({ onNavigate }: MyPageProps) {
  const [selectedTab, setSelectedTab] = useState("matching");
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [voucherPreferences, setVoucherPreferences] = useState({
    interestedTypes: [] as string[],
    budget: "",
    timeline: "",
    priority: "",
    specificNeeds: "",
    experienceLevel: "",
    supportAreas: [] as string[]
  });

  // Mock user data
  const userProfile = {
    name: "김기업",
    email: "kim@company.co.kr",
    phone: "010-1234-5678",
    company: "테크이노베이션",
    position: "대표이사",
    industry: "AI/소프트웨어",
    employees: "10-49명",
    revenue: "10억원-50억원",
    region: "서울특별시",
    registeredAt: "2024.01.15",
    avatar: "KG"
  };

  const matchingHistory = [
    {
      id: "1",
      programTitle: "AI 융합 얼라이언스 프로젝트",
      organization: "과학기술정보통신부",
      category: "기술혁신",
      deadline: "2024.12.28",
      budget: "5천만원",
      matchScore: 94,
      status: "지원완료",
      matchedAt: "2024.01.20",
      description: "인공지능과 다양한 산업 분야의 융합을 통해 새로운 비즈니스 모델을 창출하고 AI 생태계를 조성하는 프로젝트입니다.",
      requirements: [
        "AI 관련 기술을 보유하거나 개발 계획이 있는 기업",
        "설립 7년 이내 또는 벤처기업 인증 보유",
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
      programTitle: "청년창업사관학교 14기",
      organization: "창업진흥원",
      category: "창업지원",
      deadline: "2024.12.31",
      budget: "1억원",
      matchScore: 87,
      status: "검토중",
      matchedAt: "2024.01.18",
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
      programTitle: "스마트제조 혁신바우처",
      organization: "중소벤처기업부",
      category: "제조혁신",
      deadline: "2025.01.15",
      budget: "2천만원",
      matchScore: 91,
      status: "선정",
      matchedAt: "2024.01.15",
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

  const bookmarkedPrograms = [
    {
      id: 1,
      title: "글로벌 K-스타트업 육성사업",
      organization: "창업진흥원",
      deadline: "2025.01.31",
      amount: "3억원",
      daysLeft: 35
    },
    {
      id: 2,
      title: "소부장 기술개발사업 R&D",
      organization: "산업통상자원부",
      deadline: "2025.02.14",
      amount: "10억원",
      daysLeft: 48
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "deadline",
      title: "마감 임박 알림",
      message: "AI 융합 얼라이언스 프로젝트가 3일 후 마감됩니다.",
      date: "2024.01.20",
      read: false
    },
    {
      id: 2,
      type: "match",
      title: "새로운 매칭 결과",
      message: "글로벌 K-스타트업 육성사업과 92% 매칭되었습니다.",
      date: "2024.01.19",
      read: true
    },
    {
      id: 3,
      type: "success",
      title: "선정 결과 발표",
      message: "스마트제조 혁신바우처에 선정되었습니다! 축하드립니다.",
      date: "2024.01.18",
      read: true
    }
  ];

  const stats = [
    { label: "총 매칭 횟수", value: "12", icon: Star, color: "text-yellow-600" },
    { label: "선정 성공", value: "8", icon: Award, color: "text-green-600" },
    { label: "진행 중", value: "2", icon: Clock, color: "text-blue-600" },
    { label: "성공률", value: "67%", icon: TrendingUp, color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 border-2 border-[#58d674]/20 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-[#58d674] text-white text-2xl font-bold">
                      {userProfile.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {userProfile.name}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{userProfile.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{userProfile.position}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{userProfile.industry}</Badge>
                  </div>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  프로필 수정
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border border-gray-200 hover:border-[#58d674]/30 transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-lg bg-gray-50">
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 max-w-5xl">
              <TabsTrigger value="matching">매칭정보 통합</TabsTrigger>
              <TabsTrigger value="profile">내 정보</TabsTrigger>
              <TabsTrigger value="vouchers">바우쳐 매칭</TabsTrigger>
              <TabsTrigger value="subscription">구독 관리</TabsTrigger>
              <TabsTrigger value="notifications">알림</TabsTrigger>
              <TabsTrigger value="settings">설정</TabsTrigger>
            </TabsList>

            <TabsContent value="matching" className="space-y-6">
              {/* 나의 매칭정보 섹션 */}
              <MyMatchingInfo />
              
              {/* 매칭 이력 섹션 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    매칭 이력
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matchingHistory.map((match) => (
                      <div key={match.id} className="border-2 border-gray-200 hover:border-[#58d674]/40 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{match.programTitle}</h3>
                            <p className="text-sm text-gray-600">{match.organization}</p>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={
                                match.status === '선정' ? 'default' : 
                                match.status === '지원완료' ? 'secondary' : 'outline'
                              }
                            >
                              {match.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">매칭점수</span>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="w-4 h-4 text-[#58d674]" />
                              <span className="font-medium">{match.matchScore}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">지원규모</span>
                            <p className="font-medium mt-1">{match.budget}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">마감일</span>
                            <p className="font-medium mt-1">{match.deadline}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">매칭일</span>
                            <p className="font-medium mt-1">{match.matchedAt}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <MatchingDetailModal 
                            matching={match}
                            trigger={
                              <Button size="sm" variant="outline" className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                상세보기
                              </Button>
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 관심 지원사업 섹션 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-yellow-600" />
                    관심 지원사업
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookmarkedPrograms.map((program) => (
                      <div key={program.id} className="border-2 border-gray-200 hover:border-[#58d674]/40 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{program.title}</h3>
                            <p className="text-sm text-gray-600">{program.organization}</p>
                          </div>
                          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                            관심사업
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">지원금액</span>
                            <p className="font-medium mt-1 text-green-600">{program.amount}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">마감일</span>
                            <p className="font-medium mt-1">{program.deadline}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">남은 기간</span>
                            <p className="font-medium mt-1 text-red-600">{program.daysLeft}일</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            관심해제
                          </Button>
                          <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961]">
                            신청하기
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" value={userProfile.name} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" value={userProfile.email} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="phone">연락처</Label>
                      <Input id="phone" defaultValue={userProfile.phone} />
                    </div>
                    <div>
                      <Label htmlFor="position">직책</Label>
                      <Input id="position" defaultValue={userProfile.position} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>기업 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company">회사명</Label>
                      <Input id="company" defaultValue={userProfile.company} />
                    </div>
                    <div>
                      <Label htmlFor="industry">업종</Label>
                      <Input id="industry" defaultValue={userProfile.industry} />
                    </div>
                    <div>
                      <Label htmlFor="employees">직원 수</Label>
                      <Input id="employees" defaultValue={userProfile.employees} />
                    </div>
                    <div>
                      <Label htmlFor="revenue">연 매출</Label>
                      <Input id="revenue" defaultValue={userProfile.revenue} />
                    </div>
                    <div>
                      <Label htmlFor="region">소재지</Label>
                      <Input id="region" defaultValue={userProfile.region} />
                    </div>
                    <div>
                      <Label htmlFor="registered">가입일</Label>
                      <Input id="registered" value={userProfile.registeredAt} readOnly />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-[#58d674] hover:bg-[#4bc961]">
                      정보 수정
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vouchers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-purple-600" />
                    바우쳐 매칭 희망사항
                  </CardTitle>
                  <p className="text-gray-600">
                    귀하의 사업에 가장 적합한 바우쳐 지원사업을 찾기 위해 자세한 정보를 입력해주세요.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 관심 바우쳐 유형 */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">관심 있는 바우쳐 유형 (복수선택 가능)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { id: "digital", label: "디지털혁신바우쳐", desc: "AI, IoT, 클라우드 등" },
                        { id: "manufacturing", label: "스마트제조바우쳐", desc: "자동화, MES, 품질관리" },
                        { id: "innovation", label: "혁신바우처(일반)", desc: "R&D, 기술혁신, 특허" },
                        { id: "marketing", label: "온라인판로개척", desc: "쇼핑몰, 마케팅, 브랜딩" },
                        { id: "global", label: "해외진출바우쳐", desc: "수출, 바이어발굴, 전시회" },
                        { id: "consulting", label: "컨설팅바우쳐", desc: "경영, 기술, 재무컨설팅" }
                      ].map((type) => (
                        <div key={type.id} className="flex items-start space-x-2">
                          <Checkbox 
                            id={type.id}
                            checked={voucherPreferences.interestedTypes.includes(type.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setVoucherPreferences(prev => ({
                                  ...prev,
                                  interestedTypes: [...prev.interestedTypes, type.id]
                                }));
                              } else {
                                setVoucherPreferences(prev => ({
                                  ...prev,
                                  interestedTypes: prev.interestedTypes.filter(t => t !== type.id)
                                }));
                              }
                            }}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label htmlFor={type.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              {type.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {type.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button variant="outline">
                      임시저장
                    </Button>
                    <Button className="bg-[#58d674] hover:bg-[#4bc961]">
                      <Target className="w-4 h-4 mr-2" />
                      맞춤 바우쳐 매칭 요청
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI 추천 바우쳐 지원사업 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    AI 추천 바우쳐 지원사업
                  </CardTitle>
                  <p className="text-gray-600">
                    입력하신 정보를 바탕으로 가장 적합한 바우쳐 지원사업을 추천합니다.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50 hover:border-green-300 transition-all duration-200 shadow-sm hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-green-800">디지털혁신바우쳐</h4>
                          <p className="text-sm text-green-600">중소벤처기업부 | 매칭도 94%</p>
                        </div>
                        <Badge className="bg-green-600">최고 매칭</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        AI/빅데이터 기술 도입으로 디지털 전환을 지원하는 사업입니다. 귀하의 업종과 기술 관심사에 매우 적합합니다.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600 font-medium">최대 2,000만원</span>
                          <span className="text-gray-600">지원비율 90%</span>
                          <span className="text-gray-600">연중상시</span>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          자세히보기
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-blue-800">혁신바우처(일반)</h4>
                          <p className="text-sm text-blue-600">중소벤처기업부 | 매칭도 87%</p>
                        </div>
                        <Badge variant="outline" className="border-blue-600 text-blue-600">높은 매칭</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        R&D 및 기술혁신 지원을 통해 기업의 경쟁력 강화를 도모하는 사업입니다.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-blue-600 font-medium">최대 1,500만원</span>
                          <span className="text-gray-600">지원비율 85%</span>
                          <span className="text-gray-600">연 2회</span>
                        </div>
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-600">
                          자세히보기
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <SubscriptionPlans />
              <PromoCodeInput />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      알림
                    </CardTitle>
                    <Button size="sm" variant="outline">
                      모두 읽음 처리
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 rounded-lg border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
                          notification.read ? 'bg-gray-50 border-gray-200 hover:border-gray-300' : 'bg-white border-[#58d674] hover:border-[#58d674]/80'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{notification.title}</h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[#58d674] rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    계정 설정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">이메일 알림</h4>
                      <p className="text-sm text-gray-600">새로운 매칭 결과와 마감 알림을 받습니다</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS 알림</h4>
                      <p className="text-sm text-gray-600">긴급한 마감 알림을 SMS로 받습니다</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">마케팅 수신 동의</h4>
                      <p className="text-sm text-gray-600">새로운 서비스와 혜택 정보를 받습니다</p>
                    </div>
                    <Switch />
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