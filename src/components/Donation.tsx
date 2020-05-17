import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconButton, OpenOutside } from '.';
import { isMobile } from '../utils';
import { MonetizationOnOutlinedIcon } from './Icons';

export interface DonationsProps {
    className?: string
}

const Donations: React.SFC<DonationsProps> = ({ className }) => {
    return (<>
        <OpenOutside
            title="Donations"
            className={className}
            href="https://opencollective.com/orangefox"
        >
            <IconButton
                edge="end"
                color="inherit"
                aria-label="Open Donations link"
            >
                <MonetizationOnOutlinedIcon />
            </IconButton>

            {!isMobile && (
                <span style={{ marginLeft: '3px' }}>
                    <FormattedMessage
                        id="mainPage.donation"
                        defaultMessage="Donations"
                    />
                </span>
            )}
        </OpenOutside>
    </>);
}

export { Donations };
