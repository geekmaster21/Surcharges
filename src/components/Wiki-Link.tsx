import React from 'react';
import { BookOutlinedIcon } from './Icons';

interface WikiProps {
    label: string,
    className: string
}

const WikiLink: React.SFC<WikiProps> = ({ label, className }) => {
    return (< >
        <a href="https://wiki.orangefox.tech" className={className} target="_blank" rel="noopener noreferrer">
            <span style={{ display: 'flex' }}>
                <BookOutlinedIcon fontSize="small" style={{ marginRight: '5px' }} />
                {label}
            </span>
        </a>
    </>);
}

export { WikiLink };
