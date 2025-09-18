import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Textarea } from "./ui/textarea";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff, 
  Percent, 
  Users, 
  Gift,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PromoCode {
  id: string;
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'trial';
  value: number;
  description: string;
  maxUses: number;
  currentUses: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  targetAudience: string;
  minimumPurchase?: number;
}

interface PromoCodeFormData {
  code: string;
  name: string;
  type: 'percentage' | 'fixed' | 'trial';
  value: number;
  description: string;
  maxUses: number;
  validFrom: string;
  validUntil: string;
  targetAudience: string;
  minimumPurchase?: number;
}

export function PromoCodeManagement() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: '1',
      code: 'WELCOME2024',
      name: '신규 가입자 혜택',
      type: 'trial',
      value: 30,
      description: '신규 가입자를 위한 30일 무료 체험',
      maxUses: 1000,
      currentUses: 247,
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      isActive: true,
      targetAudience: '신규 가입자',
      minimumPurchase: 0
    },
    {
      id: '2',
      code: 'PREMIUM50',
      name: '프리미엄 50% 할인',
      type: 'percentage',
      value: 50,
      description: '프리미엄 플랜 첫 달 50% 할인',
      maxUses: 500,
      currentUses: 89,
      validFrom: '2024-01-15',
      validUntil: '2024-03-15',
      isActive: true,
      targetAudience: '베이직 플랜 사용자',
      minimumPurchase: 29000
    },
    {
      id: '3',
      code: 'ENTERPRISE2024',
      name: '기업 고객 특가',
      type: 'fixed',
      value: 50000,
      description: '엔터프라이즈 플랜 첫 달 5만원 할인',
      maxUses: 100,
      currentUses: 12,
      validFrom: '2024-02-01',
      validUntil: '2024-04-30',
      isActive: true,
      targetAudience: '기업 고객',
      minimumPurchase: 99000
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
  const [formData, setFormData] = useState<PromoCodeFormData>({
    code: '',
    name: '',
    type: 'percentage',
    value: 0,
    description: '',
    maxUses: 100,
    validFrom: '',
    validUntil: '',
    targetAudience: '',
    minimumPurchase: 0
  });

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  const handleSubmit = () => {
    if (editingCode) {
      // 수정
      setPromoCodes(prev => 
        prev.map(code => 
          code.id === editingCode.id 
            ? { 
                ...editingCode, 
                ...formData, 
                id: editingCode.id,
                currentUses: editingCode.currentUses,
                isActive: editingCode.isActive 
              }
            : code
        )
      );
      toast.success("프로모션 코드가 수정되었습니다.");
    } else {
      // 새로 생성
      const newCode: PromoCode = {
        ...formData,
        id: Date.now().toString(),
        currentUses: 0,
        isActive: true
      };
      setPromoCodes(prev => [...prev, newCode]);
      toast.success("프로모션 코드가 생성되었습니다.");
    }

    // 폼 초기화
    setFormData({
      code: '',
      name: '',
      type: 'percentage',
      value: 0,
      description: '',
      maxUses: 100,
      validFrom: '',
      validUntil: '',
      targetAudience: '',
      minimumPurchase: 0
    });
    setEditingCode(null);
    setIsCreateModalOpen(false);
  };

  const handleEdit = (code: PromoCode) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      name: code.name,
      type: code.type,
      value: code.value,
      description: code.description,
      maxUses: code.maxUses,
      validFrom: code.validFrom,
      validUntil: code.validUntil,
      targetAudience: code.targetAudience,
      minimumPurchase: code.minimumPurchase || 0
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("정말로 이 프로모션 코드를 삭제하시겠습니까?")) {
      setPromoCodes(prev => prev.filter(code => code.id !== id));
      toast.success("프로모션 코드가 삭제되었습니다.");
    }
  };

  const toggleActive = (id: string) => {
    setPromoCodes(prev =>
      prev.map(code =>
        code.id === id ? { ...code, isActive: !code.isActive } : code
      )
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("클립보드에 복사되었습니다.");
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage': return '퍼센트 할인';
      case 'fixed': return '정액 할인';
      case 'trial': return '무료 체험';
      default: return type;
    }
  };

  const getValueDisplay = (code: PromoCode) => {
    switch (code.type) {
      case 'percentage': return `${code.value}%`;
      case 'fixed': return `${code.value.toLocaleString()}원`;
      case 'trial': return `${code.value}일`;
      default: return code.value;
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">프로모션 코드 관리</h2>
        <Button 
          onClick={() => {
            setEditingCode(null);
            setFormData({
              code: '',
              name: '',
              type: 'percentage',
              value: 0,
              description: '',
              maxUses: 100,
              validFrom: '',
              validUntil: '',
              targetAudience: '',
              minimumPurchase: 0
            });
            setIsCreateModalOpen(true);
          }}
          className="bg-[#58d674] hover:bg-[#45c762]"
        >
          <Plus className="w-4 h-4 mr-2" />
          새 프로모션 코드
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 코드</p>
                <p className="text-2xl font-bold">{promoCodes.length}</p>
              </div>
              <Gift className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">활성 코드</p>
                <p className="text-2xl font-bold text-green-600">
                  {promoCodes.filter(code => code.isActive).length}
                </p>
              </div>
              <Check className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 사용량</p>
                <p className="text-2xl font-bold">
                  {promoCodes.reduce((sum, code) => sum + code.currentUses, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">사용률</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    (promoCodes.reduce((sum, code) => sum + code.currentUses, 0) /
                     promoCodes.reduce((sum, code) => sum + code.maxUses, 0)) * 100
                  )}%
                </p>
              </div>
              <Percent className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 프로모션 코드 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>프로모션 코드 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>코드</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>타입</TableHead>
                <TableHead>할인값</TableHead>
                <TableHead>사용량</TableHead>
                <TableHead>유효기간</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {code.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(code.code)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{code.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getTypeLabel(code.type)}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{getValueDisplay(code)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className={code.currentUses >= code.maxUses ? 'text-red-600' : 'text-gray-900'}>
                        {code.currentUses}
                      </span>
                      <span className="text-gray-500">/{code.maxUses}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {new Date(code.validFrom).toLocaleDateString()} ~<br />
                      {new Date(code.validUntil).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(code.id)}
                      className={code.isActive ? 'text-green-600' : 'text-gray-400'}
                    >
                      {code.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(code)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(code.id)}
                        className="text-red-600 hover:text-red-700"
                      >
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

      {/* 생성/수정 모달 */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCode ? '프로모션 코드 수정' : '새 프로모션 코드 생성'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">프로모션 코드</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    placeholder="PROMO2024"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateRandomCode}
                  >
                    자동생성
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">코드 이름</Label>
                <Input
                  id="name"
                  placeholder="신규 가입자 혜택"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">할인 타입</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">퍼센트 할인</SelectItem>
                    <SelectItem value="fixed">정액 할인</SelectItem>
                    <SelectItem value="trial">무료 체험</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">
                  {formData.type === 'percentage' ? '할인율 (%)' : 
                   formData.type === 'fixed' ? '할인금액 (원)' : '무료 기간 (일)'}
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="프로모션 코드에 대한 설명을 입력하세요"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxUses">최대 사용 횟수</Label>
                <Input
                  id="maxUses"
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxUses: parseInt(e.target.value) || 0 }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumPurchase">최소 구매금액 (원)</Label>
                <Input
                  id="minimumPurchase"
                  type="number"
                  value={formData.minimumPurchase || 0}
                  onChange={(e) => setFormData(prev => ({ ...prev, minimumPurchase: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validFrom">유효 시작일</Label>
                <Input
                  id="validFrom"
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validUntil">유효 종료일</Label>
                <Input
                  id="validUntil"
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">대상 고객</Label>
              <Input
                id="targetAudience"
                placeholder="신규 가입자, 기업 고객 등"
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                취소
              </Button>
              <Button onClick={handleSubmit} className="bg-[#58d674] hover:bg-[#45c762]">
                {editingCode ? '수정' : '생성'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function PromoCodeInput({ onApply }: { onApply?: (code: string) => void }) {
  const [promoCode, setPromoCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [discount, setDiscount] = useState<{ type: string; value: number } | null>(null);

  const handleApplyCode = () => {
    // 실제로는 API를 호출하여 프로모션 코드를 검증
    const validCodes = {
      'WELCOME2024': { type: 'trial', value: 30 },
      'PREMIUM50': { type: 'percentage', value: 50 },
      'ENTERPRISE2024': { type: 'fixed', value: 50000 }
    };

    if (validCodes[promoCode.toUpperCase() as keyof typeof validCodes]) {
      const codeInfo = validCodes[promoCode.toUpperCase() as keyof typeof validCodes];
      setDiscount(codeInfo);
      setIsApplied(true);
      onApply?.(promoCode);
      toast.success("프로모션 코드가 적용되었습니다!");
    } else {
      toast.error("유효하지 않은 프로모션 코드입니다.");
    }
  };

  const handleRemoveCode = () => {
    setPromoCode("");
    setIsApplied(false);
    setDiscount(null);
    toast.success("프로모션 코드가 제거되었습니다.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#58d674]" />
          프로모션 코드
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isApplied ? (
          <div className="flex gap-2">
            <Input
              placeholder="프로모션 코드 입력"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyCode()}
            />
            <Button onClick={handleApplyCode} disabled={!promoCode.trim()}>
              적용
            </Button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">코드 적용됨: {promoCode}</span>
                </div>
                <p className="text-sm text-green-600">
                  {discount?.type === 'percentage' && `${discount.value}% 할인`}
                  {discount?.type === 'fixed' && `${discount.value.toLocaleString()}원 할인`}
                  {discount?.type === 'trial' && `${discount.value}일 무료 체험`}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemoveCode}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}