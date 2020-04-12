import React from 'react';
import { Link } from "@reach/router";

const Metrics: React.SFC = () => {
    return (
        <div className="metrics">
            <Link to="/device" className="link">
                <div className="card">
                    <span className="name">
                        Devices
                    </span>
                    <span className="counter">
                        100
                    </span>
                </div>
            </Link>
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
