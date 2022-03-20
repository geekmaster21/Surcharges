import { ListItemIcon, ListItemText } from '@material-ui/core';
import { SdCardOutlinedIcon } from 'components';
import { IReleaseWithDetails } from 'models';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';

type FileSizeProps = {
  release: IReleaseWithDetails;
};

const FileSize: React.FunctionComponent<FileSizeProps> = ({ release }) => {
  const classes = useStyles();
  const size_human =
    Math.round((release.size / 1e6 + Number.EPSILON) * 100) / 100;

  return release ? (
    <>
      <ListItemIcon>
        <SdCardOutlinedIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText
        primary={
          <FormattedMessage id='release.fileSize' defaultMessage='File Size' />
        }
        secondary={size_human + ' mb'}
      />
    </>
  ) : null;
};

export default FileSize;
