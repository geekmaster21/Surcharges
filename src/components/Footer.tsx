import React from 'react';
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';

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
                Powered by <a href='https://www.ua-hosting.company'
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                >UA-Hosting Company</a>
            </Paper>
        </footer>
    );
}

export { Footer };
