export function validatePasswordPolicy(password) {
    // min length 8, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
    const minLength = 10;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>_\-]/;
  
    if (password.length < minLength) return false;
    if (!uppercaseRegex.test(password)) return false;
    if (!lowercaseRegex.test(password)) return false;
    if (!digitRegex.test(password)) return false;
    if (!specialCharRegex.test(password)) return false;
  
    return true;
  }
  