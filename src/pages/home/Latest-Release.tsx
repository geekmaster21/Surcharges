import React from 'react';

const LatestRelease: React.SFC = () => {
    return (
        <div id="latestRelease" className="hash-wrapper">
            <div className="title-container">
                <span className="hash">#</span>
                <span className="title">latest_releases</span>
            </div>
            <div className="contents">
                <div className="card">
                    <span className="detail">
                        Build v2020-11-10
                    </span>
                    <span className="sub-detail">
                        Realme 3 Pro
                    </span>
                </div>
                <div className="card">
                    <span className="detail">
                        Build v2020-11-11
                    </span>
                    <span className="sub-detail">
                        Asus Zenfone 3
                    </span>
                </div>
                <div className="card">
                    <span className="detail">
                        Build v2020-11-12
                    </span>
                    <span className="sub-detail">
                        Xiaomi Note 8
                    </span>
                </div>
                <div className="card">
                    <span className="detail">
                        Build v2020-11-10
                    </span>
                    <span className="sub-detail">
                        Realme 3 Pro
                    </span>
                </div>

            </div>
        </div>
    );
}

export { LatestRelease };
