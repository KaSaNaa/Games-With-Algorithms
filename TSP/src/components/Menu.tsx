import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type MenuProps = {
    onStart: () => void;
};

function Menu({ onStart }: MenuProps) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Button
                variant="contained"
                color="primary"
                onClick={onStart}
                sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: 18,
                    background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px #1976d222"
                }}
            >
                Start TSP Game
            </Button>
        </Box>
    );
}

export default Menu;
