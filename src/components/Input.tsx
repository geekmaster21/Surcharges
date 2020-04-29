import React from 'react';
import { createStyles, InputAdornment, makeStyles, TextField, Theme, TextFieldProps } from '@material-ui/core';

export interface InputProps {
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
        },
    }),
);

const Input: React.SFC<TextFieldProps & InputProps> = ({ startIcon, endIcon, ...rest }) => {
    const classes = useStyles();
    return (
        <TextField
            className={classes.root}
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
        />
    );
}

export { Input };
