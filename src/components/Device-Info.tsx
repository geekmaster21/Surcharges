import {
  Accordion,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { IDeviceWithMaintainer } from 'models';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/device-info';
import {
  PermDeviceInformationOutlinedIcon,
  PermIdentityOutlinedIcon,
  ReportProblemOutlined,
} from './Icons';
import { LinkifyMessage } from './Linkify-Message';
import { LoadShimmer } from './Load-Shimmer';

const DeviceInfo = (device: IDeviceWithMaintainer) => {
  const classes = useStyles();
  const maintainer = device.maintainer?.name || 'None';
  let maintainPrimaryText: JSX.Element | null = null;
  let maintainSecondaryText: JSX.Element | null = null;

  if (device.supported) {
    maintainPrimaryText = (
      <FormattedMessage
        id='maintain.status.maintained'
        defaultMessage='Maintained'
      />
    );

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

  const showLoader = !device?.full_name;

  return (
    <Accordion defaultExpanded className={classes.root} expanded>
      <AccordionDetails className={classes.details}>
        <List component='ul' className={classes.list}>
          <ListItem>
            <ListItemIcon>
              <PermDeviceInformationOutlinedIcon className={classes.icon} />
            </ListItemIcon>

            {!showLoader && (
              <>
                <ListItemText
                  primary={
                    device.full_name + (device.ab_device ? ' [A/B]' : '')
                  }
                  secondary={device.codename}
                />
              </>
            )}

            {/* Loading Placeholder */}
            {showLoader && (
              <>
                <ListItemText
                  primary={<LoadShimmer />}
                  secondary={<LoadShimmer />}
                />
              </>
            )}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PermIdentityOutlinedIcon className={classes.icon} />
            </ListItemIcon>

            {!showLoader && (
              <>
                <ListItemText
                  primary={maintainPrimaryText}
                  secondary={maintainSecondaryText}
                />
              </>
            )}

            {/* Loading Placeholder */}
            {showLoader && (
              <>
                <ListItemText
                  primary={<LoadShimmer />}
                  secondary={<LoadShimmer />}
                />
              </>
            )}
          </ListItem>
        </List>

        {device.notes && (
          <Alert severity='info' variant='outlined' className={classes.alert}>
            <LinkifyMessage msg={device.notes} />
          </Alert>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export { DeviceInfo };
