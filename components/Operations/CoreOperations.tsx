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
import { useLanguage } from '@/context/LanguageContext';

export function CoreOperations() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';

  const operations = [
    {
      name: 'push(element)',
      action: isArabic ? 'إضافة عنصر إلى قمة المكدس TOP' : 'Insert item onto TOP',
      time: 'O(1) amortized',
      space: 'O(1)',
      icon: ArrowDownCircle,
      iconColor: 'text-emerald-500',
      borderColorDark: 'border-emerald-500/30',
      borderColorLight: 'border-emerald-300',
      bgGlowDark: 'bg-emerald-950/20',
      bgGlowLight: 'bg-emerald-50',
      description: isArabic
        ? 'تضع عنصراً جديداً في قمة المكدس TOP. في المصفوفات الديناميكية (Python list) تتضاعف السعة تلقائياً عند امتلاء المخزن المؤقت.'
        : 'Places a new data item at the top of the stack. In dynamic arrays, if buffer capacity is exhausted, memory is doubled before insertion.',
      pythonCode: 'stack.append(element)',
      invariants: isArabic ? 'يزداد حجم المكدس بمقدار 1. يصبح العنصر الجديد هو القمة TOP.' : 'Stack size increments by 1. The new element becomes the top.',
    },
    {
      name: 'pop()',
      action: isArabic ? 'حذف واسترجاع عنصر القمة TOP' : 'Remove & return TOP item',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: ArrowUpCircle,
      iconColor: 'text-rose-500',
      borderColorDark: 'border-rose-500/30',
      borderColorLight: 'border-rose-300',
      bgGlowDark: 'bg-rose-950/20',
      bgGlowLight: 'bg-rose-50',
      description: isArabic
        ? 'تستخرج العنصر الأحدث وتُعيده للبرنامج المستدعي. يجب فحص isEmpty() لتجنب خطأ Stack Underflow.'
        : 'Extracts the most recently pushed element and hands it back to the caller. Must check isEmpty() to prevent Stack Underflow.',
      pythonCode: 'item = stack.pop()',
      invariants: isArabic ? 'ينقص حجم المكدس بمقدار 1. العنصر السابق يصبح هو القمة الجديدة.' : 'Stack size decrements by 1. Item beneath becomes the new top.',
    },
    {
      name: 'peek() / top()',
      action: isArabic ? 'معاينة القمة TOP دون إزالتها' : 'Inspect TOP without removal',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: Eye,
      iconColor: 'text-cyan-500',
      borderColorDark: 'border-cyan-500/30',
      borderColorLight: 'border-cyan-300',
      bgGlowDark: 'bg-cyan-950/20',
      bgGlowLight: 'bg-cyan-50',
      description: isArabic
        ? 'تطلع على القيمة الموجودة في القمة بدون أي تعديل على مصفوفة الذاكرة. عملية قراءة آمنة وخالية من الآثار الجانبية.'
        : 'Observes the topmost element without modifying internal array state or popping it off. Safe read-only inspection.',
      pythonCode: 'item = stack[-1]',
      invariants: isArabic ? 'حالة المكدس وحجمه وترتيبه تظل مطابقة دون أي تغيير.' : 'Stack state, size, and order remain completely unchanged.',
    },
    {
      name: 'isEmpty()',
      action: isArabic ? 'فحص ما إذا كان المكدس يحتوي 0 عناصر' : 'Check if stack has 0 items',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: CheckCircle,
      iconColor: 'text-indigo-500',
      borderColorDark: 'border-indigo-500/30',
      borderColorLight: 'border-indigo-300',
      bgGlowDark: 'bg-indigo-950/20',
      bgGlowLight: 'bg-indigo-50',
      description: isArabic
        ? 'تُرجع True منطقياً إذا كان المكدس خالياً تماماً، مما يمنع حدوث أخطاء runtime قبل تنفيذ pop() أو peek().'
        : 'Returns boolean True if no elements reside in the stack, preventing dangerous underflow operations before executing pop() or peek().',
      pythonCode: 'return len(stack) == 0',
      invariants: isArabic ? 'دالة شرطية استعلامية نقية بدون أي تعديل على الذاكرة.' : 'Pure predicate function; zero side-effects.',
    },
    {
      name: 'size() / len()',
      action: isArabic ? 'إرجاع عدد العناصر الإجمالي' : 'Return count of elements',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: Hash,
      iconColor: 'text-violet-500',
      borderColorDark: 'border-violet-500/30',
      borderColorLight: 'border-violet-300',
      bgGlowDark: 'bg-violet-950/20',
      bgGlowLight: 'bg-violet-50',
      description: isArabic
        ? 'تُرجع الارتفاع الحالي للمكدس. يحفظ مفسر CPython عداد ob_size في ترويسة الكائن، فلا يحتاج أي تكرار أو مسح.'
        : 'Returns current height of the stack. CPython caches the size counter in the list header struct, so length calculation requires zero iteration.',
      pythonCode: 'return len(stack)',
      invariants: isArabic ? 'قيمة عددية صحيحة تقع بين 0 وأقصى سعة ممكنة.' : 'Integer value between 0 and capacity.',
    },
    {
      name: 'isFull()',
      action: isArabic ? 'التحقق من بلوغ أقصى سعة' : 'Check capacity limit',
      time: 'O(1) strict',
      space: 'O(1)',
      icon: AlertOctagon,
      iconColor: 'text-amber-500',
      borderColorDark: 'border-amber-500/30',
      borderColorLight: 'border-amber-300',
      bgGlowDark: 'bg-amber-950/20',
      bgGlowLight: 'bg-amber-50',
      description: isArabic
        ? 'في مكدسات العتاد والمخازن ذات السعة الثابتة، تُرجع True عند وصول العناصر للحد الأقصى لمنع الانهيار.'
        : 'In bounded physical hardware buffers or fixed-length stacks, returns True if size has reached max capacity, guarding against overflow.',
      pythonCode: 'return len(stack) >= capacity',
      invariants: isArabic ? 'تنبه النظام قبل أن تتسبب عملية push() في خطأ Stack Overflow.' : 'Signals when push() will trigger Stack Overflow.',
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
            <span>{t.operations.badge}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-950'
          }`}>
            {t.operations.title}
          </h2>
          <p className={`mt-1 text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.operations.subtitle}
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
                    <strong className={isDark ? 'text-slate-300' : 'text-slate-800'}>{t.operations.invariantPrefix}</strong>
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
