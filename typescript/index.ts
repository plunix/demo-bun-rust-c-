import { dlopen, FFIType, suffix, CString, ptr, toArrayBuffer } from "bun:ffi";
import path from "path";

// Path to the compiled library
const libPath = path.join(
  import.meta.dir,
  `../rust/target/release/librust_ffi_lib.${suffix}`
);

// Open the dynamic library and define functions
const lib = dlopen(libPath, {
  add: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  multiply: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  greet: {
    args: [FFIType.cstring],
    returns: FFIType.ptr,
  },
  free_string: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  factorial: {
    args: [FFIType.u32],
    returns: FFIType.u64,
  },
});

console.log("🚀 Demo Bun FFI + Rust\n");

// Test add function
console.log("📊 Addition test:");
const sum = lib.symbols.add(15, 27);
console.log(`   15 + 27 = ${sum}\n`);

// Test multiply function
console.log("📊 Multiplication test:");
const product = lib.symbols.multiply(8, 7);
console.log(`   8 × 7 = ${product}\n`);

// Test factorial function
console.log("📊 Factorial test:");
const fact = lib.symbols.factorial(10);
console.log(`   10! = ${fact}\n`);

// Test greet function with memory management
console.log("📊 Greeting test:");
const nameStr = "Mario";
const encoder = new TextEncoder();
const nameBytes = encoder.encode(nameStr + "\0");
const nameBuffer = Buffer.from(nameBytes);
const greetingPtr = lib.symbols.greet(ptr(nameBuffer));

if (greetingPtr && greetingPtr !== 0) {
  const greeting = new CString(greetingPtr);
  console.log(`   ${greeting.toString()}\n`);
  
  // Free memory allocated by Rust
  lib.symbols.free_string(greetingPtr);
} else {
  console.log("   ⚠️ Error: null pointer from greet function\n");
}

console.log("✅ All tests completed!");
