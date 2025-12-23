using System;
using System.Runtime.InteropServices;
using System.Text;

namespace CSharpFfiLib
{
    public class Exports
    {
        /// <summary>
        /// Subtracts two numbers
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "subtract")]
        public static int Subtract(int a, int b)
        {
            return a - b;
        }

        /// <summary>
        /// Divides two numbers
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "divide")]
        public static double Divide(double a, double b)
        {
            if (b == 0)
                return 0;
            return a / b;
        }

        /// <summary>
        /// Calculates power
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "power")]
        public static double Power(double baseNum, double exponent)
        {
            return Math.Pow(baseNum, exponent);
        }

        /// <summary>
        /// Checks if a number is prime
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "is_prime")]
        public static int IsPrime(int n)
        {
            if (n <= 1) return 0;
            if (n <= 3) return 1;
            if (n % 2 == 0 || n % 3 == 0) return 0;

            for (int i = 5; i * i <= n; i += 6)
            {
                if (n % i == 0 || n % (i + 2) == 0)
                    return 0;
            }
            return 1;
        }

        /// <summary>
        /// Returns a message from the C# environment
        /// NOTE: The caller must free the memory
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "get_message")]
        public static unsafe IntPtr GetMessage()
        {
            string message = "Hello from C#! This function is written in C# and called by Bun! 🎉";
            byte[] bytes = Encoding.UTF8.GetBytes(message + "\0");
            
            IntPtr ptr = Marshal.AllocHGlobal(bytes.Length);
            Marshal.Copy(bytes, 0, ptr, bytes.Length);
            
            return ptr;
        }

        /// <summary>
        /// Frees allocated memory
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "free_memory")]
        public static void FreeMemory(IntPtr ptr)
        {
            if (ptr != IntPtr.Zero)
            {
                Marshal.FreeHGlobal(ptr);
            }
        }
    }
}
