'use client';

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { 
  DOCUMENTATION_DATA, 
  DOCUMENTATION_DATA_AR,
  STEP_BY_STEP_DOCUMENTATION_MARKDOWN, 
  STEP_BY_STEP_DOCUMENTATION_MARKDOWN_AR,
} from '@/data/documentationData';
import { 
  Download, 
  CheckCircle2, 
  FileText, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export function StepByStepDocs() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const docs = isArabic ? DOCUMENTATION_DATA_AR : DOCUMENTATION_DATA;

  const [activeStepId, setActiveStepId] = useState<string>(docs[0].id);
  const [showFullMd, setShowFullMd] = useState<boolean>(false);
  const [copiedMd, setCopiedMd] = useState<boolean>(false);
  const [previewLang, setPreviewLang] = useState<'ar' | 'en'>(isArabic ? 'ar' : 'en');

  // Synchronize active doc if chapter list changes
  const activeDoc = docs.find((d) => d.id === activeStepId) || docs[0];

  const currentMdText = previewLang === 'ar' ? STEP_BY_STEP_DOCUMENTATION_MARKDOWN_AR : STEP_BY_STEP_DOCUMENTATION_MARKDOWN;

  const handleDownload = (lang: 'en' | 'ar') => {
    const content = lang === 'ar' ? STEP_BY_STEP_DOCUMENTATION_MARKDOWN_AR : STEP_BY_STEP_DOCUMENTATION_MARKDOWN;
    const fileName = lang === 'ar' ? 'DSA_Stack_Complete_Guide_AR.md' : 'DSA_Stack_Complete_Guide_EN.md';
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMd = async () => {
    try {
      await navigator.clipboard.writeText(currentMdText);
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = currentMdText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    }
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
              <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
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

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Toggle Full Markdown View */}
            <button
              onClick={() => {
                setShowFullMd(!showFullMd);
                setPreviewLang(isArabic ? 'ar' : 'en');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors border active:scale-95 ${
                showFullMd
                  ? isDark
                    ? 'bg-cyan-950 border-cyan-700 text-cyan-300'
                    : 'bg-cyan-50 border-cyan-400 text-cyan-900'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-cyan-500" />
              <span>{showFullMd ? t.docs.hideFullMdBtn : t.docs.viewFullMdBtn}</span>
              {showFullMd ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Quick Download Button for active language */}
            <button
              onClick={() => handleDownload(isArabic ? 'ar' : 'en')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors border active:scale-95 ${
                isDark
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-500 shadow-sm shadow-cyan-950'
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-600 shadow-sm'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>{t.docs.downloadBtn}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Full Markdown (.md) Viewer */}
        {showFullMd && (
          <div className={`mb-10 p-5 sm:p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-950 border-cyan-900/60 shadow-xl' : 'bg-slate-50 border-cyan-200 shadow-sm'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800/40 dark:border-slate-800 gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t.docs.previewMdTitle}
                </span>
                <span className="text-[11px] font-mono text-cyan-500 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {previewLang === 'ar' ? 'DSA_Stack_Complete_Guide_AR.md' : 'DSA_Stack_Complete_Guide_EN.md'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Language Switcher for Markdown */}
                <div className={`flex rounded-lg border p-0.5 text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    onClick={() => setPreviewLang('en')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      previewLang === 'en'
                        ? 'bg-cyan-600 text-white font-semibold shadow-xs'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    English (.md)
                  </button>
                  <button
                    onClick={() => setPreviewLang('ar')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      previewLang === 'ar'
                        ? 'bg-cyan-600 text-white font-semibold shadow-xs'
                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    العربية (.md)
                  </button>
                </div>

                {/* Copy Markdown */}
                <button
                  onClick={handleCopyMd}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    copiedMd
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {copiedMd ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copiedMd ? t.docs.copiedMdBtn : t.docs.copyMdBtn}</span>
                </button>

                {/* Download Specific Language */}
                <button
                  onClick={() => handleDownload(previewLang)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isDark
                      ? 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-cyan-800/80'
                      : 'bg-white hover:bg-slate-100 text-cyan-700 border-cyan-300'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{previewLang === 'ar' ? t.docs.downloadMdArBtn : t.docs.downloadMdEnBtn}</span>
                </button>
              </div>
            </div>

            {/* Markdown Text Area / Monospace Preview */}
            <div className={`p-4 rounded-xl border max-h-[380px] overflow-y-auto font-mono text-xs leading-relaxed transition-colors ${
              isDark 
                ? 'bg-slate-900/90 border-slate-800 text-slate-200' 
                : 'bg-white border-slate-300 text-slate-800'
            }`} dir={previewLang === 'ar' ? 'rtl' : 'ltr'}>
              <pre className="whitespace-pre-wrap font-mono text-[11px] sm:text-xs">
                {currentMdText}
              </pre>
            </div>
          </div>
        )}

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
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded border shrink-0 ${
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
                  <div className="flex-1 min-w-0">
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

            {/* Prose Content rendered with ReactMarkdown */}
            <div className={`text-xs sm:text-sm leading-relaxed space-y-4 mb-6 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <div className="markdown-body">
                <Markdown
                  components={{
                    h1: ({ ...props }) => <h1 className="text-lg font-bold my-3 text-cyan-400" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-base font-bold my-3 text-cyan-400" {...props} />,
                    h3: ({ ...props }) => <h3 className={`text-sm font-semibold my-2 ${isDark ? 'text-white' : 'text-slate-900'}`} {...props} />,
                    p: ({ ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
                    strong: ({ ...props }) => <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`} {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal pl-5 space-y-2 mb-3" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1 mb-3" {...props} />,
                    li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
                    code: ({ ...props }) => (
                      <code className={`px-1.5 py-0.5 rounded font-mono text-xs ${
                        isDark ? 'bg-slate-900 text-cyan-300 border border-slate-800' : 'bg-slate-100 text-cyan-800 border border-slate-200'
                      }`} {...props} />
                    ),
                  }}
                >
                  {activeDoc.content}
                </Markdown>
              </div>
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
