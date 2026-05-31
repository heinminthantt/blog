---
title: "JavaScript Variables"
date: "2026-05-31"
translation: "variables"
summary: "JavaScript Variable ကိုလေ့လာခြင်း။"
tags: ["javascript", "programming", "webdev"]
---

# JavaScript Variables

`variables` ကို မြန်မာလို တိုက်ရိုက်ပြန်ရင်တော့ ကိန်းရှင်လို့ ပြန်ရပါမယ်။ ပြောင်းလဲနိုင်သော တန်ဖိုးပေါ့။ မျက်စိထဲမှာ ဘယ်လိုပုံဖော်ကြည့်ရမလဲဆိုရင်၊ `variable` ဆိုတာ ကွန်ပျူတာ Memory ပေါ်က နှစ်သက်ရာ တန်ဖိုးတွေ သိမ်းလို့ရတဲ့ နေရာလေးတစ်ခု လို့ မြင်ကြည့်နိုင်ပါတယ်။ JavaScript ဟာ **case-sensitive** ဖြစ်ပြီးတော့ Unicode character set ကိုအသုံးပြုပါတယ်။ ဥပမာအနေနဲ့ “Früh” ဆိုတဲ့ German စကားလုံးကိုလည်း `variable` အနေနဲ့အသုံးပြုလို့ရပါတယ်။

```javascript
const Früh = "foobar";

```

`Früh` ဆိုတဲ့ `variable` ဟာ `früh` ဆိုတဲ့ `variable` နဲ့တူပါဘူး။ JavaScript က **case-sensitive** ဖြစ်လို့ပါ။

အရင်တုန်းက `variable` တွေကို `var` keyword သုံးပြီး declare လုပ်ခဲ့ပါတယ်။ ဥပမာ -

```javascript
var mySkillIssues = 42;

```

JavaScript မှာ အသုံးများတဲ့ `variable` `types` တွေကတော့ -

* **numbers** : ကိန်းပြည့် `integer` တွေနဲ့ ဒသမကိန်း `floating-point number` တွေကို ကိုယ်စားပြုပါတယ်။
* **boolean**: `true` ဒါမှမဟုတ် `false`
* **string**: စာကြောင်းတွေကို ခေါ်တာပါ။
* **undefined**: `value` မထည့်ရသေးတဲ့ `variable` ကို ခေါ်ပါတယ်။

```javascript
var smsSendingLimit = 100; 
var isAdmin = true; 
var username = "wagslane"; 
var nothing = undefined;

```

---

## let နဲ့ const

အခုနောက်ပိုင်း modern JavaScript မှာ `var` keyword ကို မသုံးတော့ဘဲ `let` နဲ့ `const` ကိုသာ အသုံးပြုကြပါတယ်။ `let` နဲ့ declare လုပ်ထားတဲ့ `variable` တွေကို တခြား `value` ပြန်ပြောင်းထည့်ပေးလို့ရပါတယ်။ ဥပမာ -

```javascript
let username = "dengar_the_bh"; 
username = "boba_fett";

```

`const` နဲ့ declare လုပ်ထားတဲ့ `variable` တွေကတော့ constant value တွေဖြစ်တဲ့အတွက်ကြောင့် တခြား `value` ပြန်ပြောင်းထည့်ပေးလို့မရပါဘူး။ JavaScript မှာ `const` variable တွေကို declare လုပ်ပြီးပြီးချင်း `value` တန်းသတ်မှတ်‌ပေးရပါတယ်။ `let` လိုမျိုး `value` မထည့်ဘဲ ထားခဲ့လို့ မရပါဘူး။

```javascript
let myVar; // OK 
const MYVAR; // SyntaxError

```

---

## Variable Scope

JavaScript မှာ `variable scope` က `variable` တွေရဲ့ visibility နဲ့ accessibility ကို သတ်မှတ်ပေးပါတယ်။ Visibility နဲ့ Accessibility ဆိုတာကတော့ program ရဲ့ ဘယ်အပိုင်းက ဘယ် `variable` ကို မြင်ရပြီး ယူသုံးနိုင်လဲဆိုတာကို သတ်မှတ်ပေးတာဖြစ်ပါတယ်။

### Global Scope

Function တွေ၊ code block `{ }` တွေရဲ့ အပြင်မှာ declare လုပ်ထားတဲ့ `variable` တွေဟာ `global scope` variable တွေဖြစ်ပါတယ်။ `Global scope` variable တွေကို program ရဲ့ မည်သည့်နေရာကမဆို ယူသုံးလို့ရပြီးတော့ `value` တွေကိုလည်း ပြင်လို့ရပါတယ်။

```javascript
let globalVar = "I am global";  

function test() {  
    console.log(globalVar); // Accessible inside functions 
}

```

### Function Scope

Function တွေထဲမှာ declare လုပ်ထားတဲ့ `variable` တွေဟာ `function scope` တွေဖြစ်ပါတယ်။ `let`, `var`, `const` သုံးမျိုးလုံးကို `function scope` အတွင်းမှာ အသုံးပြုလို့ရပါတယ်။ `Function scope` ထဲက `variable` ကို function အပြင်က `global scope` နဲ့ `block scope` တွေကနေ လှမ်းခေါ်သုံးလို့မရပါဘူး။ `Function scope` ထဲက `variable` တွေ ရှိနေမှန်းတောင် မသိပါဘူး။

```javascript
function greet() {  
    var localVar = "Hello";  
    console.log(localVar); // Works perfectly 
}  

greet(); 
console.log(localVar); // Throws ReferenceError

```

### Block Scope

`{ }` ကြားထဲ declare လုပ်ထားတဲ့ `variable` တွေကို `block scope` လို့ ခေါ်ပါတယ်။ `variable` တွေကို `{ }` ကြားထဲမှာပဲ အသုံးပြုနိုင်ပြီးတော့ အပြင် `global` ဒါမှမဟုတ် `function scope` က ယူသုံးလို့မရပါဘူး။ `let` နဲ့ `const` နှစ်မျိုးကသာ `block scope` အတွင်း အသုံးပြုလို့ရပြီးတော့ `var` ကတော့ `block scope` ကို မလိုက်နာပါဘူး။ နီးစပ်ရာ `function scope` ဒါမှမဟုတ် `global scope` ကနေ `{ }` အတွင်း `var` နဲ့ declare လုပ်ထားတဲ့ `variable` တွေကို ယူသုံးလို့ရပါတယ်။

```javascript
if (true) {  
    let blockLet = "Secure";  
    var leakedVar = "Unsecured"; 
}  

console.log(leakedVar); // Logs "Unsecured" 
console.log(blockLet); // Throws ReferenceError

```

#### References

[JavaScript - လို-တို-ရှင်း (အိမောင်-fairway)](https://eimaung.com/jsbook/JavaScript-Book-by-Ei-Maung.pdf)

[MDN Web Docs - Introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction)

[Boot.dev](https://boot.dev/courses/learn-javascript)