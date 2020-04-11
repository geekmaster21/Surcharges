import React from 'react';

const Metrics: React.SFC = () => {
    return (
        <div className="metrics">
            <div className="card">
                <span className="name">
                    Devices
            </span>
                <span className="counter">
                    100
            </span>
            </div>
            <div className="card">
                <span className="name">
                    Downloads
            </span>
                <span className="counter">
                    999999
            </span>
            </div>
        </div>
    );
}

export { Metrics };
