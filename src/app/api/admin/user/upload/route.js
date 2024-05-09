const { writeFile } = require('fs').promises;
const { NextRequest, NextResponse } = require('next/server');

async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ด้วยข้อมูลไฟล์ใน buffer, คุณสามารถทำอะไรก็ได้กับมัน
  // สำหรับนี้เราจะเขียนไปยังระบบไฟล์ในตำแหน่งใหม่
  const path = `public/images/userProfile/${file.name}`;
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true });
}

module.exports = { POST };
