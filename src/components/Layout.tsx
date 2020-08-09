import { Drawer, Hidden } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Footer } from "components";
import { IChildren, IDevice } from "models";
import { useState } from "react";
import useStyles from "styles/mui/layout";
import AppLoader from "./App-Loader";
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
          <Hidden smUp implementation="css">
            <SwipeableDrawer
              anchor="left"
              open={mobileDrawer}
              onOpen={toggleDrawer}
              onClose={toggleDrawer}
              classes={{ paper: classes.drawerPaper }}
            >
              <DeviceListWrapper data={list} handleDeviceClick={toggleDrawer} />
            </SwipeableDrawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              open
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
            >
              <DeviceListWrapper data={list} />
            </Drawer>
          </Hidden>
        </nav>
        <AppLoader />
        <main className={classes.routeContent}>{children}</main>
      </div>
      <Footer />
    </>
  );
}
