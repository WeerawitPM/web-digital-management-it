"use client"

import Image from "next/image";
import React from "react";
import { Button, Divider } from "@nextui-org/react";
import play from "@/images/play.png"
import { Player } from '@lottiefiles/react-lottie-player';
import data_management from "@/images/data-management.png"
import stamp from "@/images/stamp.png"

export default function AnonymousPage() {
  return (
    <main>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap justify-center items-center">
              <div className="flex flex-1">
                <div class="flex flex-col gap-4">
                  <h1 className="text-5xl text-center font-bold">Welcome to <span className="text-vcs-red">IT</span> Center</h1>
                  <h1 className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text Lorem Ipsum has been the industry's standard dummy text</h1>
                  <div className="flex flex-row mx-auto gap-2">
                    <Button radius="full" className="bg-vcs-blue text-white" size="lg">
                      เริ่มต้นใช้งาน
                    </Button>
                    <Button radius="full" color="primary" variant="bordered" size="lg" startContent={<Image alt="Vercel Logo" src={play} width={30} height={30} />}>
                      คู่มือการใช้งาน
                    </Button>
                  </div>
                </div>
              </div>
              <Player
                autoplay
                loop
                src="https://lottie.host/1f3d7bfb-77db-4164-b021-7cb9bed825d7/9M6VhCNhlC.json"
                className="flex flex-1"
                style={{ height: "70vh" }}
              >
              </Player>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-row flex-wrap justify-center items-center">
              <Player
                autoplay
                loop
                src="https://lottie.host/a9f43aa8-ab3b-4866-a7f3-c24c709aa05a/FZv589c6iK.json"
                className="flex flex-1 order-last md:order-none"
                style={{ height: "70vh" }}
              >
              </Player>
              <div className="flex flex-1 md:order-last">
                <div class="flex flex-col gap-4">
                  <h1 className="text-5xl text-center font-bold">IT Center คืออะไร?</h1>
                  <h1 className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</h1>
                </div>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col justify-center items-center gap-5 my-4">
              <h1 className="text-5xl text-center font-bold">IT Center ทำอะไรได้บ้าง?</h1>
              <div className="flex flex-row justify-center gap-4 w-96">
                <div className="flex flex-col items-center">
                  <Image
                    src={data_management}
                    alt="1"
                    width={100}
                    height={100}
                    priority
                  />
                  <div className="font-bold text-center">IT Help Desk</div>
                  <div className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</div>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src={stamp}
                    alt="1"
                    width={100}
                    height={100}
                    priority
                  />
                  <div className="font-bold text-center">IT Document Approve</div>
                  <div className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</div>
                </div>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="flex flex-col gap-5 my-4">
              <h1 className="text-5xl text-center font-bold">OUR COMPANIES</h1>
              <div className="grid grid-cols-5 gap-4 justify-center items-center mt-4">
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture10-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture8-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture15-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture14-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture9-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture4-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture13-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture2-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture11-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture3-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture5-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture6-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture12-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
                <Image
                  src="https://vcsgroupthai.com/wp-content/uploads/2023/07/Picture7-1.png"
                  alt="image"
                  width={150}
                  height={150}
                  priority
                  className="m-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">Copyright © 2024 IT Center. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
