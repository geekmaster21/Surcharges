import React from 'react';
import { Button, Divider, List, ListItem } from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { apiGetRelease } from '../../apis';
import { EReleaseType, IRelease } from '../../models';
import { GetCurrentLocale } from '../../utils';
import { ExpandMore, LabelImportantOutlinedIcon } from '../Icons';
import { LinkLocale } from '../Link-Locale';
import { LoadShimmer } from '../Load-Shimmer';
import {
    ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary, Typography
} from '../React-Material';
import { Bugs } from './Bugs';
import { BuildNotes } from './Build-Notes';
import { ChangeLogs } from './Change-Logs';
import { Downloads } from './Downloads';
import { FileName } from './File-Name';
import { FileSize } from './File-Size';
import { useStylesRelease } from './helpers';
import { MD5 } from './MD5';

interface ReleaseProps extends RouteComponentProps {
    code?: string;
    version: string;
    type: EReleaseType;
    expanded?: boolean;
    onClick?: () => void;
    showAllBuild?: boolean;
    defaultExpanded?: boolean;
}

const Release: React.SFC<ReleaseProps> = props => {
    const { code, expanded, version, type,
        onClick, defaultExpanded, showAllBuild } = props;
    const classes = useStylesRelease();
    const locale = GetCurrentLocale();
    const [release, setReleaseDetail] = React.useState<IRelease>({} as IRelease);

    const isDifferentDevice = code && release?.codename !== code;

    React.useEffect(() => {
        if (code) {
            apiGetRelease(code, type, version)
                .then(data => setReleaseDetail(data))
                .catch(() => {
                    showAllBuild && navigate(`/${locale}/404`);
                });
        }
    }, [code, type, version, locale, showAllBuild]);

    const _version = release?.version || version;
    const showLoader = Boolean(!release?.codename || isDifferentDevice);

    return (<>
        <ExpansionPanel
            className={classes.root}
            expanded={expanded}
            defaultExpanded={defaultExpanded}
            onChange={() => onClick && onClick()}
        >
            <ExpansionPanelSummary
                id={_version}
                expandIcon={<ExpandMore className={classes.icon} />}
                aria-controls={`${_version} [ ${release.date} ]`}
            >
                <div className={classes.summary}>
                    <Typography className={classes.version} >
                        <LabelImportantOutlinedIcon className={classes.icon + ' ' + classes.iconM5} fontSize="small" />
                        {
                            !showLoader && (_version)
                        }

                        {/* Loading Placeholder */}
                        {
                            showLoader && <LoadShimmer />
                        }
                    </Typography>

                    {
                        showAllBuild && (
                            <LinkLocale
                                to={`/device/${code}`}
                                className="link"
                            >
                                <Button color="secondary">
                                    <FormattedMessage
                                        id="release.allBuild"
                                        defaultMessage="Show All Builds" />
                                </Button>
                            </LinkLocale>
                        )
                    }
                </div>

            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.details} >
                <List component="nav" className={classes.list} >

                    <ListItem >
                        <FileName
                            release={release}
                            showLoader={showLoader}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem >
                        <FileSize
                            release={release}
                            showLoader={showLoader}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem >
                        <MD5
                            release={release}
                            showLoader={showLoader}
                        />
                    </ListItem>

                    <Divider />

                    <List
                        component="div"
                        className={classes.nestedList} >

                        <Downloads
                            release={release}
                            showLoader={showLoader}
                        />

                        {
                            release?.changelog &&
                            <ChangeLogs
                                release={release}
                                showLoader={showLoader}
                            />
                        }

                        {
                            release?.notes &&
                            <BuildNotes
                                release={release}
                                showLoader={showLoader}
                            />
                        }

                        {
                            release?.bugs &&
                            <Bugs
                                release={release}
                                showLoader={showLoader}
                            />
                        }
                    </List>

                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    </>);
}

export { Release };
