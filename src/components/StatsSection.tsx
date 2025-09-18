import { Card, CardContent } from "./ui/card";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: "92%",
      label: "매칭 정확도",
      description: "AI 분석을 통한 높은 정확도의 매칭 서비스"
    },
    {
      icon: Users,
      value: "5,000+",
      label: "누적 매칭 기업",
      description: "다양한 업종의 기업들이 신뢰하는 플랫폼"
    },
    {
      icon: Award,
      value: "78%",
      label: "선정 성공률",
      description: "실제 지원사업 선정까지 연결되는 성공률"
    },
    {
      icon: Clock,
      value: "5분",
      label: "평균 매칭 시간",
      description: "빠르고 정확한 실시간 매칭 분석"
    }
  ];

  const recentActivities = [
    { title: "2024년 청년창업사관학교", type: "신규 등록", badge: "NEW" },
    { title: "AI 융합 얼라이언스 프로젝트", type: "마감 임박", badge: "D-3" },
    { title: "스마트제조 혁신바우처", type: "인기 매칭", badge: "HOT" },
    { title: "글로벌 K-스타트업", type: "신규 등록", badge: "NEW" },
    { title: "소부장 기술개발사업", type: "마감 임박", badge: "D-5" }
  ];

  return (
    <section className="py-20 px-8 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            믿을 수 있는 성과
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            데이터로 입증된 정부지원사업 매칭 플랫폼의 실제 성과를 확인하세요
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] border-0 rounded-3xl hover:shadow-[20px_30px_100px_0px_rgba(0,0,0,0.15)] transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-2xl mb-6 group-hover:bg-[#58d674] transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-[#58d674] group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real-time Activities */}
        <div className="bg-white rounded-3xl shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">실시간 지원사업 현황</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#58d674] rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">실시간 업데이트</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {recentActivities.map((activity, index) => (
              <Card key={index} className="bg-gray-50 border-0 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activity.badge === 'NEW' ? 'bg-blue-100 text-blue-700' :
                      activity.badge.startsWith('D-') ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {activity.badge}
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                    {activity.title}
                  </h4>
                  
                  <p className="text-xs text-gray-600">
                    {activity.type}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}