import { Search, Filter, Calendar, Building2, DollarSign, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";

export function SearchAndFilter() {
  const quickFilters = [
    { label: "마감 임박", count: 12, color: "destructive" },
    { label: "신규 등록", count: 8, color: "default" },
    { label: "인기 매칭", count: 15, color: "secondary" },
    { label: "고액 지원", count: 6, color: "outline" }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] p-8 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="지원사업명, 키워드, 기관명으로 검색..."
          className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:border-[#58d674] focus:ring-0 bg-gray-50"
        />
        <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#58d674] hover:bg-[#4bc961] text-white px-6 rounded-xl">
          검색
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="text-sm font-medium text-gray-600 mr-2">빠른 필터:</span>
        {quickFilters.map((filter) => (
          <Badge 
            key={filter.label} 
            variant={filter.color as any}
            className="px-4 py-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            {filter.label} ({filter.count})
          </Badge>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select>
          <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl">
            <Building2 className="w-4 h-4 mr-2 text-gray-500" />
            <SelectValue placeholder="지원 분야" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="startup">창업지원</SelectItem>
            <SelectItem value="rd">R&D 개발</SelectItem>
            <SelectItem value="tech">기술혁신</SelectItem>
            <SelectItem value="export">수출지원</SelectItem>
            <SelectItem value="employment">고용지원</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl">
            <Building2 className="w-4 h-4 mr-2 text-gray-500" />
            <SelectValue placeholder="지원 기관" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sba">중소벤처기업부</SelectItem>
            <SelectItem value="kstartup">창업진흥원</SelectItem>
            <SelectItem value="kotra">KOTRA</SelectItem>
            <SelectItem value="regional">지자체</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl">
            <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
            <SelectValue placeholder="지원 규모" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">1천만원 미만</SelectItem>
            <SelectItem value="medium">1천만원~5천만원</SelectItem>
            <SelectItem value="large">5천만원~1억원</SelectItem>
            <SelectItem value="xlarge">1억원 이상</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="bg-gray-50 border-gray-200 rounded-xl">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deadline">마감일 임박순</SelectItem>
            <SelectItem value="amount">지원금액 높은순</SelectItem>
            <SelectItem value="recent">최신 등록순</SelectItem>
            <SelectItem value="match">매칭도 높은순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}