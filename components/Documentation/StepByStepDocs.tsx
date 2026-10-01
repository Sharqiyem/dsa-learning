'use client';

import React, { useState } from 'react';
import { 
  DOCUMENTATION_DATA, 
  DOCUMENTATION_DATA_AR,
  STEP_BY_STEP_DOCUMENTATION_MARKDOWN, 
} from '@/data/documentationData';
import { 
  Download, 
  CheckCircle2, 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export function StepByStepDocs() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const docs = isArabic ? DOCUMENTATION_DATA_AR : DOCUMENTATION_DATA;

  const [activeStepId, setActiveStepId] = useState<string>(docs[0].id);

  const activeDoc = docs.find((d) => d.id === activeStepId) || docs[0];

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
    <section id="documentation" className={`py-16 border-b transition-colors ${
      isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${
              isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'
            }`}>
              <span>{t.docs.badge}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {t.docs.title}
            </h2>
            <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.docs.subtitle}
            </p>
          </div>

          <button
            onClick={handleDownloadDocs}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors border self-start md:self-auto active:scale-95 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-cyan-500" />
            <span>{t.docs.downloadBtn}</span>
          </button>
        </div>

        {/* Two-Column Manual Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chapter Navigation Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
              {t.docs.chaptersTitle}
            </div>
            {docs.map((doc) => {
              const isActive = activeStepId === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveStepId(doc.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isActive
                      ? isDark
                        ? 'bg-slate-900 border-cyan-500/80 shadow-md text-white'
                        : 'bg-cyan-50/70 border-cyan-400 shadow-sm text-cyan-950 font-medium'
                      : isDark
                      ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                      isActive
                        ? isDark
                          ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                          : 'bg-cyan-100 text-cyan-800 border-cyan-300'
                        : isDark
                        ? 'bg-slate-800 text-slate-500 border-slate-700'
                        : 'bg-slate-200 text-slate-600 border-slate-300'
                    }`}
                  >
                    {doc.number}
                  </span>
                  <div className="flex-1">
                    <div className={`text-xs font-semibold leading-snug ${
                      isActive ? (isDark ? 'text-white' : 'text-slate-950') : (isDark ? 'text-slate-300' : 'text-slate-700')
                    }`}>
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
          <div className={`lg:col-span-8 border rounded-2xl p-6 sm:p-8 transition-colors ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            {/* Chapter Header */}
            <div className={`flex items-center justify-between pb-4 mb-6 border-b ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs px-2 py-0.5 rounded border ${
                  isDark 
                    ? 'text-cyan-400 bg-cyan-950/80 border-cyan-800/80' 
                    : 'text-cyan-800 bg-cyan-100 border-cyan-300 font-semibold'
                }`}>
                  {t.docs.chapterPrefix} {activeDoc.number}
                </span>
                <span className="text-xs font-mono text-slate-400">|</span>
                <span className="text-xs font-mono text-slate-500">{activeDoc.badge}</span>
              </div>
            </div>

            {/* Chapter Title */}
            <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {activeDoc.title}
            </h3>

            {/* Executive Summary */}
            <div className={`p-4 rounded-xl border-l-4 text-sm mb-6 leading-relaxed ${
              isDark 
                ? 'bg-slate-900/80 border-cyan-400 text-cyan-100' 
                : 'bg-cyan-50 border-cyan-500 text-cyan-900'
            }`}>
              {activeDoc.summary}
            </div>

            {/* Prose Content */}
            <div className={`text-xs sm:text-sm leading-relaxed space-y-4 mb-6 whitespace-pre-line ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {activeDoc.content}
            </div>

            {/* Optional ASCII Diagram (Kept LTR for pristine alignment) */}
            {activeDoc.diagramAscii && (
              <div className={`my-6 p-4 rounded-xl border font-mono text-xs overflow-x-auto ${
                isDark ? 'bg-slate-900 border-slate-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-emerald-300'
              }`} dir="ltr">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-mono">
                  {t.docs.asciiDiagramTitle}
                </div>
                <pre className="leading-tight">{activeDoc.diagramAscii.trim()}</pre>
              </div>
            )}

            {/* Optional Code Snippet / Complexity Matrix (Kept LTR) */}
            {activeDoc.codeSnippet && (
              <div className={`my-6 p-4 rounded-xl border font-mono text-xs overflow-x-auto ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-200'
              }`} dir="ltr">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 font-mono">
                  {t.docs.complexityTitle}
                </div>
                <pre className="text-cyan-300 leading-normal">{activeDoc.codeSnippet.trim()}</pre>
              </div>
            )}

            {/* Key Invariant Takeaways */}
            <div className={`mt-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{t.docs.invariantsTitle}</span>
              </h4>
              <ul className="space-y-2">
                {activeDoc.bulletPoints.map((point, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-xs ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
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
