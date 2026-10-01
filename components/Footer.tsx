'use client';

import React from 'react';
import { Layers, ExternalLink, Code2, BookOpen, Download } from 'lucide-react';
import { PYTHON_DOWNLOADABLE_SCRIPT } from '@/data/pythonCodeData';
import { STEP_BY_STEP_DOCUMENTATION_MARKDOWN } from '@/data/documentationData';

export function Footer() {
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
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-white font-semibold text-lg">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>StackLab</span>
            </div>
            <p className="mt-1 text-xs text-slate-400 max-w-md">
              Interactive Data Structures & Algorithms educational lab designed for computer science students mastering LIFO mechanics, Python internals, and stack algorithms.
            </p>
          </div>

          {/* Direct Resource Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>stack_mastery.py</span>
            </button>

            <button
              onClick={handleDownloadDocs}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>DSA_Stack_Guide.md</span>
            </button>

            <a
              href="https://www.w3schools.com/dsa/dsa_data_stacks.php"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <span>W3Schools Reference</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <span>© {new Date().getFullYear()} StackLab Educational Sandbox. Built for computer science students.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
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
