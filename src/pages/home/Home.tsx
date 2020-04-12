import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Header, Help, LatestRelease, Social } from '../../components';
import { Hero } from './Hero';
import { Metrics } from './Metrics';

export interface HomeProps extends RouteComponentProps { }

const Home: React.SFC<HomeProps> = () => {
    return (<>
        <Header showLinkDevice />
        <div className="home">
            <div className="center-stage">
                <Hero />
                <Metrics />
            </div>
            <LatestRelease />
            <Help />
            <Social />
        </div>
    </>);
}

export { Home };
