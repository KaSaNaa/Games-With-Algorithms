import { PlayerResult } from '../types';

const STORAGE_KEY = 'knightsTourResults';

export function loadResults(): PlayerResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveResult(result: PlayerResult) {
  const results = loadResults();
  results.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}
