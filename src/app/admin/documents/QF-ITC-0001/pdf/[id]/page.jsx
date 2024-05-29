"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Component from "@/components/documents/QF-ITC-0001";

export default function Home({ params }) {
    const doc_no = params.id
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/documents/QF-ITC-0001?doc_no=${doc_no}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            const data = response.data;
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Component data={data} />
    );
}