import { Button } from "./ui/button";
import { ArrowRight, Target, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl lg:text-6xl font-black text-gray-800 leading-tight mb-6">
          <span className="block">정확한 매칭으로</span>
          <span className="block">정부지원사업 성공률을</span>
          <span className="block text-[#58d674]">90% 이상</span>
          <span className="block">달성하세요</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          기업의 모든 특성을 종합 분석하여 실제 지원 가능한 사업만 정확하게 매칭하는
          <br />
          <span className="font-semibold text-[#58d674]">AI 기반 정부지원사업 매칭 플랫폼</span>
        </p>

        {/* Offer Badge */}
        <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-full mb-8 border border-green-200">
          <Target className="w-5 h-5 text-[#58d674] mr-2" />
          <span className="text-gray-600">
            <span className="font-bold text-[#58d674]">무료</span> 매칭 서비스로 시작하세요
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            size="lg" 
            className="bg-[#58d674] hover:bg-[#4bc961] text-white px-8 py-4 rounded-full shadow-[0px_10px_20px_0px_rgba(88,214,116,0.5)] font-medium min-w-[200px]"
          >
            무료 매칭 시작하기
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 px-8 py-4 rounded-full shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] font-medium min-w-[200px]"
          >
            서비스 소개 보기
          </Button>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#58d674] mb-2">92%</div>
            <div className="text-sm text-gray-600">매칭 정확도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#58d674] mb-2">78%</div>
            <div className="text-sm text-gray-600">선정 가능성</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#58d674] mb-2">5,000+</div>
            <div className="text-sm text-gray-600">누적 매칭 기업</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="absolute bg-white rounded-bl-[72px] rounded-br-[72px] shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] size-36 top-0 left-1/2 transform -translate-x-1/2" />
          <div className="relative flex items-center justify-center w-36 h-24 pt-8">
            <div className="rotate-90">
              <TrendingUp className="w-8 h-8 text-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}