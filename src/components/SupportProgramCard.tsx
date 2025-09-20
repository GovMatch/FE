import { Calendar, Building2, DollarSign, Users, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface SupportProgramProps {
  id: string;
  title: string;
  organization: string;
  category: string;
  amount: string;
  deadline: string;
  daysLeft: number;
  description: string;
  requirements: string[];
  matchScore?: number;
  applicants: number;
  maxApplicants: number;
  status: "upcoming" | "active" | "deadline-soon" | "closed";
  onNavigate?: (page: string, programId?: string) => void;
}

export function SupportProgramCard({
  id,
  title,
  organization,
  category,
  amount,
  deadline,
  daysLeft,
  description,
  requirements,
  matchScore,
  applicants,
  maxApplicants,
  status,
  onNavigate
}: SupportProgramProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary">예정</Badge>;
      case "active":
        return <Badge variant="default" className="bg-blue-100 text-blue-700">접수중</Badge>;
      case "deadline-soon":
        return <Badge variant="destructive">마감임박</Badge>;
      case "closed":
        return <Badge variant="outline">마감</Badge>;
      default:
        return null;
    }
  };

  const getUrgencyColor = () => {
    if (daysLeft <= 3) return "text-red-600";
    if (daysLeft <= 7) return "text-orange-600";
    return "text-gray-600";
  };

  return (
    <Card className="bg-white shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] border-0 rounded-2xl sm:rounded-3xl hover:shadow-[20px_30px_100px_0px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {getStatusBadge()}
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
              {matchScore && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-[#58d674] fill-current" />
                  <span className="text-xs sm:text-sm font-medium text-[#58d674]">
                    매칭 {matchScore}%
                  </span>
                </div>
              )}
            </div>
            <div className={`text-xs sm:text-sm font-medium ${getUrgencyColor()} whitespace-nowrap`}>
              D-{daysLeft}
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
            <Building2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{organization}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 pb-3 sm:pb-4">
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
            {description}
          </p>

          {/* Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center text-xs sm:text-sm">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-[#58d674] mr-2 flex-shrink-0" />
              <span className="font-medium text-gray-800">{amount}</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">{deadline}</span>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs text-gray-500 mb-2">주요 요건:</p>
            <div className="flex flex-wrap gap-1">
              {(requirements || []).slice(0, 3).map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs py-1">
                  {req}
                </Badge>
              ))}
              {(requirements || []).length > 3 && (
                <Badge variant="outline" className="text-xs py-1">
                  +{(requirements || []).length - 3}개
                </Badge>
              )}
            </div>
          </div>

          {/* Progress */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>신청 현황</span>
              <span>{applicants}/{maxApplicants}명</span>
            </div>
            <Progress 
              value={(applicants / maxApplicants) * 100} 
              className="h-2"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span>경쟁률 {(applicants / maxApplicants * 100).toFixed(1)}%</span>
          </div>
          <Button
            size="sm"
            className="bg-[#58d674] hover:bg-[#4bc961] text-white rounded-xl text-xs sm:text-sm h-7 sm:h-8 px-3 sm:px-4"
            onClick={() => onNavigate?.('program-detail', id)}
          >
            자세히 보기
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}