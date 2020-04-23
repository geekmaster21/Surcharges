import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { getDeviceByCode } from '../../apis';
import { ExpandMore } from '../../components/Icons';
import { IDevice } from '../../models';
import { useStylesExpansion } from './constants';

interface DeviceInfoProps extends RouteComponentProps {
    code?: string;
}

const DeviceInfo: React.SFC<DeviceInfoProps> = ({ code }) => {
    const classes = useStylesExpansion();

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

    return (
        <ExpansionPanel
            // expanded
            className={classes.root}
        >

            <ExpansionPanelSummary
                id="device-info"
                expandIcon={<ExpandMore style={{ color: '#ddd' }} />}
                aria-controls="device-info-content"
            >
                <Typography className={classes.heading}>{device.fullname} {!!device.fullname && ' (Device Info)'}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List component="ul" style={{ display: 'flex', width: '100%' }} >
                    <ListItem >
                        <ListItemText primary="Code Name" secondary={device.codename} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary="OEM" secondary={device.oem} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary="Maintainer" secondary={device.maintainer?.name} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary="Maintained" secondary={device.maintained} />
                    </ListItem>
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export { DeviceInfo };
