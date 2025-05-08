import React from 'react';
import styles from './Tower.module.css';

const Tower = ({ pegName, disks, onClick, selected }) => {
    return (
        <div className={styles.tower} onClick={onClick}>
            <h3 className={styles.pegLabel}>Peg {pegName}</h3>
            <div className={`${styles.peg} ${selected ? styles.selected : ''}`}>
                <div className={styles.rod}></div> {/* Added rod element */}
                {disks.map((disk, index) => (
                    <div
                        key={index}
                        className={styles.disk}
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