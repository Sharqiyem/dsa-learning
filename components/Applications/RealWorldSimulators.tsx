'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  Play, 
  SkipForward, 
  Undo2, 
  Redo2, 
  Terminal,
  Cpu
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export function RealWorldSimulators() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const [activeTab, setActiveTab] = useState<'parentheses' | 'undoredo' | 'callstack'>('parentheses');

  // --- 1. Balanced Parentheses State ---
  const [parenInput, setParenInput] = useState<string>('{[()()]}');
  const [parenStep, setParenStep] = useState<number>(0);
  const [parenStack, setParenStack] = useState<string[]>([]);
  const [parenStatus, setParenStatus] = useState<{
    status: 'idle' | 'running' | 'valid' | 'invalid';
    msg: string;
  }>({ 
    status: 'idle', 
    msg: isArabic 
      ? 'اضغط "خطوة للأمام" أو "محاكاة تلقائية" لبدء فحص الأقواس.' 
      : 'Click "Start Trace" or "Step Forward" to inspect bracket parsing.' 
  });

  const resetParenTrace = (newStr?: string) => {
    const target = newStr !== undefined ? newStr : parenInput;
    setParenInput(target);
    setParenStep(0);
    setParenStack([]);
    setParenStatus({ 
      status: 'idle', 
      msg: isArabic ? 'تمت إعادة الضبط. النظام جاهز للفحص.' : 'Trace reset. Ready to analyze.' 
    });
  };

  const stepParenTrace = () => {
    if (parenStep >= parenInput.length) {
      if (parenStack.length === 0) {
        setParenStatus({ 
          status: 'valid', 
          msg: isArabic 
            ? 'نجاح! تم إغلاق جميع الأقواس بترتيب صحيح. المكدس فارغ -> التعبير متوازن (BALANCED).' 
            : 'Success! All brackets closed properly. Stack is empty -> String is BALANCED.' 
        });
      } else {
        setParenStatus({ 
          status: 'invalid', 
          msg: isArabic 
            ? `خطأ! لا زالت هناك أقواس مفتوحة لم تُغلق: [${parenStack.join(', ')}] -> التعبير غير متوازن (UNBALANCED).` 
            : `Error! Remaining unclosed brackets on stack: [${parenStack.join(', ')}] -> String is UNBALANCED.` 
        });
      }
      return;
    }

    const char = parenInput[parenStep];
    const matchMap: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

    if (char === '(' || char === '[' || char === '{') {
      setParenStack((prev) => [...prev, char]);
      setParenStep((prev) => prev + 1);
      setParenStatus({
        status: 'running',
        msg: isArabic 
          ? `تم رصد قوس فتح '${char}' -> PUSH إلى المكدس. حالة المكدس الآن: [${[...parenStack, char].join(', ')}]` 
          : `Scanned opening bracket '${char}' -> PUSHED onto stack. Current stack: [${[...parenStack, char].join(', ')}]`,
      });
    } else if (char === ')' || char === ']' || char === '}') {
      const expected = matchMap[char];
      if (parenStack.length === 0) {
        setParenStatus({
          status: 'invalid',
          msg: isArabic 
            ? `خطأ تركيبي! وُجد قوس إغلاق '${char}' لكن المكدس فارغ تماماً (لا يوجد قوس فتح يقابله).` 
            : `Syntax Error! Encountered closing '${char}' but stack is empty (No opening counterpart).`,
        });
        setParenStep(parenInput.length);
        return;
      }

      const top = parenStack[parenStack.length - 1];
      if (top === expected) {
        setParenStack((prev) => prev.slice(0, -1));
        setParenStep((prev) => prev + 1);
        setParenStatus({
          status: 'running',
          msg: isArabic 
            ? `تم رصد قوس إغلاق '${char}' -> يطابق قمة المكدس '${top}'. تمت إزالة '${top}' عبر POP!` 
            : `Scanned closing '${char}' -> Matches top '${top}'. POPPED '${top}' from stack!`,
        });
      } else {
        setParenStatus({
          status: 'invalid',
          msg: isArabic 
            ? `خطأ عدم تطابق! وُجد '${char}' ويتطلب '${expected}'، لكن قمة المكدس هي '${top}'.` 
            : `Mismatch Error! Encountered '${char}' which expects '${expected}', but top is '${top}'.`,
        });
        setParenStep(parenInput.length);
      }
    } else {
      setParenStep((prev) => prev + 1);
    }
  };

  // --- 2. Undo / Redo State ---
  const [editorText, setEditorText] = useState<string>('Hello');
  const [undoStack, setUndoStack] = useState<string[]>(['', 'H', 'He', 'Hel', 'Hell', 'Hello']);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [nextWord, setNextWord] = useState<string>('');

  const handleTypeWord = (word: string) => {
    if (!word) return;
    const newText = editorText ? `${editorText} ${word}` : word;
    setUndoStack((prev) => [...prev, newText]);
    setRedoStack([]);
    setEditorText(newText);
    setNextWord('');
  };

  const handleUndo = () => {
    if (undoStack.length <= 1) return;
    const currentState = undoStack[undoStack.length - 1];
    const previousState = undoStack[undoStack.length - 2];

    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, currentState]);
    setEditorText(previousState);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const restoredState = redoStack[redoStack.length - 1];

    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, restoredState]);
    setEditorText(restoredState);
  };

  // --- 3. Recursive Call Stack Simulation ---
  const [recursionStep, setRecursionStep] = useState<number>(0);
  const recursionTimeline = [
    { 
      frame: 'main()', 
      action: isArabic ? 'استدعاء دالة factorial(4)' : 'Invokes factorial(4)', 
      stack: ['main()'], 
      val: null 
    },
    { 
      frame: 'factorial(4)', 
      action: isArabic ? 'دفع إطار: n = 4، المعالج ينتظر نتيجة 4 * factorial(3)' : 'Pushes frame: n = 4, waiting on 4 * factorial(3)', 
      stack: ['main()', 'factorial(4)'], 
      val: null 
    },
    { 
      frame: 'factorial(3)', 
      action: isArabic ? 'دفع إطار: n = 3، المعالج ينتظر نتيجة 3 * factorial(2)' : 'Pushes frame: n = 3, waiting on 3 * factorial(2)', 
      stack: ['main()', 'factorial(4)', 'factorial(3)'], 
      val: null 
    },
    { 
      frame: 'factorial(2)', 
      action: isArabic ? 'دفع إطار: n = 2، المعالج ينتظر نتيجة 2 * factorial(1)' : 'Pushes frame: n = 2, waiting on 2 * factorial(1)', 
      stack: ['main()', 'factorial(4)', 'factorial(3)', 'factorial(2)'], 
      val: null 
    },
    { 
      frame: 'factorial(1)', 
      action: isArabic ? 'دفع إطار: n = 1، تحقق شرط التوقف Base Case! تُرجع الدالة 1' : 'Pushes frame: n = 1, Base case reached! Returns 1', 
      stack: ['main()', 'factorial(4)', 'factorial(3)', 'factorial(2)', 'factorial(1)'], 
      val: '1' 
    },
    { 
      frame: 'factorial(2)', 
      action: isArabic ? 'سحب إطار 1: استلام 1. حساب 2 * 1 = 2. تُرجع الدالة 2' : 'Pops frame 1: Receives 1. Computes 2 * 1 = 2. Returns 2', 
      stack: ['main()', 'factorial(4)', 'factorial(3)', 'factorial(2)'], 
      val: '2' 
    },
    { 
      frame: 'factorial(3)', 
      action: isArabic ? 'سحب إطار 2: استلام 2. حساب 3 * 2 = 6. تُرجع الدالة 6' : 'Pops frame 2: Receives 2. Computes 3 * 2 = 6. Returns 6', 
      stack: ['main()', 'factorial(4)', 'factorial(3)'], 
      val: '6' 
    },
    { 
      frame: 'factorial(4)', 
      action: isArabic ? 'سحب إطار 3: استلام 6. حساب 4 * 6 = 24. تُرجع الدالة 24' : 'Pops frame 3: Receives 6. Computes 4 * 6 = 24. Returns 24', 
      stack: ['main()', 'factorial(4)'], 
      val: '24' 
    },
    { 
      frame: 'main()', 
      action: isArabic ? 'انتهت كافة الإطارات. النتيجة النهائية: factorial(4) = 24' : 'All frames unrolled. Final Result: factorial(4) = 24', 
      stack: ['main()'], 
      val: isArabic ? 'النتيجة: 24' : 'Result: 24' 
    },
  ];

  const currentRec = recursionTimeline[recursionStep];

  return (
    <section id="applications" className={`py-16 border-b transition-colors ${
      isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${
            isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'
          }`}>
            <span>{t.applications.badge}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.applications.title}
          </h2>
          <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.applications.subtitle}
          </p>
        </div>

        {/* Tab Selection */}
        <div className={`flex items-center gap-2 p-1.5 border rounded-xl max-w-xl mb-8 ${
          isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <button
            onClick={() => setActiveTab('parentheses')}
            className={`flex-1 py-2 px-3 text-xs rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'parentheses'
                ? isDark
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 shadow-sm'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.applications.tabParentheses}
          </button>
          <button
            onClick={() => setActiveTab('undoredo')}
            className={`flex-1 py-2 px-3 text-xs rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'undoredo'
                ? isDark
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                  : 'bg-cyan-50 text-cyan-800 font-semibold border border-cyan-200 shadow-sm'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.applications.tabUndoRedo}
          </button>
          <button
            onClick={() => setActiveTab('callstack')}
            className={`flex-1 py-2 px-3 text-xs rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'callstack'
                ? isDark
                  ? 'bg-slate-800 text-violet-400 font-semibold shadow-sm'
                  : 'bg-violet-50 text-violet-800 font-semibold border border-violet-200 shadow-sm'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.applications.tabCallStack}
          </button>
        </div>

        {/* --- TAB 1: BALANCED BRACKETS --- */}
        {activeTab === 'parentheses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className={`lg:col-span-7 border rounded-2xl p-6 transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t.applications.scannerTitle}
                </h3>
                <span className={`text-xs font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'}`}>
                  {t.applications.compilerBadge}
                </span>
              </div>

              {/* Input String Preview with Pointer */}
              <div className="mb-6">
                <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t.applications.inputExprLabel}
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={parenInput}
                    onChange={(e) => resetParenTrace(e.target.value)}
                    className={`flex-1 border rounded-lg px-3 py-1.5 text-sm font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    onClick={() => resetParenTrace()}
                    className={`px-3 py-1.5 rounded-lg text-xs ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {t.applications.resetBtn}
                  </button>
                </div>

                {/* Preset Chips */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap mb-4">
                  <span>{t.applications.presetsLabel}</span>
                  {['{[()()]}', '{[(])}', '((()))', '({[]})', '(()', '{[}'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => resetParenTrace(preset)}
                      className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                        parenInput === preset 
                          ? isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
                          : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Token Stream with Visual Pointer */}
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-[11px] font-mono text-slate-500 mb-2">{t.applications.tokenStreamLabel}</div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2" dir="ltr">
                    {parenInput.split('').map((ch, idx) => {
                      const isCurrent = idx === parenStep && parenStep < parenInput.length;
                      const isProcessed = idx < parenStep;

                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <span
                            className={`w-9 h-10 flex items-center justify-center rounded font-mono text-base font-bold transition-all ${
                              isCurrent
                                ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-900 scale-110'
                                : isProcessed
                                ? isDark ? 'bg-slate-800 text-slate-500 line-through opacity-60' : 'bg-slate-200 text-slate-400 line-through'
                                : isDark ? 'bg-slate-950 text-white border border-slate-800' : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
                            }`}
                          >
                            {ch}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 mt-1">
                            {idx}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                  parenStatus.status === 'valid'
                    ? isDark ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : parenStatus.status === 'invalid'
                    ? isDark ? 'bg-rose-950/40 border-rose-600 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
                    : isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {parenStatus.status === 'valid' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : parenStatus.status === 'invalid' ? (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : (
                  <Terminal className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                )}
                <div>{parenStatus.msg}</div>
              </div>

              {/* Stepper Controls */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={stepParenTrace}
                  disabled={parenStep > parenInput.length}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-semibold shadow-md active:scale-95"
                >
                  <SkipForward className="w-4 h-4" />
                  <span>{t.applications.stepForwardBtn}</span>
                </button>
                <button
                  onClick={() => {
                    resetParenTrace();
                    const interval = setInterval(() => {
                      setParenStep((curr) => {
                        if (curr >= parenInput.length) {
                          clearInterval(interval);
                          return curr;
                        }
                        stepParenTrace();
                        return curr;
                      });
                    }, 400);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>{t.applications.autoTraceBtn}</span>
                </button>
              </div>
            </div>

            {/* Right: Live Bracket Stack */}
            <div className={`lg:col-span-5 border rounded-2xl p-6 flex flex-col items-center transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h4 className={`text-xs font-semibold mb-2 uppercase tracking-wider ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {t.applications.bracketStackTitle}
              </h4>
              <div className="text-[11px] text-slate-500 mb-4 font-mono">
                {t.applications.bracketStackDesc}
              </div>

              <div className={`w-full max-w-[240px] min-h-[220px] border-x-4 border-b-4 rounded-b-xl flex flex-col-reverse p-3 gap-2 ${
                isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-slate-100 border-slate-300'
              }`}>
                {parenStack.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-[11px] text-slate-500 font-mono">
                    {t.applications.stackEmptyLabel}
                  </div>
                ) : (
                  parenStack.map((bracket, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`h-10 rounded-lg border-2 flex items-center justify-between px-3 font-mono font-bold ${
                        isDark 
                          ? 'bg-emerald-500/20 border-emerald-400/80 text-emerald-300' 
                          : 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-sm'
                      }`}
                    >
                      <span className="text-[10px] text-slate-500">[{idx}]</span>
                      <span className="text-lg">{bracket}</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                        {idx === parenStack.length - 1 ? 'TOP' : ''}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
              <div className="w-full max-w-[240px] mt-1 text-center text-[10px] font-mono text-slate-500">
                {t.applications.lifoTubeLabel}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: UNDO / REDO --- */}
        {activeTab === 'undoredo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className={`lg:col-span-6 border rounded-2xl p-6 transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t.applications.editorTitle}
                </h3>
                <span className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'}`}>
                  {t.applications.mementoBadge}
                </span>
              </div>

              {/* Editor Workspace */}
              <div className={`p-4 rounded-xl border min-h-[120px] mb-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-[10px] font-mono text-slate-500 mb-1">{t.applications.canvasBufferLabel}</div>
                <div className={`text-lg font-mono min-h-[30px] border-b pb-2 ${
                  isDark ? 'border-slate-800 text-white' : 'border-slate-200 text-slate-900'
                }`}>
                  {editorText || <span className="text-slate-400 italic">{t.applications.emptyDocPlaceholder}</span>}
                  <span className="inline-block w-2 h-5 bg-cyan-500 ml-1 animate-pulse" />
                </div>
              </div>

              {/* Typing Toolbar */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={nextWord}
                  onChange={(e) => setNextWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTypeWord(nextWord);
                  }}
                  placeholder={t.applications.typePlaceholder}
                  className={`flex-1 border rounded-lg px-3 py-1.5 text-sm ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  onClick={() => handleTypeWord(nextWord)}
                  className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-semibold shadow-sm"
                >
                  {t.applications.typeBtn}
                </button>
              </div>

              {/* Undo & Redo Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleUndo}
                  disabled={undoStack.length <= 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all border ${
                    undoStack.length <= 1
                      ? 'opacity-40 cursor-not-allowed border-transparent'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 active:scale-95'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-sm active:scale-95'
                  }`}
                >
                  <Undo2 className="w-4 h-4 text-emerald-500" />
                  <span>{t.applications.undoBtn}</span>
                </button>

                <button
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all border ${
                    redoStack.length === 0
                      ? 'opacity-40 cursor-not-allowed border-transparent'
                      : isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 active:scale-95'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-sm active:scale-95'
                  }`}
                >
                  <Redo2 className="w-4 h-4 text-cyan-500" />
                  <span>{t.applications.redoBtn}</span>
                </button>
              </div>
            </div>

            {/* Dual Stacks Display */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {/* Undo Stack */}
              <div className={`border rounded-2xl p-4 flex flex-col items-center transition-colors ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`text-xs font-semibold mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700 font-bold'}`}>
                  {t.applications.undoStackTitle}
                </div>
                <div className="text-[10px] text-slate-500 mb-3">{undoStack.length} snapshots</div>

                <div className={`w-full min-h-[200px] border-x-2 border-b-2 rounded-b-lg flex flex-col-reverse p-2 gap-1.5 overflow-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-300'
                }`}>
                  {undoStack.slice(-5).map((snap, idx) => (
                    <div
                      key={idx}
                      className={`px-2 py-1 rounded border text-[11px] font-mono truncate text-center ${
                        isDark 
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200' 
                          : 'bg-emerald-100 border-emerald-300 text-emerald-950'
                      }`}
                    >
                      {`"${snap || '<empty>'}"`}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">{t.applications.currentTopState}</span>
              </div>

              {/* Redo Stack */}
              <div className={`border rounded-2xl p-4 flex flex-col items-center transition-colors ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`text-xs font-semibold mb-1 ${isDark ? 'text-cyan-400' : 'text-cyan-700 font-bold'}`}>
                  {t.applications.redoStackTitle}
                </div>
                <div className="text-[10px] text-slate-500 mb-3">{redoStack.length} snapshots</div>

                <div className={`w-full min-h-[200px] border-x-2 border-b-2 rounded-b-lg flex flex-col-reverse p-2 gap-1.5 overflow-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-300'
                }`}>
                  {redoStack.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                      Empty
                    </div>
                  ) : (
                    redoStack.slice(-5).map((snap, idx) => (
                      <div
                        key={idx}
                        className={`px-2 py-1 rounded border text-[11px] font-mono truncate text-center ${
                          isDark 
                            ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200' 
                            : 'bg-cyan-100 border-cyan-300 text-cyan-950'
                        }`}
                      >
                        {`"${snap}"`}
                      </div>
                    ))
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">{t.applications.nextRedoTop}</span>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: CPU CALL STACK --- */}
        {activeTab === 'callstack' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className={`lg:col-span-7 border rounded-2xl p-6 transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <h3 className={`text-sm font-semibold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <Cpu className="w-4 h-4 text-violet-500" />
                  <span>{t.applications.callStackTitle}</span>
                </h3>
                <span className={`text-xs font-mono ${isDark ? 'text-violet-400' : 'text-violet-700 font-semibold'}`}>
                  {t.applications.callStackStep} {recursionStep + 1} / {recursionTimeline.length}
                </span>
              </div>

              {/* Python Function Code */}
              <div className={`p-4 rounded-xl border font-mono text-xs mb-4 leading-relaxed ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`} dir="ltr">
                <div className="text-slate-500"># Recursive implementation</div>
                <div><span className="text-violet-600 dark:text-violet-400 font-semibold">def</span> <span className="text-emerald-600 dark:text-emerald-400 font-semibold">factorial</span>(n):</div>
                <div className="pl-4">if n &lt;= 1:</div>
                <div className="pl-8 text-cyan-600 dark:text-cyan-400 font-medium">return 1  # Base case</div>
                <div className="pl-4 text-emerald-600 dark:text-emerald-300 font-medium">return n * factorial(n - 1)  # Recursive call</div>
              </div>

              {/* Current Event Description */}
              <div className={`p-4 rounded-xl border mb-6 ${
                isDark 
                  ? 'bg-violet-950/30 border-violet-800/50' 
                  : 'bg-violet-50 border-violet-200'
              }`}>
                <div className={`text-xs font-semibold mb-1 ${
                  isDark ? 'text-violet-300' : 'text-violet-900'
                }`}>
                  {t.applications.activeFrameLabel} {currentRec.frame}
                </div>
                <div className={`text-xs leading-normal ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {currentRec.action}
                </div>
                {currentRec.val && (
                  <div className={`mt-2 text-xs font-mono p-2 rounded border ${
                    isDark 
                      ? 'text-emerald-400 bg-slate-950/80 border-slate-800' 
                      : 'text-emerald-800 bg-white border-slate-200 font-semibold shadow-sm'
                  }`}>
                    {t.applications.yieldValueLabel} {currentRec.val}
                  </div>
                )}
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRecursionStep((prev) => Math.max(0, prev - 1))}
                  disabled={recursionStep === 0}
                  className={`px-4 py-2 rounded-lg text-xs font-medium border ${
                    recursionStep === 0 ? 'opacity-40 cursor-not-allowed' : ''
                  } ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-sm'
                  }`}
                >
                  {t.applications.stepBackBtn}
                </button>
                <button
                  onClick={() => setRecursionStep((prev) => Math.min(recursionTimeline.length - 1, prev + 1))}
                  disabled={recursionStep === recursionTimeline.length - 1}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-semibold shadow-md active:scale-95 disabled:opacity-40"
                >
                  {t.applications.stepForwardBtn}
                </button>
                <button
                  onClick={() => setRecursionStep(0)}
                  className={`px-3 py-2 text-xs ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {t.applications.resetSimBtn}
                </button>
              </div>
            </div>

            {/* Right: The Physical Call Stack Frames */}
            <div className={`lg:col-span-5 border rounded-2xl p-6 flex flex-col items-center transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h4 className={`text-xs font-semibold mb-1 uppercase tracking-wider ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {t.applications.sysRamTitle}
              </h4>
              <p className="text-[11px] text-slate-500 mb-4 text-center">
                {t.applications.sysRamDesc}
              </p>

              <div className={`w-full max-w-[280px] min-h-[260px] border-x-4 border-b-4 rounded-b-xl flex flex-col-reverse p-3 gap-2 ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-300'
              }`}>
                {currentRec.stack.map((frameName, idx) => {
                  const isTop = idx === currentRec.stack.length - 1;
                  return (
                    <motion.div
                      key={frameName + idx}
                      layout
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`h-11 rounded-lg border-2 flex items-center justify-between px-3 font-mono text-xs ${
                        isTop
                          ? isDark
                            ? 'bg-violet-500/20 border-violet-400 text-violet-200 shadow-md ring-2 ring-violet-500/30'
                            : 'bg-violet-100 border-violet-400 text-violet-950 shadow-sm ring-2 ring-violet-400/40'
                          : isDark
                          ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-600 shadow-sm'
                      }`}
                    >
                      <span className="font-semibold">{frameName}</span>
                      {isTop && (
                        <span className={`text-[10px] px-1 rounded border font-semibold ${
                          isDark 
                            ? 'bg-violet-950 text-violet-300 border-violet-700' 
                            : 'bg-violet-200 text-violet-800 border-violet-300'
                        }`}>
                          ACTIVE (RSP)
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <div className="w-full max-w-[280px] mt-1 flex justify-between text-[10px] font-mono text-slate-500" dir="ltr">
                <span>0x0000 (Base)</span>
                <span>0x7FFF (High Memory)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
