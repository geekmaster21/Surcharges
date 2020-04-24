import { makeStyles, createStyles } from "../../components";
import { Theme } from "@material-ui/core";

export const useStylesExpansion = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: '#2a2a2a',
        },
        icon: {
            color: '#ddd',
        },
        iconM5: {
            color: '#ddd',
            marginRight: '5px'
        },
        flexText: {
            display: 'flex',
            alignItems: 'center'
        },
        details: {
            display: 'flex',
            padding: '5px 10px 10px',
            flexDirection: 'column'
        }
    }),
);
