import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "50px",
      display: "flex",
      fontSize: "13.5",
      alignItems: "center",
      placeContent: "flex-end",
      [theme.breakpoints.down("xs")]: {
        fontSize: "11px",
        textAlign: "center",
      },
    },
    mx: {
      margin: "0 5px",
    },
  })
);
