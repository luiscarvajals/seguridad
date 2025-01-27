export function generateUsername(firstName, lastName) {
    if (!firstName || !lastName) return "";
    
    const cleanFirst = firstName.split(" ")[0].toLowerCase();
    const cleanLast = lastName.split(" ")[0].toLowerCase();
    
    return `${cleanFirst}.${cleanLast}`;
  }
  