'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import Component from "./Component";

export default function Home() {
    const searchParams = useSearchParams();
    const doc_no = searchParams.get('doc_no');
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    const [steps, setStep] = useState();
    const [statusStep, setStatusStep] = useState("");
    const [trackStatus, setTrackStatus] = useState();
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/admin/documents/QF-ITC-0001/approve/doc_no?doc_no=${doc_no}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            const data = response.data;
            setData(data);

            const totalPrice = data?.Table_ITC_0001?.reduce((sum, item) => sum + item.price, 0) || 0;
            setTotalPrice(totalPrice);

            let trackDoc;
            if (totalPrice >= 5000) {
                trackDoc = data.Track_Doc
            } else {
                trackDoc = data.Track_Doc.slice(0, -1)
            }

            const steps = trackDoc.map((step, index) => {
                let status;
                if (step.status === 1) {
                    status = index === trackDoc.step ? "current" : "finished";
                } else if (step.status === 0) {
                    status = "waiting";
                } else if (step.status === 2) {
                    status = "error";
                    setStatusStep(status);
                }

                if (data.step == step.step) {
                    setTrackStatus(step.status);
                }

                return {
                    title: index === trackDoc.step ? "In Process" : status === "waiting" ? "Waiting" : status === "error" ? "Not Approve" : "Finished",
                    description: step.name,
                };
            });
            setStep(steps);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <Component data={data} steps={steps} statusStep={statusStep} trackStatus={trackStatus} totalPrice={totalPrice} />
    );
};