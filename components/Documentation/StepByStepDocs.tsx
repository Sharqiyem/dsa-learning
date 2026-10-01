'use client';

import React, { useState } from 'react';
import { 
  DOCUMENTATION_DATA, 
  STEP_BY_STEP_DOCUMENTATION_MARKDOWN, 
  DocSection 
} from '@/data/documentationData';
import { 
  BookOpen, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Layers, 
  Code, 
  ArrowRight 
} from 'lucide-react';

export function StepByStepDocs() {
  const [activeStepId, setActiveStepId] = useState<string>(DOCUMENTATION_DATA[0].id);

  const activeDoc = DOCUMENTATION_DATA.find((d) => d.id === activeStepId) || DOCUMENTATION_DATA[0];

  const handleDownloadDocs = () => {
    const blob = new Blob([STEP_BY_STEP_DOCUMENTATION_MARKDOWN], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DSA_Stack_Complete_Guide.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="documentation" className="py-16 border-b border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span>STEP-BY-STEP CURRICULUM</span>
              <span aria-hidden="true">·</span>
              <span>COMPLETE DOCUMENTATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Theoretical Foundation & System Docs
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              A comprehensive textbook-grade pedagogical manual detailing memory invariants, asymptotic bounds, architectural considerations, and defensive programming guidelines.
            </p>
          </div>

          <button
            onClick={handleDownloadDocs}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700 self-start md:self-auto active:scale-95"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download Guide (.md)</span>
          </button>
        </div>

        {/* Two-Column Manual Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chapter Navigation Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Chapters & Modules
            </div>
            {DOCUMENTATION_DATA.map((doc) => {
              const isActive = activeStepId === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveStepId(doc.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isActive
                      ? 'bg-slate-900 border-cyan-500/80 shadow-md text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {doc.number}
                  </span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-200 leading-snug">
                      {doc.title}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                      {doc.summary}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Chapter Reading Pane (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
            {/* Chapter Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.5 rounded">
                  Chapter {activeDoc.number}
                </span>
                <span className="text-xs font-mono text-slate-500">|</span>
                <span className="text-xs font-mono text-slate-400">{activeDoc.badge}</span>
              </div>
            </div>

            {/* Chapter Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {activeDoc.title}
            </h3>

            {/* Executive Summary */}
            <div className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-cyan-400 text-sm text-cyan-100 mb-6 leading-relaxed">
              {activeDoc.summary}
            </div>

            {/* Prose Content */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 mb-6 whitespace-pre-line">
              {activeDoc.content}
            </div>

            {/* Optional ASCII Diagram */}
            {activeDoc.diagramAscii && (
              <div className="my-6 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  Conceptual Memory Structure:
                </div>
                <pre className="leading-tight">{activeDoc.diagramAscii.trim()}</pre>
              </div>
            )}

            {/* Optional Code Snippet / Complexity Matrix */}
            {activeDoc.codeSnippet && (
              <div className="my-6 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  Complexity Specification:
                </div>
                <pre className="text-cyan-300 leading-normal">{activeDoc.codeSnippet.trim()}</pre>
              </div>
            )}

            {/* Key Invariant Takeaways */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Critical Architectural Invariants</span>
              </h4>
              <ul className="space-y-2">
                {activeDoc.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
