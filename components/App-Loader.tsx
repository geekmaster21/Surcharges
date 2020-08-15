import Backdrop from "@material-ui/core/Backdrop";
import Router from "next/router";
import { useEffect, useState } from "react";
import useStyles from "styles/mui/app-loader";
import { IsCSR } from "utils";
import Logo from "./Logo";

export default function AppLoader() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  useEffect(() => {
    if (IsCSR) {
      Router.events.on("routeChangeStart", show);
      Router.events.on("routeChangeComplete", hide);
      Router.events.on("routeChangeError", hide);
    }
    return () => {
      if (IsCSR) {
        Router.events.off("routeChangeStart", show);
        Router.events.off("routeChangeComplete", hide);
        Router.events.off("routeChangeError", hide);
      }
    };
  }, []);

  return (
    <Backdrop className={classes.loader} open={open}>
      <Logo />
    </Backdrop>
  );
}
