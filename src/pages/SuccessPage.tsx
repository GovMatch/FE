import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Star, Quote, TrendingUp, Award, Users, DollarSign, Calendar, Building2, ArrowRight } from "lucide-react";
import type { PageType } from "../components/Router";

interface SuccessPageProps {
  onNavigate: (page: PageType, programId?: string) => void;
  currentPage?: PageType;
}

export function SuccessPage({ onNavigate, currentPage }: SuccessPageProps) {
  const successStories = [
    {
      id: 1,
      companyName: "테크이노베이션",
      industry: "AI/소프트웨어",
      program: "AI 융합 얼라이언스 프로젝트",
      amount: "5천만원",
      matchScore: 94,
      ceo: "김혁신",
      avatar: "TI",
      story: "AI 기반 헬스케어 솔루션 개발로 의료진의 업무 효율성을 30% 향상시켰습니다. 플랫폼을 통한 정확한 매칭으로 첫 번째 지원에서 바로 선정되었어요.",
      results: [
        "매출 200% 증가",
        "특허 3건 출원",
        "직원 15명 신규 채용"
      ],
      timeline: "2023.03 ~ 2024.02"
    },
    {
      id: 2,
      companyName: "그린에너지솔루션",
      industry: "에너지/환경",
      program: "청정에너지 기술개발 사업",
      amount: "2억원",
      matchScore: 91,
      ceo: "박환경",
      avatar: "GE",
      story: "태양광 효율 극대화 기술 개발로 에너지 생산성을 50% 높였습니다. 체계적인 가이드와 전문가 컨설팅 덕분에 성공적으로 사업을 완료했습니다.",
      results: [
        "기술이전 5건 완료",
        "해외 수출 계약 체결",
        "연구원 20명 확충"
      ],
      timeline: "2022.09 ~ 2024.08"
    },
    {
      id: 3,
      companyName: "스마트팩토리",
      industry: "제조업",
      program: "스마트제조 혁신바우처",
      amount: "2천만원",
      matchScore: 87,
      ceo: "이제조",
      avatar: "SF",
      story: "전통 제조업에서 스마트팩토리로 전환하여 생산성이 40% 향상되었습니다. 정확한 매칭으로 우리 업종에 딱 맞는 지원사업을 찾을 수 있었어요.",
      results: [
        "생산성 40% 향상",
        "불량률 70% 감소",
        "운영비 25% 절감"
      ],
      timeline: "2023.06 ~ 2024.05"
    },
    {
      id: 4,
      companyName: "글로벌 K-푸드",
      industry: "식품/농업",
      program: "K-푸드 글로벌 진출 지원",
      amount: "3천만원",
      matchScore: 89,
      ceo: "최글로벌",
      avatar: "KF",
      story: "전통 한식을 현대적으로 재해석한 제품으로 동남아 시장 진출에 성공했습니다. 수출 지원사업 매칭으로 해외진출의 꿈을 이뤘습니다.",
      results: [
        "해외 매출 300% 증가",
        "5개국 수출 확대",
        "브랜드 인지도 상승"
      ],
      timeline: "2023.01 ~ 2023.12"
    }
  ];

  const testimonials = [
    {
      name: "김창업",
      company: "스타트업코리아",
      role: "대표이사",
      content: "복잡한 정부지원사업을 하나하나 찾아보는 시간이 절약되었고, AI 매칭으로 정말 우리에게 필요한 지원사업만 추천받을 수 있어서 효율적이었습니다.",
      rating: 5
    },
    {
      name: "박제조",
      company: "스마트매뉴팩처링",
      role: "기술이사",
      content: "전문가 컨설팅까지 받을 수 있어서 지원서 작성이 한결 수월했습니다. 덕분에 첫 지원에서 바로 선정될 수 있었어요.",
      rating: 5
    },
    {
      name: "이혁신",
      company: "테크이노베이션랩",
      role: "연구소장",
      content: "매칭 정확도가 정말 높아서 놀랐습니다. 우리 기업 특성을 정확히 파악하고 딱 맞는 R&D 지원사업을 찾아주셨어요.",
      rating: 5
    }
  ];

  const stats = [
    { number: "1,200+", label: "성공 사례", detail: "누적 선정 기업 수" },
    { number: "450억원", label: "지원금 확보", detail: "총 지원금 규모" },
    { number: "78%", label: "선정 성공률", detail: "업계 평균 대비 3배" },
    { number: "4.8/5", label: "고객 만족도", detail: "후기 평균 점수" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} currentPage={currentPage} />
      
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              성공 사례
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI 매칭으로 최적의 정부지원사업을 찾아 성공한 기업들의 
              생생한 이야기를 확인해보세요
            </p>
          </div>

          {/* Success Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-[#58d674] mb-2">
                    {stat.number}
                  </div>
                  <div className="font-medium text-gray-800 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.detail}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Success Stories */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                대표 성공 사례
              </h2>
              <p className="text-gray-600">
                다양한 업종에서 정부지원사업으로 성장한 기업들을 만나보세요
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {successStories.map((story) => (
                <Card key={story.id} className="bg-white shadow-lg border-0 overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-[#58d674] text-white font-bold">
                            {story.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg">{story.companyName}</h3>
                          <p className="text-sm text-gray-600">{story.ceo} 대표</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {story.industry}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#58d674] fill-current" />
                          <span className="text-sm font-medium text-[#58d674]">
                            매칭 {story.matchScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">{story.program}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">{story.amount}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-600">{story.timeline}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-4">
                      <Quote className="w-6 h-6 text-gray-300 mb-2" />
                      <p className="text-gray-700 italic leading-relaxed">
                        "{story.story}"
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-3">주요 성과</h4>
                      <div className="space-y-2">
                        {story.results.map((result, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#58d674]" />
                            <span className="text-sm text-gray-700">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Customer Testimonials */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                고객 후기
              </h2>
              <p className="text-gray-600">
                실제 이용 고객들의 솔직한 후기를 확인해보세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }, (_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="border-t pt-4">
                      <p className="font-medium text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">
                        {testimonial.company} · {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-[#58d674] to-[#4bc961] text-white overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-4">
                  당신의 성공 스토리를 만들어보세요
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  AI 매칭으로 최적의 정부지원사업을 찾고, 
                  전문가 가이드로 성공 확률을 높여보세요
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    onClick={() => onNavigate('matching')}
                    className="bg-white text-[#58d674] hover:bg-gray-100 px-8 py-4 rounded-full font-medium min-w-[200px]"
                  >
                    무료 매칭 시작하기
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => onNavigate('guide')}
                    className="border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-medium min-w-[200px]"
                  >
                    이용가이드 보기
                  </Button>
                </div>
              </div>
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <Building2 className="w-32 h-32 absolute top-4 right-4" />
                <Users className="w-24 h-24 absolute bottom-4 left-4" />
                <Award className="w-20 h-20 absolute top-1/2 left-8" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}