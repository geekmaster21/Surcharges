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
import { isMobile } from "../../utils";
import { DeviceList } from "./Device-List";
import { DrawerMobile } from "./Drawer-Mobile";
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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={classes.menuButton}
            onClick={() => handleDrawerToggle(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="div" className={classes.headerContent}>
            <LinkLocale to="/" className={"link no-hover " + classes.brand}>
              OrangeFox <span className={classes.recoverySmall}>Recovery</span>
            </LinkLocale>

            <div className={classes.headerControls}>
              <Donations
                className={"link no-hover " + classes.headerContentRight}
              />

              <Wiki className={"link no-hover " + classes.headerContentRight} />

              <LanguageToggle />
            </div>
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp={isMobile} xsDown={!isMobile} implementation="css">
          {isMobile ? (
            <DrawerMobile
              openDrawer={mobileOpen}
              onStateChange={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
            >
              <DeviceList
                data={list}
                handleDeviceClick={() => handleDrawerToggle(false)}
              />
            </DrawerMobile>
          ) : (
            <DrawerDesktop
              open
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
            >
              <DeviceList data={list} />
            </DrawerDesktop>
          )}
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
