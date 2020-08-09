import { Drawer as DrawerDesktop, Hidden } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Footer } from "components";
import { IChildren, IDevice } from "models";
import { useState } from "react";
import useStyles from "styles/mui/layout";
import { DeviceListWrapper } from "./Device-List-Wrapper";
import Header from "./Header";

type Props = IChildren & { list: IDevice[] };

export function Layout({ children, list }: Props) {
  const classes = useStyles();
  const [mobileDrawer, setMobileDrawer] = useState(false);

  function toggleDrawer() {
    setMobileDrawer((s) => !s);
  }

  return (
    <>
      <Header toggleClick={toggleDrawer} />
      <div className={classes.root}>
        <nav className={classes.drawer}>
          <Hidden
            smUp={mobileDrawer}
            xsDown={!mobileDrawer}
            implementation="css"
          >
            <SwipeableDrawer
              anchor="left"
              open={mobileDrawer}
              disableBackdropTransition
              onOpen={toggleDrawer}
              onClose={toggleDrawer}
              classes={{ paper: classes.drawerPaper }}
            >
              <DeviceListWrapper data={list} handleDeviceClick={toggleDrawer} />
            </SwipeableDrawer>

            <DrawerDesktop
              open
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
            >
              <DeviceListWrapper data={list} />
            </DrawerDesktop>
          </Hidden>
        </nav>
        <main className={classes.routeContent}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
