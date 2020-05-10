import React, { useEffect } from 'react';
import { apiGetAllDeviceList } from '../../apis';
import {
    AppBar, Drawer as DrawerDesktop, Hidden,
    IconButton, LinkLocale, Toolbar, Typography
} from '../../components';
import { BookOutlinedIcon, MenuIcon } from '../../components/Icons';
import { IDevice } from '../../models';
import { useStyles } from './constants';
import { DeviceList } from './Device-List';
import { DrawerMobile } from './Drawer-Mobile';
import { LanguageToggle } from './Language-Toggle';

const Drawer: React.SFC = () => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [list, setDeviceList] = React.useState<IDevice[]>([]);
    const handleDrawerToggle = (toggle: boolean) => setMobileOpen(toggle);

    useEffect(() => {
        apiGetAllDeviceList()
            .then(data => setDeviceList(data))
            .catch(() => setDeviceList(undefined as any));
    }, []);

    return (<>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.header}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    className={classes.menuButton}
                    onClick={() => handleDrawerToggle(true)}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    component="div"
                    className={classes.headerContent}
                >
                    <LinkLocale to="/"
                        className={'link no-hover ' + classes.brand}
                    >
                        OrangeFox <span className={classes.recoverySmall}>Recovery</span>
                    </LinkLocale>

                    <div className={classes.headerControls}>
                        <a
                            target="_blank"
                            href="https://wiki.orangefox.tech"
                            title="OrangeFox Wiki"
                            rel="noopener noreferrer"
                            className={'link no-hover ' + classes.headerContentRight}
                        >
                            <IconButton
                                color="inherit"
                                aria-label="Open Wiki link"
                                edge="end"
                            >
                                <BookOutlinedIcon />
                            </IconButton>
                        </a>

                        <LanguageToggle />

                    </div>

                </Typography>
            </Toolbar>
        </AppBar>

        <nav className={classes.drawer} >
            <Hidden smUp implementation="css">
                <DrawerMobile
                    openDrawer={mobileOpen}
                    onStateChange={handleDrawerToggle}
                >
                    <DeviceList
                        data={list}
                        handleDeviceClick={() => handleDrawerToggle(false)}
                    />
                </DrawerMobile>
            </Hidden>
            <Hidden xsDown implementation="css">
                <DrawerDesktop
                    open
                    variant="permanent"
                    classes={{ paper: classes.drawerPaper }}
                >
                    <DeviceList data={list} />
                </DrawerDesktop>
            </Hidden>
        </nav>
    </>);
}

export { Drawer };
