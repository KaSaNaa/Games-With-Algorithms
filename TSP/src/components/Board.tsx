import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

// Clean, simple, well-spaced positions for 600x440 SVG
const CITY_POSITIONS = [
    [120, 340], // Colombo (SW)
    [260, 180], // Kandy (central)
    [100, 400], // Galle (far SW)
    [520, 60],  // Jaffna (far N)
    [500, 170], // Trincomalee (NE)
    [370, 110], // Anuradhapura (N-central)
    [540, 300], // Batticaloa (E)
    [120, 420], // Matara (far S)
    [210, 110], // Kurunegala (NW)
    [180, 260], // Ratnapura (S-central)
];

type BoardProps = {
    matrix: number[][];
    homeCity: number;
    selectedCities: number[];
    cityLabels: string[];
    route?: number[];
};

function Board({ matrix, homeCity, selectedCities, cityLabels, route }: BoardProps) {
    // Route to draw: home -> selected cities in order -> home
    const drawRoute = route && route.length > 1
        ? [homeCity, ...route, homeCity]
        : [homeCity, ...selectedCities, homeCity];

    return (
        <Paper
            elevation={3}
            sx={{
                mb: 6,
                p: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #e3eafc 0%, #f8fafc 100%)",
                borderRadius: 2,
                boxShadow: "0 2px 12px #1976d211"
            }}
        >
            <Box>
                <svg width={600} height={440} style={{ background: "none" }}>
                    {/* Simple Sri Lanka outline for context */}
                    <path
                        d="M180,60 Q300,20 520,60 Q580,220 540,400 Q300,430 100,400 Q80,250 120,100 Q160,70 180,60"
                        fill="#e3eafc"
                        stroke="#b3c6e6"
                        strokeWidth={2}
                        opacity={0.25}
                    />
                    {/* Legend - top left */}
                    <g>
                        <rect x={20} y={20} width={130} height={90} rx={8} fill="#fff" opacity={0.97} stroke="#1976d2" strokeWidth={1}/>
                        {/* Home City */}
                        <circle cx={36} cy={42} r={7} fill="#ff9800" stroke="#fff" strokeWidth={1.5}/>
                        <text x={50} y={46} fontSize={11} fill="#222" alignmentBaseline="middle">Home City</text>
                        {/* Selected City */}
                        <circle cx={36} cy={62} r={7} fill="#43a047" stroke="#fff" strokeWidth={1.5}/>
                        <text x={50} y={66} fontSize={11} fill="#222" alignmentBaseline="middle">Selected</text>
                        {/* Unselected */}
                        <circle cx={36} cy={82} r={5} fill="#bdbdbd" stroke="#fff" strokeWidth={1.5}/>
                        <text x={50} y={86} fontSize={11} fill="#222" alignmentBaseline="middle">Unselected</text>
                        {/* Route (smaller arrowhead for legend) */}
                        <line x1={36} y1={100} x2={66} y2={100} stroke="#1976d2" strokeWidth={2.5} markerEnd="url(#legend-arrowhead)" />
                        <text x={72} y={104} fontSize={11} fill="#222" alignmentBaseline="middle">Route</text>
                    </g>
                    {/* Draw route edges */}
                    {drawRoute.map((cityIdx, i) => {
                        if (i === drawRoute.length - 1) return null;
                        const [x1, y1] = CITY_POSITIONS[cityIdx];
                        const [x2, y2] = CITY_POSITIONS[drawRoute[i + 1]];
                        return (
                            <line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#1976d2"
                                strokeWidth={3.5}
                                opacity={0.85}
                                markerEnd="url(#arrowhead)"
                                style={{ filter: "drop-shadow(0 1px 2px #1976d233)" }}
                            />
                        );
                    })}
                    <defs>
                        {/* Main route arrowhead (smaller and balanced) */}
                        <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto" markerUnits="strokeWidth">
                            <polygon points="0 0, 7 3.5, 0 7" fill="#1976d2" />
                        </marker>
                        {/* Even smaller arrowhead for legend */}
                        <marker id="legend-arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto" markerUnits="strokeWidth">
                            <polygon points="0 0, 4 2, 0 4" fill="#1976d2" />
                        </marker>
                    </defs>
                    {/* Draw cities */}
                    {CITY_POSITIONS.map(([x, y], idx) => {
                        let fill = "#1976d2";
                        let stroke = "#fff";
                        let r = 10;
                        if (idx === homeCity) {
                            fill = "#ff9800";
                            r = 13;
                        } else if (selectedCities.includes(idx)) {
                            fill = "#43a047";
                            r = 10;
                        } else {
                            fill = "#bdbdbd";
                            r = 7;
                        }
                        return (
                            <g key={idx}>
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={r}
                                    fill={fill}
                                    stroke={stroke}
                                    strokeWidth={2}
                                    style={{ filter: "drop-shadow(0 2px 6px #1976d233)" }}
                                />
                                <text
                                    x={x}
                                    y={y + 4}
                                    textAnchor="middle"
                                    fontSize={idx === homeCity ? 13 : 11}
                                    fill="#fff"
                                    fontWeight="bold"
                                    style={{ textShadow: "0 1px 2px #1976d288" }}
                                >
                                    {cityLabels[idx][0]}
                                </text>
                                {/* City name below the node */}
                                <text
                                    x={x}
                                    y={y + r + 10}
                                    textAnchor="middle"
                                    fontSize={10}
                                    fill="#333"
                                    fontWeight={idx === homeCity ? "bold" : "normal"}
                                    style={{ textShadow: "0 1px 2px #fff8" }}
                                >
                                    {cityLabels[idx]}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </Box>
        </Paper>
    );
}

export default Board;
