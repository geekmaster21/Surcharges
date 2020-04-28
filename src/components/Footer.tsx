import React from 'react';
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import { PoweredBy } from './Powered-By';
import { FormattedMessage } from 'react-intl';

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
    return (
        <footer >
            <Paper elevation={3} className={classes.root} >
                <a href="https://gitlab.com/OrangeFox/site/dsite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={"link " + classes.mx}
                >
                    <FormattedMessage
                        id="footer.openSource"
                        defaultMessage="Open-Source Project" />
                </a>
                &#x25CF;
                <span className={classes.mx}>
                    <PoweredBy />
                </span>
            </Paper>
        </footer>
    );
}

export { Footer };
