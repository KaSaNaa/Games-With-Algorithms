import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { bruteForceTSP } from "../algorithms/BruteForce";
import { nearestNeighborTSP } from "../algorithms/NearestNeighbor";
import { saveTSPResult, exportTSPResults } from "../utils/localStorage";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { geneticTSP } from "../algorithms/Genetic";

type ResultsProps = {
    matrix: number[][];
    homeCity: number;
    selectedCities: number[];
    playerName: string;
    onReset: () => void;
};

function Results({ matrix, homeCity, selectedCities, playerName, onReset }: ResultsProps) {
    // Timing helpers
    function timeAlgo<T>(fn: () => T): { result: T; ms: number } {
        const t0 = performance.now();
        const result = fn();
        const t1 = performance.now();
        return { result, ms: t1 - t0 };
    }

    // Brute Force (only if ≤7 cities)
    let brute: { route: number[], distance: number } | null = null;
    let bruteMs = 0;
    if (selectedCities.length > 0 && selectedCities.length <= 7) {
        const { result, ms } = timeAlgo(() => bruteForceTSP(matrix, homeCity, selectedCities));
        brute = result;
        bruteMs = ms;
    }

    // Nearest Neighbor
    const { result: nn, ms: nnMs } = timeAlgo(() => nearestNeighborTSP(matrix, homeCity, selectedCities));

    // Genetic Algorithm
    const { result: ga, ms: gaMs } = timeAlgo(() => geneticTSP(matrix, homeCity, selectedCities));

    // Prepare display
    const algorithms = [
        brute && {
            name: "Brute Force",
            route: brute.route,
            distance: brute.distance,
            ms: bruteMs,
            complexity: "O(n!)"
        },
        {
            name: "Nearest Neighbor",
            route: nn.route,
            distance: nn.distance,
            ms: nnMs,
            complexity: "O(n²)"
        },
        {
            name: "Genetic Algorithm",
            route: ga.route,
            distance: ga.distance,
            ms: gaMs,
            complexity: "O(generations × population × n)"
        }
    ].filter(Boolean) as { name: string; route: number[]; distance: number; ms: number; complexity: string }[];

    // Find shortest
    const minDist = Math.min(...algorithms.map(a => a.distance));
    const shortest = algorithms.find(a => a.distance === minDist);

    // Save state
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        if (!shortest) return;
        saveTSPResult({
            playerName,
            homeCity,
            selectedCities,
            algorithm: shortest.name,
            route: shortest.route,
            distance: shortest.distance,
            date: new Date().toISOString(),
        });
        setSaved(true);
    };

    const handleExport = () => {
        const data = exportTSPResults();
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tsp_results.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Paper
            elevation={2}
            sx={{
                mb: 4,
                p: 4,
                width: 520,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#f8fafc",
                borderRadius: 2,
                boxShadow: "0 1px 8px #1976d211",
                minHeight: 60,
                mt: 2
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                Algorithm Results
            </Typography>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Algorithm</TableCell>
                            <TableCell>Route</TableCell>
                            <TableCell align="right">Distance</TableCell>
                            <TableCell align="right">Time (ms)</TableCell>
                            <TableCell>Complexity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {algorithms.map(algo => (
                            <TableRow
                                key={algo.name}
                                selected={algo.distance === minDist}
                                sx={algo.distance === minDist ? { background: "#e3f2fd" } : {}}
                            >
                                <TableCell>{algo.name}</TableCell>
                                <TableCell>
                                    {[
                                        homeCity,
                                        ...algo.route,
                                        homeCity
                                    ].map((c, i, arr) =>
                                        <span key={i}>{String.fromCharCode(65 + c)}{i < arr.length - 1 ? " → " : ""}</span>
                                    )}
                                </TableCell>
                                <TableCell align="right">{algo.distance}</TableCell>
                                <TableCell align="right">{algo.ms.toFixed(2)}</TableCell>
                                <TableCell>{algo.complexity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={saved}
                >
                    {saved ? "Saved" : "Save Result"}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FileDownloadIcon />}
                    onClick={handleExport}
                >
                    Export
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onReset}
                >
                    Back to Menu
                </Button>
            </Box>
            <Box sx={{ mt: 3, fontSize: 13, color: "grey.700" }}>
                <div>
                    <b>Complexity:</b> Brute Force: O(n!), Nearest Neighbor: O(n²), Genetic: O(generations × population × n)
                </div>
            </Box>
        </Paper>
    );
}

export default Results;
