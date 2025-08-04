// app/page.tsx

import EvaluationForm from '@/components/EvaluationForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6 max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ระบบประเมินการทำงาน
            </h1>
            <p className="text-gray-600">
              Employee Work Evaluation System
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <EvaluationForm />

        {/* Footer */}
        <footer className="text-center mt-16 py-6">
          <div className="text-sm text-gray-500 space-y-1">
            <p>พัฒนาโดยระบบประเมินการทำงานออนไลน์</p>
            <p>© 2025 สภาเครือข่ายช่วยเหลือด้านมนุษยธรรม สำนักจุฬาราชมนตรี</p>
          </div>
        </footer>
      </div>
    </main>
  );
}