# Traveling Salesman Problem (TSP) Game Plan

## 1. **Project Structure**

```
TSP/
├── src/
│   ├── algorithms/         # BruteForce.ts, NearestNeighbor.ts, Genetic.ts
│   ├── components/         # Board, Forms, Leaderboard, Results
│   ├── utils/              # Matrix generator, localStorage helpers, validation
│   ├── tests/              # Jest unit tests
│   └── App.tsx
├── public/
├── package.json
├── PLAN.md
└── README.md
```

---

## 2. **Game Flow & Logic**

### a. **Game Menu**

- Main menu with a "Traveling Salesman Problem" option.

### b. **Distance Matrix & Home City**

- On game start, generate a 10x10 symmetric matrix (A–J), distances 50–100 km.
- Randomly select a home city (A–J).

### c. **City Selection**

- UI: User selects cities to visit (checkboxes, A–J, excluding home city).
- Validate: At least 2 cities, no repeats, cannot select home city.

### d. **Player Input**

- User enters their name.
- User can attempt to solve the TSP manually (optional), or view algorithm solutions.

### e. **Algorithm Solutions**

- Solve the TSP for selected cities using:
  - **Brute Force** (for ≤7 cities)
  - **Nearest Neighbor**
  - **Genetic Algorithm**
- Each returns: route, total distance, and time taken (measured in ms using `performance.now()`).

### f. **Result Display**

- UI shows all three algorithm routes, distances, and times (in milliseconds).
- Highlight the shortest route.
- If user’s answer is correct (matches shortest), allow saving score.

### g. **Data Storage (localStorage)**

- On correct answer, save: player name, home city, selected cities, shortest route, algorithm, and times to localStorage as a JSON array.
- Provide a way to view and export this data (Leaderboard, Download button).

---

## 3. **Key Utilities**

- **Matrix Generator:**  
  Generates a random symmetric 10x10 matrix with values 50–100, diagonal = 0.
- **localStorage Helpers:**  
  Functions to save, load, and export game results.
- **Validation:**  
  Ensure valid city selection, input, and route.

---

## 4. **Frontend Components**

- **Menu:** Game selection.
- **Board:** SVG/Canvas map of cities and routes.
- **Forms:** Player name, city selection.
- **Results:** Show all algorithm outputs.
- **Leaderboard:** Top scores from localStorage.
- **Export:** Button to download localStorage data as JSON.
- **Validation:** Prevent invalid input, show error messages.

---

## 5. **Algorithms**

- **Brute Force:**  
  Try all permutations of selected cities, return shortest (≤7 cities).  
  Complexity: O(n!)
- **Nearest Neighbor:**  
  Greedily visit nearest unvisited city.  
  Complexity: O(n²)
- **Genetic Algorithm:**  
  Population of random routes, fitness = 1/length, selection, crossover, mutation, iterate.  
  Complexity: O(generations × population × n)

---

## 6. **Testing**

- **Jest** for:
  - Route validity (all cities visited once, starts/ends at home)
  - Distance calculation correctness
  - Algorithm output correctness
  - Performance thresholds

#### Example test (pseudo):

```ts
import { bruteForceTSP } from "../src/algorithms/BruteForce";
test("Brute force finds correct route for 3 cities", () => {
  const matrix = [
    [0, 2, 9, 10],
    [1, 0, 6, 4],
    [15, 7, 0, 8],
    [6, 3, 12, 0]
  ];
  const home = 0;
  const cities = [1, 2, 3];
  const { route, distance } = bruteForceTSP(matrix, home, cities);
  expect(route.length).toBe(3);
  expect(distance).toBeGreaterThan(0);
});
```

---

## 7. **Complexity Analysis**

- **Brute Force:** O(n!)
- **Nearest Neighbor:** O(n²)
- **Genetic Algorithm:** O(generations × population × n)
- Complexity is shown in the results table.

---

## 8. **Validations & Exception Handling**

- Frontend: Prevent invalid selections, show error messages.
- Code: Validate input, handle errors, fallback for localStorage issues.

---

## 9. **Next Steps (Action Items)**

1. Setup basic UI skeleton (React + Tailwind)
2. Build distance matrix generator (utility)
3. Implement input forms & board UI
4. Code brute force & greedy algorithms
5. Add genetic algorithm
6. Implement localStorage save/load/export logic
7. Integrate all components
8. Write unit tests (algorithms & utils)
9. Visual polish & game polish

---
