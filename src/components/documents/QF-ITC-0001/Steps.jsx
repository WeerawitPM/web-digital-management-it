"use client"
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";  // Import ThemeContext
import { Steps } from 'antd';
import { Card } from "@nextui-org/react";

export default function StepsComponent({ current, status, items }) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            {theme === "dark" ?
                <Card className="bg-foreground">
                    <Steps
                        current={current}
                        status={status == "" ? "process" : status}
                        items={items}
                        className="my-5"
                    />
                </Card>
                :
                <Steps
                    current={current}
                    status={status == "" ? "process" : status}
                    items={items}
                    className="mt-5"
                />
            }
        </>
    )
}