import { dlopen, FFIType, suffix, ptr, CString } from "bun:ffi";
import path from "path";

// Path to the compiled C# library
const libPath = path.join(
  import.meta.dir,
  `../csharp/library/bin/Release/net8.0/osx-arm64/publish/CSharpFfiLib.dylib`
);

console.log("📚 Loading library from:", libPath);

// Open the dynamic library and define C# functions
const lib = dlopen(libPath, {
  subtract: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  divide: {
    args: [FFIType.double, FFIType.double],
    returns: FFIType.double,
  },
  power: {
    args: [FFIType.double, FFIType.double],
    returns: FFIType.double,
  },
  is_prime: {
    args: [FFIType.i32],
    returns: FFIType.i32,
  },
  get_message: {
    args: [],
    returns: FFIType.ptr,
  },
  free_memory: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
});

console.log("🚀 Demo Bun FFI + C#\n");

// Test subtract function
console.log("📊 Subtraction test:");
const diff = lib.symbols.subtract(50, 23);
console.log(`   50 - 23 = ${diff}\n`);

// Test divide function
console.log("📊 Division test:");
const quotient = lib.symbols.divide(100.0, 8.0);
console.log(`   100 ÷ 8 = ${quotient}\n`);

// Test power function
console.log("📊 Power test:");
const pow = lib.symbols.power(2.0, 10.0);
console.log(`   2^10 = ${pow}\n`);

// Test is_prime function
console.log("📊 Prime number test:");
const num = 17;
const isPrime = lib.symbols.is_prime(num);
console.log(`   ${num} is prime? ${isPrime === 1 ? "Yes ✓" : "No ✗"}\n`);

const num2 = 20;
const isPrime2 = lib.symbols.is_prime(num2);
console.log(`   ${num2} is prime? ${isPrime2 === 1 ? "Yes ✓" : "No ✗"}\n`);

// Test get_message function
console.log("📊 Message from C# test:");
const messagePtr = lib.symbols.get_message();
if (messagePtr) {
  // Read the string from C pointer
  const cstr = new CString(messagePtr);
  const message = cstr.toString();
  console.log(`   ${message}\n`);
  lib.symbols.free_memory(messagePtr);
}

console.log("✅ All tests completed!");
