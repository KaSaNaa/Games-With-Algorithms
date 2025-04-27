import React from "react";

type CellProps = {
  value: string;
  onClick: () => void;
  disabled: boolean;
};

export const Cell: React.FC<CellProps> = ({ value, onClick, disabled }) => (
  <button
    style={{
      width: 40,
      height: 40,
      fontSize: 24,
      cursor: disabled ? "not-allowed" : "pointer",
      background: "#fff",
      border: "1px solid #888",
    }}
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);
