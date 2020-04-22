import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { getDeviceByCode } from '../../apis';
import { Card, CardContent } from '../../components';
import { IDevice } from '../../models';

interface DeviceProps extends RouteComponentProps {
    code?: string;
}

const Device: React.SFC<DeviceProps> = ({ code }) => {
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
        <Card elevation={3}  >
            <CardContent>
                {
                    <table>
                        <tbody>
                            <tr>
                                <th>Full Name:</th>
                                <td>{device.fullname}</td>
                            </tr>
                            <tr>
                                <th>Model Name:</th>
                                <td>{device.modelname}</td>
                            </tr>
                            <tr>
                                <th>Code Name:</th>
                                <td>{device.codename}</td>
                            </tr>
                            <tr>
                                <th>OEM:</th>
                                <td>{device.oem}</td>
                            </tr>
                            <tr>
                                <th>Maintainer:</th>
                                <td>{device.maintainer?.name}</td>
                            </tr>
                            <tr>
                                <th>Maintained:</th>
                                <td>{device.maintained}</td>
                            </tr>
                        </tbody>

                    </table>
                }
            </CardContent>
        </Card>
    );
}

export { Device };
