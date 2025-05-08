// storage.js

export const saveSolution = (playerName, queens, duration, score) => {
    const allSolutions = JSON.parse(localStorage.getItem("eightQueensSolutions")) || [];
  
    // Check if same solution exists
    const sameSolution = allSolutions.find((entry) =>
      JSON.stringify(entry.queens) === JSON.stringify(queens)
    );
  
    if (sameSolution && sameSolution.playerName !== playerName) {
      return {
        success: false,
        message: `This solution was already used by ${sameSolution.playerName}. Try another method.`,
      };
    }
  
    allSolutions.push({ playerName, queens, duration, score, time: new Date().toISOString() });
    localStorage.setItem("eightQueensSolutions", JSON.stringify(allSolutions));
  
    return { success: true, message: "Solution saved successfully!" };
  };
  
  export const getAllSolutions = () => {
    return JSON.parse(localStorage.getItem("eightQueensSolutions")) || [];
  };
  