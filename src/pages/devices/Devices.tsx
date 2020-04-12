import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Header, Help, Social } from '../../components';
import { List } from './List';

export interface DevicesProps extends RouteComponentProps { }

const Devices: React.SFC<DevicesProps> = ({ children }) => {
    return (<>
        <Header showLogo />
        <div className="devices">
            <div className="left">
                <List />
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
