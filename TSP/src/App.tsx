import { useState } from "react";
import Menu from "./components/Menu";
import Board from "./components/Board";
import Forms from "./components/Forms";
import Results from "./components/Results";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { generateSriLankaDistanceMatrix, SRI_LANKA_CITIES } from "./utils/matrixGenerator";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";

const CITY_LABELS = SRI_LANKA_CITIES;

function getRandomHomeCity() {
    return Math.floor(Math.random() * CITY_LABELS.length);
}

function App() {
    const theme = createTheme({
        palette: { mode: "light", background: { default: "#f4f6fb" } },
        typography: { fontFamily: "Inter, Roboto, Arial, sans-serif" }
    });

    // Game state
    const [phase, setPhase] = useState<"menu"|"setup"|"results">("menu");
    const [matrix, setMatrix] = useState<number[][] | null>(null);
    const [homeCity, setHomeCity] = useState<number | null>(null);
    const [selectedCities, setSelectedCities] = useState<number[]>([]);
    const [playerName, setPlayerName] = useState<string>("");
    const [results, setResults] = useState<any>(null);

    // Start game: generate matrix and home city
    const handleStart = () => {
        setMatrix(generateSriLankaDistanceMatrix());
        const home = getRandomHomeCity();
        setHomeCity(home);
        setSelectedCities([]);
        setPlayerName("");
        setResults(null);
        setPhase("setup");
    };

    // When form is submitted, move to results phase
    const handleSubmit = (name: string, cities: number[]) => {
        setPlayerName(name);
        setSelectedCities(cities);
        setPhase("results");
    };

    // Reset to menu
    const handleReset = () => {
        setPhase("menu");
        setMatrix(null);
        setHomeCity(null);
        setSelectedCities([]);
        setPlayerName("");
        setResults(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                minHeight="100vh"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ background: "linear-gradient(135deg, #e3eafc 0%, #f4f6fb 100%)" }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        px: 6,
                        py: 5,
                        borderRadius: 3,
                        minWidth: 400,
                        maxWidth: 600,
                    }}
                >
                    <Box
                        component="h1"
                        sx={{
                            fontSize: 32,
                            fontWeight: "bold",
                            mb: 5,
                            color: "primary.dark",
                            letterSpacing: 1,
                        }}
                    >
                        Traveling Salesman Problem
                    </Box>
                    {phase === "menu" && <Menu onStart={handleStart} />}
                    {phase === "setup" && matrix && homeCity !== null && (
                        <Forms
                            cityLabels={CITY_LABELS}
                            homeCity={homeCity}
                            onSubmit={handleSubmit}
                            playerName={playerName}
                            selectedCities={selectedCities}
                        />
                    )}
                    {phase === "results" && matrix && homeCity !== null && (
                        <>
                            <Board
                                matrix={matrix}
                                homeCity={homeCity}
                                selectedCities={selectedCities}
                                cityLabels={CITY_LABELS}
                            />
                            <Results
                                matrix={matrix}
                                homeCity={homeCity}
                                selectedCities={selectedCities}
                                playerName={playerName}
                                onReset={handleReset}
                            />
                        </>
                    )}
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default App;
