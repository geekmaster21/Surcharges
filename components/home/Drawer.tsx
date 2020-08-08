import {
  AppBar,
  Drawer as DrawerDesktop,
  Hidden,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton, MenuIcon, Wiki } from "components/common";
import { Donations } from "components/common/Donation";
import { LinkLocale } from "components/common/Link-Locale";
import { IDevice } from "models";
import { useState } from "react";
import useStyles from "styles/mui/drawer";
import { DeviceListWrapper } from "./Device-List-Wrapper";
import { LanguageToggle } from "./Language-Toggle";

const Drawer: React.SFC<{ list: IDevice[] }> = ({ list }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = (toggle: boolean) => setMobileOpen(toggle);

  // TODO: Delete this commented code, once app is updated for SEO
  // if (list.length) {
  //   let sitemap = "",
  //     links = "";
  //   list.forEach((f) => {
  //     sitemap += `
  //     <url>
  //       <loc>https://orangefox.download/device/${f.codename}</loc>
  //       <lastmod>${new Date().toISOString()}</lastmod>
  //       <priority>1.00</priority>
  //     </url>`;
  //     links += `
  //     <a style="height:0; width:0" href="/device/${f.codename}">
  //     ${f.fullname} | OrangeFox Recovery Downloads
  //     </a>`;
  //   });
  //   console.log("links", links);
  //   console.log("sitemap", sitemap);
  // }

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.header}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => handleDrawerToggle(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="div" className={classes.headerContent}>
            <LinkLocale
              ATagProps={{
                className: "link no-hover " + classes.brand,
              }}
            >
              OrangeFox <span className={classes.recoverySmall}>Recovery</span>
            </LinkLocale>
          </Typography>

          <Donations
            className={"link no-hover " + classes.headerContentRight}
          />
          <Wiki className={"link no-hover " + classes.headerContentRight} />
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
            classes={{ paper: classes.drawerPaper }}
          >
            <DeviceListWrapper
              data={list}
              handleDeviceClick={() => handleDrawerToggle(false)}
            />
          </SwipeableDrawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <DrawerDesktop
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            open
          >
            <DeviceListWrapper data={list} />
          </DrawerDesktop>
        </Hidden>
      </nav>
    </>
  );
};

export { Drawer };
