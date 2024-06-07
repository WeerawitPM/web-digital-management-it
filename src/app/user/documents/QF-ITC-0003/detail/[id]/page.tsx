'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import Component from "./Component";

export default function Home({ params }: { params: any }) {
    const [data, setData] = useState<any>(); // เก็บข้อมูลที่ได้จาก API
    const [step, setStep] = useState([]);
    const status = parseInt(params.id); // Get the 'status' query parameter
    const [isLoading, setIsLoading] = useState(true);

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
            const response = await axios.get('/api/user/documents/QF-ITC-0003/detail');
            const data = response.data;
            setData(data);
            setIsLoading(false);

            const filteredData = data.filter((item: { status: number; }) => item.status === status);
            const stepsArray = filteredData.map((item: { Track_Doc: any[]; step: any; }) => {
                const trackItem = item.Track_Doc.find(track => track.step === item.step);
                return trackItem ? trackItem.name : '';
            });
            setStep(stepsArray);

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
        <Component data={data} step={step} status={status} isLoading={isLoading} />
    )
}
