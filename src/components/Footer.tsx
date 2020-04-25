import React from 'react';
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import { PoweredBy } from './Powered-By';

export interface FooterProps {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            textAlign: 'right'
        },
    }),
);

const Footer: React.SFC<FooterProps> = () => {
    const classes = useStyles();
    return (
        <footer >
            <Paper elevation={3} className={classes.root} >
                <a href="https://gitlab.com/OrangeFox/site/dsite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    title="Please feel free to contribute!"
                >
                    Open-Source Project
                </a>

                &nbsp;
                &#x25CF;
                &nbsp;

                <PoweredBy />
            </Paper>
        </footer>
    );
}

export { Footer };
