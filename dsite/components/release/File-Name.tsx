import { ListItemIcon, ListItemText } from "@material-ui/core";
import { ArchiveOutlined, LoadShimmer } from "components/common";
import { IRelease } from "models";
import useStyles from "styles/mui/release";
import { FileDate } from "./File-Date";

type FileNameProps = {
  release: IRelease;
  showLoader?: boolean;
};

const FileName: React.SFC<FileNameProps> = ({ release, showLoader }) => {
  const classes = useStyles();

  return release ? (
    <>
      <ListItemIcon>
        <ArchiveOutlined className={classes.icon} />
      </ListItemIcon>
      {!showLoader && (
        <>
          <ListItemText
            primary={release.file_name}
            secondary={<FileDate release={release} />}
          />
        </>
      )}

      {/* Loading Placeholder */}
      {showLoader && (
        <>
          <ListItemText primary={<LoadShimmer />} secondary={<LoadShimmer />} />
        </>
      )}
    </>
  ) : null;
};

export { FileName };
