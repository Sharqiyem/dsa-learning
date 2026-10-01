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

2. **Call Stack & Memory Management**:
   Whenever a function calls another function, the CPU pushes a stack frame containing local variables, parameters, and return program counter (PC) address. When the function returns, the frame pops off.

3. **Undo/Redo Architecture (Mementos)**:
   Desktop tools like Photoshop, Word, and VS Code maintain an Undo Stack and a Redo Stack storing command deltas.

4. **Depth-First Search (DFS) & Backtracking**:
   Graph traversal, maze solving, puzzle solving (Sudoku, N-Queens) simulate back-tracking decisions using a stack.

5. **Reverse Polish Notation (RPN) Calculators**:
   Hewlett-Packard financial calculators and Forth/PostScript languages evaluate mathematical operations using an evaluation stack without requiring parentheses.`,
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

1. **المترجمات وتحليل الأكواد ولغات البرمجة**:
   تستخدم المترجمات Stack لبناء شجرة القواعد اللغوية (AST) ومطابقة الأقواس وتحويل الصيغ الحسابية عبر خوارزمية Shunting-Yard.

2. **مكدس استدعاء المعالج وإدارة الذاكرة (Call Stack)**:
   كلما استدعى البرنامج دالة، يقوم المعالج بدفع إطار Stack Frame يحمل المتغيرات المحلية وعنوان العودة في البرنامج.

3. **أنظمة التراجع والإعادة (Undo/Redo)**:
   محررات النصوص وأدوات التصميم (Photoshop, VS Code) تحتفظ بمكدسين Undo Stack و Redo Stack.

4. **خوارزميات البحث في العمق والمسارات (DFS & Backtracking)**:
   حل المتاهات وألغاز الشطرنج والسودوكو يعتمد على العودة للخلف باستخدام Stack.

5. **الآلات الحاسبة وتقييم التعابير الرياضية**:
   تقييم الصيغ المعكوسة (Reverse Polish Notation) بدون الحاجة إلى أقواس.`,
    bulletPoints: [
      "أي مسألة تتضمن بنية متداخلة أو عكساً للترتيب تُحل بصورة مثالية عبر Stack.",
      "تحول المترجمات صيغ الحساب البشرية 'A + B * C' إلى صيغة البوستفيكس 'A B C * +' عبر Stack.",
      "تاريخ تصفح الإنترنت في المتصفحات يعتمد على مكدسين متكاملين للخلف والأمام."
    ]
  }
];

export const STEP_BY_STEP_DOCUMENTATION_MARKDOWN = `# Complete Guide to the Stack Data Structure (DSA)

## 1. Introduction
The Stack is one of the most fundamental data structures in computer science. It follows the **LIFO (Last In, First Out)** principle: the last element added to the stack is the first element to be removed.

### Real-Life Analogies
- **Stack of Plates**: You place plates on top and take plates from the top.
- **Undo/Redo**: Your latest keystroke is undone first.
- **Browser History**: Clicking 'Back' takes you to the most recent page you visited.

---

## 2. Core Abstract Data Type (ADT) Operations
| Method | Description | Time Complexity |
|---|---|---|
| \`push(item)\` | Inserts an item onto the top of the stack | O(1) |
| \`pop()\` | Removes and returns the top item | O(1) |
| \`peek()\` | Returns the top item without removing it | O(1) |
| \`is_empty()\` | Returns True if stack has no elements | O(1) |
| \`size()\` | Returns total number of elements | O(1) |
| \`is_full()\` | For bounded stacks, checks if capacity is reached | O(1) |

---

## 3. Python Implementation (Object-Oriented)
\`\`\`python
class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack Underflow: Cannot pop from an empty stack.")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack Underflow: Cannot peek at an empty stack.")
        return self._items[-1]

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def size(self) -> int:
        return len(self._items)
\`\`\`

---

## 4. Key Takeaways & Best Practices
1. **Never pop from an empty stack** without checking \`is_empty()\`.
2. In Python, use \`list.append()\` and \`list.pop()\`. **Avoid \`list.insert(0, item)\` and \`list.pop(0)\`**, which incur O(n) time complexity.
3. For heavy-throughput stacks with millions of items, prefer \`collections.deque\` to avoid memory reallocation pauses.
`;
