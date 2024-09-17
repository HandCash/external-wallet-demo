'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { logoutAction } from '@/app/actions/logoutAction';
import { useWallet } from '@/app/context/WalletContext';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { isWalletConnected, getBSVBalance } = useWallet();

  const handleLogout = async () => {
    await logoutAction();
    router.push('/auth');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: 'Games', href: '/' },
    { label: 'Profile', href: '/profile' },
  ];

  const bsvBalance = useMemo(() => {
    if (isWalletConnected) {
      const bsvBalanceData = getBSVBalance();
      if (bsvBalanceData) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
          .format(bsvBalanceData.fiatEquivalent.units);
      }
    }
    return null;
  }, [isWalletConnected, getBSVBalance]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold text-gray-800">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isWalletConnected && bsvBalance && (
              <span className="text-gray-600 font-medium">Balance: {bsvBalance}</span>
            )}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button onClick={handleLogout} variant="ghost">
              Logout
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Button onClick={toggleMenu} variant="ghost" size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isWalletConnected && bsvBalance && (
              <span className="block text-gray-600 font-medium px-3 py-2">Balance: {bsvBalance}</span>
            )}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            <Button onClick={handleLogout} variant="ghost" className="w-full text-left">
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;