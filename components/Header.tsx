import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Donations, IconButton, LinkLocale, MenuIcon, Wiki } from "components";
import { memo } from "react";
import useStyles from "styles/mui/drawer";
import { LanguageToggle } from "./Language-Toggle";

function Header(props: { toggleClick: () => void }) {
  const classes = useStyles();
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
