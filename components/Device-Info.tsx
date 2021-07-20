import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import { IDevice } from 'models';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/device-info';
import {
  PermDeviceInformationOutlinedIcon,
  PermIdentityOutlinedIcon,
  ReportProblemOutlined,
} from './Icons';
import { LinkifyMessage } from './Linkify-Message';
import Divider from '@material-ui/core/Divider';
import { OpenOutside } from 'components';

const DeviceInfo = (device: IDevice) => {
  const classes = useStyles();
  const maintainer = device.maintainer?.name || 'None';
  let maintainPrimaryText: JSX.Element | null = null;
  let maintainSecondaryText: JSX.Element | null = null;

  function stylize(text: string[]) {
    return (text || []).map((m, i) => (
      <span key={m}>
        <span className={classes.themedUnderline}>{m}</span>
        {i === text.length - 1 ? '' : ', '}
      </span>
    ));
  }

  if (device.supported) {
    // maintainPrimaryText = (
    //   <FormattedMessage
    //     id='maintain.status.maintained'
    //     defaultMessage='Maintained'
    //   />
    // );
    maintainPrimaryText = null;

    maintainSecondaryText = (
      <FormattedMessage
        id='maintain.by.current'
        defaultMessage='Maintainer: {maintainer}'
        values={{ maintainer }}
      />
    );
  } else {
    maintainPrimaryText = (
      <span className={classes.notmaintained}>
        <ReportProblemOutlined
          fontSize='small'
          className={classes.notmaintainedIcon}
        />
        &nbsp;
        <FormattedMessage
          id='maintain.status.notMaintained'
          defaultMessage='Not Maintained!'
        />
      </span>
    );

    maintainSecondaryText = (
      <FormattedMessage
        id='maintain.by.previous'
        defaultMessage='Previous Maintainer: {maintainer}'
        values={{ maintainer }}
      />
    );
  }

  const showLoader = !device?._id;

  return (
    <>
      <Paper elevation={2} className={classes.root}>
        <h1 className={classes.deviceHeader}>{device?.title}</h1>
        <p>
          Use release builds for models like {stylize(device?.model_names)}{' '}
          having codenames {stylize(device?.codenames)} from here.
        </p>

        <Divider className={classes.divider} />

        <div className={classes.group}>
          <div>
            <PermIdentityOutlinedIcon className={classes.icon} />
            {maintainSecondaryText}
            {maintainPrimaryText ? <>({maintainPrimaryText})</> : <></>}
          </div>

          <div className={classes.groupedItems}>
            <OpenOutside
              className='link'
              href={device?.installation_instruction}
            >
              <FormattedMessage
                id='support.installation'
                defaultMessage='Installation Guide'
              />
            </OpenOutside>
            <OpenOutside className='link' href={device?.support.telegram_chat}>
              <FormattedMessage
                id='support.chat'
                defaultMessage='Support Chat'
              />
            </OpenOutside>
            <OpenOutside className='link' href={device?.support.forum}>
              <FormattedMessage
                id='support.forum'
                defaultMessage='Support Forum'
              />
            </OpenOutside>
          </div>
        </div>

        {device.notes && (
          <Alert severity='info' variant='outlined' className={classes.alert}>
            <LinkifyMessage msg={device.notes} />
          </Alert>
        )}
      </Paper>
    </>
  );
};

export { DeviceInfo };
