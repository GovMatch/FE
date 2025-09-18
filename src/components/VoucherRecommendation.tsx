import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { 
  Sparkles,
  Building2,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Award
} from "lucide-react";

interface VoucherRecommendationProps {
  onNavigate?: (page: string) => void;
}

interface RecommendedVoucher {
  id: string;
  title: string;
  organization: string;
  matchRate: number;
  budget: string;
  supportRate: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reason: string;
}

export function VoucherRecommendation({ onNavigate }: VoucherRecommendationProps) {
  const [selectedCompanySize, setSelectedCompanySize] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [recommendations, setRecommendations] = useState<RecommendedVoucher[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!selectedCompanySize || !selectedBusiness) return;
    
    setIsAnalyzing(true);
    
    // 간단한 추천 로직 시뮬레이션
    setTimeout(() => {
      const mockRecommendations: RecommendedVoucher[] = [
        {
          id: "1",
          title: "디지털혁신바우처",
          organization: "중소벤처기업부",
          matchRate: 92,
          budget: "최대 2천만원",
          supportRate: "90%",
          difficulty: 'medium',
          reason: "기업 규모와 디지털 전환 수요에 최적 매칭"
        },
        {
          id: "2",
          title: "컨설팅바우처",
          organization: "중소벤처기업부",
          matchRate: 85,
          budget: "최대 1천만원",
          supportRate: "90%",
          difficulty: 'easy',
          reason: "진입 장벽이 낮고 선정 가능성이 높음"
        },
        {
          id: "3",
          title: "온라인판로개척바우처",
          organization: "중소벤처기업부",
          matchRate: 78,
          budget: "최대 1천만원",
          supportRate: "80%",
          difficulty: 'easy',
          reason: "사업 분야와 온라인 진출 계획에 부합"
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
    }, 2000);
  };

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
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-indigo-700">
          <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" />
          <span className="text-base lg:text-lg">AI 바우처 추천</span>
        </CardTitle>
        <p className="text-sm lg:text-base text-gray-600">
          간단한 정보만 입력하면 맞춤형 바우처를 추천해드립니다.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 lg:space-y-6">
        {/* 입력 섹션 - 모바일 최적화 */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-2">기업 규모</label>
              <Select value={selectedCompanySize} onValueChange={setSelectedCompanySize}>
                <SelectTrigger className="h-10 lg:h-11">
                  <SelectValue placeholder="기업 규모 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">소기업 (1-49명)</SelectItem>
                  <SelectItem value="medium">중기업 (50-299명)</SelectItem>
                  <SelectItem value="large">대기업 (300명 이상)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-xs lg:text-sm font-medium mb-2">사업 분야</label>
              <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
                <SelectTrigger className="h-10 lg:h-11">
                  <SelectValue placeholder="사업 분야 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">제조업</SelectItem>
                  <SelectItem value="it">IT/소프트웨어</SelectItem>
                  <SelectItem value="service">서비스업</SelectItem>
                  <SelectItem value="trade">도소매업</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-xs lg:text-sm font-medium mb-2">사업 설명</label>
            <Textarea 
              value={businessDescription} 
              onChange={(e) => setBusinessDescription(e.target.value)}
              placeholder="사업 모델과 내용을 자유롭게 설명해주세요. 예: AI 헬스케어 서비스, 친환경 패키징 제조업 등"
              rows={3}
              className="w-full resize-none text-sm lg:text-base"
            />
          </div>
        </div>

        <Button 
          onClick={handleAnalyze}
          disabled={!selectedCompanySize || !selectedBusiness || isAnalyzing}
          className="w-full bg-indigo-600 hover:bg-indigo-700 h-10 lg:h-11 text-sm lg:text-base"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              AI 분석 중...
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              맞춤 바우처 추천받기
            </>
          )}
        </Button>

        {/* 추천 결과 - 모바일 최적화 */}
        {recommendations.length > 0 && (
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center gap-2 text-indigo-700 font-medium">
              <Award className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base">추천 바우처 ({recommendations.length}개)</span>
            </div>
            
            {recommendations.map((voucher, index) => (
              <Card key={voucher.id} className="border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 lg:w-6 lg:h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs lg:text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <h4 className="font-semibold text-sm lg:text-base truncate">{voucher.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 mb-2">
                        <Building2 className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                        <span className="truncate">{voucher.organization}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 ml-2">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                        <span className="text-green-600 font-bold text-sm lg:text-base">{voucher.matchRate}%</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getDifficultyColor(voucher.difficulty)}`}
                      >
                        {getDifficultyText(voucher.difficulty)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs lg:text-sm font-medium text-[#58d674] truncate">{voucher.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-xs lg:text-sm font-medium text-blue-600">{voucher.supportRate}</span>
                    </div>
                  </div>

                  <p className="text-xs lg:text-sm text-gray-600 mb-3 line-clamp-2">{voucher.reason}</p>

                  <Button 
                    size="sm" 
                    className="w-full bg-[#58d674] hover:bg-[#4bc961] h-8 lg:h-9 text-xs lg:text-sm"
                    onClick={() => onNavigate?.('matching')}
                  >
                    상세 매칭 분석하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}