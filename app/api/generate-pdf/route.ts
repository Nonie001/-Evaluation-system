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

  function getLateFrequencyText(frequency: string): string {
    switch(frequency) {
      case 'never': return '(✓) ไม่เคยมาสาย ( ) มาสาย 1-3 ครั้ง ( ) มาสายมากกว่า 3 ครั้ง';
      case '1-3': return '( ) ไม่เคยมาสาย (✓) มาสาย 1-3 ครั้ง ( ) มาสายมากกว่า 3 ครั้ง';
      case 'more3': return '( ) ไม่เคยมาสาย ( ) มาสาย 1-3 ครั้ง (✓) มาสายมากกว่า 3 ครั้ง';
      default: return '(✓) ไม่เคยมาสาย ( ) มาสาย 1-3 ครั้ง ( ) มาสายมากกว่า 3 ครั้ง';
    }
  }

  return `
  <!DOCTYPE html>
  <html lang="th">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>แบบประเมินการทำงาน</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600&display=swap');
      * {
        box-sizing: border-box;
      }
      body {
        font-family: 'Noto Sans Thai', sans-serif;
        font-size: 12px;
        line-height: 1.4;
        color: #000;
        padding: 15px;
        margin: 0;
        background: white;
      }
      h1 {
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        margin: 10px 0;
      }
      h2 {
        text-align: center;
        font-size: 13px;
        font-weight: 400;
        margin: 5px 0;
      }
      h3 {
        text-align: center;
        font-size: 13px;
        font-weight: 400;
        margin: 5px 0;
      }
      .main-table {
        width: 100%;
        border-collapse: collapse;
        border: 2px solid #000;
        margin: 10px 0;
        table-layout: fixed;
      }
      .main-table td, .main-table th {
        border: 1px solid #000;
        padding: 6px;
        vertical-align: top;
        font-size: 11px;
        word-wrap: break-word;
      }
      .section-header {
        background-color: #f5f5f5;
        font-weight: bold;
        text-align: left;
        padding: 8px;
      }
      .score-cell {
        text-align: center;
        width: 40px;
        font-weight: bold;
      }
      .score-header {
        text-align: center;
        font-weight: bold;
        background-color: #f8f8f8;
      }
      .text-area {
        min-height: 100px;
        padding: 8px;
        border: none;
        width: 100%;
      }
      .signature-section {
        margin-top: 40px;
        text-align: center;
      }
      .signature-line {
        border-bottom: 1px dotted #000;
        display: inline-block;
        width: 200px;
        margin: 0 10px;
      }
      .work-details {
        font-size: 10px;
        line-height: 1.3;
        padding: 5px;
      }
      .work-item {
        margin: 3px 0;
        text-indent: 20px;
      }
      .page-break {
        page-break-before: always;
      }
      @media print {
        body {
          padding: 10px;
        }
        .page-break {
          page-break-before: always;
        }
      }
    </style>
  </head>
  <body>
    <h1>แบบประเมินการทำงานจ้างเหมาจำเพาะ</h1>
    <h2>สภาเครือข่ายช่วยเหลือด้านมนุษยธรรม สำนักจุฬาราชมนตรี</h2>
    <h3>ประจำเดือน ${data.evaluationMonth || 'สิงหาคม'} ${data.evaluationYear || '2567'}</h3>

    <!-- ส่วนที่ 1 ข้อมูลเจ้าหน้าที่ -->
    <table class="main-table">
      <tr>
        <td class="section-header" colspan="4">ส่วนที่ 1 ข้อมูลเจ้าหน้าที่</td>
      </tr>
      <tr>
        <td style="width: 15%"><strong>ชื่อ-สกุล</strong></td>
        <td style="width: 35%">${data.employeeName || '............................................'}</td>
        <td style="width: 15%"><strong>ฝ่าย/แผนก</strong></td>
        <td style="width: 35%">${data.department || '............................................'}</td>
      </tr>
      <tr>
        <td><strong>ตำแหน่ง</strong></td>
        <td>${data.position || '............................................'}</td>
        <td><strong>เงินเดือน</strong></td>
        <td>${data.salary ? data.salary + ' บาท' : '............................................'}</td>
      </tr>
      <tr>
        <td><strong>ระยะเวลาในงาน</strong></td>
        <td colspan="3">
          ${data.probationStart ? `${data.probationStart} ถึงวันที่ ${data.probationEnd || '............................'}` : '............................................'}
        </td>
      </tr>
      <tr>
        <td><strong>สถิติการลา</strong></td>
        <td colspan="3">
          ลาป่วย (${data.sickLeave || 0}) วัน ลากิจ (${data.personalLeave || 0}) วัน 
          ลาอื่นๆ (${data.otherLeave || 0}) วัน ขาดงาน (${data.absent || 0}) วัน
          <br>มาสาย: ${getLateFrequencyText(data.lateFrequency || 'never')}
        </td>
      </tr>
      <tr>
        <td><strong>หน้าที่ความรับผิดชอบ</strong></td>
        <td colspan="3">
          <div class="work-details">
            ${data.workResponsibilities ? data.workResponsibilities.replace(/\n/g, '<br>') : 'ไม่ได้ระบุหน้าที่ความรับผิดชอบ'}
          </div>
        </td>
      </tr>
    </table>

    <!-- Page Break -->
    <div class="page-break"></div>

    <!-- ส่วนที่ 2 การประเมิน -->
    <table class="main-table">
      <tr>
        <td class="section-header" colspan="3">ส่วนที่ 2 การประเมิน</td>
      </tr>
      <tr>
        <td style="width: 70%"><strong>รายการประเมิน</strong></td>
        <td class="score-header" style="width: 15%">ระดับคะแนน<br>10 → 1</td>
        <td class="score-header" style="width: 15%">ความเห็นเพิ่มเติม</td>
      </tr>
      
      <!-- ด้านคุณภาพ -->
      <tr>
        <td colspan="3" style="background-color: #f0f0f0; font-weight: bold;">2.1 ด้านคุณภาพ (50)</td>
      </tr>
      <tr>
        <td>2.1.1 งานที่ทำสำเร็จเป็นไปตามเป้าหมายที่กำหนด</td>
        <td class="score-cell">${data.quality?.goalAchievement || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.1.2 ทักษะ ความรู้ ที่จำเป็นต่อการทำงาน</td>
        <td class="score-cell">${data.quality?.skills || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.1.3 ความรู้ความเข้าใจในการปฏิบัติงาน</td>
        <td class="score-cell">${data.quality?.understanding || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.1.4 ความละเอียดรอบคอบ ความถูกต้องของงาน</td>
        <td class="score-cell">${data.quality?.accuracy || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.1.5 ความรวดเร็ว งานที่ทำแล้วเสร็จในระยะเวลาที่กำหนด</td>
        <td class="score-cell">${data.quality?.speed || 10}</td>
        <td></td>
      </tr>
      
      <!-- ด้านพฤติกรรม -->
      <tr>
        <td colspan="3" style="background-color: #f0f0f0; font-weight: bold;">2.2 ด้านพฤติกรรม (100)</td>
      </tr>
      <tr>
        <td>2.2.1 การปฏิบัติตามระเบียบ วินัย ตรงต่อเวลา</td>
        <td class="score-cell">${data.behavior?.discipline || 10}</td>
        <td>มีความเคารพต่อข้อกำหนดและระเบียบดี</td>
      </tr>
      <tr>
        <td>2.2.2 ความสามารถในการเรียนรู้งาน</td>
        <td class="score-cell">${data.behavior?.learning || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.2.3 ความคิดริเริ่มสร้างสรรค์</td>
        <td class="score-cell">${data.behavior?.creativity || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.2.4 ความร่วมมือ การประสานงาน การมีส่วนร่วม</td>
        <td class="score-cell">${data.behavior?.cooperation || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.2.5 ความมีจิตอาสา ช่วยเหลือผู้อื่น</td>
        <td class="score-cell">${data.behavior?.volunteer || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.2.6 ความเอื้อเฟื้อเผื่อแผ่</td>
        <td class="score-cell">${data.behavior?.generosity || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.2.7 ความมีมนุษยสัมพันธ์</td>
        <td class="score-cell">${data.behavior?.relationship || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.2.8 ความเสียสละและอุทิศเวลาให้กับงาน</td>
        <td class="score-cell">${data.behavior?.dedication || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.2.9 ความกระตือรือร้น ความมานะพยายาม</td>
        <td class="score-cell">${data.behavior?.enthusiasm || 10}</td>
        <td></td>
      </tr>
      <tr>
        <td>2.2.10 การตัดสินใจและการแก้ปัญหา</td>
        <td class="score-cell">${data.behavior?.decision || 10}</td>
        <td></td>
      </tr>
    </table>

    <!-- ส่วนที่ 3 ผลการประเมิน -->
    <table class="main-table">
      <tr>
        <td class="section-header" colspan="3">ส่วนที่ 3 ผลการประเมินประจำเดือน</td>
      </tr>
      <tr>
        <td class="score-header" style="width: 50%"><strong>ด้านประเมิน</strong></td>
        <td class="score-header" style="width: 25%"><strong>คะแนน (150)</strong></td>
        <td class="score-header" style="width: 25%"><strong>คิดเป็นร้อยละ (100)</strong></td>
      </tr>
      <tr>
        <td>3.1 ด้านคุณภาพ (50 คะแนนเต็ม)</td>
        <td class="score-cell">${qualityScore}</td>
        <td class="score-cell">${((qualityScore / 50) * 100).toFixed(0)}</td>
      </tr>
      <tr>
        <td>3.2 ด้านพฤติกรรม (100 คะแนนเต็ม)</td>
        <td class="score-cell">${behaviorScore}</td>
        <td class="score-cell">${((behaviorScore / 100) * 100).toFixed(0)}</td>
      </tr>
      <tr style="background-color: #f8f8f8; font-weight: bold;">
        <td><strong>รวม</strong></td>
        <td class="score-cell"><strong>${totalScore}</strong></td>
        <td class="score-cell"><strong>${((totalScore / 150) * 100).toFixed(0)}</strong></td>
      </tr>
    </table>

    <!-- ความเห็นเพิ่มเติม -->
    <table class="main-table">
      <tr>
        <td class="section-header">ความเห็นเพิ่มเติม</td>
      </tr>
      <tr>
        <td class="text-area">
          ${data.additionalComments ? data.additionalComments.replace(/\n/g, '<br/>') : ''}
          <br><br>................................................................................................................................................................................................<br><br>................................................................................................................................................................................................
        </td>
      </tr>
    </table>

    <!-- ลายเซ็นผู้ประเมิน -->
    <div class="signature-section">
      <p>ลงชื่อ <span class="signature-line"></span> ผู้ประเมิน</p>
      <p>( <u>${data.evaluatorName || '........................................'}</u> )</p>
      <p>${data.evaluatorPosition || 'หัวหน้างาน / ผู้จัดการ / ผู้อำนวยการ'}</p>
    </div>
  </body>
  </html>
  `;
}

  function getWorkResponsibilities(): string {
    return `
      <div class="work-item">1.6. จัดทำสถานการงบํประมาณ และงานเศรษฐกิจให้ประเมิน</div>
      <div class="work-item">1.7. จัดทำราชการสักจังหวัดมเร</div>
      <div class="work-item">1.8. จัดทำแลกเปลี่ยนการศึกษาเรื่อยผลิตภัณฑ์และศิลปกิจ</div>
      <div class="work-item">1.9. ประสานงานการยายไปหมายเศษการศิลปาราจานี</div>
      <div class="work-item">1.10.ประสานงานยายหาคุ้มครองประสานงานศิลปาและเคร่อมนู่นวดใข้การศิลปาจาง ฯ ฯ</div>
      <div class="work-item">1.11.จัดทำการษาการประดับ (power point) เพื่อการทำงานงบประมาณแลวมเซร่ามใให้มประเมินจำนั่</div>
      <br>
      <div class="work-item">1.12.จัดทำการษาการประดับ (power point) สำหรับการชื่นมาเจ้าทีให้มประเมิน และแร้งประเมิน</div>
      <div class="work-item">1.13.ปฏิบัติงานให้เพื่อดำรู้รง ฯ ๆ งามการประไจนำไปให้มประโยชน์</div>
    `;
  }

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
