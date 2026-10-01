'use client';

import React from 'react';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Eye, 
  CheckCircle, 
  Hash, 
  AlertOctagon,
  Layers
} from 'lucide-react';

export function CoreOperations() {
  const operations = [
    {
      name: 'push(element)',
      action: 'Insert item onto TOP',
      time: 'O(1) amortized',
      space: 'O(1)',
      icon: ArrowDownCircle,
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgGlow: 'bg-emerald-950/20',
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
      iconColor: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      bgGlow: 'bg-rose-950/20',
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
      iconColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgGlow: 'bg-cyan-950/20',
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
      iconColor: 'text-indigo-400',
      borderColor: 'border-indigo-500/30',
      bgGlow: 'bg-indigo-950/20',
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
      iconColor: 'text-violet-400',
      borderColor: 'border-violet-500/30',
      bgGlow: 'bg-violet-950/20',
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
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      bgGlow: 'bg-amber-950/20',
      description: 'In bounded physical hardware buffers or fixed-length stacks, returns True if size has reached max capacity, guarding against overflow.',
      pythonCode: 'return len(stack) >= capacity',
      invariants: 'Signals when push() will trigger Stack Overflow.',
    },
  ];

  return (
    <section id="operations" className="py-16 border-b border-slate-800 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>ABSTRACT DATA TYPE (ADT)</span>
            <span aria-hidden="true">·</span>
            <span>CORE PRIMITIVES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Fundamental Stack Operations
          </h2>
          <p className="mt-1 text-sm text-slate-400 max-w-2xl">
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
                className={`rounded-2xl border ${op.borderColor} bg-slate-950/70 p-6 flex flex-col justify-between hover:border-slate-600 transition-colors shadow-sm`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${op.bgGlow} border border-slate-800`}>
                        <Icon className={`w-5 h-5 ${op.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold font-mono text-white">
                          {op.name}
                        </h3>
                        <span className="text-xs text-slate-400">
                          {op.action}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Asymptotic Metrics */}
                  <div className="flex items-center gap-2 text-xs font-mono mb-3">
                    <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                      Time: {op.time}
                    </span>
                    <span className="text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-900/60">
                      Space: {op.space}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {op.description}
                  </p>
                </div>

                {/* Code syntax & invariant */}
                <div className="pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 flex items-center justify-between">
                    <span>{op.pythonCode}</span>
                    <span className="text-[10px] text-slate-500">Python</span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    <strong className="text-slate-300">Invariant: </strong>
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
