import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { 
  User, 
  Mail, 
  Lock, 
  Building2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Users
} from "lucide-react";
import type { PageType } from "../components/Router";

interface SignupPageProps {
  onNavigate: (page: PageType) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: 계정 정보
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    
    // Step 2: 기업 정보
    companyName: "",
    businessNumber: "",
    industry: "",
    companyType: "",
    position: "",
    
    // Step 3: 추가 정보
    employees: "",
    annualRevenue: "",
    region: "",
    establishedYear: "",
    
    // Step 4: 약관 동의
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const totalSteps = 4;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직 (실제 환경에서는 API 호출)
    alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
    onNavigate('login');
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password && formData.confirmPassword && 
               formData.name && formData.phone && formData.password === formData.confirmPassword;
      case 2:
        return formData.companyName && formData.businessNumber && 
               formData.industry && formData.companyType && formData.position;
      case 3:
        return formData.employees && formData.annualRevenue && 
               formData.region && formData.establishedYear;
      case 4:
        return formData.agreeTerms && formData.agreePrivacy;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-[#58d674] mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-800">계정 정보</h2>
              <p className="text-gray-600">로그인에 사용할 계정 정보를 입력해주세요</p>
            </div>

            <div>
              <Label htmlFor="email">이메일 *</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">비밀번호 *</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8자 이상 입력해주세요"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">비밀번호 확인 *</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력해주세요"
                  className="pl-10 pr-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">이름 *</Label>
                <Input
                  id="name"
                  placeholder="이름을 입력해주세요"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">연락처 *</Label>
                <Input
                  id="phone"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building2 className="w-12 h-12 text-[#58d674] mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-800">기업 정보</h2>
              <p className="text-gray-600">소속 기업의 기본 정보를 입력해주세요</p>
            </div>

            <div>
              <Label htmlFor="companyName">회사명 *</Label>
              <Input
                id="companyName"
                placeholder="회사명을 입력해주세요"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="businessNumber">사업자등록번호 *</Label>
              <Input
                id="businessNumber"
                placeholder="000-00-00000"
                value={formData.businessNumber}
                onChange={(e) => setFormData({...formData, businessNumber: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="industry">업종 *</Label>
              <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="주요 업종을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">제조업</SelectItem>
                  <SelectItem value="it">IT/소프트웨어</SelectItem>
                  <SelectItem value="service">서비스업</SelectItem>
                  <SelectItem value="trade">도소매업</SelectItem>
                  <SelectItem value="construction">건설업</SelectItem>
                  <SelectItem value="food">식품업</SelectItem>
                  <SelectItem value="healthcare">의료/헬스케어</SelectItem>
                  <SelectItem value="education">교육</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>사업자 유형 *</Label>
              <RadioGroup 
                value={formData.companyType} 
                onValueChange={(value) => setFormData({...formData, companyType: value})}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="corporation" id="corp" />
                  <Label htmlFor="corp">법인</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual">개인사업자</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="startup" id="startup" />
                  <Label htmlFor="startup">스타트업</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="social" id="social" />
                  <Label htmlFor="social">사회적기업</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="position">직책 *</Label>
              <Input
                id="position"
                placeholder="대표이사, 팀장, 연구원 등"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="w-12 h-12 text-[#58d674] mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-800">기업 규모</h2>
              <p className="text-gray-600">정확한 매칭을 위한 추가 정보를 입력해주세요</p>
            </div>

            <div>
              <Label>직원 수 *</Label>
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
              <Label>연 매출액 *</Label>
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
              <Label htmlFor="region">소재지 *</Label>
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
                  <SelectItem value="chungbuk">충청북도</SelectItem>
                  <SelectItem value="chungnam">충청남도</SelectItem>
                  <SelectItem value="jeonbuk">전라북도</SelectItem>
                  <SelectItem value="jeonnam">전라남도</SelectItem>
                  <SelectItem value="gyeongbuk">경상북도</SelectItem>
                  <SelectItem value="gyeongnam">경상남도</SelectItem>
                  <SelectItem value="jeju">제주특별자치도</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="establishedYear">설립연도 *</Label>
              <Input
                id="establishedYear"
                type="number"
                placeholder="2020"
                min="1900"
                max="2024"
                value={formData.establishedYear}
                onChange={(e) => setFormData({...formData, establishedYear: e.target.value})}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-12 h-12 text-[#58d674] mx-auto mb-3" />
              <h2 className="text-xl font-bold text-gray-800">약관 동의</h2>
              <p className="text-gray-600">서비스 이용을 위한 약관에 동의해주세요</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <Checkbox 
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
                />
                <div className="flex-1">
                  <Label htmlFor="agreeTerms" className="font-medium">
                    서비스 이용약관 동의 *
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    서비스 이용에 필요한 기본 약관입니다.
                  </p>
                  <Button variant="link" className="text-xs p-0 h-auto text-[#58d674]">
                    약관 전문 보기
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <Checkbox 
                  id="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => setFormData({...formData, agreePrivacy: checked as boolean})}
                />
                <div className="flex-1">
                  <Label htmlFor="agreePrivacy" className="font-medium">
                    개인정보 처리방침 동의 *
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    개인정보 수집, 이용, 보관에 대한 동의입니다.
                  </p>
                  <Button variant="link" className="text-xs p-0 h-auto text-[#58d674]">
                    처리방침 전문 보기
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 border rounded-lg">
                <Checkbox 
                  id="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onCheckedChange={(checked) => setFormData({...formData, agreeMarketing: checked as boolean})}
                />
                <div className="flex-1">
                  <Label htmlFor="agreeMarketing" className="font-medium">
                    마케팅 정보 수신 동의 (선택)
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    새로운 지원사업 정보와 이벤트 소식을 받아보실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">회원가입 완료 후</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 즉시 AI 매칭 서비스를 이용하실 수 있습니다</li>
                <li>• 맞춤형 지원사업 알림을 받아보실 수 있습니다</li>
                <li>• 전문가 상담 서비스를 신청하실 수 있습니다</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                회원가입
              </h1>
              <p className="text-gray-600">
                AI 기반 정부지원사업 매칭 서비스에 가입하세요
              </p>
            </div>
            
            <div className="mb-6">
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
          <Card className="shadow-lg border-0 mb-8">
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
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
                disabled={!validateStep()}
                className="bg-[#58d674] hover:bg-[#4bc961] text-white flex items-center gap-2"
              >
                다음
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!validateStep()}
                className="bg-[#58d674] hover:bg-[#4bc961] text-white flex items-center gap-2"
              >
                회원가입 완료
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Button 
                variant="link" 
                className="text-[#58d674] hover:text-[#4bc961] p-0 font-medium"
                onClick={() => onNavigate('login')}
              >
                로그인
              </Button>
            </p>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}