import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, Help, Social } from '../../components';
import { List } from './List';
import { IDevice } from '../../models';
import { getAllDeviceList } from '../../apis';

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
        <Header showLogo />
        <div className="devices">
            <div className="left">
                <List data={list} />
            </div>
            <div className="center">
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
