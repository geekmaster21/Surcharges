import { makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  formControl: {
    marginRight: "-8px",
    [theme.breakpoints.up("sm")]: {
      marginRight: "-16px",
    },
    marginLeft: theme.spacing(3),
    outline: "none",
  },
  listItem: {
    borderLeft: "3px solid transparent",
  },
  listItemSelected: {
    borderLeft: "3px solid var(--orange-1)",
  },
  select: {
    color: "var(--orange-1)",
    width: "55px",
    marginRight: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(3),
    },
  },
  arrowIcon: {
    fontSize: "20px",
    marginTop: "2px",
    color: "white",
  },
}));
