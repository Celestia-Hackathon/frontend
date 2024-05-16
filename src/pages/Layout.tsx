import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"

export default function Layout() {
    return(
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Toaster />
        </div>
    )
}