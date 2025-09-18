import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MatchingDetailModal } from "./MatchingDetailModal";
import { 
  Calendar, 
  Building2, 
  Star, 
  Clock,
  TrendingUp,
  Award,
  Users,
  Target,
  AlertTriangle
} from "lucide-react";

interface MyMatchingInfoProps {
  className?: string;
}

export function MyMatchingInfo({ className = "" }: MyMatchingInfoProps) {
  // 나의 매칭정보 통계
  const matchingStats = [
    { 
      label: "총 매칭", 
      value: "12", 
      color: "text-[#58d674]", 
      bgColor: "bg-green-50",
      icon: Target 
    },
    { 
      label: "고객률", 
      value: "5", 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      icon: Users 
    },
    { 
      label: "신규 수주", 
      value: "3", 
      color: "text-orange-600", 
      bgColor: "bg-orange-50",
      icon: TrendingUp 
    },
    { 
      label: "마감 임박", 
      value: "2", 
      color: "text-red-600", 
      bgColor: "bg-red-50",
      icon: AlertTriangle 
    }
  ];

  // 매칭된 지원사업 목록
  const matchedPrograms = [
    {
      id: "1",
      programTitle: "AI 융합 얼라이언스 프로젝트",
      organization: "과학기술정보통신부",
      category: "기술혁신",
      deadline: "2024.12.28",
      budget: "5천만원",
      matchScore: 92,
      status: "승인대기",
      matchedAt: "2024.01.20",
      daysLeft: 3,
      description: "인공지능과 다양한 산업 분야의 융합을 통해 새로운 비즈니스 모델을 창출하고 AI 생태계를 조성하는 프로젝트입니다.",
      requirements: [
        "AI 관련 기술을 보유하거나 개발 계획이 있는 기업",
        "설립 7년 이내 또는 벤처기업 인증 보유",
        "직원 수 300명 이하",
        "최근 3년 평균 매출액 1000억원 이하"
      ],
      benefits: [
        "최대 5천만원 개발비 지원",
        "AI 전문 멘토링 및 컨설팅",
        "글로벌 진출 지원 프로그램 연계",
        "네트워킹 및 데모데이 참가 기회"
      ],
      selectionCriteria: [
        "기술혁신성 및 차별성 (30%)",
        "사업화 가능성 및 시장성 (25%)",
        "팀 구성 및 추진 역량 (25%)",
        "정책 기여도 및 파급효과 (20%)"
      ],
      applicationProcess: [
        "온라인 사업계획서 제출",
        "1차 서류심사 (기술성, 사업성 검토)",
        "2차 발표평가 (PT 발표 및 질의응답)",
        "최종 선정 및 협약 체결",
        "사업 수행 및 정기 점검"
      ]
    },
    {
      id: "2",
      programTitle: "청년창업사관학교 14기",
      organization: "창업진흥원",
      category: "창업지원",
      deadline: "2024.12.31",
      budget: "1억원",
      matchScore: 87,
      status: "1차심사",
      matchedAt: "2024.01.18",
      daysLeft: 6,
      description: "예비창업자와 초기창업자를 대상으로 체계적인 창업교육과 사업화 지원을 통해 성공적인 창업을 도모하는 프로그램입니다.",
      requirements: [
        "만 39세 이하 예비창업자 또는 창업 3년 이내 초기창업자",
        "혁신적인 아이디어와 사업계획을 보유한 자",
        "6개월간 교육과정 참여 가능자",
        "국내 창업 의지가 있는 자"
      ],
      benefits: [
        "최대 1억원 사업화 자금 지원",
        "6개월간 체계적 창업교육",
        "전문 멘토 1:1 맞춤 멘토링",
        "사무공간 및 창업 인프라 제공"
      ],
      selectionCriteria: [
        "사업 아이디어의 혁신성 및 독창성 (35%)",
        "시장성 및 사업 실현 가능성 (30%)",
        "창업의지 및 추진 역량 (25%)",
        "사회적 가치 및 정책 부합성 (10%)"
      ],
      applicationProcess: [
        "온라인 지원서 작성 및 제출",
        "1차 서류심사",
        "2차 면접평가",
        "최종 선발 및 교육과정 시작",
        "6개월 교육 후 사업화 자금 지원"
      ]
    },
    {
      id: "3", 
      programTitle: "K-글로벌 스타트업 축제",
      organization: "중소벤처기업부",
      category: "글로벌진출",
      deadline: "2025.01.02",
      budget: "2천만원",
      matchScore: 74,
      status: "접수중",
      matchedAt: "2024.01.15",
      daysLeft: 8,
      description: "글로벌 진출을 꿈꾸는 국내 스타트업을 위한 종합 지원 프로그램으로, 해외 투자유치 및 판로개척을 집중 지원합니다.",
      requirements: [
        "설립 7년 이내 스타트업",
        "글로벌 진출 계획 및 역량 보유",
        "혁신기술 기반 제품/서비스 보유",
        "영어 커뮤니케이션 가능"
      ],
      benefits: [
        "최대 2천만원 해외진출 지원금",
        "글로벌 액셀러레이터 연계",
        "해외 투자유치 IR 기회",
        "국제 전시회 참가 지원"
      ],
      selectionCriteria: [
        "기술의 글로벌 경쟁력 (30%)",
        "해외 시장 진출 계획 (25%)",
        "팀의 글로벌 역량 (25%)",
        "비즈니스 모델의 확장성 (20%)"
      ],
      applicationProcess: [
        "온라인 신청서 및 사업계획서 제출",
        "서류심사 및 기업 실사",
        "피치 데모데이 참가",
        "최종 선정 및 지원 시작",
        "해외진출 단계별 멘토링"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '승인대기':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '1차심사':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '접수중':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 헤더 섹션 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#58d674] flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">나의 매칭정보</h2>
      </div>

      {/* 통계 카드 섹션 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {matchingStats.map((stat, index) => (
          <Card key={index} className="border-2 border-gray-100 hover:border-[#58d674]/30 transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 매칭된 지원사업 목록 */}
      <div className="space-y-4">
        {matchedPrograms.map((program, index) => (
          <Card 
            key={program.id} 
            className="border-2 border-gray-200 hover:border-[#58d674]/40 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <CardContent className="p-6">
              {/* 프로그램 헤더 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`px-3 py-1 ${getMatchScoreColor(program.matchScore)}`}>
                      {program.matchScore}%
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {program.programTitle}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{program.organization}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{program.deadline}</span>
                  </div>
                </div>
                <Badge className={`px-3 py-1 border ${getStatusColor(program.status)}`}>
                  {program.status}
                </Badge>
              </div>

              {/* 프로그램 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="text-xs text-gray-500">지원규모</div>
                    <div className="font-medium text-green-600">{program.budget}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#58d674]" />
                  <div>
                    <div className="text-xs text-gray-500">매칭점수</div>
                    <div className="font-medium text-[#58d674]">{program.matchScore}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <div>
                    <div className="text-xs text-gray-500">남은시간</div>
                    <div className="font-medium text-red-600">{program.daysLeft}일</div>
                  </div>
                </div>
              </div>

              {/* 설명 */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {program.description}
              </p>

              {/* 액션 버튼 */}
              <div className="flex items-center justify-end gap-3">
                <MatchingDetailModal 
                  matching={program}
                  trigger={
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      상세보기
                    </Button>
                  }
                />
                <Button size="sm" className="bg-[#58d674] hover:bg-[#4bc961] flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  신청하기
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 더보기 버튼 */}
      <div className="text-center pt-4">
        <Button variant="outline" className="flex items-center gap-2 mx-auto">
          전체 매칭정보 보기
          <TrendingUp className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}