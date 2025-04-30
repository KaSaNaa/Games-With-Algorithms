import React from 'react';
import './Tower.css';

const Tower = ({ pegName, disks, onClick, selected }) => {
    return (
        <div className="tower" onClick={onClick}>
            <h3 className="peg-label">Peg {pegName}</h3>
            <div className={`peg ${selected ? 'selected' : ''}`}>
                {disks.map((disk, index) => (
                    <div
                        key={index}
                        className="disk"
                        style={{ width: `${disk * 20 + 40}px` }}
                    >
                        {disk}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tower;
