import React from 'react';
import { BookOutlinedIcon } from './Icons';

interface WikiProps {
    label: string,
    className: string
}

const WikiLink: React.SFC<WikiProps> = ({ label, className }) => {
    return (<>
        <a
            target="_blank"
            className={className}
            rel="noopener noreferrer"
            href="https://wiki.orangefox.tech"
        >
            <span className="flexd v-center">
                <BookOutlinedIcon
                    fontSize="small"
                    style={{ marginRight: '5px' }} />
                {label}
            </span>
        </a>
    </>);
}

export { WikiLink };
