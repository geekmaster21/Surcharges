import React from 'react';

const Logo: React.SFC = () => {
    return (
        <img
            draggable="false"
            src="/images/logo.svg"
            alt="OF Logo"
            className="logo"
        />
    );
}

export { Logo };
