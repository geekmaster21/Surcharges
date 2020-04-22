import React from 'react';
import { BookOutlinedIcon } from './Icons';

interface WikiProps {
    label: string,
    className: string
}

const WikiLink: React.SFC<WikiProps> = ({ label, className }) => {
    return (<span style={{ display: 'flex' }} >
        <BookOutlinedIcon fontSize="small" style={{ marginRight: '5px' }} />
        <a href="https://wiki.orangefox.tech" className={className} target="_blank" rel="noopener noreferrer">{label}</a>
    </span>);
}

export { WikiLink };
