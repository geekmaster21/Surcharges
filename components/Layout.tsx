import { Drawer, Hidden } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Footer } from 'components';
import { IChildren } from 'models';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useStyles from 'styles/mui/layout';
import AppLoader from './App-Loader';
import DeviceList, { DeviceListState } from './Device-List';
import Header from './Header';

export function Layout({ children }: IChildren) {
  const router = useRouter();
  const classes = useStyles();
  const [listState, setListState] = useState<DeviceListState>({
    search: '',
    filterByAll: false,
    allDevices: undefined,
    supportedDevices: undefined,
  });
  const [mobileDrawer, setMobileDrawer] = useState(false);

  function toggleDrawer() {
    setMobileDrawer(s => !s);
  }

  if (router.pathname.includes('sitemap')) {
    return <>{children}</>;
  }

  return (
    <>
      <Header toggleClick={toggleDrawer} />
      <div className={classes.root}>
        <nav className={classes.drawer}>
          {/* Mobile */}
          <Hidden smUp implementation='css'>
            <SwipeableDrawer
              anchor='left'
              open={mobileDrawer}
              onOpen={toggleDrawer}
              onClose={toggleDrawer}
              classes={{ paper: classes.drawerPaper }}
            >
              <DeviceList
                {...listState}
                onUpdate={setListState}
                onDeviceClick={toggleDrawer}
              />
            </SwipeableDrawer>
          </Hidden>
          {/* Desktop */}
          <Hidden xsDown implementation='css'>
            <Drawer
              open
              variant='permanent'
              classes={{ paper: classes.drawerPaper }}
            >
              <DeviceList {...listState} onUpdate={setListState} />
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
