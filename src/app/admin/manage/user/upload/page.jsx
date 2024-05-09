"use client"
import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);
      console.log(data);

      const res = await fetch('/api/admin/user/upload', {
        method: 'POST',
        body: data
      });
      // จัดการข้อผิดพลาด
      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      // จัดการข้อผิดพลาดที่นี่
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" />
    </form>
  );
}
