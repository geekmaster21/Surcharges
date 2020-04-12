import React from 'react';
import { RouteComponentProps } from '@reach/router';

export interface LatestReleaseProps extends RouteComponentProps {
    dummyCount?: number
}

const LatestRelease: React.SFC<LatestReleaseProps> = ({ dummyCount = 1 }) => {
    const count = [...Array(dummyCount).keys()]

    return (
        <div id="latestRelease" className="hash-wrapper">
            <div className="title-container">
                <span className="hash">#</span>
                <span className="title">latest_releases</span>
            </div>
            <div className="contents">
                {count.map(c => (<React.Fragment key={c} >
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
                </React.Fragment>))}
            </div>
        </div>
    );
}

export { LatestRelease };
