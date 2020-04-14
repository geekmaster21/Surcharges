import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import MatListItem from '@material-ui/core/ListItem';
import { ExpandLess, ExpandMore } from '../Icons';
import { List } from './List';

interface ListProps<T = any> {
    data: T;
    keyParent?: string;
    className?: string;
    keyChildren?: string;
    fieldChildren?: string;
    onClickChild: (d: T) => void;
    onClickParent: (d: T) => void;
    ContentChild: (d: T) => JSX.Element;
    ContentParent: (d: T) => JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nested: {
            paddingLeft: theme.spacing(2),
        },
    }),
);

export const ListItem: React.SFC<ListProps> = ({
    data, className, ContentParent, keyParent,
    keyChildren, ContentChild, fieldChildren,
    onClickChild, onClickParent }) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const children = (data[fieldChildren || 'children'] as any[]) || [];

    if (!children.length) {
        return (
            <MatListItem button
                className={classes.nested}>
                {ContentParent(data)}
            </MatListItem>
        )
    }

    const handleClick = () => setOpen(!open);

    return (<>
        <MatListItem button
            onClick={handleClick}
            className={className || classes.nested}>
            {ContentParent(data)}
            {open ? <ExpandLess /> : <ExpandMore />}
        </MatListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
            {
                children.map(child => (
                    (child[fieldChildren || 'children']) ?
                        (
                            <List
                                data={child}
                                component="div"
                                ContentParent={data}
                                ContentChild={child}
                                keyParent={keyParent}
                                keyChildren={keyChildren}
                                onClickChild={onClickChild}
                                onClickParent={onClickParent}
                                key={child[keyChildren || 'key']}
                            />
                        ) : (
                            <MatListItem button
                                className={classes.nested}
                                onClick={e => onClickChild && onClickChild(child)}
                                key={child[keyChildren || 'key']}>
                                {ContentChild(child)}
                            </MatListItem>
                        )
                ))
            }
        </Collapse>
    </>);
}
