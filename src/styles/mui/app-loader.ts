import { makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
    loader: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
