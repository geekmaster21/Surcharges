import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { getAllDeviceList } from '../../apis';
import { AppBar, Drawer, Hidden, IconButton, makeStyles, Toolbar, Typography, useTheme, WikiLink } from '../../components';
import { MenuIcon } from '../../components/Icons';
import { IDevice } from '../../models';
import { DeviceList } from './Device-List';

export interface HomeProps extends RouteComponentProps { }

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    header: {
        width: '100%',
        minHeight: '100%',
    },
    headerContent: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    brand: {
        fontFamily: 'Euclid'
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        // backgroundColor: theme.palette.primary.main
    },
}));

const Home: React.SFC<HomeProps> = ({ children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const [list, setDeviceList] = useState<IDevice[]>([]);

    useEffect(() => {
        getAllDeviceList()
            .then(data => setDeviceList(data));
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.header}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.headerContent}>
                        <span className={classes.brand} >
                            OrangeFox Recovery
                        </span>
                        <WikiLink label="Wiki" className="link no-hover" />
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <DeviceList data={list} />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <DeviceList data={list} />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {children}
            </main>
        </div>
    );
}

export { Home };
