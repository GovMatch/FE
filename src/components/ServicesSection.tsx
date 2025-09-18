import { Card, CardContent } from "./ui/card";
import { Bot, BarChart3, MessageSquare } from "lucide-react";

export function ServicesSection() {
  const matchingServices = [
    {
      icon: Bot,
      title: "AI 기반 정밀 매칭",
      description: "기업의 모든 특성을 종합 분석하여 최적의 지원사업을 매칭합니다.",
      features: ["실시간 매칭 분석", "92% 정확도", "맞춤형 추천"]
    },
    {
      icon: BarChart3,
      title: "성공률 예측 분석",
      description: "지원사업별 선정 가능성을 구체적인 수치로 제공합니다.",
      features: ["선정 확률 분석", "경쟁도 평가", "준비 가이드"]
    },
    {
      icon: MessageSquare,
      title: "전문가 컨설팅",
      description: "매칭 결과를 바탕으로 신청서 작성부터 제출까지 지원합니다.",
      features: ["신청서 작성 지원", "서류 검토", "제출 관리"]
    }
  ];

  const successStats = [
    { number: "5,000+", label: "누적 매칭 기업", description: "다양한 업종의 기업이 이용" },
    { number: "92%", label: "매칭 정확도", description: "AI 분석 기반 정밀 매칭" },
    { number: "78%", label: "선정 성공률", description: "실제 지원사업 선정 비율" }
  ];

  return (
    <section className="py-20 px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Matching Services */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            무료 매칭 서비스
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            정부지원사업 매칭을 완전 무료로 제공하여 기업의 성장을 지원합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {matchingServices.map((service, index) => (
            <Card key={index} className="bg-white shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] border-0 rounded-3xl hover:shadow-[20px_30px_100px_0px_rgba(0,0,0,0.15)] transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-6">
                  <service.icon className="w-8 h-8 text-[#58d674]" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#58d674] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <span className="inline-flex items-center px-4 py-2 bg-green-50 text-[#58d674] font-semibold text-sm rounded-full">
                    완전 무료
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              검증된 매칭 성과
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI 기반 정밀 분석으로 높은 매칭 정확도와 선정 성공률을 자랑하는
              <br />믿을 수 있는 정부지원사업 매칭 플랫폼입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {successStats.map((stat, index) => (
              <Card key={index} className="bg-white border-0 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-[#58d674] mb-4">
                    {stat.number}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {stat.label}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-white px-8 py-4 rounded-full shadow-md">
              <span className="text-gray-700 text-lg">
                <span className="font-bold text-[#58d674]">완전 무료</span> 매칭 서비스로 지금 시작해보세요
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}