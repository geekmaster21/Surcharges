import React from 'react';
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import { PoweredBy } from './Powered-By';
import { FormattedMessage } from 'react-intl';
import { OpenOutside } from './Open-Outside';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            placeContent: 'flex-end',
        },
        mx: {
            margin: '0 10px'
        },
    }),
);

const Footer: React.SFC = () => {
    const classes = useStyles();
    const Dot = () => <>&#x25CF;</>;

    return (
        <footer >
            <Paper
                elevation={3}
                className={classes.root}
            >
                <OpenOutside
                    href="https://gitlab.com/OrangeFox/infrastructure/dsite"
                    className={"link " + classes.mx}
                >
                    <FormattedMessage
                        id="footer.openSource"
                        defaultMessage="Open-Source Project"
                    />
                </OpenOutside>
                <Dot />
                <span className={classes.mx}>
                    <PoweredBy />
                </span>
            </Paper>
        </footer >
    );
}

export { Footer };
