import {
  Collapse,
  createStyles,
  ListItem,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from 'components';
import { useState } from 'react';
import { DeviceList } from './Device-List';

interface ListProps<T = any> {
  data: T;
  expanded?: boolean;
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
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1.6)}px`,
      fontSize: theme.typography.caption.fontSize,
    },
  })
);

export const DeviceListItem: React.FunctionComponent<ListProps> = ({
  data,
  className,
  ContentParent,
  keyParent,
  keyChildren,
  ContentChild,
  fieldChildren,
  onClickChild,
  onClickParent,
  expanded,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(expanded);
  const children = (data[fieldChildren || 'children'] as any[]) || [];

  if (!children.length) {
    return (
      <ListItem button className={classes.nested}>
        {ContentParent(data)}
      </ListItem>
    );
  }

  const handleClick = () => setOpen(!open);

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        className={className || classes.nested}
      >
        {ContentParent(data)}
        {open ? (
          <ExpandLess fontSize='small' />
        ) : (
          <ExpandMore fontSize='small' />
        )}
      </ListItem>

      <Collapse in={open} timeout='auto' unmountOnExit>
        {children.map(child =>
          child[fieldChildren || 'children'] ? (
            <DeviceList
              data={child}
              component='div'
              expanded={expanded}
              ContentParent={data}
              ContentChild={child}
              keyParent={keyParent}
              keyChildren={keyChildren}
              onClickChild={onClickChild}
              onClickParent={onClickParent}
              key={child[keyChildren || 'key']}
            />
          ) : (
            <ListItem
              button
              className={classes.nested}
              onClick={() => onClickChild && onClickChild(child)}
              key={child[keyChildren || 'key']}
            >
              {ContentChild(child)}
            </ListItem>
          )
        )}
      </Collapse>
    </>
  );
};
