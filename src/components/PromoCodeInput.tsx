import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Trash2, Tag, CheckCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PromoCode {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
  expiresAt: string;
  isUsed: boolean;
}

export function PromoCodeInput() {
  const [promoCode, setPromoCode] = useState("");
  const [appliedCodes, setAppliedCodes] = useState<PromoCode[]>([
    {
      id: "1",
      code: "WELCOME20",
      discount: 20,
      type: "percentage",
      description: "신규 사용자 20% 할인",
      expiresAt: "2024.03.31",
      isUsed: false
    }
  ]);

  const handleApplyCode = () => {
    if (!promoCode.trim()) {
      toast.error("프로모션 코드를 입력해주세요");
      return;
    }

    // Mock validation
    const mockCodes = [
      {
        id: Date.now().toString(),
        code: promoCode,
        discount: 15,
        type: "percentage" as const,
        description: "15% 할인 혜택",
        expiresAt: "2024.06.30",
        isUsed: false
      }
    ];

    const foundCode = mockCodes.find(code => code.code === promoCode);
    
    if (foundCode) {
      const isAlreadyApplied = appliedCodes.some(code => code.code === promoCode);
      
      if (isAlreadyApplied) {
        toast.error("이미 적용된 프로모션 코드입니다");
        return;
      }

      setAppliedCodes([...appliedCodes, foundCode]);
      setPromoCode("");
      toast.success("프로모션 코드가 적용되었습니다!");
    } else {
      toast.error("유효하지 않은 프로모션 코드입니다");
    }
  };

  const handleRemoveCode = (codeId: string) => {
    setAppliedCodes(appliedCodes.filter(code => code.id !== codeId));
    toast.success("프로모션 코드가 제거되었습니다");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#58d674]" />
          프로모션 코드
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 프로모션 코드 입력 */}
        <div className="flex gap-2">
          <Input
            placeholder="프로모션 코드를 입력하세요"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyCode()}
          />
          <Button 
            onClick={handleApplyCode}
            className="bg-[#58d674] hover:bg-[#4bc961]"
          >
            적용
          </Button>
        </div>

        {/* 적용된 프로모션 코드 목록 */}
        {appliedCodes.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">적용된 프로모션 코드</h4>
            {appliedCodes.map((code) => (
              <div key={code.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{code.code}</span>
                      <Badge variant="outline" className="text-xs">
                        {code.type === 'percentage' ? `${code.discount}% 할인` : `${code.discount.toLocaleString()}원 할인`}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{code.description}</p>
                    <p className="text-xs text-gray-500">유효기간: {code.expiresAt}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveCode(code.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* 사용 가능한 프로모션 안내 */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-1">사용 가능한 프로모션</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• FIRST30: 첫 매칭 서비스 30% 할인</li>
            <li>• STARTUP50: 스타트업 고객 50% 할인</li>
            <li>• PREMIUM20: 프리미엄 서비스 20% 할인</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}