import { createStyles, makeStyles } from "@material-ui/core";

export default makeStyles(() =>
    createStyles({
        root: {
            height: "50px",
            display: "flex",
            alignItems: "center",
            placeContent: "flex-end",
        },
        mx: {
            margin: "0 10px",
        },
    })
);
