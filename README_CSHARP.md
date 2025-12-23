# FFI Demo C# + Rust

This application demonstrates how to use C# to call Rust functions via P/Invoke (Platform Invocation Services).

## 🚀 Prerequisites

- [.NET SDK 8.0](https://dotnet.microsoft.com/download) or higher installed
- [Rust](https://www.rust-lang.org/) installed (with `cargo`)

## 📦 Features

The Rust library exposes the following functions called from C#:
- `add(a, b)` - Adds two integers
- `multiply(a, b)` - Multiplies two integers
- `factorial(n)` - Calculates the factorial of a number
- `greet(name)` - Returns a personalized greeting

## 🛠️ Installation and Execution

### Demo 1: C# → Rust (P/Invoke)

```bash
# Using npm scripts
bun run demo:csharp-rust

# Or manually
cargo build --release
dotnet run
```

### Demo 2: Bun → C# (NativeAOT)

```bash
# Using npm scripts
bun run demo:bun-csharp

# Or manually
./build_csharp.sh
bun run index_csharp.ts
```

### Run All Demos

```bash
bun run demo:all
```

## 📁 C# Files

### C# → Rust (P/Invoke)
```
├── Program.cs              # C# application calling Rust
└── RustFfiDemo.csproj      # .NET console project
```

### Bun → C# (NativeAOT)
```
├── CSharpLib.cs            # C# library with exported functions
├── CSharpFfiLib.csproj     # .NET native library project
├── build_csharp.sh         # NativeAOT build script
└── index_csharp.ts         # Bun calling C#
```

## 🔧 How It Works

1. **Rust** compiles a dynamic library (`cdylib`) with functions exposed via `extern "C"`
2. **C#** uses P/Invoke (`[DllImport]`) to load the library and call the functions
3. Memory management is handled correctly:
   - Strings returned from Rust are freed by calling `free_string`
   - `Marshal.PtrToStringUTF8` converts C pointers to C# strings

## 🔍 Technical Notes

### Library Path

The library path varies by operating system:
- **macOS**: `librust_ffi_lib.dylib`
- **Linux**: `librust_ffi_lib.so`
- **Windows**: `rust_ffi_lib.dll`

### Calling Convention

Rust functions use the `Cdecl` convention which must be specified in `[DllImport]`.

### String Handling

- C# → Rust: Convert strings to null-terminated UTF-8 byte arrays
- Rust → C#: Use `Marshal.PtrToStringUTF8` to read C pointers as strings
- Memory allocated by Rust must be freed by calling `free_string`

## 🆚 Comparison with Bun

| Aspect | Bun (TypeScript) | C# |
|---------|------------------|-----|
| Library loading | `dlopen` | `[DllImport]` |
| Function definition | Object with `FFIType` | Attributes on methods |
| String handling | `CString`, `ptr` | `Marshal`, byte array |
| Performance | Excellent | Excellent |
| Type safety | Runtime | Compile-time |

Both approaches are valid and performant for FFI interoperability with Rust!
