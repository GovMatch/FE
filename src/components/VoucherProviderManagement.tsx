import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";

interface Provider {
  id: string;
  name: string;
  ceoName: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  establishedYear: number;
  employeeCount: number;
  specializations: string[];
  certifications: string[];
  rating: number;
  completedProjects: number;
  ongoingProjects: number;
  status: 'active' | 'inactive' | 'pending';
  lastPerformanceReview: string;
}

interface VoucherProgram {
  id: string;
  name: string;
  type: string;
  budget: string;
  providersCount: number;
  status: 'active' | 'closed';
}

interface ProviderAssignment {
  id: string;
  voucherId: string;
  voucherName: string;
  providerId: string;
  providerName: string;
  assignedDate: string;
  contractAmount: string;
  performanceScore: number;
  status: 'active' | 'completed' | 'suspended';
}

export function VoucherProviderManagement() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isProviderDialogOpen, setIsProviderDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [editingVoucher, setEditingVoucher] = useState<VoucherProgram | null>(null);
  
  // State for managing voucher programs and providers
  const [voucherProgramsList, setVoucherProgramsList] = useState<VoucherProgram[]>([
    {
      id: "1",
      name: "디지털혁신바우쳐",
      type: "기술혁신",
      budget: "최대 2,000만원",
      providersCount: 45,
      status: "active"
    },
    {
      id: "2", 
      name: "스마트제조바우쳐",
      type: "제조혁신",
      budget: "최대 2,000만원",
      providersCount: 32,
      status: "active"
    },
    {
      id: "3",
      name: "혁신바우처(일반)",
      type: "일반혁신",
      budget: "최대 2,000만원",
      providersCount: 67,
      status: "active"
    },
    {
      id: "4",
      name: "온라인판로개척바우쳐",
      type: "마케팅",
      budget: "최대 1,000만원",
      providersCount: 28,
      status: "active"
    },
    {
      id: "5",
      name: "해외진출바우쳐",
      type: "글로벌",
      budget: "최대 3,000만원",
      providersCount: 15,
      status: "active"
    }
  ]);

  const [providersList, setProvidersList] = useState<Provider[]>([
    {
      id: "1",
      name: "㈜테크솔루션",
      ceoName: "김대표",
      registrationNumber: "123-45-67890",
      address: "서울시 강남구 테헤란로 123",
      phone: "02-1234-5678",
      email: "info@techsolution.co.kr",
      website: "www.techsolution.co.kr",
      establishedYear: 2015,
      employeeCount: 25,
      specializations: ["AI/ML", "IoT", "클라우드"],
      certifications: ["ISO 9001", "ISO 27001", "CMMI Level 3"],
      rating: 4.8,
      completedProjects: 156,
      ongoingProjects: 12,
      status: "active",
      lastPerformanceReview: "2024.01.15"
    },
    {
      id: "2",
      name: "㈜스마트팩토리코리아",
      ceoName: "박대표",
      registrationNumber: "234-56-78901",
      address: "경기도 성남시 분당구 판교로 456",
      phone: "031-2345-6789",
      email: "contact@smartfactory.co.kr",
      website: "www.smartfactory.co.kr",
      establishedYear: 2012,
      employeeCount: 45,
      specializations: ["스마트팩토리", "MES", "자동화"],
      certifications: ["ISO 9001", "KS 인증"],
      rating: 4.6,
      completedProjects: 89,
      ongoingProjects: 8,
      status: "active",
      lastPerformanceReview: "2024.01.10"
    },
    {
      id: "3",
      name: "㈜디지털마케팅",
      ceoName: "이대표",
      registrationNumber: "345-67-89012",
      address: "서울시 마포구 홍대로 789",
      phone: "02-3456-7890",
      email: "hello@digitalmarketing.co.kr",
      establishedYear: 2018,
      employeeCount: 18,
      specializations: ["디지털마케팅", "콘텐츠제작", "SNS운영"],
      certifications: ["구글 파트너", "페이스북 파트너"],
      rating: 4.4,
      completedProjects: 234,
      ongoingProjects: 15,
      status: "active",
      lastPerformanceReview: "2024.01.08"
    },
    {
      id: "4",
      name: "㈜글로벌컨설팅",
      ceoName: "최대표",
      registrationNumber: "456-78-90123",
      address: "서울시 중구 을지로 321",
      phone: "02-4567-8901",
      email: "info@globalconsulting.co.kr",
      establishedYear: 2010,
      employeeCount: 32,
      specializations: ["해외진출", "수출컨설팅", "FTA활용"],
      certifications: ["무역협회 인증", "KOTRA 파트너"],
      rating: 4.7,
      completedProjects: 78,
      ongoingProjects: 6,
      status: "pending",
      lastPerformanceReview: "2023.12.20"
    }
  ]);



  // Mock data for provider assignments
  const providerAssignments: ProviderAssignment[] = [
    {
      id: "1",
      voucherId: "1",
      voucherName: "디지털혁신바우쳐",
      providerId: "1",
      providerName: "㈜테크솔루션",
      assignedDate: "2024.01.01",
      contractAmount: "2,000만원",
      performanceScore: 94,
      status: "active"
    },
    {
      id: "2",
      voucherId: "2",
      voucherName: "스마트제조바우쳐",
      providerId: "2",
      providerName: "㈜스마트팩토리코리아",
      assignedDate: "2024.01.01",
      contractAmount: "2,000만원",
      performanceScore: 91,
      status: "active"
    },
    {
      id: "3",
      voucherId: "4",
      voucherName: "온라인판로개척바우쳐",
      providerId: "3",
      providerName: "㈜디지털마케팅",
      assignedDate: "2024.01.01",
      contractAmount: "1,000만원",
      performanceScore: 87,
      status: "active"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">활성</Badge>;
      case 'inactive':
        return <Badge variant="secondary">비활성</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">검토중</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">완료</Badge>;
      case 'suspended':
        return <Badge variant="destructive">중단</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleEditProvider = (provider: Provider) => {
    setEditingProvider(provider);
    setIsProviderDialogOpen(true);
  };

  const handleAddProvider = () => {
    setEditingProvider(null);
    setIsProviderDialogOpen(true);
  };

  const handleAddVoucher = () => {
    setEditingVoucher(null);
    setIsVoucherDialogOpen(true);
  };

  const handleEditVoucher = (voucher: VoucherProgram) => {
    setEditingVoucher(voucher);
    setIsVoucherDialogOpen(true);
  };

  const handleSaveVoucher = () => {
    // Implement voucher save logic here
    setIsVoucherDialogOpen(false);
  };

  const handleSaveProvider = () => {
    // Implement provider save logic here
    setIsProviderDialogOpen(false);
  };

  const handleSaveAssignment = () => {
    // Implement assignment save logic here
    setIsAssignmentDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {providersList.filter(p => p.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">활성 수행기관</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {voucherProgramsList.length}
            </div>
            <div className="text-sm text-gray-600">바우쳐 사업</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {providerAssignments.filter(a => a.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">활성 계약</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {(providersList.reduce((sum, p) => sum + p.rating, 0) / providersList.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">평균 평점</div>
          </CardContent>
        </Card>
      </div>

      {/* Voucher Programs Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>바우쳐 사업별 수행기관 현황</CardTitle>
            <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961]" onClick={handleAddVoucher}>
              <Plus className="w-4 h-4 mr-2" />
              바우쳐 사업 추가
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>바우쳐 사업명</TableHead>
                <TableHead>사업 유형</TableHead>
                <TableHead>지원 예산</TableHead>
                <TableHead>등록 수행기관</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {voucherProgramsList.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.type}</Badge>
                  </TableCell>
                  <TableCell>{program.budget}</TableCell>
                  <TableCell>{program.providersCount}개</TableCell>
                  <TableCell>{getStatusBadge(program.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEditVoucher(program)}>
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

      {/* Provider Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>수행기관 관리</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="수행기관 검색..." className="pl-10 w-64" />
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="active">활성</SelectItem>
                  <SelectItem value="inactive">비활성</SelectItem>
                  <SelectItem value="pending">검토중</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961]" onClick={handleAddProvider}>
                <Plus className="w-4 h-4 mr-2" />
                수행기관 등록
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>기관명</TableHead>
                <TableHead>대표자</TableHead>
                <TableHead>전문분야</TableHead>
                <TableHead>직원수</TableHead>
                <TableHead>완료 프로젝트</TableHead>
                <TableHead>평점</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providersList
                .filter(provider => selectedFilter === 'all' || provider.status === selectedFilter)
                .map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{provider.name}</div>
                      <div className="text-sm text-gray-600">{provider.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{provider.ceoName}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {provider.specializations.slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {provider.specializations.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.specializations.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{provider.employeeCount}명</TableCell>
                  <TableCell>{provider.completedProjects}건</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        ⭐ {provider.rating}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(provider.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEditProvider(provider)}>
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

      {/* Provider Assignments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>바우쳐별 수행기관 배정 현황</CardTitle>
            <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961]" onClick={() => setIsAssignmentDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              배정 추가
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>바우쳐 사업</TableHead>
                <TableHead>수행기관</TableHead>
                <TableHead>배정일</TableHead>
                <TableHead>계약금액</TableHead>
                <TableHead>성과점수</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providerAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.voucherName}</TableCell>
                  <TableCell>{assignment.providerName}</TableCell>
                  <TableCell>{assignment.assignedDate}</TableCell>
                  <TableCell>{assignment.contractAmount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2 max-w-16">
                        <div 
                          className="bg-[#58d674] h-2 rounded-full" 
                          style={{ width: `${assignment.performanceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{assignment.performanceScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(assignment.status)}</TableCell>
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

      {/* Provider Registration/Edit Dialog */}
      <Dialog open={isProviderDialogOpen} onOpenChange={setIsProviderDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProvider ? '수행기관 정보 수정' : '신규 수행기관 등록'}
            </DialogTitle>
            <DialogDescription>
              {editingProvider ? '수행기관의 정보를 수정합니다.' : '새로운 수행기관을 등록합니다. 필수 항목을 모두 입력해 주세요.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="providerName">기관명 *</Label>
                <Input 
                  id="providerName" 
                  placeholder="기관명을 입력하세요"
                  defaultValue={editingProvider?.name || ''}
                />
              </div>
              <div>
                <Label htmlFor="ceoName">대표자명 *</Label>
                <Input 
                  id="ceoName" 
                  placeholder="대표자명을 입력하세요"
                  defaultValue={editingProvider?.ceoName || ''}
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">사업자등록번호 *</Label>
                <Input 
                  id="registrationNumber" 
                  placeholder="123-45-67890"
                  defaultValue={editingProvider?.registrationNumber || ''}
                />
              </div>
              <div>
                <Label htmlFor="phone">연락처 *</Label>
                <Input 
                  id="phone" 
                  placeholder="02-1234-5678"
                  defaultValue={editingProvider?.phone || ''}
                />
              </div>
              <div>
                <Label htmlFor="email">이메일 *</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="info@company.co.kr"
                  defaultValue={editingProvider?.email || ''}
                />
              </div>
              <div>
                <Label htmlFor="website">웹사이트</Label>
                <Input 
                  id="website" 
                  placeholder="www.company.co.kr"
                  defaultValue={editingProvider?.website || ''}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">주소 *</Label>
                <Textarea 
                  id="address" 
                  placeholder="주소를 입력하세요"
                  defaultValue={editingProvider?.address || ''}
                />
              </div>
              <div>
                <Label htmlFor="establishedYear">설립연도</Label>
                <Input 
                  id="establishedYear" 
                  type="number"
                  placeholder="2015"
                  defaultValue={editingProvider?.establishedYear || ''}
                />
              </div>
              <div>
                <Label htmlFor="employeeCount">직원수</Label>
                <Input 
                  id="employeeCount" 
                  type="number"
                  placeholder="25"
                  defaultValue={editingProvider?.employeeCount || ''}
                />
              </div>
              <div>
                <Label htmlFor="specializations">전문분야 (쉼표로 구분)</Label>
                <Input 
                  id="specializations" 
                  placeholder="AI/ML, IoT, 클라우드"
                  defaultValue={editingProvider?.specializations.join(', ') || ''}
                />
              </div>
              <div>
                <Label htmlFor="certifications">보유 인증 (쉼표로 구분)</Label>
                <Input 
                  id="certifications" 
                  placeholder="ISO 9001, ISO 27001"
                  defaultValue={editingProvider?.certifications.join(', ') || ''}
                />
              </div>
              <div>
                <Label htmlFor="voucherProgram">소속 바우쳐 사업 *</Label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="바우쳐 사업을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {voucherProgramsList.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">상태</Label>
                <Select defaultValue={editingProvider?.status || 'pending'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">활성</SelectItem>
                    <SelectItem value="inactive">비활성</SelectItem>
                    <SelectItem value="pending">검토중</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsProviderDialogOpen(false)}>
              취소
            </Button>
            <Button className="bg-[#58d674] hover:bg-[#4bc961]" onClick={handleSaveProvider}>
              {editingProvider ? '수정' : '등록'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assignment Dialog */}
      <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>바우쳐 수행기관 배정</DialogTitle>
            <DialogDescription>
              바우쳐 사업에 수행기관을 배정합니다. 사업과 기관을 선택해 주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="voucherSelect">바우쳐 사업 선택 *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="바우쳐 사업을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {voucherProgramsList.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="providerSelect">수행기관 선택 *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="수행기관을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {providersList.filter(p => p.status === 'active').map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contractAmount">계약금액</Label>
              <Input 
                id="contractAmount" 
                placeholder="2,000만원"
              />
            </div>
            <div>
              <Label htmlFor="assignedDate">배정일</Label>
              <Input 
                id="assignedDate" 
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAssignmentDialogOpen(false)}>
              취소
            </Button>
            <Button className="bg-[#58d674] hover:bg-[#4bc961]" onClick={handleSaveAssignment}>
              배정
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voucher Program Creation/Edit Dialog */}
      <Dialog open={isVoucherDialogOpen} onOpenChange={setIsVoucherDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingVoucher ? '바우쳐 사업 수정' : '새 바우쳐 사업 생성'}
            </DialogTitle>
            <DialogDescription>
              {editingVoucher ? '바우쳐 사업 정보를 수정합니다.' : '새로운 바우쳐 사업을 생성합니다. 사업 정보를 입력해 주세요.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="voucherName">바우쳐 사업명 *</Label>
              <Input 
                id="voucherName" 
                placeholder="예: 디지털혁신바우쳐"
                defaultValue={editingVoucher?.name || ''}
              />
            </div>
            <div>
              <Label htmlFor="voucherType">사업 유형 *</Label>
              <Select defaultValue={editingVoucher?.type || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="사업 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="기술혁신">기술혁신</SelectItem>
                  <SelectItem value="제조혁신">제조혁신</SelectItem>
                  <SelectItem value="일반혁신">일반혁신</SelectItem>
                  <SelectItem value="마케팅">마케팅</SelectItem>
                  <SelectItem value="글로벌">글로벌</SelectItem>
                  <SelectItem value="컨설팅">컨설팅</SelectItem>
                  <SelectItem value="디지털전환">디지털전환</SelectItem>
                  <SelectItem value="ESG">ESG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="voucherBudget">지원 예산 *</Label>
              <Input 
                id="voucherBudget" 
                placeholder="예: 최대 2,000만원"
                defaultValue={editingVoucher?.budget || ''}
              />
            </div>
            <div>
              <Label htmlFor="voucherDescription">사업 설명</Label>
              <Textarea 
                id="voucherDescription" 
                placeholder="바우쳐 사업에 대한 상세 설명을 입력하세요"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="supportAreas">지원 분야 (쉼표로 구분)</Label>
              <Input 
                id="supportAreas" 
                placeholder="예: AI/ML, IoT, 클라우드, 빅데이터"
              />
            </div>
            <div>
              <Label htmlFor="targetCompanies">대상 기업 (쉼표로 구분)</Label>
              <Input 
                id="targetCompanies" 
                placeholder="예: 중소기업, 벤처기업, 스타트업"
              />
            </div>
            <div>
              <Label htmlFor="voucherStatus">사업 상태</Label>
              <Select defaultValue={editingVoucher?.status || 'active'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">활성</SelectItem>
                  <SelectItem value="closed">종료</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsVoucherDialogOpen(false)}>
              취소
            </Button>
            <Button className="bg-[#58d674] hover:bg-[#4bc961]" onClick={handleSaveVoucher}>
              {editingVoucher ? '수정' : '생성'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}