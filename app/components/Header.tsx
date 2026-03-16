'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side - Logo and System Name */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image 
              src="/bakilid.jpg" 
              alt="Barangay Bakilid Logo" 
              width={48} 
              height={48}
              className="rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <span className="font-semibold text-gray-900 text-lg block leading-tight">
                Barangay Bakilid
              </span>
              <span className="text-sm text-gray-600">
                Smart System
              </span>
            </div>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              href="/#home" 
              className="text-gray-700 hover:text-green-600 transition-colors font-medium text-base relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/#about" 
              className="text-gray-700 hover:text-green-600 transition-colors font-medium text-base relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/#services" 
              className="text-gray-700 hover:text-green-600 transition-colors font-medium text-base relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/#contact" 
              className="text-gray-700 hover:text-green-600 transition-colors font-medium text-base relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Right Side - Login Button */}
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="hidden sm:inline-flex px-6 py-2.5 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col gap-4">
              <Link 
                href="/#home" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
              >
                Home
              </Link>
              <Link 
                href="/#about" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
              >
                About
              </Link>
              <Link 
                href="/#services" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
              >
                Services
              </Link>
              <Link 
                href="/#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors font-medium px-4 py-2 rounded-lg"
              >
                Contact
              </Link>
              <Link 
                href="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-center mt-2"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
