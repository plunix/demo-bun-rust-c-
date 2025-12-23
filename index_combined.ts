import { dlopen, FFIType, suffix, CString } from "bun:ffi";
import path from "path";

console.log("🎭 Demo Bun FFI - Rust + C# Combined\n");
console.log("=" .repeat(60));

// ========================================
// 1. Carica libreria Rust
// ========================================
const rustLibPath = path.join(
  import.meta.dir,
  `target/release/librust_ffi_lib.${suffix}`
);

console.log("\n📦 Caricamento libreria Rust:", rustLibPath);

const rustLib = dlopen(rustLibPath, {
  add: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  multiply: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  factorial: {
    args: [FFIType.u32],
    returns: FFIType.u64,
  },
  greet: {
    args: [FFIType.cstring],
    returns: FFIType.ptr,
  },
  free_string: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
});

// ========================================
// 2. Carica libreria C#
// ========================================
const csharpLibPath = path.join(
  import.meta.dir,
  `bin/Release/net8.0/osx-arm64/publish/CSharpFfiLib.dylib`
);

console.log("📦 Caricamento libreria C#:", csharpLibPath);

const csharpLib = dlopen(csharpLibPath, {
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

console.log("\n✅ Entrambe le librerie caricate con successo!\n");
console.log("=" .repeat(60));

// ========================================
// 3. Test Operazioni Matematiche
// ========================================
console.log("\n🔢 OPERAZIONI MATEMATICHE\n");

console.log("🦀 Rust - Addizione:");
const sum = rustLib.symbols.add(42, 18);
console.log(`   42 + 18 = ${sum}`);

console.log("\n🟣 C# - Sottrazione:");
const diff = csharpLib.symbols.subtract(100, 35);
console.log(`   100 - 35 = ${diff}`);

console.log("\n🦀 Rust - Moltiplicazione:");
const product = rustLib.symbols.multiply(7, 9);
console.log(`   7 × 9 = ${product}`);

console.log("\n🟣 C# - Divisione:");
const quotient = csharpLib.symbols.divide(144.0, 12.0);
console.log(`   144 ÷ 12 = ${quotient}`);

console.log("\n🟣 C# - Potenza:");
const pow = csharpLib.symbols.power(3.0, 4.0);
console.log(`   3^4 = ${pow}`);

// ========================================
// 4. Test Funzioni Avanzate
// ========================================
console.log("\n" + "=".repeat(60));
console.log("\n🧮 FUNZIONI AVANZATE\n");

console.log("🦀 Rust - Fattoriale:");
const fact = rustLib.symbols.factorial(8);
console.log(`   8! = ${fact}`);

console.log("\n🟣 C# - Test numeri primi:");
const testNumbers = [17, 20, 23, 24];
testNumbers.forEach(num => {
  const isPrime = csharpLib.symbols.is_prime(num);
  console.log(`   ${num} è primo? ${isPrime === 1 ? "✓ Sì" : "✗ No"}`);
});

// ========================================
// 5. Test Gestione Stringhe
// ========================================
console.log("\n" + "=".repeat(60));
console.log("\n💬 GESTIONE STRINGHE\n");

console.log("🦀 Rust - Saluto personalizzato:");
const nameBuffer = Buffer.from("Developer\0", "utf-8");
const greetPtr = rustLib.symbols.greet(nameBuffer);
if (greetPtr) {
  const greetCStr = new CString(greetPtr);
  console.log(`   ${greetCStr.toString()}`);
  rustLib.symbols.free_string(greetPtr);
}

console.log("\n🟣 C# - Messaggio:");
const messagePtr = csharpLib.symbols.get_message();
if (messagePtr) {
  const msgCStr = new CString(messagePtr);
  console.log(`   ${msgCStr.toString()}`);
  csharpLib.symbols.free_memory(messagePtr);
}

// ========================================
// 6. Operazioni Combinate
// ========================================
console.log("\n" + "=".repeat(60));
console.log("\n🔄 OPERAZIONI COMBINATE (Rust + C#)\n");

console.log("📊 Calcolo espressione: (10 + 5) × 2 - 8 ÷ 2^3");
const step1 = rustLib.symbols.add(10, 5);           // Rust: 10 + 5 = 15
console.log(`   Passo 1 (Rust): 10 + 5 = ${step1}`);

const step2 = rustLib.symbols.multiply(step1, 2);    // Rust: 15 × 2 = 30
console.log(`   Passo 2 (Rust): ${step1} × 2 = ${step2}`);

const step3 = csharpLib.symbols.power(2.0, 3.0);     // C#: 2^3 = 8
console.log(`   Passo 3 (C#): 2^3 = ${step3}`);

const step4 = csharpLib.symbols.divide(8.0, step3);  // C#: 8 ÷ 8 = 1
console.log(`   Passo 4 (C#): 8 ÷ ${step3} = ${step4}`);

const result = csharpLib.symbols.subtract(step2, Math.floor(step4));  // C#: 30 - 1 = 29
console.log(`   Risultato finale (C#): ${step2} - ${Math.floor(step4)} = ${result}`);

// ========================================
// 7. Conclusione
// ========================================
console.log("\n" + "=".repeat(60));
console.log("\n✨ RIEPILOGO\n");
console.log("✅ Funzioni Rust chiamate con successo");
console.log("✅ Funzioni C# chiamate con successo");
console.log("✅ Operazioni combinate completate");
console.log("✅ Gestione memoria corretta per entrambe le librerie");
console.log("\n🎉 Demo completata! Bun può chiamare sia Rust che C# tramite FFI!\n");
