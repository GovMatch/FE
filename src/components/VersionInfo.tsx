import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Info, GitBranch, Calendar, Users } from "lucide-react";

export function VersionInfo() {
  const versionData = {
    version: "v1.4.0",
    buildDate: "2024.12.19",
    features: [
      "구독 관리 시스템",
      "프로모션 코드 관리", 
      "관리자 대시보드",
      "92% AI 매칭 엔진"
    ],
    status: "Stable"
  };

  return (
    <Card className="max-w-sm">
      <CardContent className="p-4 space-y-3">
        {/* 버전 정보 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#58d674]" />
            <span className="font-medium">{versionData.version}</span>
          </div>
          <Badge variant="outline" className="text-xs text-green-700 border-green-200">
            {versionData.status}
          </Badge>
        </div>

        {/* 빌드 날짜 */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>빌드: {versionData.buildDate}</span>
        </div>

        {/* 주요 기능 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Info className="w-4 h-4 text-blue-600" />
            <span>주요 기능</span>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {versionData.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs justify-center">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* 매칭 정확도 */}
        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
          <span className="text-sm font-medium text-green-800">매칭 정확도</span>  
          <span className="text-lg font-bold text-green-700">92%</span>
        </div>
      </CardContent>
    </Card>
  );
}

// 간단한 버전 뱃지 컴포넌트
export function VersionBadge() {
  return (
    <Badge variant="outline" className="text-xs">
      v1.3.0
    </Badge>
  );
}

// 관리자용 상세 버전 정보
export function AdminVersionInfo() {
  const systemStats = {
    totalComponents: 42,
    totalPages: 8, 
    coreFeatures: 4,
    adminModules: 8,
    lastUpdate: "2024.12.19"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-[#58d674]">{systemStats.totalComponents}</div>
          <div className="text-sm text-gray-600">컴포넌트</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{systemStats.totalPages}</div>
          <div className="text-sm text-gray-600">페이지</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{systemStats.coreFeatures}</div>
          <div className="text-sm text-gray-600">핵심 기능</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{systemStats.adminModules}</div>
          <div className="text-sm text-gray-600">관리 모듈</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-lg font-bold text-gray-700">v1.3.0</div>
          <div className="text-sm text-gray-600">현재 버전</div>
        </CardContent>
      </Card>
    </div>
  );
}