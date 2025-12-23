using System;
using System.Runtime.InteropServices;
using System.Text;

namespace CSharpFfiLib
{
    public class Exports
    {
        /// <summary>
        /// Sottrae due numeri
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "subtract")]
        public static int Subtract(int a, int b)
        {
            return a - b;
        }

        /// <summary>
        /// Divide due numeri
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "divide")]
        public static double Divide(double a, double b)
        {
            if (b == 0)
                return 0;
            return a / b;
        }

        /// <summary>
        /// Calcola la potenza
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "power")]
        public static double Power(double baseNum, double exponent)
        {
            return Math.Pow(baseNum, exponent);
        }

        /// <summary>
        /// Verifica se un numero è primo
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
        /// Restituisce un messaggio dall'ambiente C#
        /// NOTA: Il chiamante deve liberare la memoria
        /// </summary>
        [UnmanagedCallersOnly(EntryPoint = "get_message")]
        public static unsafe IntPtr GetMessage()
        {
            string message = "Ciao da C#! Questa funzione è scritta in C# e chiamata da Bun! 🎉";
            byte[] bytes = Encoding.UTF8.GetBytes(message + "\0");
            
            IntPtr ptr = Marshal.AllocHGlobal(bytes.Length);
            Marshal.Copy(bytes, 0, ptr, bytes.Length);
            
            return ptr;
        }

        /// <summary>
        /// Libera la memoria allocata
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
