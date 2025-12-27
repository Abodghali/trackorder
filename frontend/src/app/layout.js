import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '../components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'ShopSync - Unified Shopping Dashboard',
    description: 'Track all your orders in one place',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-gray-900 text-white flex h-screen overflow-hidden`}>
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Background Gradient Blob */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[100px]" />
                        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px]" />
                    </div>
                    {children}
                </main>
            </body>
        </html>
    )
}
