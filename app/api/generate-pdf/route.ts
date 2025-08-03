import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { EvaluationData } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const data: EvaluationData = await request.json();
    const htmlContent = generateHTMLTemplate(data);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="evaluation-${data.employeeName}-${data.evaluationMonth}-${data.evaluationYear}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}

function generateHTMLTemplate(data: EvaluationData): string {
  const calculateScore = (scores: Record<string, number>): number => {
    return Object.values(scores).reduce((sum, score) => sum + (Number(score) || 0), 0);
  };

  const qualityScore = calculateScore(data.quality);
  const behaviorScore = calculateScore(data.behavior);
  const totalScore = qualityScore + behaviorScore;
  const percentage = ((totalScore / 150) * 100).toFixed(2);

  return `
  <!DOCTYPE html>
  <html lang="th">
  <head>
    <meta charset="UTF-8" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap');
      body {
        font-family: 'Noto Sans Thai', sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #000;
        padding: 0 20px;
      }
      h1, h2, h3 {
        text-align: center;
        margin: 8px 0;
      }
      .section {
        margin-bottom: 20px;
      }
      .info-table, .score-table, .behavior-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      .info-table td {
        padding: 4px 8px;
      }
      .score-table th, .score-table td,
      .behavior-table th, .behavior-table td {
        border: 1px solid #333;
        padding: 6px;
        text-align: center;
      }
      .textarea-box {
        border: 1px dotted #666;
        min-height: 100px;
        padding: 10px;
        white-space: pre-wrap;
      }
      .signature {
        margin-top: 60px;
        text-align: center;
      }
      .signature-line {
        display: inline-block;
        border-bottom: 1px dotted #000;
        width: 200px;
        margin-bottom: 4px;
      }
    </style>
  </head>
  <body>
    <h1>แบบประเมินการทดลองงานเจ้าหน้าที่</h1>
    <h3>สภาเครือข่ายช่วยเหลือด้านมนุษยธรรม สำนักจุฬาราชมนตรี</h3>
    <h3>ประจำเดือน ${data.evaluationMonth} ${data.evaluationYear}</h3>

    <div class="section">
      <h2>ส่วนที่ 1 ข้อมูลเจ้าหน้าที่</h2>
      <table class="info-table">
        <tr>
          <td><strong>ชื่อ-สกุล:</strong> ${data.employeeName}</td>
          <td><strong>ส่วน/ฝ่าย:</strong> ${data.department}</td>
        </tr>
        <tr>
          <td><strong>ตำแหน่ง:</strong> ${data.position || '-'}</td>
          <td><strong>อัตราค่าจ้าง:</strong> ${data.salary || '-'} บาท</td>
        </tr>
        <tr>
          <td colspan="2"><strong>ระยะเวลาทดลองงาน:</strong> ${data.probationStart || '-'} ถึง ${data.probationEnd || '-'}</td>
        </tr>
        <tr>
          <td colspan="2">
            <strong>สถิติการลา:</strong> ลาป่วย ${data.sickLeave} วัน, ลากิจ ${data.personalLeave} วัน,
            ลาอื่นๆ ${data.otherLeave} วัน, ขาดงาน ${data.absent} วัน
          </td>
        </tr>
        <tr>
          <td colspan="2"><strong>มาสาย:</strong> 
            ${data.lateFrequency === 'never' ? 'ไม่เคยมาสาย' : data.lateFrequency === '1-3' ? 'มาสาย 1-3 ครั้ง' : 'มาสายมากกว่า 3 ครั้ง'}
          </td>
        </tr>
      </table>
    </div>

    <div class="section">
      <h2>หน้าที่ความรับผิดชอบ</h2>
      <div class="textarea-box">${data.responsibilities?.replace(/\n/g, '<br/>') || '-'}</div>
    </div>

    <div class="section">
      <h2>ส่วนที่ 2 การประเมิน</h2>
      <h3>ด้านคุณภาพ (50 คะแนน)</h3>
      <table class="score-table">
        ${Object.entries(data.quality).map(([key, val], i) => `
          <tr>
            <td>2.1.${i+1}</td>
            <td>${getQualityLabel(key)}</td>
            <td>${val}</td>
          </tr>
        `).join('')}
      </table>

      <h3>ด้านพฤติกรรม (100 คะแนน)</h3>
      <table class="score-table">
        ${Object.entries(data.behavior).map(([key, val], i) => `
          <tr>
            <td>2.2.${i+1}</td>
            <td>${getBehaviorLabel(key)}</td>
            <td>${val}</td>
          </tr>
        `).join('')}
      </table>
    </div>

    <div class="section">
      <h2>ส่วนที่ 3 ผลการประเมินประจำเดือน</h2>
      <table class="score-table">
        <tr>
          <th>ด้านที่ประเมิน</th>
          <th>คะแนน (150)</th>
          <th>คิดเป็นร้อยละ (100)</th>
        </tr>
        <tr>
          <td>3.1 ด้านคุณภาพ</td>
          <td>${qualityScore}</td>
          <td>${((qualityScore / 50) * 100).toFixed(0)}</td>
        </tr>
        <tr>
          <td>3.2 ด้านพฤติกรรม</td>
          <td>${behaviorScore}</td>
          <td>${((behaviorScore / 100) * 100).toFixed(0)}</td>
        </tr>
        <tr>
          <td><strong>รวม</strong></td>
          <td><strong>${totalScore}</strong></td>
          <td><strong>${percentage}</strong></td>
        </tr>
      </table>
    </div>

    ${data.additionalComments ? `
    <div class="section">
      <h3>ความเห็นเพิ่มเติม</h3>
      <div class="textarea-box">${data.additionalComments.replace(/\n/g, '<br/>')}</div>
    </div>
    ` : ''}

    <div class="signature">
      <p>ลงชื่อ <span class="signature-line"></span> ผู้ประเมิน</p>
      <p>( ${data.evaluatorName} )</p>
      <p>${data.evaluatorPosition}</p>
    </div>
  </body>
  </html>
  `;

  function getQualityLabel(key: string): string {
    const map: Record<string, string> = {
      goalAchievement: 'งานสำเร็จตามเป้าหมาย',
      skills: 'ทักษะ ความรู้ ที่จำเป็นต่อการทำงาน',
      understanding: 'ความรู้ความเข้าใจในการปฏิบัติงาน',
      accuracy: 'ความละเอียดรอบคอบ ความถูกต้องของงาน',
      speed: 'ความรวดเร็ว งานเสร็จภายในเวลา',
    };
    return map[key] || key;
  }

  function getBehaviorLabel(key: string): string {
    const map: Record<string, string> = {
      discipline: 'การปฏิบัติตามระเบียบ วินัย ตรงต่อเวลา',
      learning: 'ความสามารถในการเรียนรู้งาน',
      creativity: 'ความคิดริเริ่มสร้างสรรค์',
      cooperation: 'การประสานงานและมีส่วนร่วม',
      volunteer: 'จิตอาสา ช่วยเหลือผู้อื่น',
      generosity: 'เอื้อเฟื้อเผื่อแผ่',
      relationship: 'มนุษยสัมพันธ์',
      dedication: 'เสียสละและอุทิศเวลาให้งาน',
      enthusiasm: 'ความกระตือรือร้น พยายาม',
      decision: 'การตัดสินใจและการแก้ปัญหา',
    };
    return map[key] || key;
  }
}
