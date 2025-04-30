import { bruteForceTSP } from "../algorithms/BruteForce";
import { nearestNeighborTSP } from "../algorithms/NearestNeighbor";
import { geneticTSP } from "../algorithms/Genetic";

const matrix = [
  [0, 2, 9, 10],
  [1, 0, 6, 4],
  [15, 7, 0, 8],
  [6, 3, 12, 0]
];

describe("Brute Force TSP", () => {
  it("finds correct route and distance for 3 cities", () => {
    const home = 0;
    const cities = [1, 2, 3];
    const { route, distance } = bruteForceTSP(matrix, home, cities);
    expect(route.length).toBe(3);
    expect(distance).toBeGreaterThan(0);
    // The optimal route for this matrix is [1,3,2] with distance 21
    expect(distance).toBe(21);
  });
});

describe("Nearest Neighbor TSP", () => {
  it("returns a valid route and distance", () => {
    const home = 0;
    const cities = [1, 2, 3];
    const { route, distance } = nearestNeighborTSP(matrix, home, cities);
    expect(route.length).toBe(3);
    expect(distance).toBeGreaterThan(0);
    // Should visit all cities exactly once
    expect(new Set(route).size).toBe(3);
  });
});

describe("Genetic Algorithm TSP", () => {
  it("returns a valid route and distance", () => {
    const home = 0;
    const cities = [1, 2, 3];
    const { route, distance } = geneticTSP(matrix, home, cities, { generations: 50, populationSize: 20 });
    expect(route.length).toBe(3);
    expect(distance).toBeGreaterThan(0);
    // Should visit all cities exactly once
    expect(new Set(route).size).toBe(3);
  });
});
