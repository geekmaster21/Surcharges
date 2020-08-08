import { makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    routeContent: {
        flexGrow: 1,
        height: '100%',
        marginTop: "var(--header-ht)",
        padding: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
        minHeight: 'calc(100vh - 112px)'
    },
}));
