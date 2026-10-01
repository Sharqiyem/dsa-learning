'use client';

import React from 'react';
import { ArrowDown, Code2, Sparkles, BookOpen, Layers } from 'lucide-react';

interface HeroProps {
  onExplore: (sectionId: string) => void;
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/15 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unboxed metadata indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4 tracking-wide">
          <span>DATA STRUCTURES & ALGORITHMS</span>
          <span aria-hidden="true">·</span>
          <span>W3SCHOOLS CURRICULUM</span>
          <span aria-hidden="true">·</span>
          <span>PYTHON IMPLEMENTATION</span>
        </div>

        {/* Main Display Headline with text-wrap: balance */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl text-balance leading-tight">
          Master the Stack: Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">LIFO</span> Through Interactive Animation
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Step inside a spring-loaded data container. Experiment with animated <strong className="text-white">push</strong> and <strong className="text-white">pop</strong> transitions, inspect Python data structure mechanics line by line, evaluate call stacks, and test your skills with hidden-answer exercises.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onExplore('visualizer')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/25 active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>Open Interactive Stack</span>
          </button>
          <button
            onClick={() => onExplore('python-code')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition-all active:scale-95"
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>View Python Code & Logic</span>
          </button>
          <button
            onClick={() => onExplore('exercises')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Practice 12+ Exercises</span>
          </button>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <div className="text-xs font-mono text-emerald-400 mb-1 uppercase tracking-wider">Principle 01</div>
            <h3 className="text-base font-semibold text-white mb-1.5">Last-In, First-Out (LIFO)</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Just like a stack of cafeteria dinner plates, you can only insert or remove items at the top. The first plate placed on the table is the last one picked up.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <div className="text-xs font-mono text-cyan-400 mb-1 uppercase tracking-wider">Principle 02</div>
            <h3 className="text-base font-semibold text-white mb-1.5">Strict O(1) Constant Time</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Because all mutations are restricted to the head boundary (index -1), <code className="text-emerald-300">push()</code>, <code className="text-emerald-300">pop()</code>, and <code className="text-emerald-300">peek()</code> execute without element re-indexing.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-slate-700 transition-colors">
            <div className="text-xs font-mono text-amber-400 mb-1 uppercase tracking-wider">Principle 03</div>
            <h3 className="text-base font-semibold text-white mb-1.5">Hardware & Compiler Foundation</h3>
            <p className="text-xs text-slate-400 leading-normal">
              CPU call stacks, syntax bracket balancing, text editor undo history, and browser backward navigation are all powered by this data structure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
