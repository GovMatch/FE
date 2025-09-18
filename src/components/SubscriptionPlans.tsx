import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

import { Check, Star, Zap, Crown } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
  icon: any;
  popular?: boolean;
}

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");

  const plans: Plan[] = [
    {
      id: "basic",
      name: "베이직",
      price: 0,
      period: "월",
      description: "기본적인 매칭 서비스",
      features: [
        "월 5회 매칭 알림",
        "기본 매칭 정확도",
        "이메일 알림",
        "기본 고객지원"
      ],
      icon: Star
    },
    {
      id: "premium",
      name: "프리미엄",
      price: 29000,
      period: "월",
      description: "향상된 매칭과 실시간 알림",
      features: [
        "무제한 매칭 알림",
        "92% 매칭 정확도",
        "실시간 알림 (SMS, 앱푸시)",
        "우선 고객지원",
        "맞춤형 추천",
        "마감일 7일 전 알림"
      ],
      badge: "인기",
      badgeColor: "bg-[#58d674]",
      icon: Zap,
      popular: true
    },
    {
      id: "enterprise",
      name: "엔터프라이즈",
      price: 99000,
      period: "월",
      description: "기업용 전용 서비스",
      features: [
        "프리미엄 모든 기능",
        "전담 매니저 배정",
        "맞춤형 컨설팅",
        "API 연동 지원",
        "전용 대시보드",
        "SLA 보장",
        "온사이트 교육"
      ],
      badge: "기업",
      badgeColor: "bg-purple-600",
      icon: Crown
    }
  ];

  const handleSubscribe = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      toast.success(`${plan.name} 플랜 구독이 요청되었습니다`);
      // 실제로는 결제 프로세스로 이동
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative transition-all duration-200 hover:shadow-lg ${
            plan.popular ? 'ring-2 ring-[#58d674] shadow-lg' : ''
          } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
        >
          {plan.badge && (
            <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {plan.badge}
            </div>
          )}
          
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-2">
              <plan.icon className="w-8 h-8 text-[#58d674]" />
            </div>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <div className="flex items-center justify-center gap-1">
              <span className="text-3xl font-bold">
                {plan.price === 0 ? '무료' : `₩${plan.price.toLocaleString()}`}
              </span>
              {plan.price > 0 && (
                <span className="text-gray-600">/{plan.period}</span>
              )}
            </div>
            <p className="text-sm text-gray-600">{plan.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#58d674] mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button
              className={`w-full ${
                selectedPlan === plan.id 
                  ? 'bg-[#58d674] hover:bg-[#4bc961] text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => {
                setSelectedPlan(plan.id);
                handleSubscribe(plan.id);
              }}
            >
              {selectedPlan === plan.id ? '현재 플랜' : 
               plan.price === 0 ? '무료 시작' : '구독하기'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}