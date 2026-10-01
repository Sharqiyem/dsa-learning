'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  RotateCw, 
  Play, 
  SkipForward, 
  Undo2, 
  Redo2, 
  Layers, 
  Terminal,
  Cpu
} from 'lucide-react';

export function RealWorldSimulators() {
  const [activeTab, setActiveTab] = useState<'parentheses' | 'undoredo' | 'callstack'>('parentheses');

  // --- 1. Balanced Parentheses State ---
  const [parenInput, setParenInput] = useState<string>('{[()()]}');
  const [parenStep, setParenStep] = useState<number>(0);
  const [parenStack, setParenStack] = useState<string[]>([]);
  const [parenStatus, setParenStatus] = useState<{
    status: 'idle' | 'running' | 'valid' | 'invalid';
    msg: string;
  }>({ status: 'idle', msg: 'Click "Start Trace" or "Step Forward" to inspect bracket parsing.' });

  const resetParenTrace = (newStr?: string) => {
    const target = newStr !== undefined ? newStr : parenInput;
    setParenInput(target);
    setParenStep(0);
    setParenStack([]);
    setParenStatus({ status: 'idle', msg: 'Trace reset. Ready to analyze.' });
  };

  const stepParenTrace = () => {
    if (parenStep >= parenInput.length) {
      if (parenStack.length === 0) {
        setParenStatus({ status: 'valid', msg: 'Success! All brackets closed properly. Stack is empty -> String is BALANCED.' });
      } else {
        setParenStatus({ status: 'invalid', msg: `Error! Remaining unclosed brackets on stack: [${parenStack.join(', ')}] -> String is UNBALANCED.` });
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
        msg: `Scanned opening bracket '${char}' -> PUSHED onto stack. Current stack: [${[...parenStack, char].join(', ')}]`,
      });
    } else if (char === ')' || char === ']' || char === '}') {
      const expected = matchMap[char];
      if (parenStack.length === 0) {
        setParenStatus({
          status: 'invalid',
          msg: `Syntax Error! Encountered closing '${char}' but stack is empty (No opening counterpart).`,
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
          msg: `Scanned closing '${char}' -> Matches top '${top}'. POPPED '${top}' from stack!`,
        });
      } else {
        setParenStatus({
          status: 'invalid',
          msg: `Mismatch Error! Encountered '${char}' which expects '${expected}', but top is '${top}'.`,
        });
        setParenStep(parenInput.length);
      }
    } else {
      // non-bracket character, skip
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
    setRedoStack([]); // typing clears redo
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
    { frame: 'main()', action: 'Invokes factorial(4)', stack: ['main()'], val: null },
    { frame: 'factorial(4)', action: 'Pushes frame: n = 4, waiting on 4 * factorial(3)', stack: ['main()', 'factorial(4)'], val: null },
    { frame: 'factorial(3)', action: 'Pushes frame: n = 3, waiting on 3 * factorial(2)', stack: ['main()', 'factorial(4)', 'factorial(3)'], val: null },
    { frame: 'factorial(2)', action: 'Pushes frame: n = 2, waiting on 2 * factorial(1)', stack: ['main()', 'factorial(4)', 'factorial(3)', 'factorial(2)'], val: null },
    { frame: 'factorial(1)', action: 'Pushes frame: n = 1, Base case reached! Returns 1', stack: ['main()', 'factorial(4)', 'factorial(3)', 'factorial(2)', 'factorial(1)'], val: '1' },
    { frame: 'factorial(2)', action: 'Pops frame 1: Receives 1. Computes 2 * 1 = 2. Returns 2', stack: ['main()', 'factorial(4)', 'factorial(3)', 'factorial(2)'], val: '2' },
    { frame: 'factorial(3)', action: 'Pops frame 2: Receives 2. Computes 3 * 2 = 6. Returns 6', stack: ['main()', 'factorial(4)', 'factorial(3)'], val: '6' },
    { frame: 'factorial(4)', action: 'Pops frame 3: Receives 6. Computes 4 * 6 = 24. Returns 24', stack: ['main()', 'factorial(4)'], val: '24' },
    { frame: 'main()', action: 'All frames unrolled. Final Result: factorial(4) = 24', stack: ['main()'], val: 'Result: 24' },
  ];

  const currentRec = recursionTimeline[recursionStep];

  return (
    <section id="applications" className="py-16 border-b border-slate-800 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
            <span>REAL-WORLD SYSTEMS</span>
            <span aria-hidden="true">·</span>
            <span>WHY STACKS MATTER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Applied Stack Simulations
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Explore how modern software engineering relies on stacks for parsing compilers, managing document undo history, and allocating function activation frames.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950/80 border border-slate-800 rounded-xl max-w-xl mb-8">
          <button
            onClick={() => setActiveTab('parentheses')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'parentheses'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Balanced Brackets
          </button>
          <button
            onClick={() => setActiveTab('undoredo')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'undoredo'
                ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Undo / Redo Stacks
          </button>
          <button
            onClick={() => setActiveTab('callstack')}
            className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'callstack'
                ? 'bg-slate-800 text-violet-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. CPU Call Stack
          </button>
        </div>

        {/* --- TAB 1: BALANCED BRACKETS --- */}
        {activeTab === 'parentheses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-sm font-semibold text-white">Syntax Scanner Visualizer</h3>
                <span className="text-xs font-mono text-emerald-400">Compiler Lexer / AST</span>
              </div>

              {/* Input String Preview with Pointer */}
              <div className="mb-6">
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Input Expression:
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={parenInput}
                    onChange={(e) => resetParenTrace(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white"
                  />
                  <button
                    onClick={() => resetParenTrace()}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                  >
                    Reset
                  </button>
                </div>

                {/* Preset Chips */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap mb-4">
                  <span className="text-slate-500">Presets:</span>
                  {['{[()()]}', '{[(])}', '((()))', '({[]})', '(()', '{[}'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => resetParenTrace(preset)}
                      className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                        parenInput === preset ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Token Stream with Visual Pointer */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 mb-2">Token Scan Stream:</div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
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
                                ? 'bg-slate-800 text-slate-400 line-through opacity-60'
                                : 'bg-slate-950 text-white border border-slate-800'
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
                    ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                    : parenStatus.status === 'invalid'
                    ? 'bg-rose-950/40 border-rose-600 text-rose-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                {parenStatus.status === 'valid' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : parenStatus.status === 'invalid' ? (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
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
                  <span>Step Forward</span>
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
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium"
                >
                  <Play className="w-4 h-4" />
                  <span>Auto-Trace</span>
                </button>
              </div>
            </div>

            {/* Right: Live Bracket Stack */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
              <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                Bracket Stack State
              </h4>
              <div className="text-[11px] text-slate-500 mb-4 font-mono">
                {"Pushes '(', '{', '[' · Pops on matching ')', '}', ']'"}
              </div>

              <div className="w-full max-w-[240px] min-h-[220px] bg-slate-900/90 border-x-4 border-b-4 border-slate-700 rounded-b-xl flex flex-col-reverse p-3 gap-2">
                {parenStack.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-[11px] text-slate-600 font-mono">
                    [ Stack Empty ]
                  </div>
                ) : (
                  parenStack.map((bracket, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="h-10 bg-emerald-500/20 border-2 border-emerald-400/80 rounded-lg flex items-center justify-between px-3 text-emerald-300 font-mono font-bold"
                    >
                      <span className="text-[10px] text-slate-400">[{idx}]</span>
                      <span className="text-lg">{bracket}</span>
                      <span className="text-[10px] text-emerald-400">
                        {idx === parenStack.length - 1 ? 'TOP' : ''}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
              <div className="w-full max-w-[240px] mt-1 text-center text-[10px] font-mono text-slate-500">
                LIFO Stack Tube
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: UNDO / REDO --- */}
        {activeTab === 'undoredo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-sm font-semibold text-white">Document Editor State</h3>
                <span className="text-xs font-mono text-cyan-400">Dual-Stack Memento</span>
              </div>

              {/* Editor Workspace */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-h-[120px] mb-4">
                <div className="text-[10px] font-mono text-slate-500 mb-1">Canvas / Buffer:</div>
                <div className="text-lg font-mono text-white min-h-[30px] border-b border-slate-800 pb-2">
                  {editorText || <span className="text-slate-600 italic">Empty document...</span>}
                  <span className="inline-block w-2 h-5 bg-cyan-400 ml-1 animate-pulse" />
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
                  placeholder="Type word to append..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white"
                />
                <button
                  onClick={() => handleTypeWord(nextWord)}
                  className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-semibold"
                >
                  Type
                </button>
              </div>

              {/* Undo & Redo Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleUndo}
                  disabled={undoStack.length <= 1}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    undoStack.length <= 1
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-white active:scale-95'
                  }`}
                >
                  <Undo2 className="w-4 h-4 text-emerald-400" />
                  <span>Undo (Pop Undo Stack)</span>
                </button>

                <button
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    redoStack.length === 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 text-white active:scale-95'
                  }`}
                >
                  <Redo2 className="w-4 h-4 text-cyan-400" />
                  <span>Redo (Pop Redo Stack)</span>
                </button>
              </div>
            </div>

            {/* Dual Stacks Display */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {/* Undo Stack */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
                <div className="text-xs font-semibold text-emerald-400 mb-1">Undo Stack</div>
                <div className="text-[10px] text-slate-500 mb-3">{undoStack.length} snapshots</div>

                <div className="w-full min-h-[200px] bg-slate-900 border-x-2 border-b-2 border-slate-700 rounded-b-lg flex flex-col-reverse p-2 gap-1.5 overflow-hidden">
                  {undoStack.slice(-5).map((snap, idx) => (
                    <div
                      key={idx}
                      className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-mono text-emerald-200 truncate text-center"
                    >
                      {`"${snap || '<empty>'}"`}
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">TOP = Current State</span>
              </div>

              {/* Redo Stack */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
                <div className="text-xs font-semibold text-cyan-400 mb-1">Redo Stack</div>
                <div className="text-[10px] text-slate-500 mb-3">{redoStack.length} snapshots</div>

                <div className="w-full min-h-[200px] bg-slate-900 border-x-2 border-b-2 border-slate-700 rounded-b-lg flex flex-col-reverse p-2 gap-1.5 overflow-hidden">
                  {redoStack.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-[10px] text-slate-600 font-mono">
                      Empty
                    </div>
                  ) : (
                    redoStack.slice(-5).map((snap, idx) => (
                      <div
                        key={idx}
                        className="px-2 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-[11px] font-mono text-cyan-200 truncate text-center"
                      >
                        {`"${snap}"`}
                      </div>
                    ))
                  )}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">TOP = Next Redo</span>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: CPU CALL STACK --- */}
        {activeTab === 'callstack' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet-400" />
                  <span>Call Stack Execution: factorial(4)</span>
                </h3>
                <span className="text-xs font-mono text-violet-400">Step {recursionStep + 1} / {recursionTimeline.length}</span>
              </div>

              {/* Python Function Code */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 mb-4 leading-relaxed">
                <div className="text-slate-500"># Recursive implementation</div>
                <div><span className="text-violet-400">def</span> <span className="text-emerald-400">factorial</span>(n):</div>
                <div className="pl-4">if n &lt;= 1:</div>
                <div className="pl-8 text-cyan-400">return 1  # Base case</div>
                <div className="pl-4 text-emerald-300">return n * factorial(n - 1)  # Recursive call</div>
              </div>

              {/* Current Event Description */}
              <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-800/50 mb-6">
                <div className="text-xs font-semibold text-violet-300 mb-1">
                  Active Frame: {currentRec.frame}
                </div>
                <div className="text-xs text-slate-300 leading-normal">
                  {currentRec.action}
                </div>
                {currentRec.val && (
                  <div className="mt-2 text-xs font-mono text-emerald-400 bg-slate-950/80 p-2 rounded border border-slate-800">
                    Yield Value: {currentRec.val}
                  </div>
                )}
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRecursionStep((prev) => Math.max(0, prev - 1))}
                  disabled={recursionStep === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg text-xs font-medium"
                >
                  Step Back
                </button>
                <button
                  onClick={() => setRecursionStep((prev) => Math.min(recursionTimeline.length - 1, prev + 1))}
                  disabled={recursionStep === recursionTimeline.length - 1}
                  className="px-4 py-2 bg-violet-500 hover:bg-violet-400 disabled:opacity-40 text-slate-950 rounded-lg text-xs font-semibold shadow-md"
                >
                  Step Forward
                </button>
                <button
                  onClick={() => setRecursionStep(0)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Right: The Physical Call Stack Frames */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
              <h4 className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                System Call Stack (RAM)
              </h4>
              <p className="text-[11px] text-slate-500 mb-4 text-center">
                Stack grows upward in memory. Top frame holds CPU execution pointer (PC).
              </p>

              <div className="w-full max-w-[280px] min-h-[260px] bg-slate-900 border-x-4 border-b-4 border-slate-700 rounded-b-xl flex flex-col-reverse p-3 gap-2">
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
                          ? 'bg-violet-500/20 border-violet-400 text-violet-200 shadow-md ring-2 ring-violet-500/30'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span>{frameName}</span>
                      {isTop && (
                        <span className="text-[10px] bg-violet-950 text-violet-300 border border-violet-700 px-1 rounded">
                          ACTIVE (RSP)
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <div className="w-full max-w-[280px] mt-1 flex justify-between text-[10px] font-mono text-slate-500">
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
