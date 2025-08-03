// app/page.tsx

import EvaluationForm from '@/components/EvaluationForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header with Logo */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-30"></div>
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={70}
                  height={70}
                  className="relative rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  ระบบประเมินการทดลองงาน
                </h1>
                <p className="text-sm md:text-base text-gray-600 max-w-md">
                  สภาเครือข่ายช่วยเหลือด้านมนุษยธรรม สำนักจุฬาราชมนตรี
                </p>
              </div>
            </div>
            
            {/* Stats or quick info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">150</div>
                <div className="text-xs text-gray-500">คะแนนเต็ม</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">15</div>
                <div className="text-xs text-gray-500">หัวข้อประเมิน</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">2</div>
                <div className="text-xs text-gray-500">ด้านที่ประเมิน</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Form */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <EvaluationForm />
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pb-6">
          <div className="text-sm text-gray-500">
            <p>พัฒนาโดยระบบประเมินการทดลองงานออนไลน์</p>
            <p className="mt-1">© 2025 สภาเครือข่ายช่วยเหลือด้านมนุษยธรรม สำนักจุฬาราชมนตรี</p>
          </div>
        </footer>
      </div>
    </main>
  );
}