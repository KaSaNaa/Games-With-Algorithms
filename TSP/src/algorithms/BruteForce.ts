function permute<T>(arr: T[]): T[][] {
    if (arr.length <= 1) return [arr];
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        for (const p of permute(rest)) {
            result.push([arr[i], ...p]);
        }
    }
    return result;
}

// Brute Force TSP: O(n!) complexity
export function bruteForceTSP(matrix: number[][], home: number, cities: number[]): { route: number[], distance: number } {
    if (cities.length > 7) return { route: [], distance: 0 };
    // Additional validation
    if (cities.length < 2) return { route: [], distance: 0 };
    if (cities.includes(home)) return { route: [], distance: 0 };
    if (new Set(cities).size !== cities.length) return { route: [], distance: 0 };

    let minDist = Infinity;
    let bestRoute: number[] = [];
    for (const perm of permute(cities)) {
        let dist = 0;
        let prev = home;
        for (const city of perm) {
            dist += matrix[prev][city];
            prev = city;
        }
        dist += matrix[prev][home];
        if (dist < minDist) {
            minDist = dist;
            bestRoute = [...perm];
        }
    }
    return { route: bestRoute, distance: minDist === Infinity ? 0 : minDist };
}
