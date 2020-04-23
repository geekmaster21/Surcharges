import { makeStyles, createStyles } from "../../components";
import { Theme } from "@material-ui/core";

export const useStylesExpansion = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: '#2a2a2a',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        details: {
            display: 'flex',
            flexDirection: 'column'
        }
    }),
);
