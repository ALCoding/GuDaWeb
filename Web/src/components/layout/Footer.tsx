'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [imageError, setImageError] = useState(false);

  return (
    <footer id="contact" className="bg-black border-t border-white/10 py-12 sm:py-16 md:py-20 mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">联系我们</h2>
        <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4 leading-relaxed">
          如有赛事咨询、合作意向或其他问题，欢迎扫码添加联系方式
          <br />
          <span className="text-xs sm:text-sm text-gray-500 mt-2 inline-block">
            我们将在第一时间为您解答
          </span>
        </p>
        <div className="inline-block p-3 sm:p-4 bg-white rounded-xl mb-6 sm:mb-8 shadow-lg">
          {!imageError ? (
            <Image
              src="/images/contact_qrcode.png"
              alt="联系我们二维码"
              width={160}
              height={160}
              className="w-32 h-32 sm:w-40 sm:h-40"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-[10px] sm:text-xs text-center p-2 rounded">
              请将二维码图片
              <br />
              放置到
              <br />
              public/images/
              <br />
              contact_qrcode.png
            </div>
          )}
        </div>
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-gray-600 px-4">
            © 2025 GuDa Badminton Club. All rights reserved.
            <br />
            <span className="text-gray-500 mt-2 block text-xs">Powered by Jalen</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

