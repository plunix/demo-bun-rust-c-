# Demo FFI C# + Rust

Questa applicazione dimostra come usare C# per chiamare funzioni Rust tramite P/Invoke (Platform Invocation Services).

## 🚀 Prerequisiti

- [.NET SDK 8.0](https://dotnet.microsoft.com/download) o superiore installato
- [Rust](https://www.rust-lang.org/) installato (con `cargo`)

## 📦 Funzionalità

La libreria Rust espone le seguenti funzioni chiamate da C#:
- `add(a, b)` - Somma due numeri interi
- `multiply(a, b)` - Moltiplica due numeri interi
- `factorial(n)` - Calcola il fattoriale di un numero
- `greet(name)` - Restituisce un saluto personalizzato

## 🛠️ Installazione e Esecuzione

### Demo 1: C# → Rust (P/Invoke)

```bash
# Usando script npm
bun run demo:csharp-rust

# Oppure manualmente
cargo build --release
dotnet run
```

### Demo 2: Bun → C# (NativeAOT)

```bash
# Usando script npm
bun run demo:bun-csharp

# Oppure manualmente
./build_csharp.sh
bun run index_csharp.ts
```

### Esegui Tutti i Demo

```bash
bun run demo:all
```

## 📁 File C#

### C# → Rust (P/Invoke)
```
├── Program.cs              # Applicazione C# che chiama Rust
└── RustFfiDemo.csproj      # Progetto .NET console
```

### Bun → C# (NativeAOT)
```
├── CSharpLib.cs            # Libreria C# con funzioni esportate
├── CSharpFfiLib.csproj     # Progetto .NET libreria nativa
├── build_csharp.sh         # Script di compilazione NativeAOT
└── index_csharp.ts         # Bun che chiama C#
```

## 🔧 Come Funziona

1. **Rust** compila una libreria dinamica (`cdylib`) con funzioni esposte tramite `extern "C"`
2. **C#** usa P/Invoke (`[DllImport]`) per caricare la libreria e chiamare le funzioni
3. La gestione della memoria è gestita correttamente:
   - Le stringhe restituite da Rust vengono liberate chiamando `free_string`
   - `Marshal.PtrToStringUTF8` converte i puntatori C in stringhe C#

## 🔍 Note Tecniche

### Percorso della Libreria

Il percorso della libreria varia in base al sistema operativo:
- **macOS**: `librust_ffi_lib.dylib`
- **Linux**: `librust_ffi_lib.so`
- **Windows**: `rust_ffi_lib.dll`

### Convenzione di Chiamata

Le funzioni Rust usano la convenzione `Cdecl` che deve essere specificata in `[DllImport]`.

### Gestione Stringhe

- C# → Rust: Convertiamo stringhe in byte array UTF-8 null-terminated
- Rust → C#: Usiamo `Marshal.PtrToStringUTF8` per leggere puntatori C come stringhe
- La memoria allocata da Rust deve essere liberata chiamando `free_string`

## 🆚 Confronto con Bun

| Aspetto | Bun (TypeScript) | C# |
|---------|------------------|-----|
| Caricamento libreria | `dlopen` | `[DllImport]` |
| Definizione funzioni | Oggetto con `FFIType` | Attributi su metodi |
| Gestione stringhe | `CString`, `ptr` | `Marshal`, byte array |
| Performance | Ottima | Ottima |
| Type safety | Runtime | Compile-time |

Entrambi gli approcci sono validi e performanti per l'interoperabilità FFI con Rust!
