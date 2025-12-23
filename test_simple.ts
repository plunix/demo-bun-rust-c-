import { dlopen, FFIType, suffix } from "bun:ffi";
import path from "path";

const libPath = path.join(
  import.meta.dir,
  `target/release/librust_ffi_lib.${suffix}`
);

console.log("Library path:", libPath);
console.log("Library exists:", Bun.file(libPath).size > 0);

const lib = dlopen(libPath, {
  add: {
    args: [FFIType.i32, FFIType.i32],
    returns: FFIType.i32,
  },
  greet: {
    args: [FFIType.ptr],
    returns: FFIType.ptr,
  },
  free_string: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
});

// Test semplice
console.log("\nTest add:", lib.symbols.add(5, 3));

// Test greet con buffer
const encoder = new TextEncoder();
const nameBytes = encoder.encode("Mario\0"); // Aggiungiamo null terminator
const nameBuffer = Buffer.from(nameBytes);

console.log("Name buffer:", nameBuffer);
console.log("Buffer ptr:", nameBuffer);

const greetingPtr = lib.symbols.greet(nameBuffer);
console.log("Greeting ptr:", greetingPtr);

if (greetingPtr && greetingPtr !== 0) {
  const decoder = new TextDecoder();
  // Leggiamo la stringa dal puntatore
  const view = new Uint8Array(Bun.readableStreamToArrayBuffer(Bun.file(greetingPtr).stream()));
  console.log("Greeting:", decoder.decode(view));
  lib.symbols.free_string(greetingPtr);
}
