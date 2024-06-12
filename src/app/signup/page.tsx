"use client"
import { useEffect, useState } from "react";
import Component from "./Component";
import axios from "axios";

export default function Home() {
    const [company, setCompany] = useState<any>();
    const [department, setDepartment] = useState<any>();
    const [position, setPosition] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/signup'); // เรียกใช้งาน API ที่เส้นทาง '/api'
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.data;
                setCompany(data.company);
                setDepartment(data.department);
                setPosition(data.position);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    return (
        <Component company={company} department={department} position={position} />
    );
}