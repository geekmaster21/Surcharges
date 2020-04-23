import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { sortBy } from 'lodash';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '../../components';
import { ExpandMore } from '../../components/Icons';
import { IRelease } from '../../models';
import { useStylesExpansion } from './constants';
import { Release } from './Release';

interface ReleaseTypeProps extends RouteComponentProps {
    code: string;
    data: IRelease[];
    expanded?: boolean;
    type: 'stable' | 'beta';
}

const ReleaseType: React.SFC<ReleaseTypeProps> = ({ code, expanded, data, type }) => {
    const classes = useStylesExpansion();
    const sortedData = sortBy(data, d => d.date).reverse();

    return (<>
        <ExpansionPanel
            className={classes.root}
            defaultExpanded={expanded}
        >
            <ExpansionPanelSummary
                id={`release-${type}-header`}
                expandIcon={<ExpandMore style={{ color: '#ddd' }} />}
                aria-controls={`release-${type}-content`}
            >
                <Typography className={classes.heading} >
                    {type.slice(0, 1).toUpperCase() + type.slice(1)} Releases
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details} >
                {
                    sortedData.map((m, i) => (
                        <Release
                            key={m.version}
                            version={m.version}
                            code={code}
                            type={type}
                            expanded={i === 0}
                        />
                    ))
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </>);
}

export { ReleaseType };
