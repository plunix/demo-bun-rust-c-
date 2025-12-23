# Demo FFI - Bun + Rust + C#

Questo progetto dimostra **l'interoperabilità completa tra Bun, Rust e C#** tramite FFI (Foreign Function Interface).

Mostra 4 diverse combinazioni di chiamate tra linguaggi:
- 🟨 **Bun → Rust** - JavaScript/TypeScript chiama funzioni Rust
- 🟣 **Bun → C#** - JavaScript/TypeScript chiama funzioni C#
- 🔵 **C# → Rust** - C# chiama funzioni Rust tramite P/Invoke
- 🎭 **Bun → Rust + C#** - Demo combinato che usa entrambe le librerie

## 🚀 Prerequisiti
### Libreria Rust
- `add(a, b)` - Somma due numeri interi
- `multiply(a, b)` - Moltiplica due numeri interi
- `factorial(n)` - Calcola il fattoriale di un numero
- `greet(name)` - Restituisce un saluto personalizzato

### Libreria C#
- `subtract(a, b)` - Sottrae due numeri interi
- `divide(a, b)` - Divide due numeri double
- `power(base, exp)` - Calcola la potenza
- `is_prime(n)` - Verifica se un numero è primo
- `get_message()` - Restituisce un messaggio da C#
## 📦 Funzionalità

La libreria Rust espone le seguenti funzioni:
- `add(a, b)` - Somma due numeri interi
- `multiply(a, b)` - Moltiplica due numeri interi
- `factorial(n)` - Calcola il fattoriale di un numero
- `greet(name)` - Restituisce un saluto personalizzato

## 🛠️ Installazione e Esecuzione

### Quick Start

```bash
# Compila ed esegui Bun → Rust
bun start
```
dev:combined    # Esegue Bun → Rust + C# (combinato)
bun run run:dotnet      # Esegue C# → Rust
```

**Demo (build + esecuzione):**
```bash
bun run demo:bun-rust    # Build Rust + Bun → Rust
bun run demo:bun-csharp  # Build C# + Bun → C#
bun run demo:csharp-rust # Build Rust + C# → Rust
bun run demo:combined    # Build entrambe + demo combinato
bun run demo:all         # Esegue tutti e 4 i demo in sequenza

**Dev (esecuzione diretta):**
```bash
bun run dev             # Esegue Bun → Rust
bun run dev:csharp      # Esegue Bun → C#
bun run run:dotnet      # Esegue C# → Rust
```

**Demo (build + esecuzione):**
```bindex_combined.ts       # Bun → Rust + C# (combinato)
├── ash
bun run demo:bun-rust   # Build Rust + Bun → Rust
bun run demo:bun-csharp # Build C# + Bun → C#
bun run demo:csharp-rust # Build Rust + C# → Rust
bun run demo:all        # Esegue tutti e 3 i demo
```

## 📁 Struttura del Progetto

```
.
├── Cargo.toml              # Configurazione del progetto Rust
├── src/
│   └── lib.rs              # Codice sorgente Rust (libreria FFI)
├── index.ts                # Bun → Rust
├── index_csharp.ts         # Bun → C#
├── Program.cs              # C# → Rust (console app)
├── CSharpLib.cs            # C# libreria nativa
├── RustFfiDemo.csproj     quattro diverse combinazioni** di FFI:

### 1. Bun → Rust ([index.ts](index.ts))
- Rust compila una libreria dinamica (`cdylib`) con `extern "C"`
- Bun usa `bun:ffi` per caricare e chiamare le funzioni Rust
- Funzioni: `add`, `multiply`, `factorial`, `greet`

### 2. C# → Rust ([Program.cs](Program.cs))
- Rust compila la stessa libreria dinamica
- C# usa P/Invoke (`[DllImport]`) per chiamare le funzioni
- Stessa interfaccia FFI, diverso linguaggio chiamante

### 3. Bun → C# ([index_csharp.ts](index_csharp.ts), [CSharpLib.cs](CSharpLib.cs))
- C# compila una libreria nativa con NativeAOT
- Funzioni esportate con `[UnmanagedCallersOnly]`
- Bun chiama le funzioni C# tramite FFI
- Funzioni: `subtract`, `divide`, `power`, `is_prime`, `get_message`

### 4. Bun → Rust + C# Combinato ([index_combined.ts](index_combined.ts)) 🎭
- **Il demo più completo**: carica entrambe le librerie contemporaneamente
- **Rust**: Le stringhe allocate devono essere liberate con `free_string()`
- **C#**: La memoria allocata deve essere liberata con `free_memory()`
- Entrambe le librerie gestiscono correttamente la memoria per evitare memory leak

## 🔍 Note Tecniche

### Percorsi delle Librerie

**Rust:**
- macOS: `librust_ffi_lib.dylib`
- Linux: `librust_ffi_lib.so`
- Windows: `rust_ffi_lib.dll`

**C#:**
- macOS: `CSharpFfiLib.dylib`
- Linux: `CSharpFfiLib.so`
- Windows: `CSharpFfiLib.dll`

### Tecnologie Utilizzate

- **Bun FFI**: `bun:ffi` con `dlopen`, `FFIType`, `CString`
- **Rust**: `extern "C"`, `#[no_mangle]`, `cdylib`
- **C# P/Invoke**: `[DllImport]`, `CallingConvention.Cdecl`
- **C# NativeAOT**: `[UnmanagedCallersOnly]`, `PublishAot=true`

## 🆚 Confronto Tecnologie

| Aspetto | Bun FFI | C# P/Invoke | C# NativeAOT |
|---------|---------|-------------|--------------|
| Type safety | Runtime | Compile-time | Compile-time |
| Performance | Eccellente | Eccellente | Eccellente |
| Setup | Minimo | Medio | Complesso |
| Dimensione output | Piccola | Media | Grande |
| Startup time | Veloce | Veloce | Molto veloce |

## 🎯 Performance

L'FFI di Bun è estremamente veloce, con overhead minimo per le chiamate native. Combinando Rust per calcoli intensivi e C# per logica di business complessa, si ottiene il meglio di entrambi i mondi.

## 📚 Risorse

- [Documentazione Bun FFI](https://bun.sh/docs/api/ffi)
- [Rust FFI Guide](https://doc.rust-lang.org/nomicon/ffi.html)
- [.NET Native Interoperability](https://learn.microsoft.com/en-us/dotnet/standard/native-interop/)
- [C# NativeAOT](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot/)
## 🎯 Casi d'Uso

- **Bun → Rust**: Algoritmi ad alte prestazioni, elaborazione dati, crittografia
- **Bun → C#**: Integrazione con ecosistema .NET, accesso a librerie C# esistenti
- **C# → Rust**: Migliorare performance di applicazioni .NET esistenti
- **Combinato**: Sfruttare i punti di forza di entrambi i linguaggi in un'unica app
### 2. C# → Rust ([Program.cs](Program.cs))
- Rust compila la stessa libreria dinamica
- C# usa P/Invoke (`[DllImport]`) per chiamare le funzioni
- Stessa interfaccia FFI, diverso linguaggio chiamante

### 3. Bun → C# ([index_csharp.ts](index_csharp.ts), [CSharpLib.cs](CSharpLib.cs))
- C# compila una libreria nativa con NativeAOT
- Funzioni esportate con `[UnmanagedCallersOnly]`
- Bun chiama le funzioni C# tramite FFI
- Funzioni: `subtract`, `divide`, `power`, `is_prime`, `get_message`

## 📝 Note sulla Gestione della Memoria

Quando Rust restituisce stringhe allocate, è importante liberare la memoria manualmente chiamando `free_string()` per evitare memory leak.

## 🎯 Performance

L'FFI di Bun è estremamente veloce, rendendo possibile l'integrazione di codice Rust ad alte prestazioni in applicazioni JavaScript.
