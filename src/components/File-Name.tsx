import { ListItemIcon, ListItemText } from '@material-ui/core';
import { AccessTimeOutlinedIcon, LoadShimmer } from 'components';
import { IReleaseWithDetails } from 'models';
import useStyles from 'styles/mui/release';
import FileDate from './File-Date';

type FileNameProps = {
  showLoader?: boolean;
  release: IReleaseWithDetails;
};

const FileName: React.FunctionComponent<FileNameProps> = ({
  release,
  showLoader,
}) => {
  const classes = useStyles();

  return release ? (
    <>
      <ListItemIcon>
        <AccessTimeOutlinedIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText
        primary={showLoader ? <LoadShimmer /> : release.filename}
        secondary={<FileDate release={release} />}
      />
    </>
  ) : null;
};

export default FileName;
