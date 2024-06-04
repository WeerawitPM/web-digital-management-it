"use client"
import React, { useState, useEffect } from "react";
import Component from "./Component";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState<any>(null); // เก็บข้อมูลที่ได้จาก API

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
        // ตั้ง interval ให้เรียก fetchData ทุกๆ 10 วินาที
        const intervalId = setInterval(fetchData, 10000);

        // เคลียร์ interval เมื่อ component จะ unmount
        return () => clearInterval(intervalId);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/admin/documents/QF-ITC-0001'); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            // console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Global error handling
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.error('Error fetching data:', error);
            return Promise.reject(error);
        }
    );

    return (
        <Component data={data} />
    );
}