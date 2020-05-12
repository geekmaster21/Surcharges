import { makeStyles, createStyles } from ".."; import { Theme } from "@material-ui/core";

export const useStylesRelease = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.primary.main,
        },
        list: {
            width: '100%',
        },
        icon: {
            color: '#ddd'
        },
        iconM5: {
            marginRight: '5px'
        },
        version: {
            display: 'flex',
            alignItems: 'center'
        },
        details: {
            padding: '5px 10px 10px',
            userSelect: 'text'
        },
        nestedList: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap'
            },
        },
        modal: {
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(3, 4),
            border: 'none',
            borderRadius: '8px',
            outline: 'none !important',
            userSelect: 'text'
        },
        bug: {
            color: '#ff5e5e'
        },
        summary: {
            width: '100%',
            display: 'flex',
            placeContent: 'space-between'
        }
    }),
);
