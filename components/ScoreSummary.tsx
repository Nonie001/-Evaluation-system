// components/ScoreSummary.tsx

import { EvaluationData } from '@/lib/types';
import { Calculator } from 'lucide-react';

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

  const getGradeText = (percentage: number) => {
    if (percentage >= 90) return 'ดีเยี่ยม';
    if (percentage >= 80) return 'ดี';
    if (percentage >= 70) return 'พอใช้';
    return 'ต้องปรับปรุง';
  };

  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="w-6 h-6 text-gray-600" />
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">สรุปผลการประเมิน</h3>
          <p className="text-gray-600">Evaluation Summary</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Score Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">หัวข้อการประเมิน</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300">คะแนนเต็ม</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300">คะแนนที่ได้</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b border-gray-300">ร้อยละ</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">ด้านคุณภาพการทำงาน</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700 border-b border-gray-200">50</td>
                <td className="px-4 py-3 text-sm text-center font-medium text-gray-800 border-b border-gray-200">{qualityScore}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700 border-b border-gray-200">{((qualityScore / 50) * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">ด้านพฤติกรรมการทำงาน</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700 border-b border-gray-200">100</td>
                <td className="px-4 py-3 text-sm text-center font-medium text-gray-800 border-b border-gray-200">{behaviorScore}</td>
                <td className="px-4 py-3 text-sm text-center text-gray-700 border-b border-gray-200">{((behaviorScore / 100) * 100).toFixed(1)}%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">รวมทั้งหมด</td>
                <td className="px-4 py-3 text-sm text-center font-medium text-gray-800">150</td>
                <td className="px-4 py-3 text-sm text-center font-bold text-gray-900">{totalScore}</td>
                <td className="px-4 py-3 text-sm text-center font-bold text-gray-900">{percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grade Display */}
        <div className="text-center p-6 bg-gray-50 border border-gray-200">
          <h4 className="text-lg font-medium text-gray-700 mb-2">ระดับการประเมิน</h4>
          <div className="text-3xl font-bold text-gray-800 mb-2">{getGradeText(Number(percentage))}</div>
          <div className="text-lg text-gray-600">{percentage}% ({totalScore}/150 คะแนน)</div>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 bg-white">
            <h5 className="font-medium text-gray-800 mb-3">คะแนนด้านคุณภาพ</h5>
            <div className="space-y-2">
              {Object.entries(formData.quality || {}).map(([key, value]) => {
                const labels: Record<string, string> = {
                  goalAchievement: 'งานสำเร็จตามเป้าหมาย',
                  skills: 'ทักษะ ความรู้',
                  understanding: 'ความเข้าใจในงาน',
                  accuracy: 'ความละเอียดรอบคอบ',
                  speed: 'ความรวดเร็ว'
                };
                return (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{labels[key]}</span>
                    <span className="font-medium">{value}/10</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 border border-gray-200 bg-white">
            <h5 className="font-medium text-gray-800 mb-3">คะแนนด้านพฤติกรรม</h5>
            <div className="space-y-2">
              {Object.entries(formData.behavior || {}).slice(0, 5).map(([key, value]) => {
                const labels: Record<string, string> = {
                  discipline: 'วินัย ตรงต่อเวลา',
                  learning: 'การเรียนรู้งาน',
                  creativity: 'ความคิดริเริ่ม',
                  cooperation: 'ความร่วมมือ',
                  volunteer: 'จิตอาสา'
                };
                return (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{labels[key]}</span>
                    <span className="font-medium">{value}/10</span>
                  </div>
                );
              })}
              <div className="text-xs text-gray-500 pt-1">และอื่นๆ อีก 5 หัวข้อ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
