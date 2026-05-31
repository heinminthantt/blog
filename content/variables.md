---
title: "JavaScript Variables"
date: "2026-05-31"
translation: "mm-variables"
summary: "Studying JavaScript Variables."
tags: ["javascript", "programming", "webdev"]
---

# JavaScript Variables

If you translate `variables` directly into Burmese, it means "changing values." To visualize it, you can think of a `variable` as a specific location in computer memory where you can store any value you like. JavaScript is **case-sensitive** and uses the Unicode character set. For example, you can even use the German word “Früh” as a variable name.

```javascript
const Früh = "foobar";

```

The `variable` `Früh` is not the same as the `variable` `früh` because JavaScript is **case-sensitive**.

In the past, variables were declared using the `var` keyword. For example:

```javascript
var mySkillIssues = 42;

```

The commonly used `variable` `types` in JavaScript are:

* **numbers**: Represents integers and decimal floating-point numbers.
* **boolean**: `true` or `false`.
* **string**: Refers to text/strings.
* **undefined**: Refers to a variable that has not been assigned a value yet.

```javascript
var smsSendingLimit = 100; 
var isAdmin = true; 
var username = "wagslane"; 
var nothing = undefined;

```

---

## let and const

In modern JavaScript today, the `var` keyword is rarely used; instead, `let` and `const` are preferred. You can reassign a new value to variables declared with `let`. For example:

```javascript
let username = "dengar_the_bh"; 
username = "boba_fett";

```

Variables declared with `const` are constant values, meaning you cannot reassign a new value to them. In JavaScript, you must assign a value immediately when declaring a `const` variable. Unlike `let`, you cannot leave it unassigned.

```javascript
let myVar; // OK 
const MYVAR; // SyntaxError

```

---

## Variable Scope

In JavaScript, `variable scope` determines the visibility and accessibility of variables. Visibility and Accessibility mean defining which part of the program can see and use which variable.

### Global Scope

Variables declared outside of functions or code blocks `{ }` are `global scope` variables. Global scope variables can be accessed and modified from anywhere in the program.

```javascript
let globalVar = "I am global";  

function test() {  
    console.log(globalVar); // Accessible inside functions 
}

```

### Function Scope

Variables declared inside a function have `function scope`. All three types—`let`, `var`, and `const`—can be used within a function scope. A variable inside a function scope cannot be accessed from the outside global scope or block scopes. In fact, those scopes won't even know the function-scoped variable exists.

```javascript
function greet() {  
    var localVar = "Hello";  
    console.log(localVar); // Works perfectly 
}  

greet(); 
console.log(localVar); // Throws ReferenceError

```

### Block Scope

Variables declared inside `{ }` are called `block scope` variables. These variables can only be used within those specific `{ }` brackets and cannot be accessed from an outside global or function scope. Only `let` and `const` respect block scope; `var` does not follow block scope rules. A variable declared with `var` inside `{ }` can still be accessed from its closest surrounding function scope or global scope.

```javascript
if (true) {  
    let blockLet = "Secure";  
    var leakedVar = "Unsecured"; 
}  

console.log(leakedVar); // Logs "Unsecured" 
console.log(blockLet); // Throws ReferenceError

```

#### References

[JavaScript - Quick & Concise (Ei Maung - Fairway)](https://eimaung.com/jsbook/JavaScript-Book-by-Ei-Maung.pdf)

[MDN Web Docs - Introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction)

[Boot.dev](https://boot.dev/courses/learn-javascript)