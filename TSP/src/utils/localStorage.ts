export type TSPResult = {
    playerName: string;
    homeCity: number;
    selectedCities: number[];
    algorithm: string;
    route: number[];
    distance: number;
    date: string;
};

const STORAGE_KEY = "tsp_results";

export function saveTSPResult(result: TSPResult) {
    const data = loadTSPResults();
    // Prevent duplicates (same player, home, cities, algorithm, and route)
    const isDuplicate = data.some(r =>
        r.playerName === result.playerName &&
        r.homeCity === result.homeCity &&
        JSON.stringify(r.selectedCities) === JSON.stringify(result.selectedCities) &&
        r.algorithm === result.algorithm &&
        JSON.stringify(r.route) === JSON.stringify(result.route)
    );
    if (isDuplicate) return;
    data.push(result);
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        // Optionally, handle quota exceeded
        // eslint-disable-next-line no-console
        console.error("Could not save result to localStorage:", e);
    }
}

export function loadTSPResults(): TSPResult[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function clearTSPResults() {
    localStorage.removeItem(STORAGE_KEY);
}

export function exportTSPResults(): string {
    return JSON.stringify(loadTSPResults(), null, 2);
}
