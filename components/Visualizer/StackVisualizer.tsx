'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Eye, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Sparkles,
  Zap,
  Sliders,
  Terminal,
  Layers
} from 'lucide-react';

export interface StackElement {
  id: string;
  value: string | number;
  color: string;
  border: string;
  timestamp: string;
}

const COLOR_PALETTE = [
  { bg: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50', border: 'border-emerald-500' },
  { bg: 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50', border: 'border-cyan-500' },
  { bg: 'bg-blue-500/20 text-blue-200 border-blue-500/50', border: 'border-blue-500' },
  { bg: 'bg-indigo-500/20 text-indigo-200 border-indigo-500/50', border: 'border-indigo-500' },
  { bg: 'bg-violet-500/20 text-violet-200 border-violet-500/50', border: 'border-violet-500' },
  { bg: 'bg-amber-500/20 text-amber-200 border-amber-500/50', border: 'border-amber-500' },
  { bg: 'bg-rose-500/20 text-rose-200 border-rose-500/50', border: 'border-rose-500' },
];

export function StackVisualizer() {
  const [capacity, setCapacity] = useState<number>(6);
  const [elements, setElements] = useState<StackElement[]>([
    { id: '1', value: 10, color: COLOR_PALETTE[0].bg, border: COLOR_PALETTE[0].border, timestamp: '10:00:01' },
    { id: '2', value: 25, color: COLOR_PALETTE[1].bg, border: COLOR_PALETTE[1].border, timestamp: '10:00:02' },
    { id: '3', value: 42, color: COLOR_PALETTE[2].bg, border: COLOR_PALETTE[2].border, timestamp: '10:00:03' },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [peekingIndex, setPeekingIndex] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    description: string;
  } | null>({
    type: 'info',
    title: 'Ready',
    description: 'Use the controls below to push, pop, or inspect the top element.',
  });

  const [operationLog, setOperationLog] = useState<Array<{
    id: string;
    op: string;
    detail: string;
    time: string;
    type: 'push' | 'pop' | 'peek' | 'error' | 'clear';
  }>>([
    { id: 'log-0', op: 'INIT', detail: 'Initialized Stack with 3 elements (Capacity: 6)', time: '00:00:00', type: 'info' as any },
  ]);

  const [animSpeed, setAnimSpeed] = useState<number>(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFull = elements.length >= capacity;
  const isEmpty = elements.length === 0;
  const topIndex = elements.length - 1;

  const getNextColor = () => {
    return COLOR_PALETTE[elements.length % COLOR_PALETTE.length];
  };

  const getTimeString = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const handlePush = (val?: string | number) => {
    const valueToPush = val !== undefined ? val : (inputValue.trim() || Math.floor(Math.random() * 90 + 10));

    if (elements.length >= capacity) {
      setStatusMessage({
        type: 'error',
        title: 'Stack Overflow Error!',
        description: `Cannot push "${valueToPush}". Stack capacity limit (${capacity}) reached. In real memory, pushing to a full stack crashes the process or corrupts the heap.`,
      });
      setOperationLog((prev) => [
        {
          id: Math.random().toString(),
          op: 'OVERFLOW',
          detail: `Push rejected: capacity ${capacity} reached`,
          time: getTimeString(),
          type: 'error',
        },
        ...prev.slice(0, 19),
      ]);
      return;
    }

    const color = getNextColor();
    const newElement: StackElement = {
      id: Math.random().toString(36).substring(2, 9),
      value: valueToPush,
      color: color.bg,
      border: color.border,
      timestamp: getTimeString(),
    };

    setElements((prev) => [...prev, newElement]);
    setInputValue('');
    setPeekingIndex(null);

    setStatusMessage({
      type: 'success',
      title: 'PUSH Operation Successful',
      description: `Pushed "${valueToPush}" onto TOP (Index ${elements.length}). Stack size is now ${elements.length + 1}.`,
    });

    setOperationLog((prev) => [
      {
        id: Math.random().toString(),
        op: 'PUSH',
        detail: `stack.append(${typeof valueToPush === 'string' ? `"${valueToPush}"` : valueToPush}) -> Index ${elements.length}`,
        time: getTimeString(),
        type: 'push',
      },
      ...prev.slice(0, 19),
    ]);
  };

  const handlePop = () => {
    if (elements.length === 0) {
      setStatusMessage({
        type: 'error',
        title: 'Stack Underflow Error!',
        description: 'Cannot pop from an empty stack. Python raises IndexError("pop from empty list"). Always check isEmpty() first!',
      });
      setOperationLog((prev) => [
        {
          id: Math.random().toString(),
          op: 'UNDERFLOW',
          detail: 'Pop rejected: stack is empty (size = 0)',
          time: getTimeString(),
          type: 'error',
        },
        ...prev.slice(0, 19),
      ]);
      return;
    }

    const poppedElement = elements[elements.length - 1];
    setElements((prev) => prev.slice(0, -1));
    setPeekingIndex(null);

    setStatusMessage({
      type: 'warning',
      title: 'POP Operation Executed',
      description: `Removed and returned top element "${poppedElement.value}" from Index ${elements.length - 1}. New size: ${elements.length - 1}.`,
    });

    setOperationLog((prev) => [
      {
        id: Math.random().toString(),
        op: 'POP',
        detail: `popped = stack.pop() -> yielded ${poppedElement.value}`,
        time: getTimeString(),
        type: 'pop',
      },
      ...prev.slice(0, 19),
    ]);
  };

  const handlePeek = () => {
    if (elements.length === 0) {
      setStatusMessage({
        type: 'error',
        title: 'Stack Underflow on Peek!',
        description: 'Cannot peek at an empty stack. No top element exists.',
      });
      setOperationLog((prev) => [
        {
          id: Math.random().toString(),
          op: 'UNDERFLOW',
          detail: 'Peek rejected: stack is empty',
          time: getTimeString(),
          type: 'error',
        },
        ...prev.slice(0, 19),
      ]);
      return;
    }

    const topIdx = elements.length - 1;
    const topElement = elements[topIdx];
    setPeekingIndex(topIdx);

    setStatusMessage({
      type: 'info',
      title: 'PEEK / TOP Inspected',
      description: `Top element is "${topElement.value}" at Index ${topIdx}. The stack state was NOT modified (size remains ${elements.length}).`,
    });

    setOperationLog((prev) => [
      {
        id: Math.random().toString(),
        op: 'PEEK',
        detail: `top = stack[-1] -> inspected ${topElement.value} without removal`,
        time: getTimeString(),
        type: 'peek',
      },
      ...prev.slice(0, 19),
    ]);

    setTimeout(() => {
      setPeekingIndex((current) => (current === topIdx ? null : current));
    }, 2200 / animSpeed);
  };

  const handleClear = () => {
    setElements([]);
    setPeekingIndex(null);
    setStatusMessage({
      type: 'info',
      title: 'Stack Cleared',
      description: 'Removed all elements. Stack size is now 0.',
    });
    setOperationLog((prev) => [
      {
        id: Math.random().toString(),
        op: 'CLEAR',
        detail: 'stack.clear() -> Reset to empty state',
        time: getTimeString(),
        type: 'clear',
      },
      ...prev.slice(0, 19),
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePush();
    }
  };

  return (
    <section id="visualizer" className="py-16 border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>INTERACTIVE SIMULATOR</span>
            <span aria-hidden="true">·</span>
            <span>REAL-TIME ANIMATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Visual Stack Laboratory
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
            Watch elements enter and leave through the open TOP boundary. Experiment with capacity constraints, observe Stack Overflow & Underflow states, and inspect the real-time event log.
          </p>
        </div>

        {/* Two-Zone Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Zone: The Visual Stack Tube (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative flex flex-col items-center">
            {/* Top Bar inside Stage */}
            <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">LIFO Container</span>
                <span className="text-slate-500">|</span>
                <span>Size: <strong className="text-emerald-400 tabular-nums">{elements.length}</strong> / {capacity}</span>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                {isFull ? (
                  <span className="flex items-center gap-1 text-rose-400 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    FULL (OVERFLOW RISK)
                  </span>
                ) : isEmpty ? (
                  <span className="flex items-center gap-1 text-amber-400 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    EMPTY (UNDERFLOW RISK)
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-400 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    NOMINAL (ACTIVE)
                  </span>
                )}
              </div>
            </div>

            {/* Inlet Funnel & Top Boundary Marker */}
            <div className="w-full max-w-md flex flex-col items-center mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>[ OPEN TOP INLET ]</span>
                <span className="text-slate-600">-- PUSH & POP OCCUR HERE ONLY --</span>
              </div>
              <div className="w-48 h-2 border-t-2 border-dashed border-emerald-500/60" />
            </div>

            {/* The Vertical Stack Cylinder */}
            <div className="relative w-full max-w-sm min-h-[380px] sm:min-h-[420px] bg-slate-950/70 border-x-4 border-b-8 border-slate-700 rounded-b-xl flex flex-col-reverse p-3.5 gap-2 shadow-inner">
              {/* Empty state illustration */}
              {elements.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-slate-500 pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-dashed border-slate-700 flex items-center justify-center mb-2 text-slate-600">
                    <Layers className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">Stack is currently empty</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-[200px]">
                    Push an element to begin. Any pop operation now triggers Stack Underflow.
                  </p>
                </div>
              )}

              {/* Animated Stack Elements */}
              <AnimatePresence mode="popLayout">
                {elements.map((el, idx) => {
                  const isTop = idx === elements.length - 1;
                  const isPeeking = peekingIndex === idx;

                  return (
                    <motion.div
                      key={el.id}
                      layout
                      initial={{ y: -80, opacity: 0, scale: 0.9 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        scale: isPeeking ? 1.04 : 1,
                        transition: {
                          type: 'spring',
                          stiffness: 300 / animSpeed,
                          damping: 24,
                        },
                      }}
                      exit={{
                        y: -100,
                        opacity: 0,
                        scale: 0.85,
                        transition: { duration: 0.25 / animSpeed },
                      }}
                      className={`relative w-full h-12 sm:h-14 rounded-lg border-2 ${el.color} ${
                        isPeeking
                          ? 'ring-4 ring-cyan-400/80 shadow-lg shadow-cyan-500/30'
                          : isTop
                          ? 'ring-2 ring-emerald-400/50 shadow-md shadow-emerald-500/10'
                          : ''
                      } flex items-center justify-between px-4 transition-all`}
                    >
                      {/* Left: Index badge */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                          Index [{idx}]
                        </span>
                        {isTop && (
                          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            TOP
                          </span>
                        )}
                        {isPeeking && (
                          <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 px-1.5 py-0.5 rounded flex items-center gap-1 animate-bounce">
                            <Eye className="w-3 h-3" />
                            PEEKING
                          </span>
                        )}
                      </div>

                      {/* Center: Element Value */}
                      <div className="text-base sm:text-lg font-bold tracking-wider font-mono text-white truncate max-w-[140px] text-center">
                        {String(el.value)}
                      </div>

                      {/* Right: Timestamp or Tag */}
                      <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
                        {el.timestamp}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Bottom Base Plate Label */}
            <div className="w-full max-w-sm mt-1 text-center">
              <div className="h-2 w-full bg-slate-700 rounded-b-md" />
              <div className="mt-1 flex justify-between items-center text-[11px] font-mono text-slate-500 px-2">
                <span>[ CLOSED BASE / BOTTOM ]</span>
                <span>INDEX 0</span>
              </div>
            </div>

            {/* Live Message & Explanatory Callout */}
            {statusMessage && (
              <div
                className={`w-full mt-6 p-4 rounded-xl border transition-all ${
                  statusMessage.type === 'error'
                    ? 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                    : statusMessage.type === 'warning'
                    ? 'bg-amber-950/30 border-amber-800/60 text-amber-200'
                    : statusMessage.type === 'success'
                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {statusMessage.type === 'error' ? (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  ) : statusMessage.type === 'warning' ? (
                    <ArrowUpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  ) : statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{statusMessage.title}</h4>
                    <p className="text-xs mt-0.5 opacity-90 leading-relaxed">
                      {statusMessage.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Zone: Control Deck & Event Log (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Operations Panel */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center justify-between">
                <span>Operation Controls</span>
                <span className="text-xs font-mono text-emerald-400">O(1) CONSTANT TIME</span>
              </h3>

              {/* Push Input Group */}
              <div className="space-y-3">
                <label className="block text-xs font-medium text-slate-300">
                  Value to Push
                </label>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. 50, 'Apple', token"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <button
                    onClick={() => handlePush()}
                    disabled={isFull}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-950 transition-all ${
                      isFull
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-400 hover:bg-emerald-300 active:scale-95 shadow-sm shadow-emerald-500/20'
                    }`}
                  >
                    <ArrowDownCircle className="w-4 h-4" />
                    <span>Push</span>
                  </button>
                </div>

                {/* Quick Preset Buttons */}
                <div className="flex items-center gap-1.5 pt-1 text-xs text-slate-400 flex-wrap">
                  <span className="text-slate-500">Quick Push:</span>
                  <button
                    onClick={() => handlePush(Math.floor(Math.random() * 90 + 10))}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    Random #
                  </button>
                  <button
                    onClick={() => handlePush('DataNode')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    &quot;DataNode&quot;
                  </button>
                  <button
                    onClick={() => handlePush('calc()')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    calc()
                  </button>
                  <button
                    onClick={() => handlePush('{tag}')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    &#123;tag&#125;
                  </button>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={handlePop}
                  disabled={isEmpty}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isEmpty
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 active:scale-95'
                  }`}
                >
                  <ArrowUpCircle className="w-4 h-4" />
                  <span>Pop [Top]</span>
                </button>

                <button
                  onClick={handlePeek}
                  disabled={isEmpty}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isEmpty
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 active:scale-95'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Peek [Inspect]</span>
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1 px-2 rounded hover:bg-slate-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>

                {/* Direct edge case testers */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!isFull) {
                        // fill to capacity then push one more
                        const diff = capacity - elements.length;
                        const filled = [...elements];
                        for (let i = 0; i < diff; i++) {
                          const col = COLOR_PALETTE[(filled.length + i) % COLOR_PALETTE.length];
                          filled.push({
                            id: Math.random().toString(),
                            value: 99 + i,
                            color: col.bg,
                            border: col.border,
                            timestamp: getTimeString(),
                          });
                        }
                        setElements(filled);
                        setTimeout(() => handlePush(999), 100);
                      } else {
                        handlePush(999);
                      }
                    }}
                    className="text-[11px] font-mono text-rose-400 hover:text-rose-300 underline"
                  >
                    Test Overflow
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    onClick={() => {
                      setElements([]);
                      setTimeout(() => handlePop(), 100);
                    }}
                    className="text-[11px] font-mono text-amber-400 hover:text-amber-300 underline"
                  >
                    Test Underflow
                  </button>
                </div>
              </div>

              {/* Simulation Configuration Sliders */}
              <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Capacity Limit (Bounded Stack)</span>
                    <span className="font-mono text-white">{capacity} slots</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="8"
                    value={capacity}
                    onChange={(e) => {
                      const newCap = parseInt(e.target.value);
                      setCapacity(newCap);
                      if (elements.length > newCap) {
                        setElements((prev) => prev.slice(0, newCap));
                      }
                    }}
                    className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                    <span>4 (Small buffer)</span>
                    <span>6 (Default)</span>
                    <span>8 (Deep stack)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Animation Speed</span>
                    <span className="font-mono text-white">{animSpeed}x</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[0.5, 1, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setAnimSpeed(speed)}
                        className={`flex-1 py-1 rounded text-xs font-mono transition-colors ${
                          animSpeed === speed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {speed === 0.5 ? '0.5x Slow' : speed === 1 ? '1.0x Normal' : '2.0x Fast'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Event & Terminal Execution Log */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Execution Timeline</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {operationLog.length} events
                </span>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 font-mono text-xs">
                {operationLog.map((log) => (
                  <div
                    key={log.id}
                    className="p-2 rounded bg-slate-950/70 border border-slate-800/80 flex items-start justify-between gap-2"
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`px-1.5 py-0.5 text-[10px] rounded uppercase font-bold ${
                          log.type === 'push'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : log.type === 'pop'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : log.type === 'peek'
                            ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                            : log.type === 'error'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {log.op}
                      </span>
                      <span className="text-slate-300 text-[11px] break-all">
                        {log.detail}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
