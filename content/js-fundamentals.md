---
title: "JavaScript Fundamentals: Variables, Types, Scope, and Hoisting (Test)"
date: "2026-05-30"
translation: "mm-js-fundamentals"
summary: "A deep dive into JavaScript core execution mechanics, exploring variable lifecycles, memory structures, and engine behavior."
tags: ["javascript", "programming", "webdev"]
---

# JavaScript Fundamentals

To write predictable, bug-free JavaScript code, you have to understand exactly how the engine manages memory allocation, tracks variable updates, and structures execution environments.

---

## 1. Variables and Keywords

JavaScript provides three distinct keywords to declare variables, each behaving differently regarding mutability and scoping:

* **`var` (Legacy):** Function-scoped. It allows re-declaration and mutation. It does not respect block boundaries (like `if` statements or `for` loops).
* **`let` (Modern):** Block-scoped. It can be reassigned but **cannot** be re-declared within the same scope boundary.
* **`const` (Modern):** Block-scoped. Immutable reference bindings. You must initialize it with a value immediately, and you cannot reassign it. 

> **Important Caveat:** `const` prevents *reassignment* of the variable identifier, but it does not make objects or arrays truly immutable. You can still modify internal object properties or push items into a constant array.

---

## 2. Basic Data Types

JavaScript is a dynamically typed language, divided into two major type categories: **Primitives** and **Objects**.

### Primitive Types (Stored by Value)
Primitive values are immutable and stored directly in the execution stack's memory.

1.  **Number:** Represents both integer and floating-point numbers (e.g., `42`, `3.14`).
2.  **String:** Textual data wrapped in quotes (e.g., `"Hello"`).
3.  **Boolean:** Logical entities representing `true` or `false`.
4.  **Null:** An intentional, explicit absence of any object value.
5.  **Undefined:** Automatically assigned to variables that have been declared but not initialized.
6.  **Symbol:** A unique, immutable identifier typically used as hidden object keys.

### Reference Types (Stored by Reference)
**Objects** (including Arrays and Functions) are mutable structures stored in the memory heap. The variable holding an object only stores a memory address pointer pointing to that heap location.

---

## 3. Scope Mechanics

Scope dictates the visibility and accessibility of your variables across different segments of your codebase.



* **Global Scope:** Variables declared outside any function or block boundary. Accessible from absolutely anywhere in your script.
* **Function Scope:** Variables declared inside a `function` using `var`, `let`, or `const` cannot be accessed from outside that function.
* **Block Scope:** Introduced in ES6. Variables declared with `let` and `const` inside a pair of curly braces `{}` are locked inside that specific block.

---

## 4. Hoisting and the TDZ

**Hoisting** is the JavaScript engine's behavior of allocating memory space for declarations during the compilation phase, before the actual code executes line-by-line.

```javascript
console.log(greeting); // Outputs: undefined
var greeting = "Hello";

// Under the hood, the engine interprets it like this:
// var greeting;
// console.log(greeting);
// greeting = "Hello";