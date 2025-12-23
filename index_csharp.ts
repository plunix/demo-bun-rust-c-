import { dlopen, FFIType, suffix, ptr, CString } from "bun:ffi";
import path from "path";

// Percorso della libreria C# compilata
const libPath = path.join(
  import.meta.dir,
  `bin/Release/net8.0/osx-arm64/publish/CSharpFfiLib.dylib`
);

console.log("📚 Caricamento libreria da:", libPath);

// Apri la libreria dinamica e definisci le funzioni C#
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

// Test funzione subtract
console.log("📊 Test sottrazione:");
const diff = lib.symbols.subtract(50, 23);
console.log(`   50 - 23 = ${diff}\n`);

// Test funzione divide
console.log("📊 Test divisione:");
const quotient = lib.symbols.divide(100.0, 8.0);
console.log(`   100 ÷ 8 = ${quotient}\n`);

// Test funzione power
console.log("📊 Test potenza:");
const pow = lib.symbols.power(2.0, 10.0);
console.log(`   2^10 = ${pow}\n`);

// Test funzione is_prime
console.log("📊 Test numero primo:");
const num = 17;
const isPrime = lib.symbols.is_prime(num);
console.log(`   ${num} è primo? ${isPrime === 1 ? "Sì ✓" : "No ✗"}\n`);

const num2 = 20;
const isPrime2 = lib.symbols.is_prime(num2);
console.log(`   ${num2} è primo? ${isPrime2 === 1 ? "Sì ✓" : "No ✗"}\n`);

// Test funzione get_message
console.log("📊 Test messaggio da C#:");
const messagePtr = lib.symbols.get_message();
if (messagePtr) {
  // Leggi la stringa dal puntatore C
  const cstr = new CString(messagePtr);
  const message = cstr.toString();
  console.log(`   ${message}\n`);
  lib.symbols.free_memory(messagePtr);
}

console.log("✅ Tutti i test completati!");
