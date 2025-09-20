import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../components/AuthContext";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Separator } from "../components/ui/separator";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Users } from "lucide-react";
import type { PageType } from "../components/Router";

interface LoginPageProps {
  onNavigate: (page: PageType, programId?: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        alert("로그인이 완료되었습니다!");
        onNavigate('main');
      } else {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogins = [
    { name: "구글", color: "bg-white border-gray-300", textColor: "text-gray-700" },
    { name: "네이버", color: "bg-green-500", textColor: "text-white" },
    { name: "카카오", color: "bg-yellow-400", textColor: "text-gray-800" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              로그인
            </h1>
            <p className="text-gray-600">
              맞춤형 정부지원사업 매칭 서비스에 오신 것을 환영합니다
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email">이메일</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">비밀번호</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력해주세요"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({...formData, rememberMe: checked as boolean})}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      로그인 상태 유지
                    </Label>
                  </div>
                  <Button variant="link" className="text-sm p-0">
                    비밀번호 찾기
                  </Button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-[#58d674] hover:bg-[#4bc961] text-white py-3 rounded-xl font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">또는</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {socialLogins.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      className={`w-full ${social.color} ${social.textColor} border`}
                    >
                      {social.name}로 로그인
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Login for Testing */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3 text-center">
                  테스트 계정 (개발용)
                </h4>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-sm"
                    onClick={() => {
                      setFormData({ email: "admin@example.com", password: "admin", rememberMe: false });
                    }}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    관리자 계정 입력
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-sm"
                    onClick={() => {
                      setFormData({ email: "user@example.com", password: "user", rememberMe: false });
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    일반 사용자 계정 입력
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  계정 정보가 입력됩니다. 로그인 버튼을 눌러주세요.
                </p>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  아직 계정이 없으신가요?{' '}
                  <Button 
                    variant="link" 
                    className="text-[#58d674] hover:text-[#4bc961] p-0 font-medium"
                    onClick={() => onNavigate('signup')}
                  >
                    회원가입
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium text-blue-800 mb-1">
                    보안 안내
                  </h4>
                  <p className="text-blue-700">
                    모든 개인정보는 암호화되어 안전하게 보호됩니다. 
                    ISMS-P 인증을 받은 보안 시스템을 사용합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Stats */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Users className="w-8 h-8 text-[#58d674] mx-auto mb-2" />
                <h3 className="font-medium text-gray-800">
                  이미 2,800+ 기업이 이용 중
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-bold text-[#58d674]">92%</div>
                  <div className="text-gray-600">매칭 정확도</div>
                </div>
                <div>
                  <div className="font-bold text-[#58d674]">78%</div>
                  <div className="text-gray-600">선정 성공률</div>
                </div>
                <div>
                  <div className="font-bold text-[#58d674]">450억원</div>
                  <div className="text-gray-600">지원금 확보</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}