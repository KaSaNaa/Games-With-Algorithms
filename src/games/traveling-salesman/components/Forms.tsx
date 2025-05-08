import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type FormsProps = {
    cityLabels: string[];
    homeCity: number;
    onSubmit: (name: string, cities: number[]) => void;
    playerName: string;
    selectedCities: number[];
};

function Forms({ cityLabels, homeCity, onSubmit, playerName, selectedCities }: FormsProps) {
    const [name, setName] = useState(playerName);
    const [cities, setCities] = useState<number[]>(selectedCities);
    const [error, setError] = useState<string | null>(null);

    const MAX_CITIES = 9; // Can't select all (must exclude home)
    const MIN_CITIES = 2;
    const MAX_BRUTE = 7;

    const handleCityChange = (cityIdx: number) => {
        setCities(prev =>
            prev.includes(cityIdx)
                ? prev.filter(c => c !== cityIdx)
                : prev.length < MAX_CITIES
                    ? [...prev, cityIdx]
                    : prev
        );
    };

    const validate = () => {
        if (!name.trim()) return "Please enter your name.";
        if (cities.length < MIN_CITIES) return "Select at least 2 cities to visit.";
        if (cities.includes(homeCity)) return "Cannot select home city.";
        if (cities.length > MAX_CITIES) return `Cannot select more than ${MAX_CITIES} cities.`;
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setError(err);
            return;
        }
        setError(null);
        onSubmit(name.trim(), cities);
    };

    const helperText = `Pick ${MIN_CITIES}–${MAX_CITIES} cities (Brute Force supports up to ${MAX_BRUTE})`;

    const isInvalid = !!validate();

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                mb: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#f8fafc",
                borderRadius: 2,
                p: 4,
                minWidth: 320,
                boxShadow: "0 1px 8px #1976d211"
            }}
        >
            <TextField
                label="Player Name"
                value={name}
                onChange={e => setName(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 3, width: 260, background: "#fff", borderRadius: 1 }}
                inputProps={{ maxLength: 24 }}
                required
            />
            <Typography sx={{ mb: 1, fontWeight: 600, color: "primary.dark" }}>
                Select cities to visit (excluding home city <Box component="span" sx={{ color: "#ff9800" }}>{cityLabels[homeCity]}</Box>):
            </Typography>
            <Typography sx={{ fontSize: 13, color: "grey.700", mb: 1 }}>{helperText}</Typography>
            <FormGroup row sx={{ mb: 2, gap: 1 }}>
                {cityLabels.map((label, idx) => (
                    <FormControlLabel
                        key={label}
                        control={
                            <Checkbox
                                checked={cities.includes(idx)}
                                onChange={() => handleCityChange(idx)}
                                disabled={idx === homeCity || (cities.length >= MAX_CITIES && !cities.includes(idx))}
                                sx={{
                                    color: idx === homeCity ? "#ff9800" : "#1976d2",
                                    "&.Mui-checked": { color: "#1976d2" }
                                }}
                            />
                        }
                        label={<span style={{ fontWeight: 500, color: idx === homeCity ? "#ff9800" : "#222" }}>{label}</span>}
                    />
                ))}
            </FormGroup>
            {error && <Alert severity="error" sx={{ mt: 2, width: 260 }}>{error}</Alert>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    mt: 3,
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    fontSize: 16,
                    borderRadius: 2,
                    background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)"
                }}
                disabled={isInvalid}
            >
                Submit
            </Button>
        </Box>
    );
}

export default Forms;
