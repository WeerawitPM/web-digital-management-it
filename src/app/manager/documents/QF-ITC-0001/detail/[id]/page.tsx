'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Component from "./Component";

export default function Home({ params }: { params: any }) {
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    const status = parseInt(params.id);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/manager/documents/QF-ITC-0001/detail?status=' + status); // เรียกใช้งาน API ที่เส้นทาง '/api'
            const data = response.data;
            setData(data); // เก็บข้อมูลที่ได้จาก API ลงใน state
            setIsLoading(false);
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
        <Component data={data} status={status} isLoading={isLoading} />
    )
}
