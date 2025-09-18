import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { CheckCircle, FileText, Search, UserCheck, AlertCircle, Star, HelpCircle } from "lucide-react";
import type { PageType } from "../components/Router";

interface GuidePageProps {
  onNavigate: (page: PageType) => void;
}

export function GuidePage({ onNavigate }: GuidePageProps) {
  const guideSteps = [
    {
      icon: FileText,
      title: "기업 정보 입력",
      description: "기본 정보, 규모, 업종 등을 정확히 입력해주세요",
      time: "약 3-5분",
      tips: [
        "사업자등록증상의 정보와 일치하게 입력",
        "최신 매출액과 직원 수 기준으로 작성",
        "주력 사업 분야를 정확히 선택"
      ]
    },
    {
      icon: Search,
      title: "AI 매칭 분석",
      description: "입력된 정보를 바탕으로 AI가 최적 지원사업을 분석합니다",
      time: "약 10-15초",
      tips: [
        "정부지원사업 데이터베이스 전체 스캔",
        "92% 정확도의 매칭 알고리즘 적용",
        "실시간 지원사업 업데이트 반영"
      ]
    },
    {
      icon: UserCheck,
      title: "매칭 결과 확인",
      description: "선정 가능성과 함께 맞춤형 지원사업 목록을 제공합니다",
      time: "제한 없음",
      tips: [
        "매칭 점수가 높은 순서로 정렬",
        "선정 가능성 예측 정보 제공",
        "지원 마감일 알림 설정 가능"
      ]
    },
    {
      icon: CheckCircle,
      title: "지원서 준비",
      description: "전문가 가이드와 함께 지원서를 작성합니다",
      time: "개별 상담",
      tips: [
        "1:1 전문가 컨설팅 제공",
        "지원서 작성 템플릿 제공",
        "제출 전 최종 검토 서비스"
      ]
    }
  ];

  const faqData = [
    {
      question: "매칭 정확도가 92%라는 것은 어떤 의미인가요?",
      answer: "지난 1년간 저희 플랫폼을 통해 매칭된 기업 중 92%가 실제로 지원 자격을 충족했다는 의미입니다. 이는 업계 평균 대비 약 3배 높은 수치입니다."
    },
    {
      question: "무료 서비스의 범위는 어디까지인가요?",
      answer: "AI 매칭 분석, 지원사업 목록 제공, 기본 가이드까지는 완전 무료입니다. 1:1 전문가 컨설팅과 지원서 작성 지원은 유료 서비스로 제공됩니다."
    },
    {
      question: "얼마나 자주 지원사업 정보가 업데이트되나요?",
      answer: "매일 오전 9시에 전체 정부기관의 지원사업 정보를 업데이트합니다. 긴급 공고나 변경사항은 실시간으로 반영됩니다."
    },
    {
      question: "개인정보는 어떻게 보호되나요?",
      answer: "모든 개인정보는 암호화되어 저장되며, ISMS-P 인증을 받은 보안 시스템을 사용합니다. 동의 없이 제3자에게 제공되지 않습니다."
    },
    {
      question: "매칭 결과에 만족하지 않으면 어떻게 하나요?",
      answer: "매칭 결과에 대한 피드백을 주시면 AI 알고리즘을 개선하여 더 정확한 매칭을 제공합니다. 또한 전문가 1:1 상담을 통해 추가 지원사업을 찾아드립니다."
    }
  ];

  const tips = [
    {
      category: "신청 전 준비사항",
      items: [
        "사업자등록증, 재무제표 등 기본 서류 준비",
        "지원사업별 특별 요구사항 확인",
        "기업 연혁과 주요 성과 정리",
        "향후 사업계획 구체화"
      ]
    },
    {
      category: "지원서 작성 요령",
      items: [
        "공고문 요구사항을 정확히 파악",
        "기업의 강점과 차별화 요소 강조",
        "구체적인 수치와 근거자료 제시",
        "미래 비전과 기대효과 명확히 작성"
      ]
    },
    {
      category: "성공률 높이는 팁",
      items: [
        "마감일 최소 1주일 전 제출",
        "전문가 검토 후 제출",
        "유사 성공사례 참고",
        "지원기관 담당자와 사전 상담"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} />
      
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              이용 가이드
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              정부지원사업 매칭부터 지원서 작성까지, 
              성공적인 지원을 위한 완벽 가이드를 제공합니다
            </p>
          </div>

          <Tabs defaultValue="process" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="process">매칭 프로세스</TabsTrigger>
              <TabsTrigger value="tips">작성 요령</TabsTrigger>
              <TabsTrigger value="faq">자주묻는질문</TabsTrigger>
              <TabsTrigger value="support">고객지원</TabsTrigger>
            </TabsList>

            <TabsContent value="process" className="space-y-8">
              {/* Process Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {guideSteps.map((step, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#58d674] rounded-xl flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {step.time}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-700">주요 포인트:</p>
                        <ul className="space-y-1">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-xs text-gray-600 flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-[#58d674] mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    {index < guideSteps.length - 1 && (
                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#58d674] rounded-full flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Success Stats */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      검증된 성공 실적
                    </h3>
                    <p className="text-gray-600">
                      체계적인 프로세스로 높은 성공률을 자랑합니다
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { number: "92%", label: "매칭 정확도", detail: "AI 분석 기반" },
                      { number: "78%", label: "선정 성공률", detail: "업계 평균 대비 3배" },
                      { number: "15일", label: "평균 처리시간", detail: "매칭부터 지원까지" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-[#58d674] mb-2">
                          {stat.number}
                        </div>
                        <div className="font-medium text-gray-800 mb-1">
                          {stat.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {tips.map((tipCategory, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#58d674]" />
                        {tipCategory.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {tipCategory.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-[#58d674] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-2">
                        주의사항
                      </h4>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• 지원사업별로 자격요건이 다르므로 반드시 공고문을 정확히 확인하세요</li>
                        <li>• 동일한 사업에 중복 지원은 불가능합니다</li>
                        <li>• 허위 정보 기재 시 지원이 취소될 수 있습니다</li>
                        <li>• 선정 후에도 정기적인 사업 보고가 필요합니다</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-[#58d674]" />
                    자주 묻는 질문
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqData.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>고객지원 센터</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">운영시간</h4>
                      <p className="text-sm text-gray-600">평일 09:00 - 18:00 (점심시간 12:00-13:00 제외)</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">문의 방법</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>📞 전화: 1588-0000</li>
                        <li>📧 이메일: support@govmatch.co.kr</li>
                        <li>💬 실시간 채팅: 웹사이트 우하단</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">응답시간</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 전화 문의: 즉시 응답</li>
                        <li>• 이메일 문의: 24시간 내</li>
                        <li>• 채팅 문의: 업무시간 내 즉시</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>전문가 컨설팅</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">제공 서비스</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 1:1 맞춤 지원사업 상담</li>
                        <li>• 지원서 작성 및 검토</li>
                        <li>• 사업계획서 작성 지원</li>
                        <li>• 면접 및 PT 준비</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">상담 예약</h4>
                      <p className="text-sm text-gray-600">온라인 예약 시스템을 통해 편리하게 예약 가능</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">비용</h4>
                      <p className="text-sm text-gray-600">초회 상담 무료, 이후 서비스별 차등 요금</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}