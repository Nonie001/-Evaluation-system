# ระบบประเมินการทดลองงาน - คู่มือการใช้งาน

## 🚀 Quick Start

### 1. การติดตั้ง
```bash
# ติดตั้ง dependencies
npm install

# เริ่มเซิร์ฟเวอร์
npm run dev
```

### 2. เข้าใช้งาน
เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

## ✨ ฟีเจอร์ที่ได้รับการปรับปรุง

### 🎨 **UI/UX ใหม่**
- ✅ Design ทันสมัยด้วย Gradient และ Modern Cards
- ✅ สีสันสวยงามแต่ละส่วน (น้ำเงิน, เขียว, ม่วง, ส้ม)
- ✅ Responsive สำหรับมือถือและคอมพิวเตอร์
- ✅ Smooth animations และ transitions
- ✅ โลโก้แสดงบนเว็บและ PDF

### 📊 **ระบบประเมิน**
- ✅ Real-time calculation ของคะแนน
- ✅ Progress bars แสดงความคืบหน้า
- ✅ ระบบให้เกรดอัตโนมัติ (ดีเยี่ยม, ดี, พอใช้, ต้องปรับปรุง)
- ✅ Visual feedback ด้วย emoji และ icons

### 📄 **PDF Generation**
- ✅ โลโก้ในหัวกระดาษ PDF
- ✅ Professional layout ด้วย CSS styling ขั้นสูง
- ✅ ตารางสวยงามพร้อมสีสัน
- ✅ Typography ที่อ่านง่ายด้วยฟอนต์ Sarabun
- ✅ Clean code structure ที่ maintainable

### 🇹🇭 **รองรับภาษาไทย**
- ✅ ฟอนต์ Sarabun จาก Google Fonts
- ✅ Layout เหมาะสมกับภาษาไทย
- ✅ การแสดงวันที่แบบไทย

## 📋 ฟีเจอร์การประเมิน

### ส่วนที่ 1: ข้อมูลพนักงาน
- ข้อมูลพื้นฐาน (ชื่อ, ตำแหน่ง, เงินเดือน)
- สถิติการลา (ป่วย, กิจ, อื่นๆ, ขาดงาน)
- ความถี่การมาสาย

### ส่วนที่ 2: การประเมิน
**คุณภาพ (50 คะแนน)**
- งานสำเร็จตามเป้าหมาย
- ทักษะความรู้
- ความเข้าใจ
- ความถูกต้อง
- ความรวดเร็ว

**พฤติกรรม (100 คะแนน)**
- วินัย
- การเรียนรู้
- ความคิดสร้างสรรค์
- ความร่วมมือ
- จิตอาสา
- ความเอื้อเฟื้อ
- มนุษยสัมพันธ์
- ความเสียสละ
- ความกระตือรือร้น
- การตัดสินใจ

### ส่วนที่ 3: สรุปผล
- คะแนนรวม (150 คะแนน)
- เปอร์เซ็นต์
- เกรดการประเมิน

## 🛠️ Technical Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Forms**: React Hook Form
- **PDF**: jsPDF + html2canvas
- **Icons**: Lucide React
- **Fonts**: Sarabun (Google Fonts)

## 📁 โครงสร้างไฟล์ (Clean & Organized)

```
├── app/
│   ├── page.tsx              # หน้าหลัก
│   ├── layout.tsx            # Layout + Meta
│   └── globals.css           # Global styles
├── components/
│   ├── EvaluationForm.tsx    # ฟอร์มหลัก
│   ├── EmployeeInfoSection.tsx
│   ├── QualitySection.tsx
│   ├── BehaviorSection.tsx
│   ├── ScoreSummary.tsx
│   └── ui/                   # Reusable components
├── lib/
│   ├── types.ts              # TypeScript definitions
│   └── pdf-generator.ts      # Clean PDF generator
└── public/
    └── logo.jpg              # Logo
```

## 🎯 วิธีการใช้งาน

1. **กรอกข้อมูลพนักงาน** - ส่วนที่ 1
2. **ให้คะแนนการประเมิน** - ส่วนที่ 2 (คุณภาพ + พฤติกรรม)
3. **ดูสรุปคะแนน** - ส่วนที่ 3 (แบบเรียลไทม์)
4. **เพิ่มความเห็น** - ความเห็นเพิ่มเติม
5. **ใส่ข้อมูลผู้ประเมิน** - ชื่อและตำแหน่ง
6. **สร้าง PDF** - คลิกปุ่ม "ดาวน์โหลด PDF"

## 🌟 การปรับปรุงที่สำคัญ

### PDF Generator ใหม่
```typescript
// Clean, modular structure
export async function generatePDF(data: EvaluationData) {
  const logoImage = await loadImage('/logo.jpg');
  const element = createPDFElement();
  const htmlContent = generateHTMLContent(data, logoImage);
  // ... rest of the clean code
}
```

### CSS Styling ขั้นสูง
- Gradient backgrounds
- Modern shadows
- Clean typography
- Responsive design
- Professional color scheme

## 🎨 Color Scheme

- **Primary**: Blue gradient (#4299e1 → #3182ce)
- **Quality**: Green (#38a169)
- **Behavior**: Purple (#805ad5)
- **Summary**: Orange gradient (#ff6b6b → #ffa500)
- **Background**: Light gray gradients

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop enhancement
- ✅ PDF มีขนาดเหมาะสมทุกอุปกรณ์

---

**พร้อมใช้งานแล้ว! 🎉**

รันคำสั่ง `npm run dev` และเปิด `http://localhost:3000` เพื่อทดสอบระบบ
