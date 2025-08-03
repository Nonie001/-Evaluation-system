// components/ScoreSummary.tsx

import { EvaluationData } from '@/lib/types';
import { Calculator, TrendingUp } from 'lucide-react';

interface Props {
  formData: EvaluationData;
}

export default function ScoreSummary({ formData }: Props) {
  const calculateQualityScore = () => {
    return Object.values(formData.quality || {}).reduce((sum, score) => sum + (Number(score) || 0), 0);
  };

  const calculateBehaviorScore = () => {
    return Object.values(formData.behavior || {}).reduce((sum, score) => sum + (Number(score) || 0), 0);
  };

  const qualityScore = calculateQualityScore();
  const behaviorScore = calculateBehaviorScore();
  const totalScore = qualityScore + behaviorScore;
  const percentage = ((totalScore / 150) * 100).toFixed(2);

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-blue-600 bg-blue-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getGradeText = (percentage: number) => {
    if (percentage >= 90) return 'ดีเยี่ยม';
    if (percentage >= 80) return 'ดี';
    if (percentage >= 70) return 'พอใช้';
    return 'ต้องปรับปรุง';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg">
          <Calculator className="w-5 h-5" />
          <h2 className="text-lg font-semibold">ผลการประเมินประจำเดือน</h2>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-amber-100 to-orange-100">
                <th className="border border-amber-300 p-4 text-left font-semibold text-amber-900 rounded-tl-xl">
                  ด้านที่ประเมิน
                </th>
                <th className="border border-amber-300 p-4 text-center w-32 font-semibold text-amber-900">
                  คะแนน (150)
                </th>
                <th className="border border-amber-300 p-4 text-center w-32 font-semibold text-amber-900 rounded-tr-xl">
                  คิดเป็นร้อยละ (100)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-emerald-50 transition-colors duration-200">
                <td className="border border-amber-300 p-4 font-medium text-gray-800">
                  3.1 ด้านคุณภาพ (50 คะแนน)
                </td>
                <td className="border border-amber-300 p-4 text-center font-bold text-emerald-600 text-lg">
                  {qualityScore}
                </td>
                <td className="border border-amber-300 p-4 text-center font-bold text-emerald-600 text-lg">
                  {((qualityScore / 50) * 100).toFixed(0)}%
                </td>
              </tr>
              <tr className="bg-white hover:bg-purple-50 transition-colors duration-200">
                <td className="border border-amber-300 p-4 font-medium text-gray-800">
                  3.2 ด้านพฤติกรรม (100 คะแนน)
                </td>
                <td className="border border-amber-300 p-4 text-center font-bold text-purple-600 text-lg">
                  {behaviorScore}
                </td>
                <td className="border border-amber-300 p-4 text-center font-bold text-purple-600 text-lg">
                  {((behaviorScore / 100) * 100).toFixed(0)}%
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <td className="border border-amber-300 p-4 font-bold text-gray-900 rounded-bl-xl">
                  รวมทั้งหมด
                </td>
                <td className="border border-amber-300 p-4 text-center text-blue-600 font-bold text-xl">
                  {totalScore}
                </td>
                <td className="border border-amber-300 p-4 text-center text-blue-600 font-bold text-xl rounded-br-xl">
                  {percentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Score Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{totalScore}</div>
              <div className="text-blue-100 text-sm font-medium">คะแนนรวม</div>
            </div>
          </div>
          <div className="text-blue-100 text-sm">จากคะแนนเต็ม 150</div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white/60 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(totalScore / 150) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
              <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs font-bold">%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">{percentage}%</div>
              <div className="text-green-100 text-sm font-medium">เปอร์เซ็นต์รวม</div>
            </div>
          </div>
          <div className="text-green-100 text-sm">ผลการประเมินโดยรวม</div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white/60 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Number(percentage)}%` }}
            ></div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
              <div className="w-6 h-6 bg-white/80 rounded-lg transform rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-600 rounded-sm transform -rotate-45"></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold mb-1">{getGradeText(Number(percentage))}</div>
              <div className="text-purple-100 text-sm font-medium">เกรดประเมิน</div>
            </div>
          </div>
          <div className="text-purple-100 text-sm">ผลการประเมินสุดท้าย</div>
          <div className={`mt-4 px-3 py-1 rounded-full text-center text-sm font-bold ${getGradeColor(Number(percentage))}`}>
            {getGradeText(Number(percentage))}
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
              <span className="text-lg font-semibold text-gray-800">ด้านคุณภาพ</span>
            </div>
            <span className="text-lg font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full">
              {qualityScore}/50
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${(qualityScore / 50) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>0</span>
            <span className="font-medium">{((qualityScore / 50) * 100).toFixed(1)}%</span>
            <span>50</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-lg font-semibold text-gray-800">ด้านพฤติกรรม</span>
            </div>
            <span className="text-lg font-bold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
              {behaviorScore}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${(behaviorScore / 100) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>0</span>
            <span className="font-medium">{((behaviorScore / 100) * 100).toFixed(1)}%</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
}