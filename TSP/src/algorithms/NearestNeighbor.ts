// Nearest Neighbor TSP: O(n^2) complexity
export function nearestNeighborTSP(matrix: number[][], home: number, cities: number[]): { route: number[], distance: number } {
    if (cities.length === 0) return { route: [], distance: 0 };
    // Additional validation
    if (cities.length < 2) return { route: [], distance: 0 };
    if (cities.includes(home)) return { route: [], distance: 0 };
    if (new Set(cities).size !== cities.length) return { route: [], distance: 0 };
    const unvisited = new Set(cities);
    let current = home;
    const route: number[] = [];
    let total = 0;
    while (unvisited.size > 0) {
        let nextCity: number | null = null;
        let minDist = Infinity;
        for (const city of unvisited) {
            if (matrix[current][city] < minDist) {
                minDist = matrix[current][city];
                nextCity = city;
            }
        }
        if (nextCity === null) break;
        route.push(nextCity);
        total += minDist;
        unvisited.delete(nextCity);
        current = nextCity;
    }
    total += matrix[current][home];
    return { route, distance: total };
}
