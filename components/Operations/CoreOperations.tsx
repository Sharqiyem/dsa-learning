'use client';

import React from 'react';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Eye, 
  CheckCircle, 
  Hash, 
  AlertOctagon,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function CoreOperations() {
  const { isDark } = useTheme();

  const operations = [
    {
      name: 'push(element)',
      action: 'Insert item onto TOP',
      time: 'O(1) amortized',
      space: 'O(1)',
      icon: ArrowDownCircle,
      iconColor: 'text-emerald-500',
      borderColorDark: 'border-emerald-500/30',
      borderColorLight: 'border-emerald-300',
      bgGlowDark: 'bg-emerald-950/20',
      bgGlowLight: 'bg-emerald-50',
      description: 'Places a new data item at the top of the stack. In dynamic arrays, if buffer capacity is exhausted, memory is doubled before insertion.',
      pythonCode: 'stack.append(element)',
      invariants: 'Stack size increments by 1. The new element becomes the top.',
    },
    {
      name: 'pop()',
      action: 'Remove & return TOP item',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: ArrowUpCircle,
      iconColor: 'text-rose-500',
      borderColorDark: 'border-rose-500/30',
      borderColorLight: 'border-rose-300',
      bgGlowDark: 'bg-rose-950/20',
      bgGlowLight: 'bg-rose-50',
      description: 'Extracts the most recently pushed element and hands it back to the caller. Must check isEmpty() to prevent Stack Underflow.',
      pythonCode: 'item = stack.pop()',
      invariants: 'Stack size decrements by 1. Item beneath becomes the new top.',
    },
    {
      name: 'peek() / top()',
      action: 'Inspect TOP without removal',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: Eye,
      iconColor: 'text-cyan-500',
      borderColorDark: 'border-cyan-500/30',
      borderColorLight: 'border-cyan-300',
      bgGlowDark: 'bg-cyan-950/20',
      bgGlowLight: 'bg-cyan-50',
      description: 'Observes the topmost element without modifying internal array state or popping it off. Safe read-only inspection.',
      pythonCode: 'item = stack[-1]',
      invariants: 'Stack state, size, and order remain completely unchanged.',
    },
    {
      name: 'isEmpty()',
      action: 'Check if stack has 0 items',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: CheckCircle,
      iconColor: 'text-indigo-500',
      borderColorDark: 'border-indigo-500/30',
      borderColorLight: 'border-indigo-300',
      bgGlowDark: 'bg-indigo-950/20',
      bgGlowLight: 'bg-indigo-50',
      description: 'Returns boolean True if no elements reside in the stack, preventing dangerous underflow operations before executing pop() or peek().',
      pythonCode: 'return len(stack) == 0',
      invariants: 'Pure predicate function; zero side-effects.',
    },
    {
      name: 'size() / len()',
      action: 'Return count of elements',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: Hash,
      iconColor: 'text-violet-500',
      borderColorDark: 'border-violet-500/30',
      borderColorLight: 'border-violet-300',
      bgGlowDark: 'bg-violet-950/20',
      bgGlowLight: 'bg-violet-50',
      description: 'Returns current height of the stack. CPython caches the size counter in the list header struct, so length calculation requires zero iteration.',
      pythonCode: 'return len(stack)',
      invariants: 'Integer value between 0 and capacity.',
    },
    {
      name: 'isFull()',
      action: 'Check capacity limit',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: AlertOctagon,
      iconColor: 'text-amber-500',
      borderColorDark: 'border-amber-500/30',
      borderColorLight: 'border-amber-300',
      bgGlowDark: 'bg-amber-950/20',
      bgGlowLight: 'bg-amber-50',
      description: 'In bounded physical hardware buffers or fixed-length stacks, returns True if size has reached max capacity, guarding against overflow.',
      pythonCode: 'return len(stack) >= capacity',
      invariants: 'Signals when push() will trigger Stack Overflow.',
    },
  ];

  return (
    <section id="operations" className={`py-16 border-b transition-colors ${
      isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${
            isDark ? 'text-emerald-400' : 'text-emerald-600 font-semibold'
          }`}>
            <span>ABSTRACT DATA TYPE (ADT)</span>
            <span aria-hidden="true">·</span>
            <span>CORE PRIMITIVES</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            Fundamental Stack Operations
          </h2>
          <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            The mathematical contract of the Stack data structure. Each method executes with strict asymptotic performance bounds.
          </p>
        </div>

        {/* 6 Operation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operations.map((op) => {
            const Icon = op.icon;
            return (
              <div
                key={op.name}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-colors shadow-sm ${
                  isDark
                    ? `bg-slate-950/70 ${op.borderColorDark} hover:border-slate-600`
                    : `bg-slate-50/70 ${op.borderColorLight} hover:border-slate-400`
                }`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg border ${
                        isDark 
                          ? `${op.bgGlowDark} border-slate-800` 
                          : `${op.bgGlowLight} border-slate-200`
                      }`}>
                        <Icon className={`w-5 h-5 ${op.iconColor}`} />
                      </div>
                      <div>
                        <h3 className={`text-base font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {op.name}
                        </h3>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {op.action}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Asymptotic Metrics */}
                  <div className="flex items-center gap-2 text-xs font-mono mb-3">
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark
                        ? 'text-emerald-400 bg-emerald-950/60 border-emerald-900/60'
                        : 'text-emerald-800 bg-emerald-100 border-emerald-300 font-semibold'
                    }`}>
                      Time: {op.time}
                    </span>
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark
                        ? 'text-cyan-400 bg-cyan-950/60 border-cyan-900/60'
                        : 'text-cyan-800 bg-cyan-100 border-cyan-300 font-semibold'
                    }`}>
                      Space: {op.space}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {op.description}
                  </p>
                </div>

                {/* Code syntax & invariant */}
                <div className={`pt-4 border-t space-y-2 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
                  <div className={`p-2 rounded border font-mono text-xs flex items-center justify-between ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-emerald-300'
                      : 'bg-white border-slate-200 text-emerald-800 font-medium'
                  }`}>
                    <span>{op.pythonCode}</span>
                    <span className="text-[10px] text-slate-400">Python</span>
                  </div>
                  <div className={`text-[11px] leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <strong className={isDark ? 'text-slate-300' : 'text-slate-800'}>Invariant: </strong>
                    {op.invariants}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
