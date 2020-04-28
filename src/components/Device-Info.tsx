import React, { useEffect, useState } from 'react';
import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List,
    ListItem, ListItemIcon, ListItemText, Typography, makeStyles, Theme, createStyles
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { apiGetDeviceByCode } from '../apis';
import { ExpandMore, PermDeviceInformationOutlinedIcon, PermIdentityOutlinedIcon } from './Icons';
import { IDevice } from '../models';
import { FormattedMessage } from 'react-intl';

interface DeviceInfoProps extends RouteComponentProps {
    code?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        details: {
            padding: '5px 10px 10px',
        },
        list: {
            display: 'flex',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column'
            },
        },
        root: {
            width: '100%',
            backgroundColor: '#2a2a2a',
        },
        icon: {
            color: '#ddd',
        },
        iconM5: {
            color: '#ddd',
            marginRight: '5px'
        },
        flexText: {
            display: 'flex',
            alignItems: 'center'
        }
    }),
);

const DeviceInfo: React.SFC<DeviceInfoProps> = ({ code }) => {
    const classes = useStyles();

    const [device, setDeviceDetail] = useState<IDevice>({} as IDevice),
        isDifferentDevice = code && device.codename !== code;

    useEffect(() => {
        if (code && isDifferentDevice) {
            apiGetDeviceByCode(code)
                .then(data => {
                    setDeviceDetail(data);
                });
        }
    }, [code, isDifferentDevice]);

    let maintainPrimaryText: JSX.Element;
    let maintainSecondaryText: JSX.Element;
    const maintainer = device.maintainer?.name;

    switch (device.maintained) {
        case 1:
            maintainPrimaryText = (
                <FormattedMessage
                    id="maintain"
                    defaultMessage="Maintained"
                />
            );

            maintainSecondaryText = (
                <FormattedMessage
                    id="maintain.by"
                    defaultMessage="Maintainer: {maintainer}"
                    values={{ maintainer }}
                />
            );
            break;
        case 2:

            maintainPrimaryText = (
                <FormattedMessage
                    id="maintain.withoutDevice"
                    defaultMessage="Maintained without having device in hands"
                />
            );

            maintainSecondaryText = (
                <FormattedMessage
                    id="maintain.by"
                    defaultMessage="Maintainer: {maintainer}"
                    values={{ maintainer }}
                />
            );

            break;
        case 3:
        default:
            maintainPrimaryText = (
                <span style={{ color: '#dfdf01' }} >
                    &#9888;
                    <FormattedMessage
                        id="maintain.notMaintained"
                        defaultMessage="Not Maintained!"
                    />
                </span>
            );

            maintainSecondaryText = (
                <FormattedMessage
                    id="maintain.previouslyBy"
                    defaultMessage="Previous Maintainer: {maintainer}"
                    values={{ maintainer: maintainer || 'None' }}
                />
            );
            break;
    }

    return (
        <ExpansionPanel
            defaultExpanded
            className={classes.root}
        >

            <ExpansionPanelSummary
                id="device-info"
                expandIcon={<ExpandMore className={classes.icon} />}
                aria-controls="device-info-content"
            >
                <Typography  >
                    {device.fullname} {!!device.fullname && (<>
                        &nbsp;
                        <FormattedMessage
                            id="deviceInfo"
                            defaultMessage="(Device Info)" />
                    </>)}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details} >
                <List
                    component="ul"
                    className={classes.list}
                >
                    <ListItem >
                        <ListItemIcon>
                            <PermDeviceInformationOutlinedIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary={device.oem} secondary={device.codename} />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>
                            <PermIdentityOutlinedIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary={maintainPrimaryText} secondary={maintainSecondaryText} />
                    </ListItem>
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export { DeviceInfo };
