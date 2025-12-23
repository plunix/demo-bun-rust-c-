using System;
using System.Runtime.InteropServices;
using System.Text;

namespace RustFfiDemo
{
    class Program
    {
        // Path to the compiled Rust library
        // On macOS: librust_ffi_lib.dylib
        // On Linux: librust_ffi_lib.so
        // On Windows: rust_ffi_lib.dll
        private const string LibraryPath = "../../rust/target/release/librust_ffi_lib.dylib";

        // Import Rust functions via P/Invoke
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

        // Helper to convert C# string to byte array for FFI
        private static byte[] ToCString(string str)
        {
            return Encoding.UTF8.GetBytes(str + "\0");
        }

        // Helper to call greet and manage memory
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

            // Test add function
            Console.WriteLine("📊 Addition test:");
            int sum = add(15, 27);
            Console.WriteLine($"   15 + 27 = {sum}\n");

            // Test multiply function
            Console.WriteLine("📊 Multiplication test:");
            int product = multiply(8, 7);
            Console.WriteLine($"   8 × 7 = {product}\n");

            // Test factorial function
            Console.WriteLine("📊 Factorial test:");
            ulong fact = factorial(10);
            Console.WriteLine($"   10! = {fact}\n");

            // Test greet function
            Console.WriteLine("📊 Greeting test:");
            string greeting = CallGreet("Mario");
            Console.WriteLine($"   {greeting}\n");

            Console.WriteLine("✅ All tests completed!");
        }
    }
}
