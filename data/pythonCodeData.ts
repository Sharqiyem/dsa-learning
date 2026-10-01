export interface CodeLineExplanation {
  lineNum: number;
  code: string;
  explanation: string;
  logic: string;
  complexity: string;
}

export interface PythonImplementation {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  code: string;
  lines: CodeLineExplanation[];
  summary: string;
}

export const PYTHON_IMPLEMENTATIONS: PythonImplementation[] = [
  {
    id: "list-stack",
    title: "1. Python List as a Stack",
    subtitle: "Simple, idiomatic Python using built-in list methods",
    badge: "Built-in / Idiomatic",
    code: `# Creating a stack using Python's built-in list
stack = []

# PUSH operation: Append element to the top
stack.append('A')
stack.append('B')
stack.append('C')

# PEEK operation: Access the last element without removing it
top_element = stack[-1] if stack else None
print(f"Top element: {top_element}")  # Output: 'C'

# POP operation: Remove and return the top element
removed = stack.pop()
print(f"Popped: {removed}")  # Output: 'C'

# Check if stack is empty
is_empty = len(stack) == 0
print(f"Is empty? {is_empty}")

# Check current size
print(f"Stack size: {len(stack)}")`,
    lines: [
      {
        lineNum: 1,
        code: "# Creating a stack using Python's built-in list",
        explanation: "Comment introducing standard Python list implementation.",
        logic: "Python's dynamic array ('list') stores contiguous element pointers in memory and dynamically resizes when capacity is exceeded.",
        complexity: "O(1) initialization"
      },
      {
        lineNum: 2,
        code: "stack = []",
        explanation: "Initializes an empty Python list assigned to variable 'stack'.",
        logic: "Allocates a small initial contiguous memory buffer (typically 0 or 4-8 slots in CPython) to hold references to Python objects.",
        complexity: "Time: O(1) · Space: O(1)"
      },
      {
        lineNum: 4,
        code: "# PUSH operation: Append element to the top",
        explanation: "Comment explaining push logic.",
        logic: "In a list, the end of the array (index -1 or len-1) functions as the TOP of the stack to ensure O(1) operations.",
        complexity: "Concept"
      },
      {
        lineNum: 5,
        code: "stack.append('A')",
        explanation: "Pushes string 'A' onto the top of the stack.",
        logic: "Appends reference at current length. If capacity is reached, CPython multiplies array capacity by ~1.125 + 6, copying pointers.",
        complexity: "Time: O(1) amortized · Space: O(1)"
      },
      {
        lineNum: 6,
        code: "stack.append('B')",
        explanation: "Pushes string 'B' on top of 'A'.",
        logic: "Stores 'B' at index 1. Current stack representation: ['A', 'B'].",
        complexity: "Time: O(1) amortized"
      },
      {
        lineNum: 7,
        code: "stack.append('C')",
        explanation: "Pushes string 'C' on top of 'B'.",
        logic: "Stores 'C' at index 2. Top element is now 'C' at the end of the array.",
        complexity: "Time: O(1) amortized"
      },
      {
        lineNum: 9,
        code: "# PEEK operation: Access the last element without removing it",
        explanation: "Comment detailing peek inspection.",
        logic: "Looking at the top item without modifying array state or memory allocation.",
        complexity: "Concept"
      },
      {
        lineNum: 10,
        code: "top_element = stack[-1] if stack else None",
        explanation: "Uses Python negative indexing [-1] with a guard condition against empty lists.",
        logic: "Index [-1] resolves in CPython to array[size - 1]. The ternary guard prevents an IndexError: list index out of range if stack is empty.",
        complexity: "Time: O(1) · Space: O(1)"
      },
      {
        lineNum: 11,
        code: 'print(f"Top element: {top_element}")  # Output: \'C\'',
        explanation: "Outputs the peeked value to console.",
        logic: "The stack remains unchanged with length 3.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 13,
        code: "# POP operation: Remove and return the top element",
        explanation: "Comment explaining pop behavior.",
        logic: "LIFO rule: the most recently added item ('C') is extracted first.",
        complexity: "Concept"
      },
      {
        lineNum: 14,
        code: "removed = stack.pop()",
        explanation: "Removes the last item from the list and returns it.",
        logic: "CPython decrements the internal size counter and returns the pointer. Unlike pop(0) which takes O(n) due to shifting, pop() is strictly O(1).",
        complexity: "Time: O(1) · Space: O(1)"
      },
      {
        lineNum: 15,
        code: 'print(f"Popped: {removed}")  # Output: \'C\'',
        explanation: "Prints the popped value.",
        logic: "The element 'C' has been evicted; the new top is 'B'.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 17,
        code: "# Check if stack is empty",
        explanation: "Comment about empty check.",
        logic: "In Python, empty collections evaluate to False in boolean context.",
        complexity: "Concept"
      },
      {
        lineNum: 18,
        code: "is_empty = len(stack) == 0",
        explanation: "Checks whether size is zero.",
        logic: "len(stack) retrieves the internal ob_size integer directly in O(1) without iterating.",
        complexity: "Time: O(1) · Space: O(1)"
      },
      {
        lineNum: 19,
        code: 'print(f"Is empty? {is_empty}")',
        explanation: "Prints False since ['A', 'B'] remain.",
        logic: "Two elements remain.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 21,
        code: "# Check current size",
        explanation: "Size query.",
        logic: "Number of active elements currently in stack.",
        complexity: "Concept"
      },
      {
        lineNum: 22,
        code: 'print(f"Stack size: {len(stack)}")',
        explanation: "Prints current length of the stack (2).",
        logic: "CPython stores list size directly in memory header.",
        complexity: "Time: O(1)"
      }
    ],
    summary: "Built-in lists are convenient and fast for small-to-medium stacks in Python. Since append() and pop() operate on the right end of the list, they execute in O(1) amortized time."
  },
  {
    id: "oop-stack",
    title: "2. Object-Oriented Stack Class",
    subtitle: "Encapsulated ADT with proper exception handling and clean public API",
    badge: "Production OOP",
    code: `class Stack:
    """A clean, robust LIFO Stack implementation in Python."""
    
    def __init__(self):
        # Internal storage using a private list
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

    def is_empty(self):
        """Return True if stack has no elements, else False."""
        return len(self._items) == 0

    def size(self):
        """Return the number of elements in the stack."""
        return len(self._items)

    def clear(self):
        """Empty the stack."""
        self._items.clear()

    def __repr__(self):
        return f"Stack({self._items}) - Top is at index {len(self._items)-1}"


# Driver code demonstrating usage
if __name__ == "__main__":
    s = Stack()
    s.push(10)
    s.push(20)
    s.push(30)
    print("Top element:", s.peek())      # 30
    print("Popped item:", s.pop())        # 30
    print("Current size:", s.size())      # 2
    print("Is empty?", s.is_empty())      # False`,
    lines: [
      {
        lineNum: 1,
        code: "class Stack:",
        explanation: "Defines a custom Stack class implementing the Stack Abstract Data Type (ADT).",
        logic: "Encapsulation bundles data (internal list) and methods together, shielding consumers from raw array manipulation.",
        complexity: "OOP Design"
      },
      {
        lineNum: 2,
        code: '    """A clean, robust LIFO Stack implementation in Python."""',
        explanation: "Docstring documenting the class purpose.",
        logic: "Self-documenting code following PEP 257 standards.",
        complexity: "Metadata"
      },
      {
        lineNum: 4,
        code: "    def __init__(self):",
        explanation: "Constructor method invoked whenever a new Stack instance is created.",
        logic: "Initializes instance state for each independent stack object.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 5,
        code: "        # Internal storage using a private list",
        explanation: "Naming convention comment.",
        logic: "Leading underscore (_items) signals that the internal list is private and should not be accessed directly.",
        complexity: "Encapsulation"
      },
      {
        lineNum: 6,
        code: "        self._items = []",
        explanation: "Initializes private instance attribute _items as empty list.",
        logic: "Each Stack instance gets its own memory reference for _items.",
        complexity: "Time: O(1) · Space: O(1)"
      },
      {
        lineNum: 8,
        code: "    def push(self, item):",
        explanation: "Defines push method accepting any Python object as item.",
        logic: "Provides explicit API contract for adding elements.",
        complexity: "Contract"
      },
      {
        lineNum: 10,
        code: "        self._items.append(item)",
        explanation: "Appends item to the internal list.",
        logic: "Maintains LIFO ordering by placing new elements at the end of the array.",
        complexity: "Time: O(1) amortized"
      },
      {
        lineNum: 12,
        code: "    def pop(self):",
        explanation: "Defines pop method to remove and return top element.",
        logic: "Enforces Stack Underflow protection before attempting removal.",
        complexity: "Contract"
      },
      {
        lineNum: 14,
        code: "        if self.is_empty():",
        explanation: "Guards against popping from an empty stack.",
        logic: "Prevents raw runtime crashes by intercepting invalid state.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 15,
        code: '            raise IndexError("Stack Underflow: Cannot pop from an empty stack.")',
        explanation: "Raises explicit descriptive IndexError with explanatory message.",
        logic: "Defensive programming: clean exception messages allow calling code to catch and handle errors predictably.",
        complexity: "Exception handling"
      },
      {
        lineNum: 16,
        code: "        return self._items.pop()",
        explanation: "Removes and returns the topmost element.",
        logic: "Decrements list length and returns pointer to popped object.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 18,
        code: "    def peek(self):",
        explanation: "Returns topmost element without mutating the stack.",
        logic: "Inspection without modification.",
        complexity: "Contract"
      },
      {
        lineNum: 20,
        code: "        if self.is_empty():",
        explanation: "Guards against peeking into an empty stack.",
        logic: "Underflow check.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 21,
        code: '            raise IndexError("Stack Underflow: Cannot peek at an empty stack.")',
        explanation: "Raises IndexError on empty peek.",
        logic: "Consistent error contract across pop and peek operations.",
        complexity: "Exception handling"
      },
      {
        lineNum: 22,
        code: "        return self._items[-1]",
        explanation: "Retrieves value at last index.",
        logic: "Direct pointer lookup at index len-1.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 24,
        code: "    def is_empty(self):",
        explanation: "Predicate method returning boolean status.",
        logic: "Clean query method.",
        complexity: "Contract"
      },
      {
        lineNum: 26,
        code: "        return len(self._items) == 0",
        explanation: "Evaluates whether length is 0.",
        logic: "Checks length of internal storage.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 28,
        code: "    def size(self):",
        explanation: "Returns total number of items currently in the stack.",
        logic: "Equivalent to stack height.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 30,
        code: "        return len(self._items)",
        explanation: "Returns integer length.",
        logic: "O(1) lookup of ob_size in CPython struct.",
        complexity: "Time: O(1)"
      }
    ],
    summary: "This OOP class encapsulates internal data structures and guarantees that clients can only interact with the stack via push(), pop(), and peek(), preventing accidental mutations."
  },
  {
    id: "bounded-stack",
    title: "3. Bounded Stack (Fixed Capacity & Overflow)",
    subtitle: "Protects memory with strict capacity bounds and StackOverflowError",
    badge: "Hardware & Memory Safe",
    code: `class StackOverflowError(Exception):
    """Raised when pushing to a full stack."""
    pass

class BoundedStack:
    def __init__(self, capacity: int):
        if capacity <= 0:
            raise ValueError("Capacity must be greater than zero.")
        self.capacity = capacity
        self._items = []

    def push(self, item):
        if self.is_full():
            raise StackOverflowError(f"Stack Overflow! Maximum capacity {self.capacity} exceeded.")
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack Underflow: Stack is empty.")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty.")
        return self._items[-1]

    def is_full(self):
        return len(self._items) >= self.capacity

    def is_empty(self):
        return len(self._items) == 0`,
    lines: [
      {
        lineNum: 1,
        code: "class StackOverflowError(Exception):",
        explanation: "Creates a custom domain exception inheriting from Python's Exception base class.",
        logic: "Domain-driven error handling makes stack boundary errors distinct from generic Python errors.",
        complexity: "Custom Exception"
      },
      {
        lineNum: 5,
        code: "class BoundedStack:",
        explanation: "Declares class for a stack with fixed maximum ceiling.",
        logic: "Models real-world physical memory, embedded systems, and CPU call stack depth limits.",
        complexity: "Architecture"
      },
      {
        lineNum: 6,
        code: "    def __init__(self, capacity: int):",
        explanation: "Initializes bounded stack with integer capacity parameter.",
        logic: "Enforces capacity specification at instantiation time.",
        complexity: "Validation"
      },
      {
        lineNum: 7,
        code: "        if capacity <= 0:",
        explanation: "Validates capacity parameter is positive.",
        logic: "Stacks cannot have zero or negative capacity.",
        complexity: "Defensive check"
      },
      {
        lineNum: 11,
        code: "    def push(self, item):",
        explanation: "Push method with overflow barrier check.",
        logic: "Verifies available space before allocating.",
        complexity: "Contract"
      },
      {
        lineNum: 12,
        code: "        if self.is_full():",
        explanation: "Checks if current item count reached capacity limit.",
        logic: "Boundary validation.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 13,
        code: '            raise StackOverflowError(f"Stack Overflow! Maximum capacity {self.capacity} exceeded.")',
        explanation: "Halts operation and raises StackOverflowError.",
        logic: "Direct emulation of CPU stack overflow exceptions.",
        complexity: "Safe abort"
      },
      {
        lineNum: 25,
        code: "    def is_full(self):",
        explanation: "Method to check if stack is at maximum capacity.",
        logic: "Comparison between current size and maximum allowed capacity.",
        complexity: "Time: O(1)"
      }
    ],
    summary: "Bounded stacks prevent uncontrolled memory consumption. They are essential in systems programming, embedded firmware, and recursion guards where memory buffers are finite."
  },
  {
    id: "deque-stack",
    title: "4. High-Performance Stack with collections.deque",
    subtitle: "Consistent O(1) performance without memory reallocation pauses",
    badge: "High Performance",
    code: `from collections import deque

class DequeStack:
    """A high-throughput Stack implemented using Python's collections.deque.
    Unlike lists which periodically reallocate memory buffers,
    deque uses a doubly-linked list of fixed-size blocks (64 elements).
    """
    def __init__(self):
        self._deque = deque()

    def push(self, item):
        # append() on deque is strictly O(1) time complexity
        self._deque.append(item)

    def pop(self):
        if not self._deque:
            raise IndexError("Stack Underflow: deque stack is empty.")
        return self._deque.pop()

    def peek(self):
        if not self._deque:
            raise IndexError("Peek failed: deque stack is empty.")
        return self._deque[-1]

    def __len__(self):
        return len(self._deque)`,
    lines: [
      {
        lineNum: 1,
        code: "from collections import deque",
        explanation: "Imports the double-ended queue data structure from the Python standard library.",
        logic: "deque is implemented in C as a doubly-linked list of contiguous memory chunks (64 elements each).",
        complexity: "Standard Library"
      },
      {
        lineNum: 8,
        code: "    def __init__(self):",
        explanation: "Initializes internal deque.",
        logic: "No large contiguous array allocation required.",
        complexity: "Time: O(1)"
      },
      {
        lineNum: 12,
        code: "    def push(self, item):",
        explanation: "Pushes item onto deque.",
        logic: "deque.append() allocates a new 64-element block only when current block fills up. It NEVER copies existing elements, avoiding list resizing spikes.",
        complexity: "Time: Strict O(1)"
      },
      {
        lineNum: 16,
        code: "    def pop(self):",
        explanation: "Pops top item from right side of deque.",
        logic: "Direct removal from the tail block with zero shifting.",
        complexity: "Time: Strict O(1)"
      }
    ],
    summary: "collections.deque provides true, consistent O(1) push and pop without memory reallocation spikes. Perfect for high-frequency trading, real-time message routers, and massive stacks."
  }
];

export const PYTHON_DOWNLOADABLE_SCRIPT = `"""
=============================================================================
DSA Stack Master Implementation - Complete Educational Python Reference
=============================================================================
Topics covered:
1. Stack Abstract Data Type (ADT) & LIFO Principle
2. Object-Oriented Stack Implementation with IndexError handling
3. Bounded Stack with StackOverflowError
4. Real-world applications: Balanced Parentheses & Reverse String
5. Self-test driver suite
=============================================================================
"""

class StackOverflowError(Exception):
    """Raised when pushing to a full bounded stack."""
    pass


class Stack:
    """Standard dynamic LIFO Stack implementation using Python list."""
    
    def __init__(self):
        self._items = []

    def push(self, item):
        """Add an element to the top of the stack. O(1) amortized."""
        self._items.append(item)

    def pop(self):
        """Remove and return top element. O(1). Raises IndexError if empty."""
        if self.is_empty():
            raise IndexError("Stack Underflow: Cannot pop from an empty stack.")
        return self._items.pop()

    def peek(self):
        """Return top element without removing it. O(1). Raises IndexError if empty."""
        if self.is_empty():
            raise IndexError("Stack Underflow: Cannot peek at an empty stack.")
        return self._items[-1]

    def is_empty(self) -> bool:
        """Return True if stack has no elements."""
        return len(self._items) == 0

    def size(self) -> int:
        """Return number of elements in stack."""
        return len(self._items)

    def clear(self):
        """Remove all elements from the stack."""
        self._items.clear()

    def __repr__(self) -> str:
        return f"Stack({self._items}) <- TOP at index {len(self._items)-1}"


class BoundedStack:
    """Stack with fixed maximum capacity to prevent memory exhaustion."""

    def __init__(self, capacity: int):
        if capacity <= 0:
            raise ValueError("Capacity must be positive integer.")
        self.capacity = capacity
        self._items = []

    def push(self, item):
        if self.is_full():
            raise StackOverflowError(f"Stack Overflow! Capacity {self.capacity} reached.")
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack Underflow: Stack is empty.")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty.")
        return self._items[-1]

    def is_full(self) -> bool:
        return len(self._items) >= self.capacity

    def is_empty(self) -> bool:
        return len(self._items) == 0


# =============================================================================
# Practical Applications of Stack
# =============================================================================

def is_balanced_parentheses(expression: str) -> bool:
    """Checks if brackets '()', '[]', '{}' are balanced using a Stack."""
    stack = Stack()
    bracket_map = {')': '(', ']': '[', '}': '{'}

    for char in expression:
        if char in "({[":
            stack.push(char)
        elif char in ")}]":
            if stack.is_empty() or stack.pop() != bracket_map[char]:
                return False
    return stack.is_empty()


def reverse_string(text: str) -> str:
    """Reverses a string using the LIFO nature of a stack."""
    stack = Stack()
    for char in text:
        stack.push(char)
    reversed_chars = []
    while not stack.is_empty():
        reversed_chars.append(stack.pop())
    return "".join(reversed_chars)


# =============================================================================
# Driver & Verification Suite
# =============================================================================
if __name__ == "__main__":
    print("--- 1. Testing Standard Stack ---")
    s = Stack()
    s.push(10)
    s.push(20)
    s.push(30)
    print("Stack state:", s)
    print("Peek top:", s.peek())  # 30
    print("Popped item:", s.pop())  # 30
    print("Size after pop:", s.size())  # 2

    print("\\n--- 2. Testing Balanced Parentheses ---")
    samples = ["{[()]}", "{[(])}", "((()))", "({[()]})", "(()"]
    for sample in samples:
        print(f"'{sample}' -> Balanced? {is_balanced_parentheses(sample)}")

    print("\\n--- 3. Testing String Reversal ---")
    word = "ALGORITHM"
    print(f"Original: '{word}' -> Reversed: '{reverse_string(word)}'")
`;
