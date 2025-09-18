import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

import { 
  Eye, 
  Calendar, 
  DollarSign, 
  Building2, 
  Users, 
  Target, 
  Award,
  Clock,
  FileText,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Star
} from "lucide-react";

interface MatchingResult {
  id: string;
  programTitle: string;
  organization: string;
  category: string;
  deadline: string;
  budget: string;
  matchScore: number;
  status: string;
  description: string;
  requirements: string[];
  benefits: string[];
  selectionCriteria: string[];
  applicationProcess: string[];
  aiStrategy?: string;
}

interface MatchingDetailModalProps {
  matching: MatchingResult;
  trigger?: React.ReactNode;
}

export function MatchingDetailModal({ matching, trigger }: MatchingDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState(matching.aiStrategy || "");

  const generateStrategy = async () => {
    setIsGeneratingStrategy(true);
    
    // AI 전략 생성 시뮬레이션
    setTimeout(() => {
      const strategy = `
# ${matching.programTitle} 선정 전략

## 1. 사업 개요 분석
- **매칭점수**: ${matching.matchScore}%로 높은 적합성 확인
- **경쟁강도**: 중간 수준 (예상 경쟁률 3:1)
- **선정 가능성**: 높음 (상위 30% 범위)

## 2. 핵심 선정 요인
### 기술혁신성 (30%)
- AI/빅데이터 활용 기술 구체적 제시 필요
- 기존 기술 대비 차별화 포인트 강조
- 특허출원 또는 기술이전 계획 수립

### 사업화 계획 (25%)
- 3년간 단계별 사업화 로드맵 구체화
- 예상 매출규모 및 시장점유율 제시
- 판로확보 및 마케팅 전략 상세 기술

### 기업역량 (25%)
- 경영진 및 핵심인력의 관련 경험 부각
- 재무안정성 및 자기자본 비율 강조
- 기술개발 인프라 및 설비 현황 제시

### 정책적합성 (20%)
- 정부정책 방향성과의 연관성 설명
- 일자리 창출 효과 구체적 수치화
- 지역경제 파급효과 정량적 분석

## 3. 차별화 전략
1. **기술우위**: 독자적 알고리즘 개발 및 성능지표 제시
2. **시장선점**: First Mover 장점 및 시장 선점 계획
3. **파트너십**: 대기업 또는 연구기관과의 협력 체계 구축
4. **수익모델**: 다각화된 수익원 및 지속가능한 비즈니스 모델

## 4. 위험요소 및 대응방안
### 기술적 위험
- 핵심기술 개발 지연 리스크 → 병렬 개발 및 백업 기술 확보
- 기술표준 변화 대응 → 지속적 기술동향 모니터링 체계

### 시장 위험
- 경쟁사 진입 가속화 → 빠른 시장 출시 및 브랜드 구축
- 시장수요 변화 → 고객 니즈 기반 제품 개선 및 다양화

## 5. 제안서 작성 핵심 포인트
1. **요약**: 3줄 이내로 핵심 가치 명확 전달
2. **차별화**: 경쟁업체 대비 독창적 강점 부각
3. **정량화**: 모든 성과목표를 수치로 구체화
4. **실현가능성**: 단계별 마일스톤과 검증 방법 제시
5. **파급효과**: 산업생태계 발전 기여도 강조

## 6. 심사 포인트별 대응전략
- **기술평가**: 기술검증 자료 및 테스트 결과 첨부
- **사업성평가**: 시장조사 보고서 및 고객 확보 계획
- **추진역량평가**: 팀 구성의 전문성 및 추진 경험 부각
- **정책기여도**: 정부정책과의 연계성 및 사회적 가치 창출

예상 준비기간: 3-4주
필요 자료: 기술개발계획서, 사업화계획서, 재무제표, 특허자료
성공 확률: 75% (매칭점수 및 기업 역량 기준)`;

      setGeneratedStrategy(strategy);
      setIsGeneratingStrategy(false);
    }, 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#58d674]" />
            {matching.programTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 매칭 점수 및 기본 정보 */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">매칭 정보</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">매칭 점수</span>
                      <div className="flex items-center gap-2">
                        <Progress value={matching.matchScore} className="w-20 h-2" />
                        <span className="text-sm font-semibold text-[#58d674]">{matching.matchScore}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">상태</span>
                      <Badge variant={matching.status === '진행중' ? 'default' : 'secondary'}>
                        {matching.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">분야</span>
                      <Badge variant="outline">{matching.category}</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">사업 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span>{matching.organization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>마감: {matching.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span>지원규모: {matching.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 상세 정보 탭 */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="requirements">신청요건</TabsTrigger>
              <TabsTrigger value="process">신청절차</TabsTrigger>
              <TabsTrigger value="strategy">AI 전략</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    사업 개요
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {matching.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    지원 혜택
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {matching.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#58d674] mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    신청 자격 요건
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {matching.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-[#58d674] rounded-full mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    선정 기준
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {matching.selectionCriteria.map((criteria, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    신청 절차
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matching.applicationProcess.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#58d674] text-white rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    AI 맞춤 선정 전략
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!generatedStrategy ? (
                    <div className="text-center py-8">
                      <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        AI가 이 지원사업에 특화된 선정 전략을 생성해드립니다.
                      </p>
                      <Button 
                        onClick={generateStrategy}
                        disabled={isGeneratingStrategy}
                        className="bg-[#58d674] hover:bg-[#4bc961]"
                      >
                        {isGeneratingStrategy ? (
                          <>
                            <TrendingUp className="w-4 h-4 mr-2 animate-pulse" />
                            AI 전략 생성 중...
                          </>
                        ) : (
                          <>
                            <Lightbulb className="w-4 h-4 mr-2" />
                            AI 전략 생성하기
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">AI 전략 생성 완료</span>
                        </div>
                        <p className="text-sm text-green-700">
                          기업 특성과 지원사업 요건을 분석하여 맞춤형 전략을 생성했습니다.
                        </p>
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg text-sm">
                          {generatedStrategy}
                        </pre>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(generatedStrategy)}
                        >
                          전략 복사
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={generateStrategy}
                        >
                          전략 재생성
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}