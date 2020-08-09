import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Donations, IconButton, LinkLocale, MenuIcon, Wiki } from "components";
import Router from "next/router";
import { memo, useEffect, useState } from "react";
import useStyles from "styles/mui/drawer";
import { IsCSR } from "utils";
import { LanguageToggle } from "./Language-Toggle";
import Logo from "./Logo";

function Header(props: { toggleClick: () => void }) {
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);
  function startAnimation() {
    setAnimate(true);
  }
  function stopAnimation() {
    setAnimate(false);
  }
  useEffect(() => {
    if (IsCSR) {
      Router.events.on("routeChangeStart", startAnimation);
      Router.events.on("routeChangeComplete", stopAnimation);
      Router.events.on("routeChangeError", stopAnimation);
    }
    return () => {
      if (IsCSR) {
        Router.events.off("routeChangeStart", startAnimation);
        Router.events.off("routeChangeComplete", stopAnimation);
        Router.events.off("routeChangeError", stopAnimation);
      }
    };
  }, []);
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.header}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleClick}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="div" className={classes.headerContent}>
            <Logo animate={animate} />

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
    </>
  );
}

export default memo(Header);
