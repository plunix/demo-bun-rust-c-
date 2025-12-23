using System;
using System.Runtime.InteropServices;
using System.Text;

namespace RustFfiDemo
{
    class Program
    {
        // Percorso della libreria Rust compilata
        // Su macOS: librust_ffi_lib.dylib
        // Su Linux: librust_ffi_lib.so
        // Su Windows: rust_ffi_lib.dll
        private const string LibraryPath = "target/release/librust_ffi_lib.dylib";

        // Import delle funzioni Rust tramite P/Invoke
        [DllImport(LibraryPath, CallingConvention = CallingConvention.Cdecl)]
        private static extern int add(int a, int b);

        [DllImport(LibraryPath, CallingConvention = CallingConvention.Cdecl)]
        private static extern int multiply(int a, int b);

        [DllImport(LibraryPath, CallingConvention = CallingConvention.Cdecl)]
        private static extern ulong factorial(uint n);

        [DllImport(LibraryPath, CallingConvention = CallingConvention.Cdecl)]
        private static extern IntPtr greet(byte[] name);

        [DllImport(LibraryPath, CallingConvention = CallingConvention.Cdecl)]
        private static extern void free_string(IntPtr s);

        // Helper per convertire stringa C# in byte array per FFI
        private static byte[] ToCString(string str)
        {
            return Encoding.UTF8.GetBytes(str + "\0");
        }

        // Helper per chiamare greet e gestire la memoria
        private static string CallGreet(string name)
        {
            IntPtr ptr = greet(ToCString(name));
            if (ptr == IntPtr.Zero)
                return null;

            try
            {
                return Marshal.PtrToStringUTF8(ptr);
            }
            finally
            {
                free_string(ptr);
            }
        }

        static void Main(string[] args)
        {
            Console.WriteLine("🚀 Demo C# FFI + Rust\n");

            // Test funzione add
            Console.WriteLine("📊 Test addizione:");
            int sum = add(15, 27);
            Console.WriteLine($"   15 + 27 = {sum}\n");

            // Test funzione multiply
            Console.WriteLine("📊 Test moltiplicazione:");
            int product = multiply(8, 7);
            Console.WriteLine($"   8 × 7 = {product}\n");

            // Test funzione factorial
            Console.WriteLine("📊 Test fattoriale:");
            ulong fact = factorial(10);
            Console.WriteLine($"   10! = {fact}\n");

            // Test funzione greet
            Console.WriteLine("📊 Test saluto:");
            string greeting = CallGreet("Mario");
            Console.WriteLine($"   {greeting}\n");

            Console.WriteLine("✅ Tutti i test completati!");
        }
    }
}
