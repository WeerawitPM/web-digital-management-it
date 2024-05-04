"use client"
import { Player } from '@lottiefiles/react-lottie-player';
import NoData from "@/images/NoData.json";

export default function NotActive() {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 justify-items-center">
                <div className="text-center text-5xl font-semibold">User Not Active.</div>
                <Player
                    autoplay
                    loop
                    src={NoData}
                    className="flex flex-1"
                    style={{ height: "70vh" }}
                >
                </Player>
                <h1 className="text-center text-2xl font-semibold">Please contact the system administrator.</h1>
            </div>
        </div>
    );
}