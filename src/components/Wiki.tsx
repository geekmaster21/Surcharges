import React from 'react';
import { IconButton, OpenOutside } from '.';
import { isMobile } from '../utils';
import { BookOutlinedIcon } from './Icons';

export interface WikiProps {
    className?: string
}

const Wiki: React.SFC<WikiProps> = ({ className }) => {
    return (<>
        <OpenOutside
            title="OrangeFox Wiki"
            className={className}
            href="https://wiki.orangefox.tech"
        >
            <IconButton
                edge="end"
                color="inherit"
                aria-label="Open Wiki link"
            >
                <BookOutlinedIcon />
            </IconButton>
            {!isMobile && 'Wiki'}
        </OpenOutside>
    </>);
}

export { Wiki };
