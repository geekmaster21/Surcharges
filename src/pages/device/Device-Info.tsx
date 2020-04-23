import React, { useEffect, useState } from 'react';
import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List,
    ListItem, ListItemIcon, ListItemText, Typography, makeStyles, Theme, createStyles
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { getDeviceByCode } from '../../apis';
import { DeveloperModeOutlinedIcon, ExpandMore, PermDeviceInformationOutlinedIcon, PermIdentityOutlinedIcon } from '../../components/Icons';
import { IDevice } from '../../models';
import { useStylesExpansion } from './constants';

interface DeviceInfoProps extends RouteComponentProps {
    code?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: '#ddd'
        },
        iconM5: {
            marginRight: '5px'
        },
    }),
);

const DeviceInfo: React.SFC<DeviceInfoProps> = ({ code }) => {
    const classes = useStylesExpansion();
    const classesIcons = useStyles();

    const [device, setDeviceDetail] = useState<IDevice>({} as IDevice),
        isDifferentDevice = code && device.codename !== code;

    useEffect(() => {
        if (code && isDifferentDevice) {
            getDeviceByCode(code)
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
            maintainPrimaryText = <>Maintained</>
            maintainSecondaryText = <>{`Maintainer: ${maintainer}`}</>
            break;
        case 2:
            maintainPrimaryText = <>Maintained without having device in hands</>
            maintainSecondaryText = <>{`Maintainer: ${maintainer}`}</>
            break;
        case 3:
        default:
            maintainPrimaryText = <>&#9888; {`Not Maintained!`}</>
            maintainSecondaryText = <>{`Previous Maintainer: ${maintainer || 'Nobody'}`}</>
            break;
    }

    return (
        <ExpansionPanel
            defaultExpanded
            className={classes.root}
        >

            <ExpansionPanelSummary
                id="device-info"
                expandIcon={<ExpandMore className={classesIcons.icon} />}
                aria-controls="device-info-content"
            >
                <Typography className={classes.heading}>{device.fullname} {!!device.fullname && ' (Device Info)'}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List component="ul" style={{ display: 'flex', width: '100%' }} >
                    <ListItem >
                        <ListItemIcon>
                            <PermDeviceInformationOutlinedIcon className={classesIcons.icon} />
                        </ListItemIcon>
                        <ListItemText primary={device.oem} secondary={device.codename} />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>
                            <PermIdentityOutlinedIcon className={classesIcons.icon} />
                        </ListItemIcon>
                        <ListItemText primary={maintainPrimaryText} secondary={maintainSecondaryText} />
                    </ListItem>
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export { DeviceInfo };
