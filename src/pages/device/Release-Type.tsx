import { Theme } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { isEqual, sortBy } from 'lodash';
import React from 'react';
import {
    Accordion, AccordionDetails,
    AccordionSummary, createStyles,
    makeStyles, Release, Typography
} from '../../components';
import { ExpandMore, StarBorderOutlinedIcon } from '../../components/Icons';
import { usePreviousProps } from '../../hooks';
import { EReleaseType, IRelease } from '../../models';

interface ReleaseTypeProps extends RouteComponentProps {
    code: string;
    version?: string;
    data: IRelease[];
    type: EReleaseType;
    expanded?: boolean;
    releaseLabel: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: '#2a2a2a',
        },
        icon: {
            color: '#ddd',
        },
        iconM5: {
            color: '#ddd',
            marginRight: '5px'
        },
        details: {
            display: 'flex',
            padding: '5px 10px 10px',
            flexDirection: 'column'
        }
    }),
);

const ReleaseType: React.SFC<ReleaseTypeProps> = (props) => {
    const { code, expanded, data, type, version, releaseLabel } = props;
    const classes = useStyles();
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
        setTimeout(() => setExpanded(0), 0);
    }

    return (<>
        <Accordion
            className={classes.root}
            defaultExpanded={expanded}
        >
            <AccordionSummary
                id={`release-${type}-header`}
                expandIcon={<ExpandMore className={classes.icon} />}
                aria-controls={`release-${type}-content`}
            >
                <Typography className="flexd v-center" >
                    <StarBorderOutlinedIcon className={classes.iconM5} fontSize="small" />
                    {releaseLabel}
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details} >
                {
                    sortedData.map((m, i) => (
                        <Release
                            key={m.version}
                            version={m.version}
                            code={code}
                            type={type}
                            onClick={() => handleChange(i)}
                            expanded={version ? m.version === version : expandPanel === i}
                        />
                    ))
                }
            </AccordionDetails>
        </Accordion>
    </>);
}

export { ReleaseType };
