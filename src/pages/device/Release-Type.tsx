import { RouteComponentProps } from '@reach/router';
import { isEqual, sortBy } from 'lodash';
import React from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '../../components';
import { ExpandMore, StarBorderOutlinedIcon } from '../../components/Icons';
import { usePreviousProps } from '../../hooks';
import { EReleaseType, IRelease } from '../../models';
import { useStylesExpansion } from './constants';
import { Release } from './Release';

interface ReleaseTypeProps extends RouteComponentProps {
    code: string;
    data: IRelease[];
    type: EReleaseType;
    expanded?: boolean;
}

const ReleaseType: React.SFC<ReleaseTypeProps> = (props) => {
    const { code, expanded, data, type } = props;
    const classes = useStylesExpansion();
    const sortedData = sortBy(data, d => d.actualDate).reverse();
    const [expandPanel, setExpanded] = React.useState<number>(0);

    const handleChange = (panel: number) => {
        setExpanded(expandPanel === panel ? -1 : panel);
    };

    const prevProps = usePreviousProps(props);
    if (prevProps && prevProps?.code && code
        && !isEqual(
            sortBy(prevProps?.data || [], p => p.actualDate),
            sortBy(data || [], p => p.actualDate)
        )
    ) {
        // hack to open first panel automatically
        setTimeout(() => {
            setExpanded(0);
        }, 0);
    }

    return (<>
        <ExpansionPanel
            className={classes.root}
            defaultExpanded={expanded}
        >
            <ExpansionPanelSummary
                id={`release-${type}-header`}
                expandIcon={<ExpandMore className={classes.icon} />}
                aria-controls={`release-${type}-content`}
            >
                <Typography className={classes.flexText} >
                    <StarBorderOutlinedIcon className={classes.iconM5} fontSize="small" />
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
                            expanded={expandPanel === i}
                            onClick={() => handleChange(i)}
                        />
                    ))
                }
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </>);
}

export { ReleaseType };
