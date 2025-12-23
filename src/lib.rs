use std::ffi::{CStr, CString};
use std::os::raw::c_char;

/// Somma due numeri
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}

/// Moltiplica due numeri
#[no_mangle]
pub extern "C" fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

/// Restituisce un saluto personalizzato
/// NOTA: La stringa restituita deve essere liberata chiamando free_string
#[no_mangle]
pub extern "C" fn greet(name: *const c_char) -> *mut c_char {
    if name.is_null() {
        return std::ptr::null_mut();
    }

    let c_str = unsafe { CStr::from_ptr(name) };
    let name_str = match c_str.to_str() {
        Ok(s) => s,
        Err(_) => return std::ptr::null_mut(),
    };

    let greeting = format!("Ciao, {}! Benvenuto nell'applicazione Bun+Rust FFI!", name_str);
    
    CString::new(greeting).unwrap().into_raw()
}

/// Libera la memoria di una stringa allocata da Rust
#[no_mangle]
pub extern "C" fn free_string(s: *mut c_char) {
    if !s.is_null() {
        unsafe {
            let _ = CString::from_raw(s);
        }
    }
}

/// Calcola il fattoriale di un numero
#[no_mangle]
pub extern "C" fn factorial(n: u32) -> u64 {
    match n {
        0 | 1 => 1,
        _ => (2..=n as u64).product(),
    }
}
