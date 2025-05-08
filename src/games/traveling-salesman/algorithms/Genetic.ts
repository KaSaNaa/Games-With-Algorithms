export function geneticTSP(
    matrix: number[][],
    home: number,
    cities: number[],
    options?: { populationSize?: number; generations?: number; mutationRate?: number }
): { route: number[]; distance: number } {
    // Additional validation
    if (cities.length < 2) return { route: [], distance: 0 };
    if (cities.includes(home)) return { route: [], distance: 0 };
    if (new Set(cities).size !== cities.length) return { route: [], distance: 0 };

    const populationSize = options?.populationSize ?? 60;
    const generations = options?.generations ?? 100;
    const mutationRate = options?.mutationRate ?? 0.2;

    if (cities.length === 0) return { route: [], distance: 0 };

    // Helper: calculate distance of a route
    function calcDistance(route: number[]): number {
        let dist = matrix[home][route[0]];
        for (let i = 1; i < route.length; i++) {
            dist += matrix[route[i - 1]][route[i]];
        }
        dist += matrix[route[route.length - 1]][home];
        return dist;
    }

    // Helper: shuffle array
    function shuffle<T>(arr: T[]): T[] {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Initial population
    let population: number[][] = [];
    for (let i = 0; i < populationSize; i++) {
        population.push(shuffle(cities));
    }

    for (let gen = 0; gen < generations; gen++) {
        // Evaluate fitness (lower distance is better)
        const scored = population.map(route => ({
            route,
            distance: calcDistance(route),
        }));
        scored.sort((a, b) => a.distance - b.distance);

        // Elitism: keep top 2
        const nextGen: number[][] = [scored[0].route, scored[1].route];

        // Selection and Crossover
        while (nextGen.length < populationSize) {
            // Tournament selection
            const parent1 = scored[Math.floor(Math.random() * 10)].route;
            const parent2 = scored[Math.floor(Math.random() * 10)].route;
            // Order crossover (OX)
            const cut1 = Math.floor(Math.random() * cities.length);
            const cut2 = Math.floor(Math.random() * cities.length);
            const [start, end] = [Math.min(cut1, cut2), Math.max(cut1, cut2)];
            const child = Array(cities.length).fill(-1);
            for (let i = start; i <= end; i++) child[i] = parent1[i];
            let p2Idx = 0;
            for (let i = 0; i < cities.length; i++) {
                if (child[i] === -1) {
                    while (parent2.includes(parent1[start + p2Idx]) && p2Idx < cities.length) p2Idx++;
                    let val = parent2.find(v => !child.includes(v));
                    child[i] = val!;
                }
            }
            // Mutation: swap two cities
            if (Math.random() < mutationRate) {
                const i = Math.floor(Math.random() * cities.length);
                const j = Math.floor(Math.random() * cities.length);
                [child[i], child[j]] = [child[j], child[i]];
            }
            nextGen.push(child);
        }
        population = nextGen;
    }

    // Return best route
    const best = population.reduce(
        (acc, route) => {
            const d = calcDistance(route);
            return d < acc.distance ? { route, distance: d } : acc;
        },
        { route: population[0], distance: calcDistance(population[0]) }
    );
    return best;
}
