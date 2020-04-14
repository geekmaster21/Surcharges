import React from 'react';
import MatList from '@material-ui/core/List';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ListItem } from './List-Item';

interface ListProps<T = any> {
    data: T[];
    component?: string;
    keyParent?: string;
    keyChildren?: string;
    fieldChildren?: string;
    onClickChild?: (d: T) => void;
    onClickParent?: (d: T) => void;
    ContentChild: (d: T) => JSX.Element;
    ContentParent: (d: T) => JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 400,
            backgroundColor: theme.palette.background.paper,
        }
    }),
);

export const List: React.SFC<ListProps> = ({
    data, keyParent, keyChildren, fieldChildren,
    onClickChild, onClickParent,
    ContentChild, ContentParent }) => {
    const classes = useStyles();
    const list = Array.isArray(data) ? data : [data];
    return (
        <MatList
            component="nav">
            {
                list.map(d => (
                    <ListItem
                        data={d}
                        keyParent={keyParent}
                        className={classes.root}
                        keyChildren={keyChildren}
                        key={d[keyParent || 'key']}
                        ContentChild={ContentChild}
                        ContentParent={ContentParent}
                        fieldChildren={fieldChildren}
                        onClickChild={e => onClickChild && onClickChild(e)}
                        onClickParent={e => onClickParent && onClickParent(e)}
                    />
                ))
            }
        </MatList>
    );
}
