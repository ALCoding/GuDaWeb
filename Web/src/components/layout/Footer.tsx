export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/10 py-12 sm:py-16 md:py-20 mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">加入观赛社群</h2>
        <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">
          扫码加入「固搭2025团体赛」官方微信群，获取实时比分与战报。
        </p>
        <div className="inline-block p-3 sm:p-4 bg-white rounded-lg mb-6 sm:mb-8">
          {/* QR Code Placeholder */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 flex items-center justify-center text-gray-500 text-[10px] sm:text-xs text-center p-2">
            [赛事交流群
            <br />
            二维码]
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 px-4">
          © 2025 GuDa Badminton Club. All rights reserved.
          <br />
          <span className="text-gray-500 mt-2 block text-xs">Powered by Jalen</span>
        </p>
      </div>
    </footer>
  );
}

