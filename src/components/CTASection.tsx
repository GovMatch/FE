import { Button } from "./ui/button";
import { ArrowRight, CheckCircle, Star, Clock } from "lucide-react";

export function CTASection() {
  const benefits = [
    { icon: CheckCircle, text: "완전 무료 매칭 서비스" },
    { icon: Star, text: "92% 정확도의 AI 분석" },
    { icon: Clock, text: "5분 내 빠른 결과 확인" }
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-r from-[#58d674] to-[#4bc961] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-8 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-16 right-16 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-16 left-1/4 w-28 h-28 bg-white rounded-full"></div>
        <div className="absolute bottom-8 right-8 w-36 h-36 bg-white rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          지금 시작하세요!
        </h2>
        
        <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
          정부지원사업 매칭부터 AI 솔루션까지,
          <br />기업 성장의 모든 단계를 함께합니다
        </p>

        {/* Benefits */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center text-white">
              <benefit.icon className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-white hover:bg-gray-100 text-[#58d674] px-10 py-4 rounded-full font-bold text-lg min-w-[250px] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            무료 매칭 시작하기
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-transparent hover:bg-white/10 text-white border-white border-2 px-10 py-4 rounded-full font-bold text-lg min-w-[250px] backdrop-blur-sm"
          >
            서비스 문의하기
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">5,000+</div>
            <div className="text-sm text-green-100">매칭 완료 기업</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">92%</div>
            <div className="text-sm text-green-100">매칭 정확도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">78%</div>
            <div className="text-sm text-green-100">선정 성공률</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <p className="text-green-50 text-sm leading-relaxed">
            <strong className="text-white">※ 완전 무료 서비스:</strong> 정부지원사업 매칭은 영구 무료로 제공됩니다. 
            추후 AI 솔루션 도입 시에만 별도 비용이 발생하며, 강제성은 전혀 없습니다.
          </p>
        </div>
      </div>
    </section>
  );
}