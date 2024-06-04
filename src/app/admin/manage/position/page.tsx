import { SidebarComponent } from "../Sidebar";
import Component from "./Component";

export default function Home() {
    return (
        <main className="min-h-screen">
            <SidebarComponent name="จัดการตำแหน่งงาน" />
            <Component />
        </main>
    );
}