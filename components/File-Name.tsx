import { ListItemIcon, ListItemText } from '@material-ui/core';
import { AccessTimeOutlinedIcon, LoadShimmer } from 'components';
import { IRelease, Variants } from 'models';
import useStyles from 'styles/mui/release';
import FileDate from './File-Date';

type FileNameProps = {
  release: IRelease;
  showLoader?: boolean;
  variant: keyof Variants;
};

const FileName: React.FunctionComponent<FileNameProps> = ({
  release,
  variant,
  showLoader,
}) => {
  const classes = useStyles();

  return release ? (
    <>
      <ListItemIcon>
        <AccessTimeOutlinedIcon className={classes.icon} />
      </ListItemIcon>

      <ListItemText
        primary={
          showLoader ? <LoadShimmer /> : release.variants[variant].filename
        }
        secondary={<FileDate release={release} />}
      />
    </>
  ) : null;
};

export default FileName;
