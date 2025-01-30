/* eslint-disable */

export function deepMerge(master: any, slave: any): any {
  if (Array.isArray(slave) && Array.isArray(master)) {
    return [...slave, ...master]; // Properly merge arrays without converting to objects
  }

  if (typeof slave === "object" && slave &&
    typeof master === "object" && master) {

    const merged = { ...slave }; // Clone slave

    for (const key in master) {
      if (master.hasOwnProperty(key)) {
        if (Array.isArray(master[key]) || Array.isArray(slave[key])) {
          // Ensure arrays remain arrays
          merged[key] = Array.isArray(slave[key]) && Array.isArray(master[key])
            ? [...slave[key], ...master[key]]
            : master[key]; // If one is not an array, master value wins
        } else {
          merged[key] = deepMerge(master[key], slave[key] ?? undefined,); // Recursively merge objects
        }
      }
    }

    return merged;
  }

  return master ?? slave; // Overwrite primitive values
}
