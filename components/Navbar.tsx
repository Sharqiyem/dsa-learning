'use client';

import React, { useState } from 'react';
import { Menu, X, Play, Layers, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  const navLinks = [
    { id: 'visualizer', label: 'Visualizer' },
    { id: 'operations', label: 'Operations' },
    { id: 'python-code', label: 'Python Code' },
    { id: 'applications', label: 'Real-World Apps' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'exercises', label: 'Exercises' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-colors ${
      isDark 
        ? 'border-slate-800 bg-slate-950/90 text-white backdrop-blur-md' 
        : 'border-slate-200 bg-white/90 text-slate-900 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#visualizer"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('visualizer');
          }}
          className={`flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors ${
            isDark ? 'text-white hover:text-emerald-400' : 'text-slate-900 hover:text-emerald-600'
          }`}
        >
          <Layers className="w-5 h-5 text-emerald-500" />
          <span>StackLab</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`transition-colors text-left ${
                activeSection === link.id
                  ? isDark ? 'text-emerald-400 font-semibold' : 'text-emerald-600 font-semibold'
                  : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions + Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-2 rounded-lg border transition-colors ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800 hover:text-amber-200'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleLinkClick('visualizer')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-md hover:bg-emerald-300 transition-colors whitespace-nowrap shadow-sm shadow-emerald-500/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Simulator</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-2 pb-5 space-y-2 ${
          isDark ? 'border-slate-800 bg-slate-950/95' : 'border-slate-200 bg-white/95'
        }`}>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left py-2 px-3 text-sm rounded-md transition-colors ${
                activeSection === link.id
                  ? isDark ? 'bg-slate-900 text-emerald-400 font-medium' : 'bg-slate-100 text-emerald-600 font-medium'
                  : isDark ? 'text-slate-300 hover:bg-slate-900/60 hover:text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => handleLinkClick('visualizer')}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-md hover:bg-emerald-300 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Simulator</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
