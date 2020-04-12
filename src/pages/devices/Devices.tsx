import { RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { getAllDeviceList } from '../../apis';
import { Header, Help, Social } from '../../components';
import { IDevice } from '../../models';
import { List } from './List';

export interface DevicesProps extends RouteComponentProps { }

const Devices: React.SFC<DevicesProps> = ({ children }) => {
    const [list, setDeviceList] = useState<IDevice[]>([]);

    useEffect(() => {
        getAllDeviceList()
            .then(data => {
                setDeviceList(data);
            });
    }, []);

    return (<>
        <div className="devices">
            <div className="left">
                <List data={list} />
            </div>
            <div className="center flexd-center">
                {children}
            </div>
            <div className="right">
                <Help />
                <Social />
            </div>
        </div>
    </>);
}

export { Devices };
