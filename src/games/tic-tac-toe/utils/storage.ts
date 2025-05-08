export function saveGameResult(result: any) {
  const key = "ticTacToeGameResults";
  const prev = JSON.parse(localStorage.getItem(key) || "[]");
  prev.push(result);
  localStorage.setItem(key, JSON.stringify(prev));
}

export function loadGameResults() {
  const key = "ticTacToeGameResults";
  return JSON.parse(localStorage.getItem(key) || "[]");
}
