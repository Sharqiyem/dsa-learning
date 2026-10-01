'use client';

import React, { useState } from 'react';
import { 
  PYTHON_IMPLEMENTATIONS, 
  PYTHON_DOWNLOADABLE_SCRIPT, 
} from '@/data/pythonCodeData';
import { 
  Copy, 
  Check, 
  Download, 
  Cpu, 
  Info,
  ChevronRight,
  FileCode2
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function PythonCodeExplorer() {
  const { isDark } = useTheme();
  const [selectedImplId, setSelectedImplId] = useState<string>('list-stack');
  const [selectedLineNum, setSelectedLineNum] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  const currentImpl = PYTHON_IMPLEMENTATIONS.find((i) => i.id === selectedImplId) || PYTHON_IMPLEMENTATIONS[0];
  const selectedLineObj = currentImpl.lines.find((l) => l.lineNum === selectedLineNum) || currentImpl.lines[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentImpl.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPy = () => {
    const blob = new Blob([PYTHON_DOWNLOADABLE_SCRIPT], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stack_mastery.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="python-code" className={`py-16 border-b transition-colors ${
      isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-50/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${
              isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'
            }`}>
              <span>PYTHON ARCHITECTURE & LOGIC</span>
              <span aria-hidden="true">·</span>
              <span>LINE-BY-LINE EXPLAINER</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              Underlying Data Structure & Python Code
            </h2>
            <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Click any line of code to reveal how Python manages memory buffers, pointer pointers, exception contracts, and dynamic array resizing under the hood.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyCode}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors border active:scale-95 ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Code Copied!' : 'Copy Implementation'}</span>
            </button>
            <button
              onClick={handleDownloadPy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-colors shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download stack_mastery.py</span>
            </button>
          </div>
        </div>

        {/* Implementation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          {PYTHON_IMPLEMENTATIONS.map((impl) => (
            <button
              key={impl.id}
              onClick={() => {
                setSelectedImplId(impl.id);
                setSelectedLineNum(impl.lines[0]?.lineNum || 1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap border ${
                selectedImplId === impl.id
                  ? isDark
                    ? 'bg-slate-900 border-emerald-500/80 text-emerald-400 shadow-sm'
                    : 'bg-white border-emerald-500 text-emerald-700 shadow-sm font-semibold'
                  : isDark
                  ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <div className={`font-semibold ${
                selectedImplId === impl.id
                  ? isDark ? 'text-slate-200' : 'text-slate-900'
                  : isDark ? 'text-slate-400' : 'text-slate-700'
              }`}>{impl.title}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">{impl.badge}</div>
            </button>
          ))}
        </div>

        {/* Split Screen: Code Viewer (7 Cols) + Line Explainer (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Code Viewer with Clickable Lines */}
          <div className={`lg:col-span-7 border rounded-2xl overflow-hidden shadow-lg ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-950 border-slate-800'
          }`}>
            {/* Window Topbar */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentImpl.id}.py</span>
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Click any line to inspect
              </span>
            </div>

            {/* Code Lines Container */}
            <div className="p-4 font-mono text-xs overflow-x-auto leading-relaxed max-h-[520px] overflow-y-auto">
              {currentImpl.code.split('\n').map((rawLine, index) => {
                const lineNum = index + 1;
                const isSelected = selectedLineNum === lineNum;
                const lineExplanation = currentImpl.lines.find((l) => l.lineNum === lineNum);

                return (
                  <div
                    key={lineNum}
                    onClick={() => {
                      if (lineExplanation) {
                        setSelectedLineNum(lineNum);
                      }
                    }}
                    className={`group flex items-start px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-950/70 border-l-4 border-emerald-400 text-white font-medium'
                        : lineExplanation
                        ? 'hover:bg-slate-800/80 text-slate-300'
                        : 'text-slate-500 cursor-default'
                    }`}
                  >
                    {/* Line Number */}
                    <span
                      className={`w-8 select-none text-right pr-4 font-mono text-[11px] shrink-0 ${
                        isSelected ? 'text-emerald-400 font-bold' : 'text-slate-600'
                      }`}
                    >
                      {lineNum}
                    </span>

                    {/* Code Content */}
                    <span className="flex-1 whitespace-pre">
                      {rawLine.startsWith('#') ? (
                        <span className="text-slate-500 italic">{rawLine}</span>
                      ) : rawLine.includes('class ') || rawLine.includes('def ') ? (
                        <span className="text-cyan-400 font-semibold">{rawLine}</span>
                      ) : rawLine.includes('raise ') || rawLine.includes('return ') ? (
                        <span className="text-rose-400">{rawLine}</span>
                      ) : rawLine.includes('.append(') || rawLine.includes('.pop(') ? (
                        <span className="text-emerald-300 font-medium">{rawLine}</span>
                      ) : (
                        <span className="text-slate-200">{rawLine}</span>
                      )}
                    </span>

                    {/* Indicator Pill for documented lines */}
                    {lineExplanation && (
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Line Inspector & Memory Logic */}
          <div className="lg:col-span-5 space-y-5">
            {selectedLineObj ? (
              <div className={`border rounded-2xl p-6 relative transition-colors ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                {/* Header with line indicator */}
                <div className={`flex items-center justify-between pb-3 mb-4 border-b ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${
                      isDark 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}>
                      Line {selectedLineObj.lineNum}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Syntax Inspector</span>
                  </div>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                    isDark 
                      ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60' 
                      : 'text-cyan-800 bg-cyan-50 border-cyan-200 font-semibold'
                  }`}>
                    {selectedLineObj.complexity}
                  </span>
                </div>

                {/* Target Line Code Quote */}
                <div className={`p-3 rounded-xl border font-mono text-xs mb-5 break-all ${
                  isDark 
                    ? 'bg-slate-950 border-slate-800 text-emerald-300' 
                    : 'bg-slate-900 border-slate-800 text-emerald-300'
                }`}>
                  {selectedLineObj.code}
                </div>

                {/* Explanation */}
                <div className="mb-5">
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <Info className="w-3.5 h-3.5 text-emerald-500" />
                    <span>What This Line Does</span>
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {selectedLineObj.explanation}
                  </p>
                </div>

                {/* Underlying Data Structure Logic & Memory Mechanics */}
                <div className={`p-4 rounded-xl border ${
                  isDark 
                    ? 'bg-slate-950/70 border-slate-800/80' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                    isDark ? 'text-cyan-300' : 'text-cyan-800 font-bold'
                  }`}>
                    <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Underlying Data Structure Mechanics</span>
                  </h4>
                  <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {selectedLineObj.logic}
                  </p>
                </div>

                {/* Implementation Summary Footer */}
                <div className={`mt-5 pt-4 border-t text-[11px] leading-normal ${
                  isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'
                }`}>
                  <strong className={isDark ? 'text-slate-400' : 'text-slate-700'}>Architectural Note: </strong>
                  {currentImpl.summary}
                </div>
              </div>
            ) : (
              <div className={`border rounded-2xl p-6 text-center ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
              }`}>
                <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium">Select any line on the left</p>
              </div>
            )}

            {/* Quick Memory Cheat Sheet Card */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h5 className={`text-xs font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Memory Allocation Tradeoffs
              </h5>
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className={`p-2.5 rounded border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono block font-semibold mb-1">Python List</span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Contiguous buffer in RAM. Fast index lookups. Occasional resizing reallocates buffer.
                  </span>
                </div>
                <div className={`p-2.5 rounded border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono block font-semibold mb-1">collections.deque</span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Blocks of 64 pointers doubly-linked. Zero reallocation spikes. Strict O(1) always.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
