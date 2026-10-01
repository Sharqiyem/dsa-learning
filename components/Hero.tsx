'use client';

import React from 'react';
import { Code2, BookOpen, Layers } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  onExplore: (sectionId: string) => void;
}

export function Hero({ onExplore }: HeroProps) {
  const { isDark } = useTheme();
  const { t, isRTL } = useLanguage();

  return (
    <section className={`relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b transition-colors ${
      isDark
        ? 'border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
        : 'border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50'
    }`}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] blur-[120px] rounded-full ${
          isDark ? 'bg-emerald-500/20' : 'bg-emerald-500/10'
        }`} />
        <div className={`absolute top-1/3 left-1/4 w-[400px] h-[300px] blur-[100px] rounded-full ${
          isDark ? 'bg-cyan-500/15' : 'bg-cyan-500/10'
        }`} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unboxed metadata indicator */}
        <div className={`flex items-center gap-2 text-xs font-mono mb-4 tracking-wide ${
          isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'
        }`}>
          <span>{t.hero.categoryBadge}</span>
        </div>

        {/* Main Display Headline with text-wrap: balance */}
        <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl text-balance leading-tight ${
          isDark ? 'text-white' : 'text-slate-950'
        }`}>
          {t.hero.headlinePart1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
            {t.hero.headlineHighlight}
          </span>{' '}
          {t.hero.headlinePart2}
        </h1>

        <p className={`mt-5 text-base sm:text-lg max-w-2xl leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {t.hero.subtitle}
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onExplore('visualizer')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/25 active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>{t.hero.openStackBtn}</span>
          </button>
          <button
            onClick={() => onExplore('python-code')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all active:scale-95 border ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span>{t.hero.viewCodeBtn}</span>
          </button>
          <button
            onClick={() => onExplore('exercises')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all border ${
              isDark
                ? 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300'
                : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-500" />
            <span>{t.hero.practiceBtn}</span>
          </button>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className={`p-5 rounded-xl border backdrop-blur-sm transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
          }`}>
            <div className={`text-xs font-mono mb-1 uppercase tracking-wider ${
              isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'
            }`}>Principle 01</div>
            <h3 className={`text-base font-semibold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.hero.card1Title}
            </h3>
            <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.hero.card1Desc}
            </p>
          </div>

          <div className={`p-5 rounded-xl border backdrop-blur-sm transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
          }`}>
            <div className={`text-xs font-mono mb-1 uppercase tracking-wider ${
              isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'
            }`}>Principle 02</div>
            <h3 className={`text-base font-semibold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.hero.card2Title}
            </h3>
            <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.hero.card2Desc}
            </p>
          </div>

          <div className={`p-5 rounded-xl border backdrop-blur-sm transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
          }`}>
            <div className={`text-xs font-mono mb-1 uppercase tracking-wider ${
              isDark ? 'text-amber-400' : 'text-amber-700 font-semibold'
            }`}>Principle 03</div>
            <h3 className={`text-base font-semibold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.hero.card3Title}
            </h3>
            <p className={`text-xs leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.hero.card3Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
