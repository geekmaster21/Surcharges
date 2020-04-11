import React from 'react';
import { Link } from "@reach/router";

const Help: React.SFC = () => {
    return (
        <div id="help" className="hash-wrapper">
            <div className="title-container">
                <span className="hash">#</span>
                <span className="title">need_help_?</span>
            </div>
            <div className="contents" style={{ padding: '5px' }} >
                Please read our <Link to="/wiki" className="link underline" >wiki</Link> page to get help on various topics.
            </div>
        </div>
    );
}

export { Help };
