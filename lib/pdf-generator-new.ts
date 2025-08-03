// lib/pdf-generator.ts

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EvaluationData } from './types';

// ข้อมูลหัวข้อการประเมิน
const QUALITY_ITEMS = [
  { key: 'goalAchievement', label: '2.1.1 งานสำเร็จตามเป้าหมาย' },
  { key: 'skills', label: '2.1.2 ทักษะ ความรู้ ที่จำเป็นต่อการทำงาน' },
  { key: 'understanding', label: '2.1.3 ความรู้ความเข้าใจในการปฏิบัติงาน' },
  { key: 'accuracy', label: '2.1.4 ความละเอียดรอบคอบ ความถูกต้องของงาน' },
  { key: 'speed', label: '2.1.5 ความรวดเร็ว งานที่ทำเสร็จสิ้นในระยะเวลาที่กำหนด' }
];

const BEHAVIOR_ITEMS = [
  { key: 'discipline', label: '2.2.1 การปฏิบัติตามระเบียบ วินัย ตรงต่อเวลา' },
  { key: 'learning', label: '2.2.2 ความสามารถในการเรียนรู้งาน' },
  { key: 'creativity', label: '2.2.3 ความคิดริเริ่มสร้างสรรค์' },
  { key: 'cooperation', label: '2.2.4 ความร่วมมือ การประสานงาน การมีส่วนร่วม' },
  { key: 'volunteer', label: '2.2.5 ความมีจิตอาสา ช่วยเหลือผู้อื่น' },
  { key: 'generosity', label: '2.2.6 ความเอื้อเฟื้อเผื่อแผ่' },
  { key: 'relationship', label: '2.2.7 ความมีมนุษยสัมพันธ์' },
  { key: 'dedication', label: '2.2.8 ความเสียสละและอุทิศเวลาให้กับงาน' },
  { key: 'enthusiasm', label: '2.2.9 ความกระตือรือร้น ความมานะพยายาม' },
  { key: 'decision', label: '2.2.10 การตัดสินใจและการแก้ปัญหา' }
];

export async function generatePDF(data: EvaluationData) {
  const logoImage = await loadImage('/logo.jpg');
  const element = createPDFElement();
  const htmlContent = generateHTMLContent(data, logoImage);
  
  element.innerHTML = htmlContent;
  document.body.appendChild(element);

  try {
    const canvas = await generateCanvas(element);
    const pdf = await createPDF(canvas, data);
    
    const fileName = generateFileName(data);
    pdf.save(fileName);
  } finally {
    document.body.removeChild(element);
  }
}

// สร้าง Element สำหรับ PDF
function createPDFElement(): HTMLDivElement {
  const element = document.createElement('div');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.backgroundColor = 'white';
  element.style.width = '210mm';
  element.style.padding = '15mm';
  element.style.fontFamily = '"Sarabun", "Arial", sans-serif';
  element.style.lineHeight = '1.4';
  return element;
}

// สร้าง HTML Content
function generateHTMLContent(data: EvaluationData, logoImage: string): string {
  return `
    ${getPDFStyles()}
    <div class="pdf-container">
      ${generateHeader(data, logoImage)}
      ${generateEmployeeSection(data)}
      ${generateQualitySection(data)}
      ${generateBehaviorSection(data)}
      ${generateSummarySection(data)}
      ${generateCommentsSection(data)}
      ${generateSignatureSection(data)}
    </div>
  `;
}

// สไตล์ CSS สำหรับ PDF
function getPDFStyles(): string {
  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');
      
      .pdf-container {
        font-family: 'Sarabun', Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
      }
      
      .header {
        text-align: center;
        margin-bottom: 30px;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      
      .logo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 0 auto 15px;
        display: block;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      
      .section {
        margin-bottom: 25px;
        background: white;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }
      
      .section-header {
        background: linear-gradient(90deg, #4299e1, #3182ce);
        color: white;
        padding: 12px 20px;
        font-weight: 600;
        font-size: 16px;
      }
      
      .section-content {
        padding: 20px;
      }
      
      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 15px;
      }
      
      .info-item {
        padding: 8px 0;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .info-label {
        font-weight: 600;
        color: #2d3748;
        margin-right: 10px;
      }
      
      .info-value {
        color: #4a5568;
      }
      
      .score-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-radius: 8px;
        overflow: hidden;
      }
      
      .score-table th {
        background: linear-gradient(90deg, #667eea, #764ba2);
        color: white;
        padding: 12px;
        text-align: left;
        font-weight: 600;
      }
      
      .score-table td {
        padding: 10px 12px;
        border: 1px solid #e2e8f0;
        background: white;
      }
      
      .score-table tr:nth-child(even) td {
        background: #f8fafc;
      }
      
      .score-value {
        text-align: center;
        font-weight: 600;
        color: #2b6cb0;
        font-size: 16px;
      }
      
      .summary-table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        border-radius: 8px;
        overflow: hidden;
      }
      
      .summary-table th {
        background: linear-gradient(90deg, #ff6b6b, #ffa500);
        color: white;
        padding: 15px;
        font-weight: 600;
        text-align: center;
      }
      
      .summary-table td {
        padding: 12px 15px;
        border: 1px solid #e2e8f0;
        text-align: center;
      }
      
      .summary-table .total-row {
        background: linear-gradient(90deg, #4299e1, #3182ce);
        color: white;
        font-weight: 700;
        font-size: 16px;
      }
      
      .quality-score {
        color: #38a169;
        font-weight: 600;
      }
      
      .behavior-score {
        color: #805ad5;
        font-weight: 600;
      }
      
      .leave-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
        margin: 15px 0;
      }
      
      .leave-item {
        text-align: center;
        background: #edf2f7;
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #cbd5e0;
      }
      
      .leave-label {
        font-size: 12px;
        color: #4a5568;
        margin-bottom: 5px;
      }
      
      .leave-value {
        font-size: 18px;
        font-weight: 600;
        color: #2d3748;
      }
      
      .grade-badge {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        margin-top: 10px;
      }
      
      .grade-excellent { background: #c6f6d5; color: #22543d; }
      .grade-good { background: #bee3f8; color: #2a4365; }
      .grade-fair { background: #fef5e7; color: #744210; }
      .grade-poor { background: #fed7d7; color: #742a2a; }
      
      .comments-section {
        background: #f7fafc;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
      }
      
      .signature-section {
        margin-top: 40px;
        text-align: center;
        background: #f8fafc;
        padding: 30px;
        border-radius: 8px;
        border: 2px solid #e2e8f0;
      }
      
      .signature-box {
        display: inline-block;
        margin: 20px;
        text-align: center;
      }
      
      .signature-line {
        width: 200px;
        height: 50px;
        border-bottom: 2px solid #4a5568;
        margin: 0 auto 10px;
      }
    </style>
  `;
}

// สร้างส่วนหัว
function generateHeader(data: EvaluationData, logoImage: string): string {
  return `
    <div class="header">
      <img src="${logoImage}" alt="Logo" class="logo" />
      <h1 style="margin: 0 0 5px 0; font-size: 22px; font-weight: 700;">แบบประเมินการทดลองงานเจ้าหน้าที่</h1>
      <p style="margin: 0; font-size: 16px; opacity: 0.9;">สภาเครือข่ายช่วยเหลือด้านมนุษยธรรม สำนักจุฬาราชมนตรี</p>
      <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: 500;">ประจำเดือน ${data.evaluationMonth || '-'} ${data.evaluationYear || '-'}</p>
    </div>
  `;
}

// สร้างส่วนข้อมูลพนักงาน
function generateEmployeeSection(data: EvaluationData): string {
  return `
    <div class="section">
      <div class="section-header">
        📋 ส่วนที่ 1 ข้อมูลเจ้าหน้าที่
      </div>
      <div class="section-content">
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">ชื่อ-สกุล:</span>
            <span class="info-value">${data.employeeName || '-'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">ส่วน/ฝ่าย:</span>
            <span class="info-value">${data.department || '-'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">ตำแหน่ง:</span>
            <span class="info-value">${data.position || '-'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">อัตราค่าจ้าง:</span>
            <span class="info-value">${data.salary ? `${data.salary} บาท` : '-'}</span>
          </div>
        </div>
        
        <div class="info-item" style="grid-column: 1 / -1;">
          <span class="info-label">ระยะเวลาทดลองงาน:</span>
          <span class="info-value">${formatDate(data.probationStart)} ถึง ${formatDate(data.probationEnd)}</span>
        </div>

        <h4 style="margin: 20px 0 15px 0; color: #2d3748; font-weight: 600;">📊 สถิติการลา</h4>
        <div class="leave-stats">
          <div class="leave-item">
            <div class="leave-label">ลาป่วย</div>
            <div class="leave-value">${data.sickLeave || 0} วัน</div>
          </div>
          <div class="leave-item">
            <div class="leave-label">ลากิจ</div>
            <div class="leave-value">${data.personalLeave || 0} วัน</div>
          </div>
          <div class="leave-item">
            <div class="leave-label">ลาอื่นๆ</div>
            <div class="leave-value">${data.otherLeave || 0} วัน</div>
          </div>
          <div class="leave-item">
            <div class="leave-label">ขาดงาน</div>
            <div class="leave-value">${data.absent || 0} วัน</div>
          </div>
        </div>
        
        <div style="margin-top: 15px;">
          <span class="info-label">สถานะการมาสาย:</span>
          <span class="info-value">
            ${getLateFrequencyText(data.lateFrequency)}
          </span>
        </div>
      </div>
    </div>
  `;
}

// สร้างส่วนประเมินคุณภาพ
function generateQualitySection(data: EvaluationData): string {
  const rows = QUALITY_ITEMS.map(item => `
    <tr>
      <td>${item.label}</td>
      <td class="score-value quality-score">${data.quality?.[item.key as keyof typeof data.quality] || 0}/10</td>
    </tr>
  `).join('');

  return `
    <div class="section">
      <div class="section-header">
        🌟 ส่วนที่ 2.1 การประเมินด้านคุณภาพ (50 คะแนน)
      </div>
      <div class="section-content">
        <table class="score-table">
          <thead>
            <tr>
              <th style="width: 70%;">หัวข้อประเมิน</th>
              <th style="width: 30%; text-align: center;">คะแนน</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// สร้างส่วนประเมินพฤติกรรม
function generateBehaviorSection(data: EvaluationData): string {
  const rows = BEHAVIOR_ITEMS.map(item => `
    <tr>
      <td>${item.label}</td>
      <td class="score-value behavior-score">${data.behavior?.[item.key as keyof typeof data.behavior] || 0}/10</td>
    </tr>
  `).join('');

  return `
    <div class="section">
      <div class="section-header">
        💜 ส่วนที่ 2.2 การประเมินด้านพฤติกรรม (100 คะแนน)
      </div>
      <div class="section-content">
        <table class="score-table">
          <thead>
            <tr>
              <th style="width: 70%;">หัวข้อประเมิน</th>
              <th style="width: 30%; text-align: center;">คะแนน</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// สร้างส่วนสรุปผล
function generateSummarySection(data: EvaluationData): string {
  const qualityScore = calculateScore(data.quality);
  const behaviorScore = calculateScore(data.behavior);
  const totalScore = qualityScore + behaviorScore;
  const percentage = ((totalScore / 150) * 100);

  return `
    <div class="section">
      <div class="section-header">
        📊 ส่วนที่ 3 สรุปผลการประเมิน
      </div>
      <div class="section-content">
        <table class="summary-table">
          <thead>
            <tr>
              <th>ด้านที่ประเมิน</th>
              <th>คะแนน (150)</th>
              <th>คิดเป็นร้อยละ (100)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="text-align: left; font-weight: 600;">3.1 ด้านคุณภาพ (50 คะแนน)</td>
              <td class="quality-score" style="font-size: 16px;">${qualityScore}</td>
              <td class="quality-score" style="font-size: 16px;">${((qualityScore / 50) * 100).toFixed(0)}%</td>
            </tr>
            <tr>
              <td style="text-align: left; font-weight: 600;">3.2 ด้านพฤติกรรม (100 คะแนน)</td>
              <td class="behavior-score" style="font-size: 16px;">${behaviorScore}</td>
              <td class="behavior-score" style="font-size: 16px;">${((behaviorScore / 100) * 100).toFixed(0)}%</td>
            </tr>
            <tr class="total-row">
              <td style="text-align: left;">รวมทั้งหมด</td>
              <td style="font-size: 18px;">${totalScore}</td>
              <td style="font-size: 18px;">${percentage.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
        
        <div style="text-align: center; margin-top: 20px;">
          <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">ผลการประเมิน</div>
          <span class="grade-badge ${getGradeClass(percentage)}">
            ${getGradeText(percentage)}
          </span>
        </div>
      </div>
    </div>
  `;
}

// สร้างส่วนความเห็นเพิ่มเติม
function generateCommentsSection(data: EvaluationData): string {
  if (!data.additionalComments) return '';
  
  return `
    <div class="section">
      <div class="section-header">
        💭 ความเห็นเพิ่มเติม
      </div>
      <div class="section-content">
        <div class="comments-section">
          ${data.additionalComments.replace(/\n/g, '<br>')}
        </div>
      </div>
    </div>
  `;
}

// สร้างส่วนลงนาม
function generateSignatureSection(data: EvaluationData): string {
  return `
    <div class="signature-section">
      <h3 style="margin: 0 0 20px 0; color: #2d3748;">ลงนาม</h3>
      <div class="signature-box">
        <div class="signature-line"></div>
        <p style="margin: 5px 0; font-weight: 600;">( ${data.evaluatorName || '..............................'} )</p>
        <p style="margin: 0; color: #4a5568;">${data.evaluatorPosition || 'ตำแหน่ง'}</p>
        <p style="margin: 10px 0 0 0; color: #4a5568;">วันที่ ......./......./....... </p>
      </div>
    </div>
  `;
}

// สร้าง Canvas
async function generateCanvas(element: HTMLDivElement): Promise<HTMLCanvasElement> {
  return await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
    backgroundColor: '#ffffff',
    scrollX: 0,
    scrollY: 0,
    width: element.scrollWidth,
    height: element.scrollHeight
  });
}

// สร้าง PDF
async function createPDF(canvas: HTMLCanvasElement, data: EvaluationData): Promise<jsPDF> {
  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  // เพิ่มรูปลงใน PDF
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pageHeight;

  // ถ้าเนื้อหายาวเกิน 1 หน้า
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
  }

  return pdf;
}

// Helper Functions
function calculateScore(scores: Record<string, number> | undefined): number {
  if (!scores) return 0;
  return Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return '-.-.----';
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH');
}

function getLateFrequencyText(frequency: string | undefined): string {
  switch (frequency) {
    case 'never': return '✅ ไม่เคยมาสาย';
    case '1-3': return '⚠️ มาสาย 1-3 ครั้ง';
    case 'more3': return '❌ มาสายมากกว่า 3 ครั้ง';
    default: return '-';
  }
}

function getGradeText(percentage: number): string {
  if (percentage >= 90) return 'ดีเยี่ยม (Excellent)';
  if (percentage >= 80) return 'ดี (Good)';
  if (percentage >= 70) return 'พอใช้ (Fair)';
  return 'ต้องปรับปรุง (Need Improvement)';
}

function getGradeClass(percentage: number): string {
  if (percentage >= 90) return 'grade-excellent';
  if (percentage >= 80) return 'grade-good';
  if (percentage >= 70) return 'grade-fair';
  return 'grade-poor';
}

function generateFileName(data: EvaluationData): string {
  const name = data.employeeName || 'ไม่ระบุ';
  const month = data.evaluationMonth || 'ไม่ระบุ';
  const year = data.evaluationYear || 'ไม่ระบุ';
  return `แบบประเมิน-${name}-${month}-${year}.pdf`;
}

async function loadImage(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = () => {
      // ถ้าโหลดรูปไม่ได้ ให้ใช้ placeholder
      resolve('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23ddd"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999">LOGO</text></svg>');
    };
    img.src = src;
  });
}
