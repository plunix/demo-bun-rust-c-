# FFI Demo - Bun + Rust + C#

This project demonstrates **complete interoperability between Bun, Rust, and C#** using FFI (Foreign Function Interface).

It showcases 4 different combinations of cross-language calls:
- 🟨 **Bun → Rust** - JavaScript/TypeScript calls Rust functions
- 🟣 **Bun → C#** - JavaScript/TypeScript calls C# functions
- 🔵 **C# → Rust** - C# calls Rust functions via P/Invoke
- 🎭 **Bun → Rust + C#** - Combined demo using both libraries

## 🚀 Prerequisites

- [Bun](https://bun.sh/) installed
- [Rust](https://www.rust-lang.org/) installed (with `cargo`)
- [.NET SDK 8.0+](https://dotnet.microsoft.com/download) installed (for C# demos)

## 📦 Features

### Rust Library
- `add(a, b)` - Adds two integers
- `multiply(a, b)` - Multiplies two integers
- `factorial(n)` - Calculates the factorial of a number
- `greet(name)` - Returns a personalized greeting

### C# Library
- `subtract(a, b)` - Subtracts two integers
- `divide(a, b)` - Divides two doubles
- `power(base, exp)` - Calculates power
- `is_prime(n)` - Checks if a number is prime
- `get_message()` - Returns a message from C#

## 🛠️ Installation and Execution

### Quick Start

```bash
# Build and run Bun → Rust
bun start
```

### Available Commands

**Build:**
```bash
bun run build:rust      # Build Rust library
bun run build:csharp    # Build C# library
bun run build:all       # Build both
```

**Dev (direct execution):**
```bash
bun run dev             # Run Bun → Rust
bun run dev:csharp      # Run Bun → C#
bun run dev:combined    # Run Bun → Rust + C# (combined)
bun run run:dotnet      # Run C# → Rust
```

**Demo (build + execution):**
```bash
bun run demo:bun-rust    # Build Rust + Bun → Rust
bun run demo:bun-csharp  # Build C# + Bun → C#
bun run demo:csharp-rust # Build Rust + C# → Rust
bun run demo:combined    # Build both + combined demo
bun run demo:all         # Run all 4 demos in sequence
```

## 📁 Project Structure

```
.
├── rust/                          # Rust source code
│   ├── Cargo.toml                 # Rust project configuration
│   ├── src/
│   │   └── lib.rs                 # FFI library implementation
│   └── target/release/            # Compiled Rust library
├── csharp/                        # C# source code
│   ├── console/                   # Console application (C# → Rust)
│   │   ├── Program.cs
│   │   └── RustFfiDemo.csproj
│   └── library/                   # Native library (Bun → C#)
│       ├── CSharpLib.cs
│       ├── CSharpFfiLib.csproj
│       └── bin/Release/.../       # Compiled C# library
├── typescript/                    # TypeScript/Bun source code
│   ├── index.ts                   # Bun → Rust demo
│   ├── index_csharp.ts            # Bun → C# demo
│   └── index_combined.ts          # Combined demo (Rust + C#)
├── scripts/                       # Build scripts
│   └── build_csharp.sh            # C# NativeAOT build script
├── package.json                   # Bun/npm configuration
├── .gitignore
├── README.md                      # This file
└── README_CSHARP.md               # C# + Rust guide
```

## 🔧 How It Works

This project demonstrates **four different FFI combinations**:

### 1. Bun → Rust ([typescript/index.ts](typescript/index.ts))
- Rust compiles a dynamic library (`cdylib`) with `extern "C"`
- Bun uses `bun:ffi` to load and call Rust functions
- Functions: `add`, `multiply`, `factorial`, `greet`

### 2. C# → Rust ([csharp/console/Program.cs](csharp/console/Program.cs))
- Rust compiles the same dynamic library
- C# uses P/Invoke (`[DllImport]`) to call the functions
- Same FFI interface, different calling language

### 3. Bun → C# ([typescript/index_csharp.ts](typescript/index_csharp.ts), [csharp/library/CSharpLib.cs](csharp/library/CSharpLib.cs))
- C# compiles a native library with NativeAOT
- Functions exported with `[UnmanagedCallersOnly]`
- Bun calls C# functions via FFI
- Functions: `subtract`, `divide`, `power`, `is_prime`, `get_message`

### 4. Bun → Rust + C# Combined ([typescript/index_combined.ts](typescript/index_combined.ts)) 🎭
- **The most complete demo**: loads both libraries simultaneously
- Alternates calls between Rust and C# for different calculations
- Demonstrates combined operations using both languages
- Includes memory management for strings from both libraries
- Example: `(Rust: 10+5) × (Rust: 2) - (C#: 8) ÷ (C#: 2^3)`

## 🎯 Use Cases

- **Bun → Rust**: High-performance algorithms, data processing, cryptography
- **Bun → C#**: Integration with .NET ecosystem, access to existing C# libraries
- **C# → Rust**: Improve performance of existing .NET applications
- **Combined**: Leverage the strengths of both languages in a single app

## 📝 Memory Management Notes

- **Rust**: Allocated strings must be freed with `free_string()`
- **C#**: Allocated memory must be freed with `free_memory()`
- Both libraries handle memory correctly to avoid memory leaks

## 🔍 Technical Notes

### Library Paths

**Rust:**
- macOS: `librust_ffi_lib.dylib`
- Linux: `librust_ffi_lib.so`
- Windows: `rust_ffi_lib.dll`

**C#:**
- macOS: `CSharpFfiLib.dylib`
- Linux: `CSharpFfiLib.so`
- Windows: `CSharpFfiLib.dll`

### Technologies Used

- **Bun FFI**: `bun:ffi` with `dlopen`, `FFIType`, `CString`
- **Rust**: `extern "C"`, `#[no_mangle]`, `cdylib`
- **C# P/Invoke**: `[DllImport]`, `CallingConvention.Cdecl`
- **C# NativeAOT**: `[UnmanagedCallersOnly]`, `PublishAot=true`

## 🆚 Technology Comparison

| Aspect | Bun FFI | C# P/Invoke | C# NativeAOT |
|---------|---------|-------------|--------------|
| Type safety | Runtime | Compile-time | Compile-time |
| Performance | Excellent | Excellent | Excellent |
| Setup | Minimal | Medium | Complex |
| Output size | Small | Medium | Large |
| Startup time | Fast | Fast | Very fast |

## 🎯 Performance

Bun's FFI is extremely fast, with minimal overhead for native calls. By combining Rust for intensive calculations and C# for complex business logic, you get the best of both worlds.

---

## 🚀 Possible Evolutions

This project serves as a foundation for building high-performance, polyglot applications. Here are potential evolution paths:

### 1. Additional Language Integration
- **Go** - Add Go library with cgo and call from Bun
- **Zig** - High-performance systems programming
- **Swift** - Native macOS integration
- **Python** - Via PyO3 (Rust) or embedding CPython
- **Java/Kotlin** - Via JNI (Java Native Interface)

### 2. Advanced FFI Features
- **Async/Promise support** - Handle async Rust functions from Bun
- **Callbacks** - Pass JavaScript functions to Rust/C#
- **Complex data structures** - Structs, enums, vectors/arrays
- **Memory management** - Shared memory, zero-copy transfers
- **Error handling** - Proper exception propagation across boundaries

### 3. Performance & Benchmarking
Add comprehensive benchmark suite:
```typescript
typescript/benchmarks/
├── math_operations.bench.ts
├── string_processing.bench.ts
└── memory_operations.bench.ts
```
- Compare Rust vs C# vs pure TypeScript performance
- Measure FFI overhead
- Profile memory usage

### 4. Real-World Use Cases

#### Image Processing
```rust
// High-performance image manipulation
pub extern "C" fn resize_image(data: *const u8, width: u32, height: u32) -> *mut u8
pub extern "C" fn apply_filter(image: *mut u8, filter_type: u32)
```

#### Cryptography
```csharp
// Secure encryption/decryption
[UnmanagedCallersOnly(EntryPoint = "aes_encrypt")]
public static unsafe IntPtr AesEncrypt(byte* data, int length, byte* key)
```

#### Database Operations
```rust
// High-performance SQL parsing/execution
pub extern "C" fn parse_sql(query: *const c_char) -> *mut QueryPlan
```

#### Machine Learning
```csharp
// C# with ML.NET or ONNX Runtime
[UnmanagedCallersOnly(EntryPoint = "predict")]
public static float Predict(float* features, int count)
```

### 5. Cross-Platform Support
```json
{
  "scripts": {
    "build:linux": "cd rust && cargo build --target x86_64-unknown-linux-gnu --release",
    "build:windows": "cd rust && cargo build --target x86_64-pc-windows-msvc --release",
    "build:macos:intel": "cd rust && cargo build --target x86_64-apple-darwin --release",
    "build:macos:arm": "cd rust && cargo build --target aarch64-apple-darwin --release"
  }
}
```

### 6. Dynamic Library Loading
```typescript
// Load different implementations based on platform/availability
const lib = (() => {
  if (Bun.which("cargo")) return dlopen("../rust/target/release/librust_ffi.dylib", {...});
  if (Bun.which("dotnet")) return dlopen("../csharp/library/bin/Release/CSharpFfiLib.dylib", {...});
  throw new Error("No native library available");
})();
```

### 7. Plugin System
```typescript
class PluginManager {
  loadPlugin(path: string) {
    const plugin = dlopen(path, {
      init: { args: [], returns: FFIType.i32 },
      execute: { args: [FFIType.cstring], returns: FFIType.cstring }
    });
    return plugin.symbols;
  }
}
```

### 8. WebAssembly Support
Compile Rust to WASM for browser compatibility:
```bash
cd rust
cargo build --target wasm32-unknown-unknown --release
wasm-pack build --target web
```

### 9. Microservices Architecture
```
┌─────────┐     FFI      ┌──────────┐
│   Bun   │ ←──────────→ │   Rust   │
│ Server  │              │  Service │
└─────────┘              └──────────┘
     ↓                        ↓
  HTTP/gRPC              High-perf
  API Layer              computations
```

### 10. Testing & CI/CD
```yaml
# .github/workflows/test.yml
name: Test All FFI Combinations
on: [push, pull_request]
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        demo: [bun-rust, bun-csharp, csharp-rust, combined]
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      - uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'
      - run: bun install
      - run: bun run build:all
      - run: bun run demo:${{ matrix.demo }}
```

### 11. Developer Tools
```typescript
// FFI inspector for debugging
class FFIInspector {
  inspectLibrary(path: string) {
    const lib = dlopen(path, {});
    console.log("Available symbols:", Object.keys(lib.symbols));
    // Measure call overhead
    // Validate function signatures
  }
}
```

### 12. GUI Applications
Desktop applications using Tauri (Rust) + Bun:
```
typescript/desktop/
├── main.ts           // Bun backend
├── rust/             // Tauri + native code
└── frontend/         // React/Vue/Svelte
```

### 13. Data Science Pipeline
```
Raw Data → Rust (parsing) → C# (ML model) → Bun (API) → Frontend
          (fast I/O)         (ML.NET)        (HTTP)
```

### 14. Game Engine Components
```rust
// High-performance game logic
pub extern "C" fn update_physics(entities: *mut Entity, count: usize, delta: f32)
pub extern "C" fn render_scene(scene: *const Scene) -> *mut RenderData
```

### 15. Monitoring & Profiling
```typescript
// Add telemetry to FFI calls
function withMetrics(fn: Function, name: string) {
  return (...args: any[]) => {
    const start = performance.now();
    const result = fn(...args);
    const duration = performance.now() - start;
    console.log(`[FFI] ${name} took ${duration.toFixed(2)}ms`);
    return result;
  };
}

// Usage
const add = withMetrics(rustLib.symbols.add, "rust::add");
```

---


This demo provides a solid foundation for building **high-performance, polyglot applications** that leverage the best features of each language! 🚀

---

## 📚 Resources

- [Bun FFI Documentation](https://bun.sh/docs/api/ffi)
- [Rust FFI Guide](https://doc.rust-lang.org/nomicon/ffi.html)
- [.NET Native Interoperability](https://learn.microsoft.com/en-us/dotnet/standard/native-interop/)
- [C# NativeAOT](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/)
