'use client';

import React from 'react';
import { Layers, ExternalLink, Download } from 'lucide-react';
import { PYTHON_DOWNLOADABLE_SCRIPT } from '@/data/pythonCodeData';
import { 
  STEP_BY_STEP_DOCUMENTATION_MARKDOWN, 
  STEP_BY_STEP_DOCUMENTATION_MARKDOWN_AR 
} from '@/data/documentationData';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();

  const handleDownloadCode = () => {
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

  const handleDownloadDocs = () => {
    const isArabic = language === 'ar';
    const content = isArabic ? STEP_BY_STEP_DOCUMENTATION_MARKDOWN_AR : STEP_BY_STEP_DOCUMENTATION_MARKDOWN;
    const fileName = isArabic ? 'DSA_Stack_Complete_Guide_AR.md' : 'DSA_Stack_Complete_Guide_EN.md';
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

  return (
    <footer className={`border-t py-12 transition-colors ${
      isDark ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div>
            <div className={`flex items-center gap-2 font-semibold text-lg ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              <Layers className="w-5 h-5 text-emerald-500" />
              <span>StackLab</span>
            </div>
            <p className={`mt-1 text-xs max-w-md ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.footer.desc}
            </p>
          </div>

          {/* Direct Resource Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadCode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-emerald-500" />
              <span>stack_mastery.py</span>
            </button>

            <button
              onClick={handleDownloadDocs}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-cyan-500" />
              <span>DSA_Stack_Guide.md</span>
            </button>

            <a
              href="https://www.w3schools.com/dsa/dsa_data_stacks.php"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-xs transition-colors ${
                isDark ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              <span>{t.footer.w3schoolsRef}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className={`mt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${
          isDark ? 'text-slate-500' : 'text-slate-400'
        }`}>
          <div>
            <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono" dir="ltr">
            <span>LIFO PRINCIPLE</span>
            <span aria-hidden="true">·</span>
            <span>TIME O(1)</span>
            <span aria-hidden="true">·</span>
            <span>PYTHON 3.12+</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
