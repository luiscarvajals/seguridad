export function generateRandomPassword(length = 10) {
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const symbols = "!@#$%&*()_+?";
  
  // incluyendo uno de cada categoria:
  let all = lowerChars + upperChars + digits + symbols;
  let password = "";

  // asegurando al menos uno de cada categoria
  password += lowerChars[Math.floor(Math.random() * lowerChars.length)];
  password += upperChars[Math.floor(Math.random() * upperChars.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // rellenando el resto de la longitud
  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // remezclando el password
  password = password.split("").sort(() => 0.5 - Math.random()).join("");

  return password;
}
