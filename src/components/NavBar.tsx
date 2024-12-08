'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet } from 'lucide-react'
import { UserProfileDropdown } from './UserProfileDropdown'
import { useWallet } from '@/app/context/WalletContext'

const NavBar: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isWalletConnected } = useWallet()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Inventory', href: '/inventory' },
  ]

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold text-foreground">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            {!isWalletConnected && (
              <Link href="/profile">
                <Button variant="default" size="sm" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>
            )}
            <UserProfileDropdown email={userEmail} />
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            {!isWalletConnected && (
              <Link href="/profile" className="block px-3 py-2">
                <Button variant="default" size="sm" className="flex items-center gap-2 w-full">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>
            )}
            <div className="px-3 py-2">
              <UserProfileDropdown email={userEmail} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar