'use client';

import React, { useState } from 'react';
import { Menu, X, Play, Layers } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#visualizer"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('visualizer');
          }}
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white hover:text-emerald-400 transition-colors"
        >
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>StackLab</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`transition-colors text-left hover:text-white ${
                activeSection === link.id
                  ? 'text-emerald-400 font-semibold'
                  : 'text-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
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
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`w-full text-left py-2 px-3 text-sm rounded-md transition-colors ${
                activeSection === link.id
                  ? 'bg-slate-900 text-emerald-400 font-medium'
                  : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('visualizer')}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-950 bg-emerald-400 rounded-md hover:bg-emerald-300 transition-colors"
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
