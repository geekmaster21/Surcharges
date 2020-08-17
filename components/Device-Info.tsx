import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { IDevice } from "models";
import { FormattedMessage } from "react-intl";
import useStyles from "styles/mui/device-info";
import {
  ExpandMore,
  PermDeviceInformationOutlinedIcon,
  PermIdentityOutlinedIcon,
  ReportProblemOutlined,
} from "./Icons";
import { LoadShimmer } from "./Load-Shimmer";

const DeviceInfo = (device: IDevice) => {
  const classes = useStyles();
  const maintainer = device.maintainer?.name || "None";
  let maintainPrimaryText: JSX.Element | null = null;
  let maintainSecondaryText: JSX.Element | null = null;

  switch (device.maintained) {
    case 1:
      maintainPrimaryText = (
        <FormattedMessage
          id="maintain.status.maintained"
          defaultMessage="Maintained"
        />
      );

      maintainSecondaryText = (
        <FormattedMessage
          id="maintain.by.current"
          defaultMessage="Maintainer: {maintainer}"
          values={{ maintainer }}
        />
      );
      break;

    case 2:
      maintainPrimaryText = (
        <FormattedMessage
          id="maintain.status.maintainedWithoutDevice"
          defaultMessage="Maintained without having device in hands"
        />
      );

      maintainSecondaryText = (
        <FormattedMessage
          id="maintain.by.current"
          defaultMessage="Maintainer: {maintainer}"
          values={{ maintainer }}
        />
      );

      break;

    case 3:
      maintainPrimaryText = (
        <span className={classes.notmaintained}>
          <ReportProblemOutlined className={classes.notmaintainedIcon} />
          &nbsp;
          <FormattedMessage
            id="maintain.status.notMaintained"
            defaultMessage="Not Maintained!"
          />
        </span>
      );

      maintainSecondaryText = (
        <FormattedMessage
          id="maintain.by.previous"
          defaultMessage="Previous Maintainer: {maintainer}"
          values={{ maintainer }}
        />
      );
      break;

    default:
      break;
  }

  const showLoader = !device?.fullname;

  return (
    <Accordion defaultExpanded className={classes.root}>
      <AccordionSummary
        id="device-info"
        expandIcon={<ExpandMore className={classes.icon} />}
        aria-controls="device-info-content"
      >
        <Typography component="div" className="shimmer-wrapper">
          {!showLoader && (
            <>
              {device.fullname + " "}
              <FormattedMessage
                id="device.info"
                defaultMessage="(Device Info)"
              />
            </>
          )}

          {/* Loading Placeholder */}
          {showLoader && <LoadShimmer />}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <List component="ul" className={classes.list}>
          <ListItem>
            <ListItemIcon>
              <PermDeviceInformationOutlinedIcon className={classes.icon} />
            </ListItemIcon>

            {!showLoader && (
              <>
                <ListItemText
                  primary={device.oem}
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
      </AccordionDetails>
    </Accordion>
  );
};

export { DeviceInfo };
