'use client'

import axios from "axios";
import React, { useState, useEffect } from "react";
import Component from "@/components/documents/QF-ITC-0003/add/Component";

export default function Home() {
    const [data, setData] = useState(); // เก็บข้อมูลที่ได้จาก API

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/user'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <Component data={data} />
    )
}