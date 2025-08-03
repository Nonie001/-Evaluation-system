// components/PDFPreview.tsx
'use client';

import { useState } from 'react';
import { EvaluationData } from '@/lib/types';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';

interface Props {
  formData: EvaluationData;
}

export default function PDFPreview({ formData }: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePreview = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('เกิดข้อผิดพลาดในการสร้าง PDF');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `แบบประเมินผลงาน_${formData.employee.name || 'พนักงาน'}.pdf`;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg">
          <FileText className="w-5 h-5" />
          <h3 className="text-lg font-semibold">ตัวอย่างเอกสาร PDF</h3>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleGeneratePreview}
          disabled={isLoading}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="flex items-center justify-center gap-2">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
            <span>{isLoading ? 'กำลังสร้าง...' : 'แสดงตัวอย่าง PDF'}</span>
          </div>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </button>

        {pdfUrl && (
          <button
            onClick={handleDownload}
            className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              <span>ดาวน์โหลด PDF</span>
            </div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-red-600 font-medium">{error}</div>
          <div className="text-red-500 text-sm mt-1">กรุณาลองใหม่อีกครั้ง</div>
        </div>
      )}

      {/* PDF Preview */}
      {pdfUrl && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-800">ตัวอย่างเอกสาร PDF</span>
              </div>
              <div className="text-sm text-gray-500">
                ขนาดหน้าจอ: A4
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-inner">
              <iframe
                src={pdfUrl}
                title="PDF Preview"
                className="w-full h-[600px] md:h-[700px] lg:h-[800px] border-0 rounded-xl"
                style={{ minHeight: '500px' }}
              />
              
              {/* Loading overlay for iframe */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500">กำลังโหลดเอกสาร...</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!pdfUrl && !isLoading && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="text-center">
            <FileText className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-blue-900 mb-2">ยังไม่มีตัวอย่าง PDF</h4>
            <p className="text-blue-700 mb-4">กดปุ่ม "แสดงตัวอย่าง PDF" เพื่อสร้างเอกสารจากข้อมูลที่กรอก</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>ตัวอย่างจะแสดงในรูปแบบ A4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>สามารถดาวน์โหลดได้ทันที</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
