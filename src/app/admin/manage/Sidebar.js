"use client";

import { Sidebar } from "flowbite-react";
// import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export function SidebarComponent() {
    return (
        <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#">
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        Products
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        Sign In
                    </Sidebar.Item>
                    <Sidebar.Item href="#">
                        Sign Up
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
