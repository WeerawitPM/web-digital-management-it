"use client"
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function UploadForm() {
  const [file, setFile] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('image', file);
      console.log(data);

      const res = await fetch('http://localhost:3001/upload', {
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
    <>
      <Image src="http://localhost:3001/uploads/test2.jpg" width={150} height={150}/>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
      </form>
    </>
  );
}
