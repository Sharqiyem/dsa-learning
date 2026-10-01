export type Language = 'en' | 'ar';

export interface Translations {
  nav: {
    visualizer: string;
    operations: string;
    pythonCode: string;
    applications: string;
    documentation: string;
    exercises: string;
    simulatorBtn: string;
    toggleTheme: string;
    toggleLang: string;
  };
  hero: {
    categoryBadge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subtitle: string;
    openStackBtn: string;
    viewCodeBtn: string;
    practiceBtn: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  visualizer: {
    badge: string;
    title: string;
    subtitle: string;
    containerTitle: string;
    sizeLabel: string;
    statusFull: string;
    statusEmpty: string;
    statusNominal: string;
    inletLabel: string;
    inletSub: string;
    emptyText: string;
    emptySub: string;
    baseLabel: string;
    indexZero: string;
    controlsTitle: string;
    timeComplexity: string;
    inputLabel: string;
    inputPlaceholder: string;
    pushBtn: string;
    quickPush: string;
    popBtn: string;
    peekBtn: string;
    clearBtn: string;
    testOverflow: string;
    testUnderflow: string;
    capacityLabel: string;
    speedLabel: string;
    timelineTitle: string;
    eventsCount: string;
  };
  operations: {
    badge: string;
    title: string;
    subtitle: string;
    invariantPrefix: string;
  };
  applications: {
    badge: string;
    title: string;
    subtitle: string;
    tabParentheses: string;
    tabUndoRedo: string;
    tabCallStack: string;
    scannerTitle: string;
    compilerBadge: string;
    inputExprLabel: string;
    resetBtn: string;
    presetsLabel: string;
    tokenStreamLabel: string;
    stepForwardBtn: string;
    autoTraceBtn: string;
    bracketStackTitle: string;
    bracketStackDesc: string;
    stackEmptyLabel: string;
    lifoTubeLabel: string;
    editorTitle: string;
    mementoBadge: string;
    canvasBufferLabel: string;
    emptyDocPlaceholder: string;
    typePlaceholder: string;
    typeBtn: string;
    undoBtn: string;
    redoBtn: string;
    undoStackTitle: string;
    redoStackTitle: string;
    currentTopState: string;
    nextRedoTop: string;
    callStackTitle: string;
    callStackStep: string;
    activeFrameLabel: string;
    yieldValueLabel: string;
    stepBackBtn: string;
    resetSimBtn: string;
    sysRamTitle: string;
    sysRamDesc: string;
  };
  python: {
    badge: string;
    title: string;
    subtitle: string;
    copyBtn: string;
    copiedBtn: string;
    downloadBtn: string;
    clickLineTip: string;
    syntaxInspector: string;
    whatItDoes: string;
    underlyingDs: string;
    archNote: string;
    selectLinePrompt: string;
    memoryTradeoffsTitle: string;
    listTitle: string;
    listDesc: string;
    dequeTitle: string;
    dequeDesc: string;
  };
  docs: {
    badge: string;
    title: string;
    subtitle: string;
    downloadBtn: string;
    chaptersTitle: string;
    chapterPrefix: string;
    asciiDiagramTitle: string;
    complexityTitle: string;
    invariantsTitle: string;
  };
  exercises: {
    badge: string;
    title: string;
    subtitle: string;
    masteryProgress: string;
    allMastered: string;
    allCat: string;
    correctMsg: string;
    incorrectMsg: string;
    tryAgainBtn: string;
    hideSolutionBtn: string;
    showSolutionBtn: string;
    markDoneBtn: string;
    markedMasteredBtn: string;
    stepByStepTitle: string;
    keyTakeawayTitle: string;
  };
  footer: {
    desc: string;
    copyright: string;
    w3schoolsRef: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      visualizer: 'Visualizer',
      operations: 'Operations',
      pythonCode: 'Python Code',
      applications: 'Real-World Apps',
      documentation: 'Documentation',
      exercises: 'Exercises',
      simulatorBtn: 'Interactive Simulator',
      toggleTheme: 'Toggle theme',
      toggleLang: 'العربية',
    },
    hero: {
      categoryBadge: 'DATA STRUCTURES & ALGORITHMS · W3SCHOOLS CURRICULUM · PYTHON IMPLEMENTATION',
      headlinePart1: 'Master the Stack: Understanding',
      headlineHighlight: 'LIFO',
      headlinePart2: 'Through Interactive Animation',
      subtitle: "Step inside a spring-loaded data container. Experiment with animated push and pop transitions, inspect Python data structure mechanics line by line, evaluate call stacks, and test your skills with hidden-answer exercises.",
      openStackBtn: 'Open Interactive Stack',
      viewCodeBtn: 'View Python Code & Logic',
      practiceBtn: 'Practice 12+ Exercises',
      card1Title: 'Last-In, First-Out (LIFO)',
      card1Desc: 'Just like a stack of cafeteria dinner plates, you can only insert or remove items at the top. The first plate placed on the table is the last one picked up.',
      card2Title: 'Strict O(1) Constant Time',
      card2Desc: 'Because all mutations are restricted to the head boundary (index -1), push(), pop(), and peek() execute without element re-indexing.',
      card3Title: 'Hardware & Compiler Foundation',
      card3Desc: 'CPU call stacks, syntax bracket balancing, text editor undo history, and browser backward navigation are all powered by this data structure.',
    },
    visualizer: {
      badge: 'INTERACTIVE SIMULATOR · REAL-TIME ANIMATION',
      title: 'Visual Stack Laboratory',
      subtitle: 'Watch elements enter and leave through the open TOP boundary. Experiment with capacity constraints, observe Stack Overflow & Underflow states, and inspect the real-time event log.',
      containerTitle: 'LIFO Container',
      sizeLabel: 'Size',
      statusFull: 'FULL (OVERFLOW RISK)',
      statusEmpty: 'EMPTY (UNDERFLOW RISK)',
      statusNominal: 'NOMINAL (ACTIVE)',
      inletLabel: '[ OPEN TOP INLET ]',
      inletSub: '-- PUSH & POP OCCUR HERE ONLY --',
      emptyText: 'Stack is currently empty',
      emptySub: 'Push an element to begin. Any pop operation now triggers Stack Underflow.',
      baseLabel: '[ CLOSED BASE / BOTTOM ]',
      indexZero: 'INDEX 0',
      controlsTitle: 'Operation Controls',
      timeComplexity: 'O(1) CONSTANT TIME',
      inputLabel: 'Value to Push',
      inputPlaceholder: "e.g. 50, 'Apple', token",
      pushBtn: 'Push',
      quickPush: 'Quick Push:',
      popBtn: 'Pop [Top]',
      peekBtn: 'Peek [Inspect]',
      clearBtn: 'Clear All',
      testOverflow: 'Test Overflow',
      testUnderflow: 'Test Underflow',
      capacityLabel: 'Capacity Limit (Bounded Stack)',
      speedLabel: 'Animation Speed',
      timelineTitle: 'Execution Timeline',
      eventsCount: 'events',
    },
    operations: {
      badge: 'ABSTRACT DATA TYPE (ADT) · CORE PRIMITIVES',
      title: 'Fundamental Stack Operations',
      subtitle: 'The mathematical contract of the Stack data structure. Each method executes with strict asymptotic performance bounds.',
      invariantPrefix: 'Invariant: ',
    },
    applications: {
      badge: 'REAL-WORLD SYSTEMS · WHY STACKS MATTER',
      title: 'Applied Stack Simulations',
      subtitle: 'Explore how modern software engineering relies on stacks for parsing compilers, managing document undo history, and allocating function activation frames.',
      tabParentheses: '1. Balanced Brackets',
      tabUndoRedo: '2. Undo / Redo Stacks',
      tabCallStack: '3. CPU Call Stack',
      scannerTitle: 'Syntax Scanner Visualizer',
      compilerBadge: 'Compiler Lexer / AST',
      inputExprLabel: 'Input Expression:',
      resetBtn: 'Reset',
      presetsLabel: 'Presets:',
      tokenStreamLabel: 'Token Scan Stream:',
      stepForwardBtn: 'Step Forward',
      autoTraceBtn: 'Auto-Trace',
      bracketStackTitle: 'Bracket Stack State',
      bracketStackDesc: "Pushes '(', '{', '[' · Pops on matching ')', '}', ']'",
      stackEmptyLabel: '[ Stack Empty ]',
      lifoTubeLabel: 'LIFO Stack Tube',
      editorTitle: 'Document Editor State',
      mementoBadge: 'Dual-Stack Memento',
      canvasBufferLabel: 'Canvas / Buffer:',
      emptyDocPlaceholder: 'Empty document...',
      typePlaceholder: 'Type word to append...',
      typeBtn: 'Type',
      undoBtn: 'Undo (Pop Undo Stack)',
      redoBtn: 'Redo (Pop Redo Stack)',
      undoStackTitle: 'Undo Stack',
      redoStackTitle: 'Redo Stack',
      currentTopState: 'TOP = Current State',
      nextRedoTop: 'TOP = Next Redo',
      callStackTitle: 'Call Stack Execution: factorial(4)',
      callStackStep: 'Step',
      activeFrameLabel: 'Active Frame:',
      yieldValueLabel: 'Yield Value:',
      stepBackBtn: 'Step Back',
      resetSimBtn: 'Reset',
      sysRamTitle: 'System Call Stack (RAM)',
      sysRamDesc: 'Stack grows upward in memory. Top frame holds CPU execution pointer (PC).',
    },
    python: {
      badge: 'PYTHON ARCHITECTURE & LOGIC · LINE-BY-LINE EXPLAINER',
      title: 'Underlying Data Structure & Python Code',
      subtitle: 'Click any line of code to reveal how Python manages memory buffers, pointer pointers, exception contracts, and dynamic array resizing under the hood.',
      copyBtn: 'Copy Implementation',
      copiedBtn: 'Code Copied!',
      downloadBtn: 'Download stack_mastery.py',
      clickLineTip: 'Click any line to inspect',
      syntaxInspector: 'Syntax Inspector',
      whatItDoes: 'What This Line Does',
      underlyingDs: 'Underlying Data Structure Mechanics',
      archNote: 'Architectural Note: ',
      selectLinePrompt: 'Select any line on the left',
      memoryTradeoffsTitle: 'Memory Allocation Tradeoffs',
      listTitle: 'Python List',
      listDesc: 'Contiguous buffer in RAM. Fast index lookups. Occasional resizing reallocates buffer.',
      dequeTitle: 'collections.deque',
      dequeDesc: 'Blocks of 64 pointers doubly-linked. Zero reallocation spikes. Strict O(1) always.',
    },
    docs: {
      badge: 'STEP-BY-STEP CURRICULUM · COMPLETE DOCUMENTATION',
      title: 'Theoretical Foundation & System Docs',
      subtitle: 'A comprehensive textbook-grade pedagogical manual detailing memory invariants, asymptotic bounds, architectural considerations, and defensive programming guidelines.',
      downloadBtn: 'Download Guide (.md)',
      chaptersTitle: 'Chapters & Modules',
      chapterPrefix: 'Chapter',
      asciiDiagramTitle: 'Conceptual Memory Structure:',
      complexityTitle: 'Complexity Specification:',
      invariantsTitle: 'Critical Architectural Invariants',
    },
    exercises: {
      badge: 'TEST YOUR UNDERSTANDING · 12 COMPREHENSIVE DRILLS',
      title: 'Interactive Stack Exercises & Quizzes',
      subtitle: 'Solutions and step-by-step logic traces are hidden by default so you can practice solving them independently before inspecting answers.',
      masteryProgress: 'Mastery Progress',
      allMastered: 'All 12 exercises mastered! Outstanding work.',
      allCat: 'All',
      correctMsg: 'Correct! Excellent comprehension.',
      incorrectMsg: 'Not quite right. Click "Show Solution" below to inspect the step-by-step logic.',
      tryAgainBtn: 'Try Again',
      hideSolutionBtn: 'Hide Solution',
      showSolutionBtn: 'Show Solution & Reasoning (Answer Hidden)',
      markDoneBtn: 'Mark as Done',
      markedMasteredBtn: 'Marked as Mastered ✓',
      stepByStepTitle: 'Detailed Step-by-Step Solution',
      keyTakeawayTitle: 'Key Takeaway: ',
    },
    footer: {
      desc: 'Interactive Data Structures & Algorithms educational lab designed for computer science students mastering LIFO mechanics, Python internals, and stack algorithms.',
      copyright: 'StackLab Educational Sandbox. Built for computer science students.',
      w3schoolsRef: 'W3Schools Reference',
    },
  },
  ar: {
    nav: {
      visualizer: 'المحاكي التفاعلي',
      operations: 'العمليات الأساسية',
      pythonCode: 'كود بايثون والشرح',
      applications: 'تطبيقات عملية',
      documentation: 'التوثيق الشامل',
      exercises: 'تمارين واختبارات',
      simulatorBtn: 'تشغيل المحاكي',
      toggleTheme: 'تبديل المظهر',
      toggleLang: 'English',
    },
    hero: {
      categoryBadge: 'هياكل البيانات والخوارزميات (DSA) · منهج W3SCHOOLS · لغة PYTHON',
      headlinePart1: 'احترف مكدس البيانات Stack: فهم مبدأ',
      headlineHighlight: 'LIFO',
      headlinePart2: 'من خلال المحاكاة والتفاعل المرئي',
      subtitle: 'ادخل إلى معمل محاكاة مكدس البيانات التفاعلي. اختبر حركات push و pop المتحركة بوضوح، واكتشف آلية عمل الذاكرة في بايثون سطرًا بسطر، وحاكي مكدس استدعاء الدوال Call Stack، واختبر فهمك مع تمارين باقتراحات مخفية.',
      openStackBtn: 'فتح محاكي Stack',
      viewCodeBtn: 'شرح كود بايثون سطرًا بسطر',
      practiceBtn: 'التدرب على 12+ تمرينًا',
      card1Title: 'مبدأ LIFO (الداخل آخراً يخرج أولاً)',
      card1Desc: 'تماماً مثل مكدس أطباق المطعم، يتم وضع وسحب العناصر من القمة فقط (TOP). الطبق الذي يوضع أولاً في الأسفل هو آخر طبق يُسحب.',
      card2Title: 'تعقيد زمني ثابت O(1) Strict',
      card2Desc: 'لأن جميع العمليات مقيدة بطرف القمة (TOP) فقط، فإن push() و pop() و peek() تعمل بدون إعادة ترتيب باقي عناصر الذاكرة.',
      card3Title: 'ركيزة أنظمة التشغيل والمترجمات',
      card3Desc: 'مكدس استدعاء المعالج CPU Call Stack، والتحقق من صحة الأقواس، وعمليات التراجع Undo/Redo، وتاريخ تصفح الويب تعمل كلها بواسطة Stack.',
    },
    visualizer: {
      badge: 'محاكي تفاعلي مباشر · حركات انسيابية ملونة',
      title: 'معمل المحاكاة المرئي لـ Stack',
      subtitle: 'شاهد العناصر تدخل وتخرج عبر فوهة القمة TOP فقط. جرب حدود السعة، واختبر حالتي Stack Overflow و Underflow، وراقب سجل الأحداث المباشر.',
      containerTitle: 'أنبوب الذاكرة (LIFO Container)',
      sizeLabel: 'الحجم الحالي',
      statusFull: 'ممتلئ (خطر OVERFLOW)',
      statusEmpty: 'فارغ (خطر UNDERFLOW)',
      statusNominal: 'طبيعي (جاهز للعمليات)',
      inletLabel: '[ فتحة الدخول العلوية TOP ]',
      inletSub: '-- عمليات PUSH و POP تتم من هنا حصراً --',
      emptyText: 'المكدس Stack فارغ حالياً',
      emptySub: 'قم بإضافة عنصر للبدء. أي عملية pop الآن ستؤدي إلى خطأ Stack Underflow.',
      baseLabel: '[ قاعدة المكدس المغلقة BOTTOM ]',
      indexZero: 'المؤشر INDEX 0',
      controlsTitle: 'لوحة التحكم في العمليات',
      timeComplexity: 'O(1) CONSTANT TIME',
      inputLabel: 'القيمة المراد إضافتها (Push)',
      inputPlaceholder: "مثال: 50, 'Apple', token",
      pushBtn: 'دفع (Push)',
      quickPush: 'إضافة سريعة:',
      popBtn: 'سحب [Pop Top]',
      peekBtn: 'معاينة [Peek]',
      clearBtn: 'تفريغ الكل (Clear)',
      testOverflow: 'اختبار Overflow',
      testUnderflow: 'اختبار Underflow',
      capacityLabel: 'سعة المكدس القصوى (Bounded Stack)',
      speedLabel: 'سرعة التحريك',
      timelineTitle: 'سجل العمليات الزمني',
      eventsCount: 'عمليات',
    },
    operations: {
      badge: 'نوع البيانات المجرد (ADT) · العمليات الأساسية',
      title: 'العمليات الأساسية لمكدس البيانات Stack',
      subtitle: 'الميثاق الحسابي المنطقي لهيكل Stack. كل دالة تنفذ بحدود تعقيد زمني ومكاني ثابتة ومضمونة.',
      invariantPrefix: 'القاعدة الثابتة (Invariant): ',
    },
    applications: {
      badge: 'تطبيقات برمجية واقعية · لماذا نحتاج STACK؟',
      title: 'محاكاة التطبيقات الواقعية لـ Stack',
      subtitle: 'اكتشف كيف تعتمد هندسة البرمجيات الحديثة على Stack في المترجمات، وإدارة التراجع في المحررات، وتتبع دوال المعالج.',
      tabParentheses: '1. فحص تطابق الأقواس',
      tabUndoRedo: '2. نظام التراجع Undo / Redo',
      tabCallStack: '3. مكدس استدعاء المعالج',
      scannerTitle: 'الماسح اللغوي لتطابق الأقواس (Parentheses Scanner)',
      compilerBadge: 'مترجم الأكواد / Lexer AST',
      inputExprLabel: 'التعبير المراد فحصه:',
      resetBtn: 'إعادة ضبط',
      presetsLabel: 'أمثلة جاهزة:',
      tokenStreamLabel: 'شريط قراءة الرموز (Token Stream):',
      stepForwardBtn: 'خطوة للأمام',
      autoTraceBtn: 'محاكاة تلقائية',
      bracketStackTitle: 'حالة مكدس الأقواس (Bracket Stack)',
      bracketStackDesc: "يدفع '(' '{' '[' · ويسحب عند تطابق ')' '}' ']'",
      stackEmptyLabel: '[ المكدس فارغ ]',
      lifoTubeLabel: 'أنبوب مكدس LIFO',
      editorTitle: 'حالة مستند المحرر النصي',
      mementoBadge: 'نمط التذكار المزدوج Dual-Stack',
      canvasBufferLabel: 'مساحة العمل / النص:',
      emptyDocPlaceholder: 'المستند فارغ حالياً...',
      typePlaceholder: 'اكتب كلمة لإضافتها...',
      typeBtn: 'كتابة (Type)',
      undoBtn: 'تراجع (Undo - سحب من Undo Stack)',
      redoBtn: 'إعادة (Redo - سحب من Redo Stack)',
      undoStackTitle: 'مكدس التراجع (Undo Stack)',
      redoStackTitle: 'مكدس الإعادة (Redo Stack)',
      currentTopState: 'TOP = الحالة الحالية للمستند',
      nextRedoTop: 'TOP = الخطوة القادمة للإعادة',
      callStackTitle: 'تنفيذ دالة الاستدعاء الذاتي: factorial(4)',
      callStackStep: 'الخطوة',
      activeFrameLabel: 'الإطار النشط في المعالج:',
      yieldValueLabel: 'القيمة العائدة (Yield Value):',
      stepBackBtn: 'خطوة للخلف',
      resetSimBtn: 'إعادة البدء',
      sysRamTitle: 'مكدس استدعاء النظام في الذاكرة (Call Stack)',
      sysRamDesc: 'ينمو المكدس لأعلى في ذاكرة RAM. الإطار العلوي يحمل مؤشر تنفيذ المعالج (PC/RSP).',
    },
    python: {
      badge: 'معمارية بايثون والذاكرة · شرح سطر بسطر',
      title: 'بنية البيانات الداخلية وكود بايثون مع الشرح',
      subtitle: 'انقر فوق أي سطر برمجي لعرض كيفية إدارة بايثون للذاكرة والمصفوفات ومضاعفة المساحة والتعامل مع الاستثناءات.',
      copyBtn: 'نسخ الكود البرمجي',
      copiedBtn: 'تم نسخ الكود!',
      downloadBtn: 'تحميل ملف stack_mastery.py',
      clickLineTip: 'اضغط على أي سطر لقراءة تحليله',
      syntaxInspector: 'مفتش الأكواد والمعمارية',
      whatItDoes: 'ماذا يفعل هذا السطر في بايثون؟',
      underlyingDs: 'المنطق الداخلي لهيكل البيانات والذاكرة',
      archNote: 'ملاحظة معمارية: ',
      selectLinePrompt: 'اختر سطراً من الكود على اليسار لمعاينته',
      memoryTradeoffsTitle: 'المقارنة المعمارية بين بنيات التخزين',
      listTitle: 'قائمة بايثون (Python List)',
      listDesc: 'مخزن متجاور في ذاكرة RAM. وصول سريع بالمؤشر. تضاعف السعة أحياناً يسبب إعادة تخصيص الذاكرة.',
      dequeTitle: 'مكتبة collections.deque',
      dequeDesc: 'كتل ذات 64 مؤشراً مترابطة ثنائياً. زمن ثابت O(1) دائماً بدون انقطاعات إعادة التخصيص.',
    },
    docs: {
      badge: 'المنهج التعليمي خطوة بخطوة · توثيق مرجعي شامل',
      title: 'الأساس النظري والتوثيق المرجعي الشامل',
      subtitle: 'دليل أكاديمي متكامل يشرح قواعد LIFO، والتعقيد الحسابي، ومقارنة المصفوفات بالقوائم المتصلة، والممارسات الدفاعية لتجنب الأخطاء.',
      downloadBtn: 'تحميل دليل الشرح (.md)',
      chaptersTitle: 'الفصول والوحدات التعليمية',
      chapterPrefix: 'الفصل',
      asciiDiagramTitle: 'الرسم التخطيطي لهيكل الذاكرة:',
      complexityTitle: 'جدول التعقيد الحسابي والمكاني:',
      invariantsTitle: 'القواعد المعمارية الثابتة والمهمة',
    },
    exercises: {
      badge: 'اختبر فهمك واستيعابك · 12 تمريناً تدريبياً شاملاً',
      title: 'تمارين وتحديات تفاعلية لاختبار الفهم',
      subtitle: 'الإجابات وخطوات التتبع والتعليل مخفية افتراضياً لتتمكن من حل المسألة بمفردك أولاً قبل الاطلاع على الحل النموذجي.',
      masteryProgress: 'معدل الإتقان والتقدم',
      allMastered: 'رائع! لقد أتقنت جميع التمارين الـ 12 بنجاح!',
      allCat: 'الكل',
      correctMsg: 'إجابة صحيحة ومتقنة! أحسنت.',
      incorrectMsg: 'ليست الإجابة الصحيحة تماماً. اضغط على "عرض الحل والتعليل" بالأسفل لمعرفة خطوات التتبع المنطقية.',
      tryAgainBtn: 'حاول مجدداً',
      hideSolutionBtn: 'إخفاء الحل',
      showSolutionBtn: 'عرض الحل والتعليل المنطقي (الإجابة مخفية)',
      markDoneBtn: 'تحديد كمنجز',
      markedMasteredBtn: 'تم الإتقان بنجاح ✓',
      stepByStepTitle: 'خطوات الحل والتتبع المنطقي بالتفصيل',
      keyTakeawayTitle: 'الفائدة البرمجية الأساسية: ',
    },
    footer: {
      desc: 'معمل تفاعلي لتعليم هياكل البيانات والخوارزميات مصمم لطلاب علوم الحاسوب لإتقان مبادئ LIFO، ومنطق بايثون، وخوارزميات Stack.',
      copyright: 'معمل StackLab التعليمي التفاعلي. مخصص لطلاب ومطوري علوم الحاسوب.',
      w3schoolsRef: 'مرجع W3Schools الأصلي',
    },
  },
};
