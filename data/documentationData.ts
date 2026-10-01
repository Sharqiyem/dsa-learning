export interface DocSection {
  id: string;
  number: string;
  title: string;
  badge: string;
  summary: string;
  content: string;
  codeSnippet?: string;
  diagramAscii?: string;
  bulletPoints: string[];
}

export const DOCUMENTATION_DATA: DocSection[] = [
  {
    id: "step-1-lifo",
    number: "01",
    title: "Understanding the Stack Concept & LIFO Principle",
    badge: "Core Concept",
    summary: "A Stack is a linear data structure that adheres strictly to the LIFO (Last-In, First-Out) invariant.",
    content: `Think of a stack as a vertical pile of dinner plates in a cafeteria. When a clean plate is added, it is placed on the very top of the pile. When someone needs a plate, they take the top plate. The plate placed first at the very bottom remains untouched until all plates above it are removed.

In computer science, a Stack is an Abstract Data Type (ADT) defined not by how it is physically arranged in silicon, but by the mathematical behavior of its interface: insertion and deletion are only permissible at one designated end, termed the TOP.`,
    diagramAscii: `
      +------------------+
PUSH  |  Element [TOP]   |  ---> PUSH adds here
  |   +------------------+
  v   |  Element 2       |
      +------------------+
      |  Element 1       |
      +------------------+
      |  Element 0 [BASE]|  ---> First In, Last Out
      +==================+
             BOTTOM
    `,
    bulletPoints: [
      "LIFO: The most recent element added is the very first to be removed.",
      "Single-ended access: All mutations (insert, delete, query) occur strictly at the TOP.",
      "Base/Bottom: The oldest element rests at the base and cannot be directly accessed without popping all subsequent elements.",
      "Real-world examples: Plate dispensers, browser back-history, CD spindle, undo/redo buffers."
    ]
  },
  {
    id: "step-2-operations",
    number: "02",
    title: "Fundamental Operations & Time Complexity",
    badge: "Interface & Math",
    summary: "Every stack guarantees O(1) constant-time access for its core methods.",
    content: `A complete stack ADT specification includes five primary operations:

1. push(element): Places an item onto the top of the stack.
2. pop(): Removes and yields the top item. Throws underflow exception if the stack is empty.
3. peek() / top(): Observes the top item without mutating the stack.
4. isEmpty(): Returns a boolean flag indicating whether the stack contains 0 items.
5. size() / len(): Returns the integer count of items currently residing in the stack.
6. isFull(): (In bounded implementations) Returns whether capacity has been reached.`,
    codeSnippet: `| Operation | Time Complexity | Auxiliary Space | Description |
|-----------|-----------------|-----------------|-------------|
| push(x)   | O(1) amortized   | O(1)            | Add to top  |
| pop()     | O(1)            | O(1)            | Remove top  |
| peek()    | O(1)            | O(1)            | Read top    |
| isEmpty() | O(1)            | O(1)            | Check size  |
| size()    | O(1)            | O(1)            | Return count|
| Search(x) | O(n)            | O(1)            | Linear scan |`,
    bulletPoints: [
      "Constant Time O(1): We never need to shift elements in an array or traverse a chain because operations always touch index N-1.",
      "Space Complexity: O(n) total space where n is the number of stored elements.",
      "Defensive Invariants: pop() and peek() must always verify isEmpty() beforehand to avoid pointer null-dereferences or IndexErrors."
    ]
  },
  {
    id: "step-3-underlying-ds",
    number: "03",
    title: "Underlying Data Structures: Arrays vs. Linked Lists",
    badge: "System Architecture",
    summary: "How Stacks are physically stored in computer memory and why choices matter.",
    content: `When implementing a stack in programming languages like Python, C++, or Java, two primary underlying data structures are used:

### A. Dynamic Array (e.g. Python list, C++ std::vector)
- **Memory Layout**: Contiguous block of memory storing item references.
- **Top Mapping**: The end of the array (arr[length - 1]).
- **Pros**: Exceptional CPU cache locality; extremely fast memory access; minimal per-element pointer overhead.
- **Cons**: Occasional memory reallocation spikes when buffer fills up, copying elements to a larger block (amortized O(1), but worst-case push is O(n)).

### B. Singly-Linked List
- **Memory Layout**: Scattered heap nodes containing (value, next_pointer).
- **Top Mapping**: The head of the linked list.
- **Pros**: Pure, guaranteed strict O(1) push and pop without reallocation pauses; capacity expands dynamically one node at a time.
- **Cons**: Extra memory overhead per node (8-16 bytes for pointers); poor CPU cache locality due to scattered pointer indirection.

### C. Python's collections.deque (Hybrid Chunked List)
- In CPython, 'deque' uses a doubly-linked list of 64-element fixed memory blocks, combining the cache friendliness of arrays with zero reallocation overhead.`,
    bulletPoints: [
      "Python List is optimal for general purpose stacks with predictable growth.",
      "collections.deque is optimal for latency-critical applications where reallocation pauses cannot be tolerated.",
      "Never use list.pop(0) or list.insert(0, x) for a stack: this forces O(n) element shifts across memory!"
    ]
  },
  {
    id: "step-4-edge-cases",
    number: "04",
    title: "Edge Cases: Stack Overflow & Stack Underflow",
    badge: "Defensive Coding",
    summary: "Handling boundary violations safely to prevent fatal process crashes.",
    content: `Robust production software must handle extreme edge cases gracefully:

### 1. Stack Underflow
Occurs when your code attempts to extract (pop) or inspect (peek) from an empty stack.
- In Python: Accessing stack[-1] on an empty list throws 'IndexError: list index out of range'.
- Remedy: Always implement an is_empty() guard check or raise a meaningful domain exception (e.g., 'StackUnderflowError').

### 2. Stack Overflow
Occurs when elements are pushed beyond available memory or beyond a configured capacity limit.
- Hardware/OS Level: Each thread in a modern OS allocates a fixed stack size (typically 1MB to 8MB). Infinite recursion causes the call stack pointer (RSP) to smash into the guard page, generating a SIGSEGV / segmentation fault.
- Python Runtime Level: Python has a built-in recursion limit (sys.getrecursionlimit(), default 1000) to protect the C-stack from overflowing, raising 'RecursionError: maximum recursion depth exceeded'.
- Bounded Stack Level: In embedded systems or ring buffers, capacity is finite; pushing when is_full() must either block or throw an explicit StackOverflowError.`,
    bulletPoints: [
      "Always check is_empty() before pop() or peek().",
      "For bounded stacks, check is_full() before push().",
      "In recursive algorithms, always verify your base case condition executes before the recursive call."
    ]
  },
  {
    id: "step-5-applications",
    number: "05",
    title: "Essential Real-World Software Engineering Applications",
    badge: "Industry Impact",
    summary: "Why the Stack is the backbone of compilers, runtimes, and operating systems.",
    content: `Where are Stacks used in everyday technology?

1. **Compiler Syntax Parsers & Linters**:
   Compilers use stacks to parse Abstract Syntax Trees (ASTs), balance braces/parentheses, and resolve operator precedence using Edsger Dijkstra's Shunting-Yard Algorithm.

2. **Call Stack & Memory Management (CPU Call Stack)**:
   Whenever a function calls another function, the CPU pushes an activation stack frame containing local variables, parameters, and the return address. When the function returns, the frame pops off.

3. **Undo/Redo Architecture (Mementos)**:
   Text editors and design software (Photoshop, VS Code) maintain an Undo Stack and a Redo Stack to track and restore state transitions.

4. **Depth-First Search (DFS) & Backtracking**:
   Graph traversal, maze solving, puzzle solving (Sudoku, N-Queens) simulate backtracking decisions using a stack.

5. **Reverse Polish Notation (RPN) Calculators & Expression Evaluation**:
   Evaluates mathematical expressions (Postfix notation) without requiring parentheses, processing operands and operators via a single LIFO evaluation stack.`,
    bulletPoints: [
      "Any problem involving 'nested structure' or 'reversing order' naturally belongs to a Stack.",
      "Compilers convert human-friendly Infix notation 'A + B * C' to Postfix 'A B C * +' using a stack.",
      "Browser navigation relies on complementary Back and Forward stacks."
    ]
  }
];

export const DOCUMENTATION_DATA_AR: DocSection[] = [
  {
    id: "step-1-lifo",
    number: "01",
    title: "مفهوم هيكل البيانات Stack ومبدأ LIFO",
    badge: "المفهوم الأساسي",
    summary: "المكدس Stack هو هيكل بيانات خطي يخضع بدقة لقاعدة LIFO (الداخل آخراً يخرج أولاً).",
    content: `تخيل المكدس كمجموعة من أطباق الطعام المرتبة عمودياً في بوفيه. عند إضافة طبق نظيف، يُوضع في القمة (TOP). وعندما يحتاج شخص طبقاً، فإنه يأخذ الطبق الموجود في القمة أولاً. الطبق الذي وُضع أولاً في قاع الطاولة لا يمكن الوصول إليه إلا بعد رفع جميع الأطباق التي تعلوه.

في علوم الحاسوب، المكدس هو نوع بيانات مجرد (Abstract Data Type - ADT) لا يُعرف بطريقة تخزينه في الذاكرة، بل بسلوك واجهته البرمجية: الإضافة والحذف مسموحان فقط عند طرف واحد محدد يسمى القمة (TOP).`,
    diagramAscii: `
      +------------------+
PUSH  |  Element [TOP]   |  ---> PUSH adds here
  |   +------------------+
  v   |  Element 2       |
      +------------------+
      |  Element 1       |
      +------------------+
      |  Element 0 [BASE]|  ---> First In, Last Out
      +==================+
             BOTTOM
    `,
    bulletPoints: [
      "مبدأ LIFO: العنصر الأحدث دخولاً هو أول عنصر يُستخرج.",
      "الوصول أحادي الطرف: جميع العمليات (إضافة، حذف، استعلام) تتم حصراً عند القمة TOP.",
      "القاع Base/Bottom: العنصر الأقدم يستقر في القاعدة ولا يمكن الوصول له إلا بإفراغ ما فوقه.",
      "أمثلة واقعية: مكدسات الأطباق، زر الرجوع في المتصفحات، تاريخ التراجع Undo في برامج التصميم."
    ]
  },
  {
    id: "step-2-operations",
    number: "02",
    title: "العمليات الأساسية والتعقيد الزمني والمكاني",
    badge: "الواجهة والرياضيات",
    summary: "يضمن مكدس البيانات زمناً ثابتاً O(1) لكافة دواله الأساسية.",
    content: `المواصفة الكاملة لواجهة Stack ADT تشمل العمليات التالية:

1. push(element): إدراج عنصر في قمة المكدس.
2. pop(): حذف واسترجاع عنصر القمة (يرفع استثناء Underflow إذا كان المكدس فارغاً).
3. peek() / top(): معاينة عنصر القمة دون حذفه.
4. isEmpty(): التحقق مما إذا كان المكدس يحتوي على 0 عناصر.
5. size() / len(): إرجاع العدد الإجمالي للعناصر المخزنة.
6. isFull(): (في المكدسات محددة السعة) التحقق من بلوغ الحد الأقصى.`,
    codeSnippet: `| Operation | Time Complexity | Auxiliary Space | Description |
|-----------|-----------------|-----------------|-------------|
| push(x)   | O(1) amortized   | O(1)            | Add to top  |
| pop()     | O(1)            | O(1)            | Remove top  |
| peek()    | O(1)            | O(1)            | Read top    |
| isEmpty() | O(1)            | O(1)            | Check size  |
| size()    | O(1)            | O(1)            | Return count|
| Search(x) | O(n)            | O(1)            | Linear scan |`,
    bulletPoints: [
      "الزمن الثابت O(1): لا نحتاج لتحريك عناصر المصفوفة لأن التعديل يتم فقط عند المؤشر الأخير N-1.",
      "التعقيد المكاني O(n): يتناسب خطياً مع عدد العناصر المخزنة فعلياً.",
      "البرمجة الدفاعية: يجب فحص isEmpty() قبل pop() أو peek() لتفادي حدوث IndexErrors."
    ]
  },
  {
    id: "step-3-underlying-ds",
    number: "03",
    title: "بنى البيانات التحتية: المصفوفات مقابل القوائم المتصلة",
    badge: "معمارية الأنظمة",
    summary: "كيف يُخزن Stack في ذاكرة الحاسوب RAM ولماذا تختلف الاختيارات البرمجية.",
    content: `عند بناء Stack في لغات مثل بايثون أو C++، توجد خيارات أساسية:

### أ. المصفوفات الديناميكية Dynamic Array (مثل list في بايثون)
- **شكل الذاكرة**: مساحة متجاورة في RAM تخزن مراجع العناصر.
- **موضع القمة TOP**: نهاية المصفوفة (arr[length - 1]).
- **المزايا**: استغلال فائق لذاكرة التخزين المؤقت للمعالج (CPU Cache Locality)، سرعة فائقة في القراءة.
- **العيوب**: تضاعف السعة أحياناً يضطر المفسر لنسخ العناصر لمخزن أكبر (Amortized O(1)).

### ب. القائمة المتصلة المنفردة Singly-Linked List
- **شكل الذاكرة**: عقد متناثرة في كومة الذاكرة Heap تحمل (القيمة ومؤشر العقدة التالية).
- **موضع القمة TOP**: رأس القائمة Head.
- **المزايا**: زمن O(1) صارم ودائم دون أي فترات توقف لنقل الذاكرة.
- **العيوب**: استهلاك إضافي لمؤشرات الذاكرة، وأداء أبطأ مع CPU Cache.

### جـ. مكتبة collections.deque في بايثون
- تجمع بين المصفوفتين: قوائم متصلة بكتل ثابتة من 64 عنصراً، توفر أفضل سرعة دون أي انقطاع.`,
    bulletPoints: [
      "قائمة بايثون list ممتازة ومثالية لأغلب الاستخدامات العادية.",
      "مكتبة collections.deque هي الأفضل للأنظمة الحساسة لزمن الاستجابة (Low Latency).",
      "إياك واستخدام list.pop(0) أو list.insert(0, x) كـ Stack، فهذا يسبب بطء O(n) بسبب زحزحة العناصر!"
    ]
  },
  {
    id: "step-4-edge-cases",
    number: "04",
    title: "الحالات الحرجة: Stack Overflow و Stack Underflow",
    badge: "البرمجة الدفاعية",
    summary: "معالجة الأخطاء الحدودية لحماية التطبيقات من الانهيار البرمجي الفادح.",
    content: `البرمجيات الاحترافية تتعامل مع الحالات الحرجة بدقة:

### 1. خطأ Stack Underflow
يحدث عند محاولة سحب (pop) أو معاينة (peek) عنصر من مكدس فارغ.
- في بايثون: محاولة الوصول لـ stack[-1] في قائمة فارغة ترفع 'IndexError: list index out of range'.
- الحل: التحقق دائماً من is_empty() قبل السحب.

### 2. خطأ Stack Overflow
يحدث عند دفع عناصر تتجاوز الذاكرة المتاحة أو السعة المقررة.
- على مستوى العتاد والمعالج: كل خيط تشغيل thread يمتلك مساحة Stack محدودة (1MB إلى 8MB). الاستدعاء الذاتي اللانهائي يسبب تجاوز الحدود وانهيار البرنامج (Segmentation Fault).
- على مستوى مفسر بايثون: تضع بايثون حداً أقصى للاستدعاء الذاتي (sys.getrecursionlimit() = 1000) وترفع 'RecursionError'.
- على مستوى المكدسات المحدودة Bounded Stack: يجب التحقق من is_full() ورفع استثناء صريح.`,
    bulletPoints: [
      "افحص دائماً is_empty() قبل تنفيذ pop() أو peek().",
      "في المكدسات محددة الحجم، افحص is_full() قبل push().",
      "في الدوال العودية (Recursion)، تأكد من الوصول لشرط التوقف (Base Case) قبل تكرار الاستدعاء."
    ]
  },
  {
    id: "step-5-applications",
    number: "05",
    title: "تطبيقات هندسة البرمجيات الواقعية لـ Stack",
    badge: "الأهمية في الصناعة",
    summary: "لماذا يُعد Stack العمود الفقري للمترجمات وبيئات التشغيل وأنظمة التشغيل.",
    content: `أين يُستخدم Stack في البرمجيات التي نستخدمها يومياً؟

1. **المترجمات وتحليل الأكواد ولغات البرمجة (Compilers & Parsers)**:
   تستخدم المترجمات Stack لبناء شجرة القواعد اللغوية (AST) ومطابقة الأقواس وتحويل الصيغ الحسابية عبر خوارزمية Shunting-Yard.

2. **مكدس استدعاء المعالج وإدارة الذاكرة (CPU Call Stack)**:
   كلما استدعى البرنامج دالة، يقوم المعالج بدفع إطار Stack Frame يحمل المتغيرات المحلية ومعاملات الدالة وعنوان العودة في البرنامج.

3. **أنظمة التراجع والإعادة (Undo/Redo)**:
   محررات النصوص وأدوات التصميم (Photoshop, VS Code) تحتفظ بمكدسين متكاملين: Undo Stack و Redo Stack لحفظ واسترجاع الحالات السابقة.

4. **خوارزميات البحث في العمق والمسارات (DFS & Backtracking)**:
   حل المتاهات وألغاز الشطرنج والسودوكو وشبكات الرسوم البيانية يعتمد على تتبع المسارات والعودة للخلف باستخدام Stack.

5. **الآلات الحاسبة وتقييم التعابير الرياضية (RPN Calculators)**:
   تقييم الصيغ المعكوسة (Reverse Polish Notation) بدون الحاجة إلى أقواس، عبر معالجة الأرقام والعمليات الحسابية داخل المكدس.`,
    bulletPoints: [
      "أي مسألة تتضمن بنية متداخلة أو عكساً للترتيب تُحل بصورة مثالية عبر Stack.",
      "تحول المترجمات صيغ الحساب البشرية 'A + B * C' إلى صيغة البوستفيكس 'A B C * +' عبر Stack.",
      "تاريخ تصفح الإنترنت في المتصفحات يعتمد على مكدسين متكاملين للخلف والأمام."
    ]
  }
];

export const STEP_BY_STEP_DOCUMENTATION_MARKDOWN = `# Complete Guide to the Stack Data Structure (DSA)

## 1. Introduction & LIFO Principle
The Stack is one of the foundational linear data structures in computer science. It operates strictly under the **LIFO (Last In, First Out)** principle: the most recently inserted element is always the first one to be removed.

### Real-Life Analogies:
- **Stack of Dinner Plates**: Clean plates are placed on the top of the stack and taken from the top. The first plate set down at the bottom is only retrieved after all others have been removed.
- **Document Undo/Redo**: Your latest keystroke or canvas stroke is reverted first.
- **Browser Navigation History**: Clicking the 'Back' button returns you to the most recently visited page.

---

## 2. Core Abstract Data Type (ADT) Operations
Every compliant stack Abstract Data Type specifies the following primitive operations:

| Method | Description | Time Complexity | Auxiliary Space |
|---|---|---|---|
| \`push(item)\` | Inserts an element onto the top of the stack | O(1) amortized | O(1) |
| \`pop()\` | Removes and returns the top element | O(1) strict | O(1) |
| \`peek()\` | Inspects the top element without mutating the stack | O(1) strict | O(1) |
| \`is_empty()\` | Returns True if the stack contains zero elements | O(1) strict | O(1) |
| \`size()\` | Returns the total count of elements currently stored | O(1) strict | O(1) |
| \`is_full()\` | For bounded capacity stacks: checks if max limit is reached | O(1) strict | O(1) |

---

## 3. Underlying Data Structures: Arrays vs. Linked Lists
When implementing a stack in systems programming, two primary storage models are employed:

1. **Dynamic Array (e.g., Python \`list\`, C++ \`std::vector\`)**:
   - Stores elements in a contiguous block of RAM.
   - The top of the stack maps to \`array[size - 1]\`.
   - **Pros**: Exceptional CPU cache locality and zero per-node pointer overhead.
   - **Cons**: Periodic capacity doubling requires allocating a larger memory buffer and copying pointers (amortized O(1), but occasional O(n) spikes).

2. **Linked Nodes / Chunked Deque (e.g., Python \`collections.deque\`)**:
   - In CPython, \`deque\` is constructed from doubly-linked 64-element memory chunks.
   - **Pros**: Guaranteed strict O(1) push and pop without memory reallocation spikes.
   - **Cons**: Minor pointer indirection overhead per node chunk.

---

## 4. Edge Cases: Stack Overflow & Stack Underflow
1. **Stack Underflow**:
   Occurs when code attempts to execute \`pop()\` or \`peek()\` on an empty stack. In Python, attempting to index an empty list (\`stack[-1]\`) raises an \`IndexError: list index out of range\`. Robust production code must always guard with \`is_empty()\`.

2. **Stack Overflow**:
   Occurs when elements are pushed beyond available memory or beyond a configured capacity limit. In recursion, missing base cases cause stack frames to exceed \`sys.getrecursionlimit()\` (default 1000 in CPython), raising \`RecursionError\`.

---

## 5. Essential Real-World Software Engineering Applications
1. **Compiler Syntax Parsers & Linters**:
   Compilers use stacks to parse Abstract Syntax Trees (ASTs), balance brackets/parentheses, and resolve operator precedence using Dijkstra's Shunting-Yard Algorithm.

2. **Call Stack & Memory Management (CPU Call Stack)**:
   Whenever a function is called, the CPU pushes an activation stack frame containing local variables, parameters, and the return address. When the function returns, the frame pops off.

3. **Undo/Redo Architecture (Mementos)**:
   Text editors and design software (Photoshop, VS Code) maintain an Undo Stack and a Redo Stack to track and restore state transitions.

4. **Depth-First Search (DFS) & Backtracking**:
   Graph traversal, maze solving, puzzle solving (Sudoku, N-Queens) simulate backtracking decisions using a stack.

5. **Reverse Polish Notation (RPN) Calculators & Expression Evaluation**:
   Evaluates mathematical expressions (Postfix notation) without requiring parentheses, processing operands and operators via a single LIFO evaluation stack.

---

## 6. Complete Python OOP Stack Implementation
\`\`\`python
class Stack:
    """A clean, robust LIFO Stack implementation in Python."""
    
    def __init__(self):
        # Internal private list storage
        self._items = []

    def push(self, item):
        """Add an element to the top of the stack."""
        self._items.append(item)

    def pop(self):
        """Remove and return top element. Raises IndexError if empty."""
        if self.is_empty():
            raise IndexError("Stack Underflow: Cannot pop from an empty stack.")
        return self._items.pop()

    def peek(self):
        """Return top element without removing it. Raises IndexError if empty."""
        if self.is_empty():
            raise IndexError("Stack Underflow: Cannot peek at an empty stack.")
        return self._items[-1]

    def is_empty(self) -> bool:
        """Return True if stack has no elements."""
        return len(self._items) == 0

    def size(self) -> int:
        """Return number of elements in stack."""
        return len(self._items)

    def __repr__(self) -> str:
        return f"Stack({self._items}) <- TOP"
\`\`\`
`;

export const STEP_BY_STEP_DOCUMENTATION_MARKDOWN_AR = `# الدليل الشامل لهيكل بيانات مكدس البيانات Stack (DSA)

## 1. المقدمة ومفهوم مكدس البيانات ومبدأ LIFO
المكدس (Stack) هو أحد أهم وأبسط هياكل البيانات الخطية في علوم الحاسوب. يخضع المكدس لقاعدة **LIFO (Last In, First Out)**، أي أن "الداخل آخراً هو الخارج أولاً".

### تشبيهات من الحياة الواقعية:
- **مكدس أطباق الطعام**: توضع الأطباق النظيفة فوق بعضها في القمة (TOP)، وعند الحاجة يُسحب الطبق العلوي أولاً. الطبق الذي وُضع أولاً في الأسفل لا يمكن الوصول إليه إلا بعد رفع جميع الأطباق التي تعلوه.
- **التراجع في الكتابة (Undo)**: آخر حرف أو كلمة كتبتها هي أول ما يتم التراجع عنه.
- **تاريخ المتصفح (Browser History)**: زر الرجوع للخلف يأخذك لآخر صفحة زرتها أولاً.

---

## 2. العمليات الأساسية لمكدس البيانات (ADT) والتعقيد الزمني
المواصفة الكاملة لواجهة Stack تشمل العمليات التالية:

| الدالة (Method) | الوصف (Description) | التعقيد الزمني (Time Complexity) | التعقيد المكاني (Space) |
|---|---|---|---|
| \`push(item)\` | إدراج عنصر جديد في قمة المكدس TOP | O(1) amortized | O(1) |
| \`pop()\` | حذف واسترجاع عنصر القمة | O(1) strict | O(1) |
| \`peek()\` | معاينة عنصر القمة دون إزالته | O(1) strict | O(1) |
| \`is_empty()\` | فحص ما إذا كان المكدس خالياً من العناصر | O(1) strict | O(1) |
| \`size()\` | إرجاع العدد الإجمالي للعناصر | O(1) strict | O(1) |
| \`is_full()\` | في المكدسات محدودة السعة: فحص بلوغ الحد الأقصى | O(1) strict | O(1) |

---

## 3. بنى البيانات التحتية: المصفوفات مقابل القوائم المتصلة
عند بناء Stack في لغات البرمجة، توجد بنيتان أساسيتان:

1. **المصفوفة الديناميكية Dynamic Array (مثل \`list\` في بايثون)**:
   - تخزن العناصر في مساحة متجاورة في ذاكرة RAM.
   - موضع القمة TOP يطابق المؤشر الأخير \`array[size - 1]\`.
   - **المزايا**: استغلال فائق لذاكرة التخزين المؤقت للمعالج (CPU Cache Locality)، سرعة فائقة في القراءة.
   - **العيوب**: تضاعف السعة أحياناً يضطر المفسر لنسخ العناصر لمخزن أكبر (Amortized O(1)).

2. **القوائم المتصلة والمكتبات المقسمة (مثل \`collections.deque\` في بايثون)**:
   - في CPython، تُبنى \`deque\` من كتل ثابتة من 64 عنصراً مترابطة ثنائياً.
   - **المزايا**: زمن ثابت O(1) حقيقي ودائم لكافة عمليات push و pop دون أي انقطاع لنقل الذاكرة.
   - **العيوب**: استهلاك إضافي لمؤشرات الذاكرة مقارنة بالمصفوفة المتجاورة البسيطة.

---

## 4. الحالات الحرجة والممارسات الدفاعية
1. **خطأ Stack Underflow**:
   يحدث عند محاولة سحب (\`pop\`) أو معاينة (\`peek\`) عنصر من مكدس فارغ. في بايثون، محاولة الوصول إلى \`stack[-1]\` ترفع \`IndexError: list index out of range\`. الحل هو التحقق دائماً من \`is_empty()\` قبل السحب.

2. **خطأ Stack Overflow**:
   يحدث عند دفع عناصر تتجاوز الذاكرة المتاحة أو السعة المقررة. في الدوال العودية (Recursion)، الاستدعاء غير المنتهي يتجاوز حد بايثون (\`sys.getrecursionlimit()\`) ويرفع \`RecursionError: maximum recursion depth exceeded\`.

---

## 5. تطبيقات هندسة البرمجيات الواقعية لـ Stack
1. **المترجمات وتحليل الأكواد ولغات البرمجة (Compilers & Parsers)**:
   تستخدم المترجمات Stack لبناء شجرة القواعد اللغوية (AST) ومطابقة الأقواس وتحويل الصيغ الحسابية عبر خوارزمية Shunting-Yard.

2. **مكدس استدعاء المعالج وإدارة الذاكرة (CPU Call Stack)**:
   كلما استدعى البرنامج دالة، يقوم المعالج بدفع إطار Stack Frame يحمل المتغيرات المحلية ومعاملات الدالة وعنوان العودة في البرنامج.

3. **أنظمة التراجع والإعادة (Undo/Redo)**:
   محررات النصوص وأدوات التصميم (Photoshop, VS Code) تحتفظ بمكدسين متكاملين: Undo Stack و Redo Stack لحفظ واسترجاع الحالات السابقة.

4. **خوارزميات البحث في العمق والمسارات (DFS & Backtracking)**:
   حل المتاهات وألغاز الشطرنج والسودوكو وشبكات الرسوم البيانية يعتمد على تتبع المسارات والعودة للخلف باستخدام Stack.

5. **الآلات الحاسبة وتقييم التعابير الرياضية (RPN Calculators)**:
   تقييم الصيغ المعكوسة (Reverse Polish Notation) بدون الحاجة إلى أقواس، عبر معالجة الأرقام والعمليات الحسابية داخل المكدس.

---

## 6. الكود النموذجي بلغة بايثون (Object-Oriented Implementation)
\`\`\`python
class Stack:
    """بناء فئة مكدس البيانات بلغة بايثون وفق مبادئ البرمجة كائنية التوجه (OOP)."""
    
    def __init__(self):
        # مصفوفة تخزين خاصة
        self._items = []

    def push(self, item):
        """إضافة عنصر إلى قمة المكدس."""
        self._items.append(item)

    def pop(self):
        """حذف واسترجاع عنصر القمة. يرفع IndexError إذا كان المكدس فارغاً."""
        if self.is_empty():
            raise IndexError("Stack Underflow: لا يمكن السحب من مكدس فارغ.")
        return self._items.pop()

    def peek(self):
        """معاينة عنصر القمة دون حذفه."""
        if self.is_empty():
            raise IndexError("Stack Underflow: لا يمكن معاينة مكدس فارغ.")
        return self._items[-1]

    def is_empty(self) -> bool:
        """التحقق مما إذا كان المكدس فارغاً."""
        return len(self._items) == 0

    def size(self) -> int:
        """إرجاع عدد العناصر في المكدس."""
        return len(self._items)

    def __repr__(self) -> str:
        return f"Stack({self._items}) <- TOP"
\`\`\`
`;

