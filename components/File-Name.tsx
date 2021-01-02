import { ListItemIcon, ListItemText } from '@material-ui/core';
import { AccessTimeOutlinedIcon } from 'components';
import { IReleaseWithDetails } from 'models';
import useStyles from 'styles/mui/release';
import FileDate from './File-Date';

type FileNameProps = {
  release: IReleaseWithDetails;
};

const FileName: React.FunctionComponent<FileNameProps> = ({ release }) => {
  const classes = useStyles();

  return release ? (
    <>
      <ListItemIcon>
        <AccessTimeOutlinedIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText primary={<FileDate release={release} />} />
    </>
  ) : null;
};

export default FileName;
