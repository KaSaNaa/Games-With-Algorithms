import { generateDistanceMatrix } from "../utils/matrixGenerator";
import { saveTSPResult, loadTSPResults, clearTSPResults, TSPResult } from "../utils/localStorage";

describe("Matrix Generator", () => {
  it("generates a symmetric matrix with correct size and range", () => {
    const matrix = generateDistanceMatrix(5, 10, 20);
    expect(matrix.length).toBe(5);
    for (let i = 0; i < 5; i++) {
      expect(matrix[i].length).toBe(5);
      for (let j = 0; j < 5; j++) {
        expect(matrix[i][j]).toBe(matrix[j][i]);
        if (i !== j) {
          expect(matrix[i][j]).toBeGreaterThanOrEqual(10);
          expect(matrix[i][j]).toBeLessThanOrEqual(20);
        } else {
          expect(matrix[i][j]).toBe(0);
        }
      }
    }
  });
});

describe("LocalStorage Helpers", () => {
  beforeEach(() => {
    clearTSPResults();
  });

  it("saves and loads TSP results", () => {
    const result: TSPResult = {
      playerName: "Alice",
      homeCity: 0,
      selectedCities: [1, 2],
      algorithm: "Brute Force",
      route: [1, 2],
      distance: 123,
      date: new Date().toISOString(),
    };
    saveTSPResult(result);
    const results = loadTSPResults();
    expect(results.length).toBe(1);
    expect(results[0].playerName).toBe("Alice");
  });

  it("clears TSP results", () => {
    const result: TSPResult = {
      playerName: "Bob",
      homeCity: 1,
      selectedCities: [2, 3],
      algorithm: "Nearest Neighbor",
      route: [2, 3],
      distance: 456,
      date: new Date().toISOString(),
    };
    saveTSPResult(result);
    clearTSPResults();
    const results = loadTSPResults();
    expect(results.length).toBe(0);
  });
});
