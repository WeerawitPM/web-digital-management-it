'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import Component from "@/components/documents/QF-ITC-0007/doc_no/Component";

export default function Home({ params }: { params: any }) {
    const doc_no = params.id;
    const [data, setData] = useState(null); // เก็บข้อมูลที่ได้จาก API
    const [steps, setStep] = useState();
    const [statusStep, setStatusStep] = useState("");

    useEffect(() => {
        // เรียกใช้งาน API เพื่อดึงข้อมูล
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/documents/QF-ITC-0007/doc_no?doc_no=${doc_no}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            const data = response.data;
            setData(data);

            const trackDoc = data.Track_Doc;

            const steps = trackDoc.map((step: any, index: number) => {
                let status;
                if (step.status === 1) {
                    status = index === trackDoc.step ? "current" : "finished";
                } else if (step.status === 0) {
                    status = "waiting";
                } else if (step.status === 2) {
                    status = "error";
                    setStatusStep(status);
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
    };

    return (
        <Component data={data} steps={steps} statusStep={statusStep} doc_no={doc_no} />
    );
}