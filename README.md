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
├── Cargo.toml              # Rust project configuration
├── src/
│   └── lib.rs              # Rust source code (FFI library)
├── index.ts                # Bun → Rust
├── index_csharp.ts         # Bun → C#
├── index_combined.ts       # Bun → Rust + C# (combined)
├── Program.cs              # C# → Rust (console app)
├── CSharpLib.cs            # C# native library
├── RustFfiDemo.csproj      # .NET project (console)
├── CSharpFfiLib.csproj     # .NET project (library)
├── build_csharp.sh         # C# NativeAOT build script
├── package.json            # Bun configuration
├── README.md               # This file
└── README_CSHARP.md        # C# + Rust guide
```

## 🔧 How It Works

This project demonstrates **four different FFI combinations**:

### 1. Bun → Rust ([index.ts](index.ts))
- Rust compiles a dynamic library (`cdylib`) with `extern "C"`
- Bun uses `bun:ffi` to load and call Rust functions
- Functions: `add`, `multiply`, `factorial`, `greet`

### 2. C# → Rust ([Program.cs](Program.cs))
- Rust compiles the same dynamic library
- C# uses P/Invoke (`[DllImport]`) to call the functions
- Same FFI interface, different calling language

### 3. Bun → C# ([index_csharp.ts](index_csharp.ts), [CSharpLib.cs](CSharpLib.cs))
- C# compiles a native library with NativeAOT
- Functions exported with `[UnmanagedCallersOnly]`
- Bun calls C# functions via FFI
- Functions: `subtract`, `divide`, `power`, `is_prime`, `get_message`

### 4. Bun → Rust + C# Combined ([index_combined.ts](index_combined.ts)) 🎭
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

## 📚 Resources

- [Bun FFI Documentation](https://bun.sh/docs/api/ffi)
- [Rust FFI Guide](https://doc.rust-lang.org/nomicon/ffi.html)
- [.NET Native Interoperability](https://learn.microsoft.com/en-us/dotnet/standard/native-interop/)
- [C# NativeAOT](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/)
