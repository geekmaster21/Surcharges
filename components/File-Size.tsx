import { ListItemIcon, ListItemText } from '@material-ui/core';
import { SdCardOutlinedIcon } from 'components';
import { IRelease, Variants } from 'models';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';

type FileSizeProps = {
  release: IRelease;
  variant: keyof Variants;
};

const FileSize: React.FunctionComponent<FileSizeProps> = ({
  release,
  variant,
}) => {
  const classes = useStyles();
  const size_human =
    Math.round((release.variants[variant].size / 1e6 + Number.EPSILON) * 100) /
    100;

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
