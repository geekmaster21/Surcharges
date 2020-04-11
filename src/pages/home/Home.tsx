import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Header } from '../../components';
import { Help } from './Help';
import { Hero } from './Hero';
import { LatestRelease } from './Latest-Release';
import { Metrics } from './Metrics';
import { Social } from './Social';

export interface HomeProps extends RouteComponentProps {

}

const Home: React.SFC<HomeProps> = () => {
    return (<>
        <Header />
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
