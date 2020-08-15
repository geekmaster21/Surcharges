import { List } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DeviceListItem } from "./Device-List-Item";

interface DeviceListProps<T = any> {
  data: T[];
  expanded?: boolean;
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
      width: "100%",
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const DeviceList: React.SFC<DeviceListProps> = ({
  data,
  keyParent,
  keyChildren,
  fieldChildren,
  onClickChild,
  onClickParent,
  expanded,
  ContentChild,
  ContentParent,
}) => {
  const classes = useStyles();
  const list = Array.isArray(data) ? data : [data];
  return (
    <List component="nav">
      {list.map((d) => (
        <DeviceListItem
          data={d}
          expanded={expanded}
          keyParent={keyParent}
          className={classes.root}
          keyChildren={keyChildren}
          key={d[keyParent || "key"]}
          ContentChild={ContentChild}
          ContentParent={ContentParent}
          fieldChildren={fieldChildren}
          onClickChild={(e) => onClickChild && onClickChild(e)}
          onClickParent={(e) => onClickParent && onClickParent(e)}
        />
      ))}
    </List>
  );
};
