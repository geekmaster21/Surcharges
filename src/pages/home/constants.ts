import { Theme } from "@material-ui/core";
import { makeStyles } from "../../components";

const drawerWidth = 300;

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        // height: '100%',
        // minHeight: 'calc(100vh - 50px)'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        backgroundColor: '#ed7002',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        alignItems: 'baseline'
    },
    menuButton: {
        marginRight: theme.spacing(0.5),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    header: {
        width: '100%',
        // height: '60px', // should be same as 'routeContent' ht
        minHeight: '100%',
    },
    headerContent: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    brand: {
        fontFamily: 'Euclid',
        fontWeight: 500,
        fontSize: '15pt'
    },
    recoverySmall: {
        fontFamily: 'Euclid',
        fontWeight: 400,
        fontSize: '10pt'
    },
    drawerPaper: {
        width: drawerWidth,
        boxShadow: '0 0 5px black'
    },
    routeContent: {
        // marginTop: '50px', // should be same as 'header' ht
        flexGrow: 1,
        height: '100%',
        padding: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
        minHeight: 'calc(100vh - 112px)'
    },
}));
