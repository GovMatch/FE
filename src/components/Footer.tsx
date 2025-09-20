import { imgVector, imgVector1 } from "../imports/svg-x25l8";
import { VersionBadge } from "./VersionInfo";
import type { PageType } from "./Router";

interface FooterProps {
  onNavigate: (page: PageType, programId?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {

  const footerLinks = {
    서비스: [
      "정부지원사업 매칭",
      "매칭 정확도 분석",
      "전문가 컨설팅",
      "성공사례"
    ],
    고객지원: [
      "이용가이드",
      "자주묻는질문",
      "1:1 문의",
      "기술지원"
    ],
    회사소개: [
      "회사정보",
      "팀소개",
      "채용정보",
      "보도자료"
    ]
  };

  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-8 relative">
      {/* Award Badge - 모바일에서는 상단 중앙으로 이동 */}
      <div className="block sm:absolute sm:top-8 sm:right-8 mb-6 sm:mb-0">
        <div className="relative mx-auto sm:mx-0 w-fit">
          <div className="bg-white h-24 sm:h-36 rounded-br-[36px] sm:rounded-br-[72px] shadow-[20px_20px_80px_0px_rgba(0,0,0,0.1)] w-48 sm:w-72 p-3 sm:p-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <img className="w-4 h-8 sm:w-6 sm:h-12 mr-1 sm:mr-2" src={imgVector} alt="Award Left" />
                  <img className="w-4 h-8 sm:w-6 sm:h-12" src={imgVector1} alt="Award Right" />
                </div>
                <div className="text-gray-800 text-xs sm:text-sm font-bold mb-1">BEST PLATFORM</div>
                <div className="text-gray-600 text-xs">Government Support</div>
                <div className="text-gray-800 text-xs font-black">2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:max-w-7xl lg:mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              <span className="text-white">정부지원사업</span>
              <span className="text-[#58d674]">매칭.</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 sm:mb-6">
              AI 기반 정밀 분석으로 기업에 최적화된 정부지원사업을 매칭하여
              성공적인 지원사업 선정을 도와드립니다.
            </p>
            <div className="text-sm text-gray-400 space-y-1">
              <p>대표이사: 김철수</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>서울시 강남구 테헤란로 123</p>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-3 sm:mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#58d674] text-sm transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h5 className="font-semibold text-white mb-2">고객센터</h5>
              <p className="text-[#58d674] text-lg font-bold">1588-1234</p>
              <p className="text-gray-400 text-sm">평일 09:00~18:00 (점심시간 12:00~13:00)</p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-2">이메일 문의</h5>
              <p className="text-[#58d674] text-sm sm:text-base break-all">support@govmatch.co.kr</p>
              <p className="text-gray-400 text-sm">24시간 접수, 영업일 기준 24시간 내 답변</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h5 className="font-semibold text-white mb-2">제휴 문의</h5>
              <p className="text-[#58d674] text-sm sm:text-base break-all">partners@govmatch.co.kr</p>
              <p className="text-gray-400 text-sm">사업 제휴 및 협력 문의</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            <span>© 2024 정부지원사업매칭. All rights reserved.</span>
            <VersionBadge />
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
            <a href="#" className="hover:text-[#58d674] transition-colors duration-200">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-[#58d674] transition-colors duration-200">
              이용약관
            </a>
            <a href="#" className="hover:text-[#58d674] transition-colors duration-200">
              쿠키정책
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}