'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { EXERCISES_DATA, Exercise } from '@/data/exercisesData';
import { 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Trophy, 
  Check, 
  X, 
  Filter, 
  Sparkles,
  BookOpen
} from 'lucide-react';

export function ExercisesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, number>>({});
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Fundamentals', 'Operation Tracing', 'Code Output', 'Real-World Apps', 'Algorithms'];

  const filteredExercises = selectedCategory === 'All'
    ? EXERCISES_DATA
    : EXERCISES_DATA.filter((ex) => ex.category === selectedCategory);

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectOption = (exerciseId: string, optionIdx: number, correctIdx?: number) => {
    setUserSelectedOptions((prev) => ({
      ...prev,
      [exerciseId]: optionIdx,
    }));

    if (correctIdx !== undefined && optionIdx === correctIdx) {
      if (!completedExercises[exerciseId]) {
        const nextCompleted = { ...completedExercises, [exerciseId]: true };
        setCompletedExercises(nextCompleted);

        // Check if all completed for confetti
        const completedCount = Object.keys(nextCompleted).filter((k) => nextCompleted[k]).length;
        if (completedCount === EXERCISES_DATA.length) {
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch (e) {
            // ignore
          }
        }
      }
    }
  };

  const toggleCompleted = (id: string) => {
    setCompletedExercises((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      const completedCount = Object.keys(next).filter((k) => next[k]).length;
      if (completedCount === EXERCISES_DATA.length && next[id]) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {}
      }
      return next;
    });
  };

  const totalExercises = EXERCISES_DATA.length;
  const completedCount = Object.keys(completedExercises).filter((k) => completedExercises[k]).length;
  const progressPercent = Math.round((completedCount / totalExercises) * 100);

  return (
    <section id="exercises" className="py-16 border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>TEST YOUR UNDERSTANDING</span>
              <span aria-hidden="true">·</span>
              <span>12 COMPREHENSIVE DRILLS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive Stack Exercises & Quizzes
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Solutions and step-by-step logic traces are <strong className="text-white">hidden by default</strong> so you can practice solving them independently before inspecting answers.
            </p>
          </div>

          {/* Student Mastery Progress Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 min-w-[260px] shrink-0">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Mastery Progress</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {completedCount} / {totalExercises} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {progressPercent === 100 && (
              <div className="text-[11px] text-amber-300 font-medium mt-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>All 12 exercises mastered! Outstanding work.</span>
              </div>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          {filteredExercises.map((exercise, index) => {
            const isRevealed = !!revealedSolutions[exercise.id];
            const isDone = !!completedExercises[exercise.id];
            const selectedOpt = userSelectedOptions[exercise.id];
            const hasOptions = exercise.options && exercise.options.length > 0;
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = isAnswered && selectedOpt === exercise.correctOptionIndex;

            return (
              <div
                key={exercise.id}
                className={`bg-slate-900/80 border rounded-2xl p-6 transition-all ${
                  isDone
                    ? 'border-emerald-500/50 bg-slate-900/90'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Exercise Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleCompleted(exercise.id)}
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isDone
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : 'border-slate-700 hover:border-slate-500 text-transparent'
                      }`}
                      title={isDone ? 'Mark as unsolved' : 'Mark as solved'}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <h3 className="text-base font-semibold text-white">
                      {exercise.title}
                    </h3>
                  </div>

                  {/* Metadata labels */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400">{exercise.category}</span>
                    <span className="text-slate-600">·</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        exercise.difficulty === 'Easy'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : exercise.difficulty === 'Medium'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line mb-4">
                  {exercise.question}
                </div>

                {/* Optional Multiple-Choice Options */}
                {hasOptions && (
                  <div className="space-y-2 mb-4">
                    {exercise.options!.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isThisOptionCorrect = optIdx === exercise.correctOptionIndex;

                      let buttonStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (isAnswered) {
                        if (isOptionSelected) {
                          buttonStyle = isThisOptionCorrect
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium'
                            : 'bg-rose-950/60 border-rose-500 text-rose-200 font-medium';
                        } else if (isRevealed && isThisOptionCorrect) {
                          buttonStyle = 'bg-emerald-950/40 border-emerald-600 text-emerald-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(exercise.id, optIdx, exercise.correctOptionIndex)}
                          className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between gap-3 transition-all ${buttonStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[11px] text-slate-400 shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isAnswered && isOptionSelected && (
                            <span className="shrink-0">
                              {isThisOptionCorrect ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <X className="w-4 h-4 text-rose-400" />
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Instant Feedback Notice if answered */}
                {isAnswered && (
                  <div
                    className={`p-3 rounded-lg text-xs mb-4 flex items-center justify-between ${
                      isCorrect
                        ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-200'
                        : 'bg-rose-950/40 border border-rose-800 text-rose-200'
                    }`}
                  >
                    <span>
                      {isCorrect
                        ? 'Correct! Excellent comprehension.'
                        : 'Not quite right. Click "Show Solution" below to inspect the step-by-step logic.'}
                    </span>
                    {!isCorrect && (
                      <button
                        onClick={() => {
                          setUserSelectedOptions((prev) => {
                            const copy = { ...prev };
                            delete copy[exercise.id];
                            return copy;
                          });
                        }}
                        className="text-[11px] underline ml-2 hover:text-white"
                      >
                        Try Again
                      </button>
                    )}
                  </div>
                )}

                {/* Action: Toggle Hidden Solution */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => toggleSolution(exercise.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-1.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-900/60 active:scale-95"
                  >
                    {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    <span>{isRevealed ? 'Hide Solution' : 'Show Solution & Reasoning (Answer Hidden)'}</span>
                  </button>

                  <button
                    onClick={() => toggleCompleted(exercise.id)}
                    className={`text-xs font-medium transition-colors ${
                      isDone ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isDone ? 'Marked as Mastered ✓' : 'Mark as Done'}
                  </button>
                </div>

                {/* Hidden Solution Revealed Accordion */}
                {isRevealed && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80 bg-slate-950/60 p-4 rounded-xl border border-slate-800 animate-fadeIn">
                    <div className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Detailed Step-by-Step Solution</span>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line mb-3 font-mono">
                      {exercise.solutionExplanation}
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <strong className="text-cyan-400">Key Takeaway: </strong>
                      {exercise.keyTakeaway}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
