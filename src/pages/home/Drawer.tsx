import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import { apiGetAllDeviceList } from '../../apis';
import { AppBar, Drawer as MatDrawer, Hidden, IconButton, Toolbar, Typography, useTheme, WikiLink } from '../../components';
import { MenuIcon } from '../../components/Icons';
import { IDevice } from '../../models';
import { GetCurrentLocale } from '../../utils';
import { useStyles } from './constants';
import { DeviceList } from './Device-List';

const Drawer: React.SFC = () => {
    const theme = useTheme();
    const classes = useStyles();
    const locale = GetCurrentLocale();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [list, setDeviceList] = React.useState<IDevice[]>([]);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

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
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.headerContent}>
                    <Link className={'link no-hover ' + classes.brand}
                        to={"/" + locale}>
                        OrangeFox Recovery
                        </Link>
                    <WikiLink
                        label="Wiki"
                        className="link no-hover"
                    />
                </Typography>
            </Toolbar>
        </AppBar>

        <nav className={classes.drawer} >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <MatDrawer
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
                    <DeviceList
                        data={list}
                        handleDeviceClick={handleDrawerToggle}
                    />
                </MatDrawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <MatDrawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <DeviceList data={list} />
                </MatDrawer>
            </Hidden>
        </nav>
    </>);
}

export { Drawer };
