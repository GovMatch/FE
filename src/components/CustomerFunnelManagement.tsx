import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Eye,
  Filter,
  Search,
  Plus,
  ArrowRight,
  ArrowDown,
  Star,
  Building2,
  User,
  DollarSign,
  Trophy,
  Activity
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  industry: string;
  employees: string;
  revenue: string;
  registeredAt: string;
  lastContact: string;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost';
  score: number;
  matchingCount: number;
  aiSolutionInterest: number; // 1-5 scale
  budget: string;
  timeline: string;
  source: string;
  notes: string;
  nextAction: string;
  nextActionDate: string;
  assignedTo: string;
  tags: string[];
}

interface FunnelStage {
  stage: Customer['stage'];
  name: string;
  color: string;
  bgColor: string;
  count: number;
  conversionRate: number;
}

export function CustomerFunnelManagement() {
  const [selectedTab, setSelectedTab] = useState("funnel");
  const [selectedStage, setSelectedStage] = useState<Customer['stage'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock customer data
  const customers: Customer[] = [
    {
      id: "1",
      name: "김기업",
      email: "kim@company.co.kr", 
      phone: "010-1234-5678",
      company: "테크이노베이션",
      position: "대표이사",
      industry: "AI/소프트웨어",
      employees: "10-49명",
      revenue: "10억원-50억원",
      registeredAt: "2024.01.15",
      lastContact: "2024.01.20",
      stage: 'proposal',
      score: 85,
      matchingCount: 3,
      aiSolutionInterest: 4,
      budget: "3000-5000만원",
      timeline: "3개월 내",
      source: "웹사이트",
      notes: "AI 매칭 시스템에 높은 관심. 자동화 솔루션 도입 검토중",
      nextAction: "제안서 발송",
      nextActionDate: "2024.01.22",
      assignedTo: "김세일즈",
      tags: ["우선고객", "AI관심", "결제능력"]
    },
    {
      id: "2", 
      name: "박스타트",
      email: "park@startup.co.kr",
      phone: "010-2345-6789", 
      company: "스타트업코리아",
      position: "CTO",
      industry: "핀테크",
      employees: "20-49명", 
      revenue: "5억원-10억원",
      registeredAt: "2024.01.10",
      lastContact: "2024.01.19",
      stage: 'negotiation',
      score: 92,
      matchingCount: 5,
      aiSolutionInterest: 5,
      budget: "5000-10000만원",
      timeline: "1개월 내",
      source: "추천",
      notes: "매칭 정확도에 만족. 고급 AI 분석 기능 요청",
      nextAction: "최종 미팅",
      nextActionDate: "2024.01.21",
      assignedTo: "이세일즈",
      tags: ["HOT", "기술이해높음", "빠른결정"]
    },
    {
      id: "3",
      name: "이제조", 
      email: "lee@manufacturing.co.kr",
      phone: "010-3456-7890",
      company: "스마트팩토리",
      position: "생산관리자",
      industry: "제조업",
      employees: "50-99명",
      revenue: "100억원-500억원", 
      registeredAt: "2024.01.05",
      lastContact: "2024.01.18", 
      stage: 'qualified',
      score: 68,
      matchingCount: 1,
      aiSolutionInterest: 3,
      budget: "1000-3000만원",
      timeline: "6개월 내",
      source: "세미나",
      notes: "제조업 특화 매칭 서비스에 관심. 의사결정 과정 복잡",
      nextAction: "업계 사례 공유",
      nextActionDate: "2024.01.23",
      assignedTo: "김세일즈", 
      tags: ["제조업", "신중한결정", "사례필요"]
    },
    {
      id: "4",
      name: "최마케팅",
      email: "choi@marketing.co.kr",
      phone: "010-4567-8901",
      company: "마케팅이노베이션",
      position: "마케팅총괄",
      industry: "마케팅/광고",
      employees: "30-49명",
      revenue: "20억원-50억원",
      registeredAt: "2024.01.12",
      lastContact: "2024.01.17",
      stage: 'lead',
      score: 45,
      matchingCount: 0,
      aiSolutionInterest: 2,
      budget: "미정",
      timeline: "미정", 
      source: "광고",
      notes: "초기 관심 단계. 서비스 이해도 낮음",
      nextAction: "서비스 소개 통화",
      nextActionDate: "2024.01.24",
      assignedTo: "박세일즈",
      tags: ["신규리드", "교육필요"]
    },
    {
      id: "5",
      name: "정글로벌",
      email: "jung@global.co.kr", 
      phone: "010-5678-9012",
      company: "글로벌트레이딩",
      position: "해외사업부장",
      industry: "무역/유통",
      employees: "100-199명",
      revenue: "500억원-1000억원",
      registeredAt: "2024.01.08",
      lastContact: "2024.01.16",
      stage: 'closed',
      score: 88,
      matchingCount: 7,
      aiSolutionInterest: 4,
      budget: "10000만원+",
      timeline: "완료",
      source: "파트너사",
      notes: "계약 완료. 성공 사례 활용 가능",
      nextAction: "만족도 조사",
      nextActionDate: "2024.02.15",
      assignedTo: "이세일즈",
      tags: ["성공사례", "레퍼런스", "업셀가능"]
    }
  ];

  const funnelStages: FunnelStage[] = [
    {
      stage: 'lead',
      name: '리드',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      count: customers.filter(c => c.stage === 'lead').length,
      conversionRate: 25
    },
    {
      stage: 'qualified',
      name: '검증된 리드', 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      count: customers.filter(c => c.stage === 'qualified').length,
      conversionRate: 45
    },
    {
      stage: 'proposal',
      name: '제안서 발송',
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50',
      count: customers.filter(c => c.stage === 'proposal').length,
      conversionRate: 65
    },
    {
      stage: 'negotiation',
      name: '협상 중',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50', 
      count: customers.filter(c => c.stage === 'negotiation').length,
      conversionRate: 75
    },
    {
      stage: 'closed',
      name: '계약 완료',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      count: customers.filter(c => c.stage === 'closed').length,
      conversionRate: 100
    },
    {
      stage: 'lost',
      name: '손실',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      count: customers.filter(c => c.stage === 'lost').length,
      conversionRate: 0
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesStage = selectedStage === 'all' || customer.stage === selectedStage;
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const getStageInfo = (stage: Customer['stage']) => {
    return funnelStages.find(s => s.stage === stage);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTotalRevenue = () => {
    return customers
      .filter(c => c.stage === 'closed')
      .reduce((acc, c) => {
        const revenue = c.budget.replace(/[^0-9]/g, '');
        return acc + (parseInt(revenue) || 0);
      }, 0);
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="funnel">세일즈 퍼널</TabsTrigger>
          <TabsTrigger value="customers">고객 관리</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
          <TabsTrigger value="activities">활동 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-6">
          {/* Funnel Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{customers.length}</div>
                <div className="text-sm text-gray-600">총 고객 수</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{funnelStages.find(s => s.stage === 'closed')?.count || 0}</div>
                <div className="text-sm text-gray-600">계약 완료</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {Math.round((customers.filter(c => c.stage === 'closed').length / customers.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">전환율</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {getTotalRevenue().toLocaleString()}만원
                </div>
                <div className="text-sm text-gray-600">매출</div>
              </CardContent>
            </Card>
          </div>

          {/* Funnel Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>세일즈 퍼널 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelStages.slice(0, -1).map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className={`p-4 rounded-lg ${stage.bgColor} border`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${stage.bgColor} border-2 border-current ${stage.color} flex items-center justify-center font-bold text-sm`}>
                            {stage.count}
                          </div>
                          <h3 className={`font-semibold ${stage.color}`}>{stage.name}</h3>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${stage.color}`}>
                            전환율 {stage.conversionRate}%
                          </div>
                        </div>
                      </div>
                      <Progress value={stage.conversionRate} className="h-2" />
                    </div>
                    {index < funnelStages.length - 2 && (
                      <div className="flex justify-center my-2">
                        <ArrowDown className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Customer Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>고객 관리</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961]">
                      <Plus className="w-4 h-4 mr-2" />
                      고객 추가
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>새 고객 추가</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="customerName">이름</Label>
                        <Input id="customerName" placeholder="고객 이름" />
                      </div>
                      <div>
                        <Label htmlFor="customerEmail">이메일</Label>
                        <Input id="customerEmail" type="email" placeholder="email@company.co.kr" />
                      </div>
                      <div>
                        <Label htmlFor="customerCompany">회사명</Label>
                        <Input id="customerCompany" placeholder="회사명" />
                      </div>
                      <div>
                        <Label htmlFor="customerStage">단계</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="세일즈 단계 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lead">리드</SelectItem>
                            <SelectItem value="qualified">검증된 리드</SelectItem>
                            <SelectItem value="proposal">제안서 발송</SelectItem>
                            <SelectItem value="negotiation">협상 중</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-[#58d674] hover:bg-[#4bc961]">
                        고객 추가
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="고객명, 회사명, 이메일로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={selectedStage} onValueChange={(value: any) => setSelectedStage(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="단계 필터" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 단계</SelectItem>
                      <SelectItem value="lead">리드</SelectItem>
                      <SelectItem value="qualified">검증된 리드</SelectItem>
                      <SelectItem value="proposal">제안서 발송</SelectItem>
                      <SelectItem value="negotiation">협상 중</SelectItem>
                      <SelectItem value="closed">계약 완료</SelectItem>
                      <SelectItem value="lost">손실</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>고객정보</TableHead>
                    <TableHead>회사</TableHead>
                    <TableHead>단계</TableHead>
                    <TableHead>점수</TableHead>
                    <TableHead>AI관심도</TableHead>
                    <TableHead>다음액션</TableHead>
                    <TableHead>담당자</TableHead>
                    <TableHead>작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => {
                    const stageInfo = getStageInfo(customer.stage);
                    return (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-600">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.company}</div>
                            <div className="text-sm text-gray-600">{customer.position}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${stageInfo?.color} ${stageInfo?.bgColor}`}>
                            {stageInfo?.name}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(customer.score)}`}>
                              {customer.score}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < customer.aiSolutionInterest
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{customer.nextAction}</div>
                            <div className="text-gray-600">{customer.nextActionDate}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{customer.assignedTo}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setSelectedCustomer(customer)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>고객 상세정보 - {selectedCustomer?.name}</DialogTitle>
                                </DialogHeader>
                                {selectedCustomer && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>기본정보</Label>
                                        <div className="space-y-2 mt-2">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">이름:</span>
                                            <span>{selectedCustomer.name}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">이메일:</span>
                                            <span>{selectedCustomer.email}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">연락처:</span>
                                            <span>{selectedCustomer.phone}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">직책:</span>
                                            <span>{selectedCustomer.position}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <Label>회사정보</Label>
                                        <div className="space-y-2 mt-2">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">회사명:</span>
                                            <span>{selectedCustomer.company}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">업종:</span>
                                            <span>{selectedCustomer.industry}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">직원 수:</span>
                                            <span>{selectedCustomer.employees}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">매출:</span>
                                            <span>{selectedCustomer.revenue}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <Label>세일즈 정보</Label>
                                      <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">현재 단계:</span>
                                          <Badge variant="outline" className={getStageInfo(selectedCustomer.stage)?.color}>
                                            {getStageInfo(selectedCustomer.stage)?.name}
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">점수:</span>
                                          <span className={getScoreColor(selectedCustomer.score)}>{selectedCustomer.score}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">예산:</span>
                                          <span>{selectedCustomer.budget}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">시간계획:</span>
                                          <span>{selectedCustomer.timeline}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <Label>노트</Label>
                                      <Textarea value={selectedCustomer.notes} readOnly className="mt-2" />
                                    </div>

                                    <div className="flex gap-2">
                                      <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961]">
                                        <Edit className="w-4 h-4 mr-2" />
                                        수정
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <Phone className="w-4 h-4 mr-2" />
                                        통화
                                      </Button>
                                      <Button size="sm" variant="outline">
                                        <Mail className="w-4 h-4 mr-2" />
                                        이메일
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  전환율 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnelStages.slice(0, -1).map((stage) => (
                    <div key={stage.stage} className="flex items-center justify-between">
                      <span className="text-sm">{stage.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={stage.conversionRate} className="w-20 h-2" />
                        <span className="text-sm font-medium">{stage.conversionRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  고객 점수 분포
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">높음 (80+)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-green-200 rounded">
                        <div className="h-2 bg-green-600 rounded" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-medium">{customers.filter(c => c.score >= 80).length}명</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">보통 (60-79)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-yellow-200 rounded">
                        <div className="h-2 bg-yellow-600 rounded" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm font-medium">{customers.filter(c => c.score >= 60 && c.score < 80).length}명</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">낮음 (60 미만)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-red-200 rounded">
                        <div className="h-2 bg-red-600 rounded" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm font-medium">{customers.filter(c => c.score < 60).length}명</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  이번 달 목표
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">신규 계약</span>
                      <span className="text-sm font-medium">2/5</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">리드 생성</span>
                      <span className="text-sm font-medium">12/20</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">매출 목표</span>
                      <span className="text-sm font-medium">3억/5억</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          {/* Activity Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                영업 활동 관리
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium">김기업 - 제안서 발송</div>
                      <div className="text-sm text-gray-600">오늘 마감 (2024.01.22)</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    완료 처리
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <div>
                      <div className="font-medium">박스타트 - 최종 미팅</div>
                      <div className="text-sm text-gray-600">내일 예정 (2024.01.21)</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    일정 확인
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">이제조 - 업계 사례 공유</div>
                      <div className="text-sm text-gray-600">2024.01.23 예정</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    자료 준비
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <div>
                      <div className="font-medium">최마케팅 - 서비스 소개 통화</div>
                      <div className="text-sm text-gray-600">2024.01.24 예정</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    통화 준비
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}