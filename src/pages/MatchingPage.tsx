import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Progress } from "../components/ui/progress";
import { Textarea } from "../components/ui/textarea";
import { Building2, Users, Calendar, DollarSign, CheckCircle, ArrowRight, ArrowLeft, Target } from "lucide-react";
import type { PageType } from "../components/Router";

interface MatchingPageProps {
  onNavigate: (page: PageType) => void;
}

export function MatchingPage({ onNavigate }: MatchingPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    businessPurpose: "", // 업종 대신 사업 목적/하고자 하는 일
    employees: "",
    annualRevenue: "",
    establishedYear: "",
    region: "",
    targetPrograms: [] as string[],
    urgency: "",
    voucherInterest: [] as string[] // 바우처 관심 분야 추가
  });

  const totalSteps = 3; // 4단계에서 3단계로 축소
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/programs/matching", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("매칭 결과:", result);
        alert("매칭 분석이 완료되었습니다! 결과를 확인해보세요.");
        // TODO: 매칭 결과 페이지로 이동 또는 결과 표시
      } else {
        throw new Error("매칭 분석 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("매칭 분석 오류:", error);
      alert("매칭 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#58d674]" />
                기업 기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="companyName">기업명</Label>
                <Input
                  id="companyName"
                  placeholder="기업명을 입력해주세요"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="businessType">사업자 유형</Label>
                <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="사업자 유형을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporation">법인</SelectItem>
                    <SelectItem value="individual">개인사업자</SelectItem>
                    <SelectItem value="startup">스타트업</SelectItem>
                    <SelectItem value="social">사회적기업</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="businessPurpose">사업 목적/하고자 하는 일</Label>
                <Textarea
                  id="businessPurpose"
                  placeholder="사업 목적/하고자 하는 일을 입력해주세요"
                  value={formData.businessPurpose}
                  onChange={(e) => setFormData({...formData, businessPurpose: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="establishedYear">설립연도</Label>
                <Input
                  id="establishedYear"
                  type="number"
                  placeholder="2020"
                  value={formData.establishedYear}
                  onChange={(e) => setFormData({...formData, establishedYear: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-[#58d674]" />
                기업 규모 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>직원 수</Label>
                <RadioGroup 
                  value={formData.employees} 
                  onValueChange={(value) => setFormData({...formData, employees: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-9" id="emp1" />
                    <Label htmlFor="emp1">1-9명</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10-49" id="emp2" />
                    <Label htmlFor="emp2">10-49명</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="50-99" id="emp3" />
                    <Label htmlFor="emp3">50-99명</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="100+" id="emp4" />
                    <Label htmlFor="emp4">100명 이상</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>연 매출액</Label>
                <RadioGroup 
                  value={formData.annualRevenue} 
                  onValueChange={(value) => setFormData({...formData, annualRevenue: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under-1b" id="rev1" />
                    <Label htmlFor="rev1">10억원 미만</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1b-10b" id="rev2" />
                    <Label htmlFor="rev2">10억원-100억원</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10b-50b" id="rev3" />
                    <Label htmlFor="rev3">100억원-500억원</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over-50b" id="rev4" />
                    <Label htmlFor="rev4">500억원 이상</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="region">소재지</Label>
                <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="기업 소재지를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoul">서울특별시</SelectItem>
                    <SelectItem value="busan">부산광역시</SelectItem>
                    <SelectItem value="daegu">대구광역시</SelectItem>
                    <SelectItem value="incheon">인천광역시</SelectItem>
                    <SelectItem value="gwangju">광주광역시</SelectItem>
                    <SelectItem value="daejeon">대전광역시</SelectItem>
                    <SelectItem value="ulsan">울산광역시</SelectItem>
                    <SelectItem value="gyeonggi">경기도</SelectItem>
                    <SelectItem value="gangwon">강원도</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-[#58d674]" />
                지원 희망 분야
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>관심 있는 지원 분야 (복수 선택 가능)</Label>
                <div className="mt-3 space-y-3">
                  {[
                    { id: "01", label: "금융" },
                    { id: "02", label: "기술" },
                    { id: "03", label: "인력" },
                    { id: "04", label: "수출" },
                    { id: "05", label: "내수" },
                    { id: "06", label: "창업" },
                    { id: "07", label: "경영" },
                    { id: "09", label: "기타" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={formData.targetPrograms.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              targetPrograms: [...formData.targetPrograms, item.id]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              targetPrograms: formData.targetPrograms.filter(p => p !== item.id)
                            });
                          }
                        }}
                      />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>지원 시급성</Label>
                <RadioGroup 
                  value={formData.urgency} 
                  onValueChange={(value) => setFormData({...formData, urgency: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="urg1" />
                    <Label htmlFor="urg1">즉시 (1개월 내)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="urg2" />
                    <Label htmlFor="urg2">단기 (3개월 내)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="urg3" />
                    <Label htmlFor="urg3">중기 (6개월 내)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long" id="urg4" />
                    <Label htmlFor="urg4">장기 (1년 내)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>바우처 관심 분야 (복수 선택 가능)</Label>
                <div className="mt-3 space-y-3">
                  {[
                    { id: "voucher1", label: "바우처1" },
                    { id: "voucher2", label: "바우처2" },
                    { id: "voucher3", label: "바우처3" },
                    { id: "voucher4", label: "바우처4" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={formData.voucherInterest.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              voucherInterest: [...formData.voucherInterest, item.id]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              voucherInterest: formData.voucherInterest.filter(p => p !== item.id)
                            });
                          }
                        }}
                      />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                AI 매칭 분석
              </h1>
              <p className="text-gray-600">
                기업 정보를 입력하시면 최적의 정부지원사업을 매칭해드립니다
              </p>
            </div>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>단계 {currentStep} / {totalSteps}</span>
                <span>{Math.round(progress)}% 완료</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex justify-center items-center space-x-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep 
                      ? 'bg-[#58d674] text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      i + 1 < currentStep ? 'bg-[#58d674]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between max-w-2xl mx-auto">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              이전
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={handleNext}
                className="bg-[#58d674] hover:bg-[#4bc961] text-white flex items-center gap-2"
              >
                다음
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-[#58d674] hover:bg-[#4bc961] text-white flex items-center gap-2"
              >
                매칭 분석 시작
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}