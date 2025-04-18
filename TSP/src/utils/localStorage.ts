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
    data.push(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
