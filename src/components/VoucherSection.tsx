import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { 
  Ticket, 
  Building2, 
  Search,
  Filter,
  ExternalLink,
  Bookmark
} from "lucide-react";

interface VoucherProgram {
  id: string;
  title: string;
  organization: string;
  voucherType: string;
  period: string;
  startDate: string;
  endDate: string;
  budget: string;
  maxAmount: string;
  supportRate: string;
  features: string[];
  category: string;
  targetCompany: string;
  requirements: string[];
  applicationCount: number;
  successRate: number;
  benefits: string[];
  daysLeft: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface VoucherSectionProps {
  onNavigate?: (page: string) => void;
}

export function VoucherSection({ onNavigate }: VoucherSectionProps) {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const voucherPrograms: VoucherProgram[] = [
    {
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
      difficulty: 'medium'
    },
    {
      id: "2", 
      title: "스마트제조혁신바우처",
      organization: "중소벤처기업부",
      voucherType: "제조혁신",
      period: "분기별",
      startDate: "2024.10.01", 
      endDate: "2024.12.31",
      budget: "최대 2천만원",
      maxAmount: "2,000만원", 
      supportRate: "90%",
      features: ["스마트공장", "자동화설비", "MES", "품질관리"],
      category: "제조혁신",
      targetCompany: "제조업체",
      requirements: ["제조업체", "직원 500명 이하", "스마트공장 도입의지"],
      applicationCount: 890,
      successRate: 72,
      benefits: ["설비도입비", "시스템구축비", "교육훈련비"],
      daysLeft: 45,
      difficulty: 'hard'
    },
    {
      id: "3",
      title: "혁신바우처(일반)",
      organization: "중소벤처기업부", 
      voucherType: "일반혁신",
      period: "반기별",
      startDate: "2024.07.01",
      endDate: "2025.06.30", 
      budget: "최대 3천만원",
      maxAmount: "3,000만원",
      supportRate: "75%",
      features: ["R&D", "기술혁신", "제품개발", "특허출원"],
      category: "기술혁신",
      targetCompany: "중소기업",
      requirements: ["벤처확인서 또는 이노비즈", "기술개발계획서"],
      applicationCount: 2100,
      successRate: 58,
      benefits: ["연구개발비", "특허출원비", "시제품제작비"],
      daysLeft: 120,
      difficulty: 'medium'
    },
    {
      id: "4",
      title: "온라인판로개척바우처",
      organization: "중소벤처기업부",
      voucherType: "판로개척", 
      period: "연중상시",
      startDate: "2024.01.01",
      endDate: "2024.12.31",
      budget: "최대 1천만원",
      maxAmount: "1,000만원",
      supportRate: "80%",
      features: ["온라인몰 입점", "마케팅", "쇼핑몰 구축", "브랜딩"],
      category: "마케팅",
      targetCompany: "제조업체",
      requirements: ["제조업체", "온라인판로 진출계획"],
      applicationCount: 3200,
      successRate: 78,
      benefits: ["쇼핑몰 입점비", "마케팅비용", "상품촬영비"],
      daysLeft: 90,
      difficulty: 'easy'
    },
    {
      id: "5",
      title: "해외진출바우처",
      organization: "KOTRA",
      voucherType: "해외진출",
      period: "분기별",
      startDate: "2024.10.01",
      endDate: "2025.03.31",
      budget: "최대 5천만원", 
      maxAmount: "5,000만원",
      supportRate: "80%",
      features: ["수출상담회", "바이어발굴", "전시회참가", "마케팅"],
      category: "글로벌진출",
      targetCompany: "수출기업",
      requirements: ["수출실적 또는 수출계획", "영문 회사소개서"],
      applicationCount: 680,
      successRate: 45,
      benefits: ["해외전시회 참가비", "바이어상담비", "통역비"],
      daysLeft: 78,
      difficulty: 'hard'
    },
    {
      id: "6",
      title: "컨설팅바우처",
      organization: "중소벤처기업부",
      voucherType: "컨설팅",
      period: "연중상시",
      startDate: "2024.01.01", 
      endDate: "2024.12.31",
      budget: "최대 1천만원",
      maxAmount: "1,000만원",
      supportRate: "90%",
      features: ["경영컨설팅", "기술컨설팅", "마케팅컨설팅", "재무컨설팅"],
      category: "경영지원",
      targetCompany: "중소기업",
      requirements: ["중소기업확인서", "컨설팅 필요성 입증"],
      applicationCount: 1800,
      successRate: 82,
      benefits: ["전문가 컨설팅", "맞춤형 솔루션", "실행방안 제시"],
      daysLeft: 200,
      difficulty: 'easy'
    }
  ];

  const filteredPrograms = voucherPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPeriod = selectedPeriod === "all" || program.period === selectedPeriod;
    const matchesType = selectedType === "all" || program.voucherType === selectedType;
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "ongoing" && program.daysLeft > 30) ||
                      (selectedTab === "urgent" && program.daysLeft <= 30) ||
                      (selectedTab === "easy" && program.difficulty === 'easy');
    
    return matchesSearch && matchesPeriod && matchesType && matchesTab;
  });

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
    <div className="space-y-6">
      {/* Section Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Ticket className="w-6 h-6" />
            정부 바우쳐 지원사업
          </CardTitle>
          <p className="text-gray-600">
            다양한 바우쳐 지원사업을 한눈에 비교하고 선택하세요. 
            기업 맞춤형 바우쳐 매칭으로 성공 가능성을 높여보세요.
          </p>
        </CardHeader>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {voucherPrograms.length}
            </div>
            <div className="text-sm text-gray-600">총 바우쳐 사업</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Math.round(voucherPrograms.reduce((acc, p) => acc + p.successRate, 0) / voucherPrograms.length)}%
            </div>
            <div className="text-sm text-gray-600">평균 선정률</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {voucherPrograms.reduce((acc, p) => acc + p.applicationCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">총 신청 건수</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {voucherPrograms.filter(p => p.difficulty === 'easy').length}
            </div>
            <div className="text-sm text-gray-600">진입 쉬운 사업</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="바우쳐 사업명, 기관명, 특징으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="기간" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 기간</SelectItem>
                  <SelectItem value="연중상시">연중상시</SelectItem>
                  <SelectItem value="분기별">분기별</SelectItem>
                  <SelectItem value="반기별">반기별</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 유형</SelectItem>
                  <SelectItem value="기술혁신">기술혁신</SelectItem>
                  <SelectItem value="제조혁신">제조혁신</SelectItem>
                  <SelectItem value="판로개척">판로개척</SelectItem>
                  <SelectItem value="해외진출">해외진출</SelectItem>
                  <SelectItem value="컨설팅">컨설팅</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-4 max-w-lg">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="ongoing">진행중</TabsTrigger>
              <TabsTrigger value="urgent">마감임박</TabsTrigger>
              <TabsTrigger value="easy">진입쉬움</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Building2 className="w-4 h-4" />
                            <span>{program.organization}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge variant="outline" className="text-xs">
                            {program.voucherType}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getDifficultyColor(program.difficulty)}`}
                          >
                            {getDifficultyText(program.difficulty)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Key Info */}
                        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">지원규모</div>
                            <div className="font-semibold text-[#58d674]">{program.budget}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">지원비율</div>
                            <div className="font-semibold text-blue-600">{program.supportRate}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">선정률</div>
                            <div className="font-semibold text-purple-600">{program.successRate}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">신청마감</div>
                            <div className={`font-semibold ${program.daysLeft <= 30 ? 'text-red-600' : 'text-gray-700'}`}>
                              D-{program.daysLeft}
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <div className="text-sm font-medium mb-2">주요 특징</div>
                          <div className="flex flex-wrap gap-2">
                            {program.features.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {program.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{program.features.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Period & Target */}
                        <div className="text-sm space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">접수기간</span>
                            <span className="font-medium">{program.period}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">대상기업</span>
                            <span className="font-medium">{program.targetCompany}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">신청건수</span>
                            <span className="font-medium">{program.applicationCount.toLocaleString()}건</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-[#58d674] hover:bg-[#4bc961]"
                            onClick={() => onNavigate?.('voucher-detail')}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            상세보기
                          </Button>
                          <Button size="sm" variant="outline" className="px-3">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPrograms.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>검색 조건에 맞는 바우쳐 사업이 없습니다.</p>
                  <p className="text-sm mt-2">다른 검색어나 필터를 시도해보세요.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}