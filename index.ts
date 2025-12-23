import { dlopen, FFIType, suffix, CString, ptr, toArrayBuffer } from "bun:ffi";
import path from "path";

// Percorso della libreria compilata
const libPath = path.join(
  import.meta.dir,
  `target/release/librust_ffi_lib.${suffix}`
);

// Apri la libreria dinamica e definisci le funzioni
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

// Test funzione add
console.log("📊 Test addizione:");
const sum = lib.symbols.add(15, 27);
console.log(`   15 + 27 = ${sum}\n`);

// Test funzione multiply
console.log("📊 Test moltiplicazione:");
const product = lib.symbols.multiply(8, 7);
console.log(`   8 × 7 = ${product}\n`);

// Test funzione factorial
console.log("📊 Test fattoriale:");
const fact = lib.symbols.factorial(10);
console.log(`   10! = ${fact}\n`);

// Test funzione greet con gestione memoria
console.log("📊 Test saluto:");
const nameStr = "Mario";
const encoder = new TextEncoder();
const nameBytes = encoder.encode(nameStr + "\0");
const nameBuffer = Buffer.from(nameBytes);
const greetingPtr = lib.symbols.greet(ptr(nameBuffer));

if (greetingPtr && greetingPtr !== 0) {
  const greeting = new CString(greetingPtr);
  console.log(`   ${greeting.toString()}\n`);
  
  // Libera la memoria allocata da Rust
  lib.symbols.free_string(greetingPtr);
} else {
  console.log("   ⚠️ Errore: puntatore nullo dalla funzione greet\n");
}

console.log("✅ Tutti i test completati!");
