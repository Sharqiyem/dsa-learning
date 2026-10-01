export interface Exercise {
  id: string;
  category: "Fundamentals" | "Operation Tracing" | "Code Output" | "Real-World Apps" | "Algorithms";
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  question: string;
  codeSnippet?: string;
  options?: string[];
  correctOptionIndex?: number;
  expectedAnswer?: string;
  solutionExplanation: string;
  keyTakeaway: string;
}

export const EXERCISES_DATA: Exercise[] = [
  {
    id: "ex-1",
    category: "Fundamentals",
    difficulty: "Easy",
    title: "1. The LIFO Principle & Plate Analogy",
    question: "A cafeteria worker places five trays on a spring-loaded tray dispenser in this order: Red, Green, Blue, Yellow, Orange. A student then takes two trays, the worker adds a Purple tray, and another student takes one tray. Which tray is now at the TOP of the dispenser?",
    options: [
      "Orange",
      "Yellow",
      "Purple",
      "Blue"
    ],
    correctOptionIndex: 1,
    solutionExplanation: `Step-by-step stack trace:
1. Dispenser initially receives: [Red (bottom), Green, Blue, Yellow, Orange (top)]
2. Student 1 takes tray: pops 'Orange'. Top is now 'Yellow'.
3. Student 2 takes tray: pops 'Yellow'. Top is now 'Blue'.
4. Worker adds tray: pushes 'Purple'. Stack is now [Red, Green, Blue, Purple (top)].
5. Student 3 takes tray: pops 'Purple'. Top is now 'Blue'.
Wait, let's trace carefully:
- Initial pushes: Red, Green, Blue, Yellow, Orange -> Stack: [Red, Green, Blue, Yellow, Orange]
- Student takes 2 trays: pop() -> Orange; pop() -> Yellow. Remaining: [Red, Green, Blue]
- Worker adds Purple: push('Purple'). Stack: [Red, Green, Blue, Purple]
- Another student takes 1 tray: pop() -> Purple.
- Remaining stack: [Red, Green, Blue].
Therefore, the tray at the top is 'Blue'.`,
    keyTakeaway: "Stack operations strictly follow LIFO (Last-In, First-Out). Elements entered most recently are consumed first."
  },
  {
    id: "ex-2",
    category: "Operation Tracing",
    difficulty: "Easy",
    title: "2. Sequence Trace & Final Stack Size",
    question: "Starting with an empty stack S, consider the following sequence of operations:\nS.push(7)\nS.push(12)\nS.pop()\nS.push(3)\nS.push(9)\nS.pop()\nS.push(15)\nS.pop()\nS.pop()\nWhat is the top element of the stack after these operations, and what is its size?",
    options: [
      "Top: 7, Size: 1",
      "Top: 3, Size: 1",
      "Top: 12, Size: 2",
      "Stack is empty, Size: 0"
    ],
    correctOptionIndex: 0,
    solutionExplanation: `Let's follow the operations chronologically:
1. push(7)      -> Stack: [7]
2. push(12)     -> Stack: [7, 12]
3. pop()        -> returns 12. Stack: [7]
4. push(3)      -> Stack: [7, 3]
5. push(9)      -> Stack: [7, 3, 9]
6. pop()        -> returns 9. Stack: [7, 3]
7. push(15)     -> Stack: [7, 3, 15]
8. pop()        -> returns 15. Stack: [7, 3]
9. pop()        -> returns 3. Stack: [7]

End State: Stack contains only [7].
Top element is 7.
Size is 1.`,
    keyTakeaway: "Each push increments size by 1; each pop decrements size by 1. Total pushes = 5, total pops = 4. 5 - 4 = 1 element remaining."
  },
  {
    id: "ex-3",
    category: "Fundamentals",
    difficulty: "Easy",
    title: "3. Time Complexity of Stack Primitives",
    question: "What is the worst-case and amortized time complexity of the push, pop, and peek operations when using an optimal stack implementation (such as Python's collections.deque or linked list)?",
    options: [
      "Push: O(1), Pop: O(n), Peek: O(1)",
      "Push: O(1), Pop: O(1), Peek: O(1)",
      "Push: O(n), Pop: O(1), Peek: O(n)",
      "Push: O(log n), Pop: O(1), Peek: O(1)"
    ],
    correctOptionIndex: 1,
    solutionExplanation: `In an optimal stack (linked list head pointer or collections.deque):
- push(): adds a new node or element pointer at the head/tail without moving other elements -> O(1).
- pop(): removes the node at head/tail and updates pointer -> O(1).
- peek(): reads head.value or array[size-1] via direct pointer offset -> O(1).
- isEmpty(): compares size == 0 or head == None -> O(1).
None of the fundamental stack operations require iterating over the collection.`,
    keyTakeaway: "Stack operations are localized strictly to one boundary (the TOP), ensuring O(1) constant time efficiency."
  },
  {
    id: "ex-4",
    category: "Real-World Apps",
    difficulty: "Medium",
    title: "4. Balanced Parentheses Detection",
    question: "Using a stack to check whether brackets are balanced, trace what happens for the string '{[()]}'. Which of the following statements correctly describes the stack state when the character ')' is encountered?",
    options: [
      "The stack contains ['{', '[', '('], and '(' is popped and compared with ')'",
      "The stack is empty because all prior brackets were already closed",
      "The stack contains [')', '(', '[', '{']",
      "The stack raises a StackOverflow error"
    ],
    correctOptionIndex: 0,
    solutionExplanation: `Trace for '{[()]}':
1. Read '{': Opening bracket -> push to stack. Stack: ['{']
2. Read '[': Opening bracket -> push to stack. Stack: ['{', '[']
3. Read '(': Opening bracket -> push to stack. Stack: ['{', '[', '(']
4. Read ')': Closing bracket! Look at top of stack.
   - Top is '('.
   - '(' matches ')'. Pop '(' from stack.
   - Stack becomes ['{', '['].
5. Read ']': Closing bracket -> matches top '[' -> pop. Stack: ['{'].
6. Read '}': Closing bracket -> matches top '{' -> pop. Stack: [].
7. End of string: Stack is empty -> String is BALANCED!`,
    keyTakeaway: "A stack is the quintessential data structure for parsing nested structures because the most recently opened delimiter must be the first one closed."
  },
  {
    id: "ex-5",
    category: "Code Output",
    difficulty: "Medium",
    title: "5. Python List Stack Mutation Output",
    question: "What does the following Python snippet print?\n```python\ns = []\nfor x in [10, 20, 30]:\n    s.append(x)\nwhile s:\n    print(s.pop(), end=' ')\n```",
    options: [
      "10 20 30",
      "30 20 10",
      "30 30 30",
      "10 10 10"
    ],
    correctOptionIndex: 1,
    solutionExplanation: `Step 1: Elements 10, 20, 30 are pushed onto the stack in order:
s = [10, 20, 30] (30 is at the top).

Step 2: while s: continues as long as s is non-empty.
- 1st iteration: s.pop() removes 30 and prints '30 '
- 2nd iteration: s.pop() removes 20 and prints '20 '
- 3rd iteration: s.pop() removes 10 and prints '10 '
- 4th iteration: s is empty ([] evaluates to False), loop terminates.

Output is: 30 20 10`,
    keyTakeaway: "Pushing elements onto a stack and popping them off immediately reverses their original order."
  },
  {
    id: "ex-6",
    category: "Real-World Apps",
    difficulty: "Medium",
    title: "6. Call Stack & Recursion Depth",
    question: "Consider this recursive Python function:\n```python\ndef countdown(n):\n    if n <= 0:\n        return\n    countdown(n - 1)\n```\nIf countdown(4) is called, what is the MAXIMUM number of active stack frames on the system call stack simultaneously (including the initial call)?",
    options: [
      "4 frames",
      "5 frames",
      "1 frame",
      "8 frames"
    ],
    correctOptionIndex: 1,
    solutionExplanation: `Let's trace each call pushed onto the system call stack before base case returns:
1. countdown(4) - calls countdown(3) [Stack depth: 1]
2. countdown(3) - calls countdown(2) [Stack depth: 2]
3. countdown(2) - calls countdown(1) [Stack depth: 3]
4. countdown(1) - calls countdown(0) [Stack depth: 4]
5. countdown(0) - n <= 0 is true; reaches base case! [Stack depth: 5]

At this exact moment, all 5 frames reside simultaneously on the call stack before unwinding begins.
Maximum stack depth = n + 1 = 5.`,
    keyTakeaway: "Recursive functions rely on the operating system's call stack to store local variables and return addresses for each pending invocation."
  },
  {
    id: "ex-7",
    category: "Fundamentals",
    difficulty: "Medium",
    title: "7. Stack Overflow vs. Stack Underflow",
    question: "Which of the following conditions triggers a 'Stack Underflow' error?",
    options: [
      "Executing push() when memory is completely full",
      "Executing pop() or peek() on an empty stack",
      "Having an infinite recursive function with no base case",
      "Attempting to push an incompatible data type"
    ],
    correctOptionIndex: 1,
    solutionExplanation: `- Stack Underflow occurs when an algorithm attempts to pop() or peek() an element from a stack that has zero elements (empty).
- Stack Overflow occurs when an algorithm attempts to push() into a stack that has reached its maximum allocated capacity (e.g., maximum recursion depth exceeded or bounded buffer filled).`,
    keyTakeaway: "Underflow = Reading/removing from empty. Overflow = Writing/adding beyond capacity."
  },
  {
    id: "ex-8",
    category: "Algorithms",
    difficulty: "Hard",
    title: "8. Decimal to Binary Conversion via Stack",
    question: "To convert decimal number 25 to binary, we repeatedly divide by 2 and push the remainders onto a stack:\n25 / 2 = 12 remainder 1\n12 / 2 = 6 remainder 0\n6 / 2 = 3 remainder 0\n3 / 2 = 1 remainder 1\n1 / 2 = 0 remainder 1\nWhen we pop all remainders from the stack, what is the resulting binary string?",
    options: [
      "10011",
      "11001",
      "01100",
      "11100"
    ],
    correctOptionIndex: 1,
    solutionExplanation: `Step-by-step:
1. Remainders pushed in order generated:
   - 25 % 2 = 1 -> push(1)  [Stack: 1]
   - 12 % 2 = 0 -> push(0)  [Stack: 1, 0]
   - 6 % 2  = 0 -> push(0)  [Stack: 1, 0, 0]
   - 3 % 2  = 1 -> push(1)  [Stack: 1, 0, 0, 1]
   - 1 % 2  = 1 -> push(1)  [Stack: 1, 0, 0, 1, 1 (top)]

2. Popping from stack (LIFO reversal):
   - pop() -> '1'
   - pop() -> '1'
   - pop() -> '0'
   - pop() -> '0'
   - pop() -> '1'

Result: '11001'
Verification: 16 + 8 + 0 + 0 + 1 = 25. Correct!`,
    keyTakeaway: "Stack reverses the order of remainders, which is mathematically required because the least significant bit (LSB) is computed first but must be printed last."
  },
  {
    id: "ex-9",
    category: "Algorithms",
    difficulty: "Hard",
    title: "9. The O(1) Min-Stack Design",
    question: "How can you design a Stack data structure that supports push(), pop(), and a getMin() method in O(1) time complexity?",
    options: [
      "Sort the stack array after every push operation",
      "Iterate through all elements in the stack whenever getMin() is called",
      "Maintain a secondary auxiliary stack that stores the minimum value at each depth",
      "Binary search the stack to find the minimum"
    ],
    correctOptionIndex: 2,
    solutionExplanation: `The classic Min-Stack solution:
- Keep two stacks: main_stack and min_stack.
- On push(val):
  - push val to main_stack.
  - if min_stack is empty or val <= min_stack.peek(), push val to min_stack.
- On pop():
  - popped = main_stack.pop()
  - if popped == min_stack.peek(), min_stack.pop()
- On getMin():
  - Return min_stack.peek() directly in O(1)!

This achieves O(1) time for all three operations by trading an extra O(n) auxiliary space.`,
    keyTakeaway: "Auxiliary stacks can track running historical properties (like minimum, maximum, or undo state) at each point in time in constant O(1) time."
  },
  {
    id: "ex-10",
    category: "Code Output",
    difficulty: "Medium",
    title: "10. Infix, Postfix, and Stack Evaluation",
    question: "Consider evaluating the Postfix expression '4 5 2 + *' using a stack. Numbers are pushed onto the stack, and operators pop two operands, evaluate the operator, and push the result back. What is the final value?",
    options: [
      "28",
      "22",
      "40",
      "14"
    ],
    correctOptionIndex: 0,
    solutionExplanation: `Step-by-step evaluation of '4 5 2 + *':
1. Read '4': number -> push(4). Stack: [4]
2. Read '5': number -> push(5). Stack: [4, 5]
3. Read '2': number -> push(2). Stack: [4, 5, 2]
4. Read '+': operator!
   - Pop operand 2 = 2
   - Pop operand 1 = 5
   - Compute 5 + 2 = 7
   - Push result back -> push(7). Stack: [4, 7]
5. Read '*': operator!
   - Pop operand 2 = 7
   - Pop operand 1 = 4
   - Compute 4 * 7 = 28
   - Push result back -> push(28). Stack: [28]

End of tokens. Pop final answer: 28.`,
    keyTakeaway: "Reverse Polish Notation (Postfix) requires no parentheses because operators unambiguously apply to the top two operands on the stack."
  },
  {
    id: "ex-11",
    category: "Real-World Apps",
    difficulty: "Medium",
    title: "11. Browser Back / Forward Button Architecture",
    question: "How do modern web browsers (Chrome, Firefox, Safari) implement Back and Forward navigation history?",
    options: [
      "A single queue that drops oldest visits",
      "Two stacks: a 'Back Stack' and a 'Forward Stack'",
      "A hash table mapping URLs to visit timestamps",
      "A binary search tree sorted alphabetically by URL"
    ],
    correctOptionIndex: 1,
    solutionExplanation: `Browser history architecture:
- Back Stack: stores previously visited pages.
- Current Page: currently viewed URL.
- Forward Stack: stores pages navigated backward from.
When user clicks a new link:
- Push current page to Back Stack.
- Clear Forward Stack.
When user clicks 'Back':
- Push current page to Forward Stack.
- Pop from Back Stack and load that page.
When user clicks 'Forward':
- Push current page to Back Stack.
- Pop from Forward Stack and load that page.`,
    keyTakeaway: "Two complementary stacks provide an elegant, state-preserving bidirectional navigation pattern."
  },
  {
    id: "ex-12",
    category: "Algorithms",
    difficulty: "Hard",
    title: "12. Implement a Queue Using Two Stacks",
    question: "You are given two LIFO Stacks (stack1 and stack2). How can you implement a FIFO Queue's enqueue() and dequeue() methods?",
    options: [
      "enqueue() pushes to stack1. dequeue() pops from stack1 directly.",
      "enqueue() pushes to stack1. dequeue(): if stack2 is empty, pop all elements from stack1 and push them to stack2; then pop from stack2.",
      "Both operations push and pop randomly between stack1 and stack2.",
      "It is mathematically impossible to implement a FIFO queue using LIFO stacks."
    ],
    correctOptionIndex: 1,
    solutionExplanation: `Double-reversal principle:
- LIFO reversed once = FIFO!
- Enqueue: Always push new element onto stack1.
- Dequeue:
  - If stack2 is empty:
    - Pop all elements one-by-one from stack1 and push onto stack2.
    - This inverts the order: the oldest element is now at the TOP of stack2!
  - Pop top of stack2.
Amortized complexity is O(1) because each element is pushed and popped exactly twice over its lifetime.`,
    keyTakeaway: "Reversing a stack onto another stack converts Last-In-First-Out into First-In-First-Out."
  }
];
