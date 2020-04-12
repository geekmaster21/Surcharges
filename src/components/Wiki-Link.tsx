import React from 'react';

interface WikiProps {
    label: string,
    className: string
}

const WikiLink: React.SFC<WikiProps> = ({ label, className }) => {
    return (
        <a href="https://wiki.orangefox.tech" className={className} target="_blank" rel="noopener noreferrer">{label}</a>
    );
}

export { WikiLink };
