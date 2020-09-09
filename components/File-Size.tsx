import { ListItemIcon, ListItemText } from '@material-ui/core';
import { LoadShimmer, SdCardOutlinedIcon } from 'components';
import { IRelease } from 'models';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';

type FileSizeProps = {
  release: IRelease;
  showLoader?: boolean;
};

const FileSize: React.SFC<FileSizeProps> = ({ release, showLoader }) => {
  const classes = useStyles();

  return release ? (
    <>
      <ListItemIcon>
        <SdCardOutlinedIcon className={classes.icon} />
      </ListItemIcon>
      {!showLoader && (
        <>
          <ListItemText
            primary={
              <FormattedMessage
                id='release.fileSize'
                defaultMessage='File Size'
              />
            }
            secondary={release.size_human}
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

export { FileSize };
