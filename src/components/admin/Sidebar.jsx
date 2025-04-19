import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Settings,
  MessageCircle,
  Power,
  X,
  HouseIcon
} from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useAppContext } from '../../context/AppContext';

const Sidebar = ({ className = '', isOpen = false, onClose = () => {} }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { navigate } = useAppContext();

  const navigation = [
    { name: 'Home', icon: HouseIcon, href: '/' },
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Shipping', icon: Truck, href: '/admin/shipping' },
    { name: 'Payments', icon: CreditCard, href: '/admin/payments' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div
      className={`fixed top-0 left-0 z-40 md:static md:translate-x-0 transition-transform duration-300 ease-in-out 
      ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''} 
      bg-white h-full md:h-screen w-72 flex flex-col border-r border-gray-400 shadow-sm ${className} `}
      style={{zIndex: 100}}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-5 border-b border-gray-400 relative ">
        <div className="flex items-center">
          <div className="bg-black p-2 rounded-full">
            <Power className="text-white w-5 h-5" />
          </div>
          <span className="ml-3 font-semibold text-gray-800  md:inline">Admin Panel</span>
        </div>
        {isMobile && (
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={isMobile ? onClose : undefined}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 ${
                  isActive ? 'text-blue-700' : 'text-gray-500'
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Support */}
      <div className="p-5 border-t border-t-gray-400">
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Customer Support</h3>
          <p className="text-xs text-gray-500 mt-1">
            Ask questions or report issues. Our team is available 24/7.
          </p>
        </div>
        <button onClick={()=>navigate('/admin/support')} className="w-full flex items-center justify-center bg-blue-50 text-blue-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-100 transition">
          <MessageCircle className="w-4 h-4 mr-2" />
          Connect Now
        </button>

        <div className="mt-5 pt-3 border-t border-t-gray-400 text-xs text-gray-500 space-y-1">
          <p className="hover:underline cursor-pointer">Terms & Services</p>
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
