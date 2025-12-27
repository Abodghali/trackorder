import Link from 'next/link';
import { FaBoxOpen, FaChartPie, FaCog, FaSignOutAlt, FaRocket } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 p-6 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-10 px-2">
                    <FaRocket className="text-purple-500 text-2xl" />
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        ShopSync
                    </h1>
                </div>

                <nav className="space-y-2">
                    <NavLink href="/" icon={<FaBoxOpen />} label="Orders" active />
                    <NavLink href="/analytics" icon={<FaChartPie />} label="Analytics" />
                    <NavLink href="/settings" icon={<FaCog />} label="Settings" />
                </nav>
            </div>

            <div className="pt-6 border-t border-gray-700/50">
                <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full px-2 py-2 rounded-lg hover:bg-gray-700/50">
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

const NavLink = ({ href, icon, label, active }) => (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active ? 'bg-purple-600 shadow-lg shadow-purple-900/20 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}>
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{label}</span>
    </Link>
);

export default Sidebar;
