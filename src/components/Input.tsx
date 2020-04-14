import React from 'react';
import { createStyles, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';

export interface InputProps {
    id?: string;
    label: string;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    [p: string]: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(2),
        },
    }),
);

const Input: React.SFC<InputProps> = ({ id, label, startIcon, endIcon, ...rest }) => {
    const classes = useStyles();
    return (
        <TextField
            label={label}
            id={id || label}
            className={classes.margin}
            {...rest}
            InputProps={{
                startAdornment: startIcon && (
                    <InputAdornment position="start">
                        {startIcon}
                    </InputAdornment>
                ),
                endAdornment: endIcon && (
                    <InputAdornment position="end">
                        {endIcon}
                    </InputAdornment>
                ),
            }}
            variant="standard"
        />
    );
}

export { Input };
