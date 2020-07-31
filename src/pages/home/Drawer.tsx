import React from "react";
import { apiGetAllDeviceList } from "../../apis";
import {
  AppBar,
  Donations,
  Drawer as DrawerDesktop,
  Hidden,
  IconButton,
  LinkLocale,
  Toolbar,
  Typography,
  Wiki,
} from "../../components";
import { MenuIcon } from "../../components/Icons";
import { IDevice } from "../../models";
import { DeviceList } from "./Device-List";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { LanguageToggle } from "./Language-Toggle";
import { useStyles } from "./style";

const Drawer: React.SFC = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [list, setDeviceList] = React.useState<IDevice[]>([]);
  const handleDrawerToggle = (toggle: boolean) => setMobileOpen(toggle);

  React.useEffect(() => {
    apiGetAllDeviceList()
      .then((data) => setDeviceList(data))
      .catch(() => setDeviceList(undefined as any));
  }, []);

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.header}>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => handleDrawerToggle(true)}
              className={classes.menuButton} >
              <MenuIcon />
          </IconButton>

          <Typography
              component="div"
              className={classes.headerContent} >
              <LinkLocale
                  to="/"
                  className={'link no-hover ' + classes.brand} >
                  OrangeFox <span className={classes.recoverySmall}>Recovery</span>
              </LinkLocale>
          </Typography>
          
          <Donations className={'link no-hover ' + classes.headerContentRight} />
          <Wiki className={'link no-hover ' + classes.headerContentRight} />
          <LanguageToggle />
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
            <SwipeableDrawer
                disableBackdropTransition
                open={mobileOpen}
                anchor="left"
                onOpen={() => handleDrawerToggle(true)}
                onClose={() => handleDrawerToggle(false)}
                classes={{ paper: classes.drawerPaper, }}>

                <DeviceList data={list}
                            handleDeviceClick={() => handleDrawerToggle(false)} />

            </SwipeableDrawer>
        </Hidden>

        <Hidden xsDown implementation="css">
            <DrawerDesktop
                classes={{ paper: classes.drawerPaper, }}
                variant="permanent"
                open >
                <DeviceList data={list} />
            </DrawerDesktop>
        </Hidden>

        {/* <ul className="device-list-seo" role="acts as a ">
          {list?.map((m) => (
            <li key={m.codename}>
              <a href={`/en/device/${m.codename}`}>{m.fullname}</a>
            </li>
          ))}
        </ul> */}
      </nav>
    </>
  );
};

export { Drawer };
