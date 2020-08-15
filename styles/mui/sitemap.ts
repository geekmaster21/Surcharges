import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles(() =>
  createStyles({
    topLogo: {
      width: "100%",
      display: "flex",
      padding: "1vw 0",
      alignItems: "center",
      justifyContent: "center",
    },
    root: {
      width: "100%",
      padding: "2vw",
      display: "grid",
      gap: "10px",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr) )",
    },
    item: {
      display: "flex",
      flexDirection: "column",
    },
    code: {
      fontStyle: "italic",
    },
  })
);
