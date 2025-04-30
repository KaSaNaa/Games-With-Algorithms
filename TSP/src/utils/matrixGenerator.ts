// Sri Lankan cities (10 major cities)
export const SRI_LANKA_CITIES = [
    "Colombo",      // 0
    "Kandy",        // 1
    "Galle",        // 2
    "Jaffna",       // 3
    "Trincomalee",  // 4
    "Anuradhapura", // 5
    "Batticaloa",   // 6
    "Matara",       // 7
    "Kurunegala",   // 8
    "Ratnapura"     // 9
];

// Approximate road distances in km between cities (symmetric matrix)
const SRI_LANKA_DISTANCES = [
    [0, 115, 120, 398, 261, 205, 312, 160, 94, 90],
    [115, 0, 230, 316, 182, 137, 215, 245, 42, 90],
    [120, 230, 0, 520, 340, 320, 420, 45, 210, 110],
    [398, 316, 520, 0, 233, 196, 340, 565, 270, 410],
    [261, 182, 340, 233, 0, 107, 110, 370, 170, 260],
    [205, 137, 320, 196, 107, 0, 210, 350, 90, 200],
    [312, 215, 420, 340, 110, 210, 0, 430, 200, 320],
    [160, 245, 45, 565, 370, 350, 430, 0, 230, 120],
    [94, 42, 210, 270, 170, 90, 200, 230, 0, 100],
    [90, 90, 110, 410, 260, 200, 320, 120, 100, 0]
];

// Generate a copy of the real distance matrix (so it's not mutated)
export function generateSriLankaDistanceMatrix(): number[][] {
    return SRI_LANKA_DISTANCES.map(row => [...row]);
}

export function generateDistanceMatrix(size = 10, min = 50, max = 100): number[][] {
    const matrix: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size; j++) {
            const distance = Math.floor(Math.random() * (max - min + 1)) + min;
            matrix[i][j] = distance;
            matrix[j][i] = distance;
        }
    }
    return matrix;
}
