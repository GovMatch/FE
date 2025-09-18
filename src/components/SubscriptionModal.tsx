import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Bell, Check, X, Star, Crown, Gem } from "lucide-react";

interface SubscriptionPreferences {
  industries: string[];
  supportTypes: string[];
  budgetRange: string;
  urgencyLevel: string;
  emailFrequency: string;
  pushNotifications: boolean;
  keywords: string[];
}

interface SubscriptionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (preferences: SubscriptionPreferences) => void;
  currentPreferences?: SubscriptionPreferences;
}

export function SubscriptionModal({ isOpen, onClose, onSave, currentPreferences }: SubscriptionModalProps) {
  const [preferences, setPreferences] = useState<SubscriptionPreferences>(
    currentPreferences || {
      industries: [],
      supportTypes: [],
      budgetRange: "",
      urgencyLevel: "",
      emailFrequency: "daily",
      pushNotifications: true,
      keywords: []
    }
  );

  const [newKeyword, setNewKeyword] = useState("");

  const industries = [
    "제조업", "IT/소프트웨어", "바이오/헬스케어", "에너지/환경", 
    "농업/식품", "문화/콘텐츠", "서비스업", "건설/부동산", "유통/무역"
  ];

  const supportTypes = [
    "R&D 지원", "창업 지원", "수출 지원", "인력 지원", 
    "시설/장비 지원", "컨설팅", "마케팅 지원", "금융 지원"
  ];

  const budgetRanges = [
    "1천만원 미만", "1천만원~5천만원", "5천만원~1억원", 
    "1억원~5억원", "5억원~10억원", "10억원 이상"
  ];

  const urgencyLevels = [
    "매우 급함 (D-7 이내)", "급함 (D-14 이내)", 
    "보통 (D-30 이내)", "여유 있음 (D-30 이후)"
  ];

  const emailFrequencies = [
    { value: "realtime", label: "실시간" },
    { value: "daily", label: "매일" },
    { value: "weekly", label: "매주" },
    { value: "monthly", label: "매월" }
  ];

  const handleIndustryChange = (industry: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      industries: checked 
        ? [...prev.industries, industry]
        : prev.industries.filter(i => i !== industry)
    }));
  };

  const handleSupportTypeChange = (type: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      supportTypes: checked 
        ? [...prev.supportTypes, type]
        : prev.supportTypes.filter(t => t !== type)
    }));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !preferences.keywords.includes(newKeyword.trim())) {
      setPreferences(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setPreferences(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleSave = () => {
    onSave?.(preferences);
    onClose?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#58d674]" />
            맞춤 알림 구독 설정
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 업종 선택 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">관심 업종</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industries.map(industry => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={industry}
                      checked={preferences.industries.includes(industry)}
                      onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                    />
                    <Label htmlFor={industry} className="text-sm">{industry}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 지원 유형 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">지원 유형</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {supportTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={preferences.supportTypes.includes(type)}
                      onCheckedChange={(checked) => handleSupportTypeChange(type, checked as boolean)}
                    />
                    <Label htmlFor={type} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 예산 범위 및 긴급도 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">예산 범위</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={preferences.budgetRange} onValueChange={(value) => setPreferences(prev => ({ ...prev, budgetRange: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="예산 범위 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map(range => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">긴급도</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={preferences.urgencyLevel} onValueChange={(value) => setPreferences(prev => ({ ...prev, urgencyLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="긴급도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* 키워드 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">관심 키워드</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="키워드 입력"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                />
                <Button onClick={addKeyword} variant="outline">추가</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {preferences.keywords.map(keyword => (
                  <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                    {keyword}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeKeyword(keyword)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 알림 설정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">알림 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pushNotifications"
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, pushNotifications: checked as boolean }))}
                />
                <Label htmlFor="pushNotifications">푸시 알림 받기</Label>
              </div>
              
              <div>
                <Label htmlFor="emailFrequency" className="text-sm mb-2 block">이메일 발송 주기</Label>
                <Select value={preferences.emailFrequency} onValueChange={(value) => setPreferences(prev => ({ ...prev, emailFrequency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {emailFrequencies.map(freq => (
                      <SelectItem key={freq.value} value={freq.value}>{freq.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>취소</Button>
            <Button onClick={handleSave} className="bg-[#58d674] hover:bg-[#45c762]">
              <Check className="w-4 h-4 mr-2" />
              설정 저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SubscriptionPlans() {
  const plans = [
    {
      name: "베이직",
      price: "무료",
      icon: Star,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      features: [
        "월 5개 매칭 알림",
        "기본 필터링",
        "이메일 알림",
        "기본 지원"
      ],
      limitations: [
        "실시간 알림 불가",
        "키워드 제한 (3개)",
        "상세 분석 불가"
      ]
    },
    {
      name: "프리미엄",
      price: "월 29,000원",
      icon: Crown,
      color: "text-[#58d674]",
      bgColor: "bg-[#58d674]/5",
      popular: true,
      features: [
        "무제한 매칭 알림",
        "고급 필터링",
        "실시간 푸시 알림",
        "맞춤 분석 리포트",
        "우선 고객 지원",
        "무제한 키워드"
      ],
      limitations: []
    },
    {
      name: "엔터프라이즈",
      price: "월 99,000원",
      icon: Gem,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "프리미엄 모든 기능",
        "전담 매니저 배정",
        "맞춤 컨설팅",
        "API 연동 지원",
        "고급 분석 대시보드",
        "24/7 전화 지원"
      ],
      limitations: []
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <Card key={index} className={`relative ${plan.popular ? 'border-[#58d674] shadow-lg' : ''}`}>
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-[#58d674] text-white">인기</Badge>
            </div>
          )}
          <CardHeader className={`text-center ${plan.bgColor}`}>
            <div className="flex justify-center mb-2">
              <plan.icon className={`w-8 h-8 ${plan.color}`} />
            </div>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <div className="text-2xl font-bold text-gray-800">{plan.price}</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-green-700 mb-2">포함 기능</h4>
              <ul className="space-y-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {plan.limitations.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-600 mb-2">제한사항</h4>
                <ul className="space-y-1">
                  {plan.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <X className="w-4 h-4 text-gray-400" />
                      {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button 
              className={`w-full ${
                plan.popular 
                  ? 'bg-[#58d674] hover:bg-[#45c762] text-white' 
                  : 'border border-gray-300 hover:border-[#58d674]'
              }`}
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.price === "무료" ? "현재 플랜" : "업그레이드"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}