import { Building2, Search, Target, CheckCircle } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function ProcessSection() {
  const steps = [
    {
      icon: Building2,
      title: "기업정보 입력",
      description: "사업자등록번호, 업종, 규모 등 기본정보와 보유역량, 사업방향성을 입력합니다.",
      details: "5분 내 간단 입력"
    },
    {
      icon: Search,
      title: "AI 분석 매칭",
      description: "LLM 기반 분석으로 전국 지원사업 DB와 실시간 매칭하여 적합도를 계산합니다.",
      details: "실시간 분석"
    },
    {
      icon: Target,
      title: "정밀 매칭 결과",
      description: "매칭점수별 그룹화하여 선정가능성과 함께 맞춤형 결과를 제공합니다.",
      details: "92% 정확도"
    },
    {
      icon: CheckCircle,
      title: "신청 지원",
      description: "매칭된 사업의 신청서류 가이드와 컨설팅까지 원스톱으로 지원합니다.",
      details: "전문가 지원"
    }
  ];

  return (
    <section className="py-20 px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            간단한 4단계로 매칭 완료
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            복잡한 정부지원사업 찾기를 AI가 간단하게 해결해드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full bg-white shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] border-0 rounded-3xl hover:shadow-[20px_30px_100px_0px_rgba(0,0,0,0.15)] transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#58d674] text-white rounded-full font-bold text-lg mb-6">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-6">
                    <step.icon className="w-8 h-8 text-[#58d674]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Details Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-green-50 rounded-full">
                    <span className="text-xs font-medium text-[#58d674]">
                      {step.details}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-[#58d674] to-green-300"></div>
                  <div className="absolute -right-1 -top-1 w-0 h-0 border-l-4 border-l-[#58d674] border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-full border border-green-200">
            <span className="text-gray-700">
              지금 시작하면 <span className="font-bold text-[#58d674]">완전 무료</span>로 이용 가능합니다
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}