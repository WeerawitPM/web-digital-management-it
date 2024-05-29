"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export function SidebarComponent({ name }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        if (isSidebarOpen == false) {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    return (
        <>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between flex-wrap">
                        <div className="justify-start my-auto">
                            <button
                                onClick={toggleSidebar}
                                data-drawer-target="default-sidebar"
                                data-drawer-toggle="default-sidebar"
                                aria-controls="default-sidebar"
                                type="button"
                                className="p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <span className="font-semibold text-md text-gray-800 leading-tight">
                                Admin - {name}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <aside
                ref={sidebarRef}
                id="default-sidebar"
                className={`fixed left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? '' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 shadow-lg mt-0.5">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href="/admin/manage/company" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Image src="/images/sidebar/office.png" width={30} height={30} unoptimized />
                                <span className="ms-3">จัดการชื่อบริษัท</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/manage/department" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Image src="/images/sidebar/department.png" width={30} height={30} unoptimized />
                                <span className="flex-1 ms-3 whitespace-nowrap">จัดการแผนก</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/manage/position" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Image src="/images/sidebar/supervisor.png" width={30} height={30} unoptimized />
                                <span className="flex-1 ms-3 whitespace-nowrap">จัดการตำแหน่งงาน</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/manage/user" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Image src="/images/sidebar/friends.png" width={30} height={30} unoptimized />
                                <span className="flex-1 ms-3 whitespace-nowrap">จัดการสมาชิก</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/manage/role" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <Image src="/images/sidebar/role.png" width={30} height={30} unoptimized />
                                <span className="flex-1 ms-3 whitespace-nowrap">จัดการบทบาท</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
