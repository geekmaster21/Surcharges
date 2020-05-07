import React, { useEffect, useState } from 'react';
import {
    Button, CircularProgress, Divider, List,
    ListItem, ListItemIcon, ListItemText, Theme
} from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import {
    createStyles, ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary, LinkLocale, makeStyles, Modal, PoweredBy, Typography
} from '.';
import { apiGetRelease } from '../apis';
import { EReleaseType, IRelease } from '../models';
import { GetCurrentLocale } from '../utils';
import {
    ArchiveOutlined, BugReportIcon, DescriptionOutlined, ExpandMore, GetAppIconOutlined,
    LabelImportantOutlinedIcon, SdCardOutlinedIcon, SpeakerNotesOutlined, VerifiedUserOutlined
} from './Icons';
import { LoadShimmer } from './Load-Shimmer';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

interface ReleaseProps extends RouteComponentProps {
    code?: string;
    version: string;
    type: EReleaseType;
    expanded?: boolean;
    onClick?: () => void;
    showAllBuild?: boolean;
    defaultExpanded?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.primary.main,
        },
        list: {
            width: '100%',
        },
        icon: {
            color: '#ddd'
        },
        iconM5: {
            marginRight: '5px'
        },
        version: {
            display: 'flex',
            alignItems: 'center'
        },
        details: {
            padding: '5px 10px 10px',
            userSelect: 'text'
        },
        nestedList: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap'
            },
        },
        modal: {
            backgroundColor: theme.palette.primary.light,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(3, 4),
            border: 'none',
            borderRadius: '8px',
            outline: 'none !important',
            userSelect: 'text'
        },
        bug: {
            color: '#ff5e5e'
        },
        summary: {
            width: '100%',
            display: 'flex',
            placeContent: 'space-between'
        }
    }),
);

const Release: React.SFC<ReleaseProps> = ({ code, expanded, version, type,
    onClick, defaultExpanded, showAllBuild }) => {

    let tmoDownload: NodeJS.Timeout;
    const classes = useStyles();
    const locale = GetCurrentLocale();
    const [release, setReleaseDetail] = useState<IRelease>({} as IRelease);
    const [tmoDL, toggleTmoDL] = useState(false);
    const [showModalDL, toggleModalDL] = useState(false);
    const [showModalLog, toggleModalLog] = useState(false);
    const [showModalBug, toggleModalBug] = useState(false);
    const [showModalNote, toggleModalNote] = useState(false);
    const isDifferentDevice = code && release?.codename !== code;

    const handleModalDL = () => {
        clearTimeout(tmoDownload);
        toggleTmoDL(false)
        toggleModalDL(!showModalDL);
    };
    const handleModalLog = () => toggleModalLog(!showModalLog);
    const handleModalBug = () => toggleModalBug(!showModalBug);
    const handleModalNote = () => toggleModalNote(!showModalNote);

    if (showModalDL) {
        tmoDownload = setTimeout(() => toggleTmoDL(true), 5000);
    }

    useEffect(() => {
        if (code) {
            apiGetRelease(code, type, version)
                .then(data => setReleaseDetail(data))
                .catch(() => {
                    showAllBuild && navigate(`/${locale}/404`);
                });
        }
    }, [code, type, version, locale, showAllBuild]);

    const _version = release?.version || version;
    const showLoader = !release?.codename || isDifferentDevice;

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
                    <ListItem  >
                        <ListItemIcon>
                            <ArchiveOutlined className={classes.icon} />
                        </ListItemIcon>
                        {
                            !showLoader && (<>
                                <ListItemText
                                    primary={release.file_name}
                                    secondary={release.date}
                                />
                            </>)
                        }

                        {/* Loading Placeholder */}
                        {
                            showLoader && (<>
                                <ListItemText
                                    primary={<LoadShimmer />}
                                    secondary={<LoadShimmer />}
                                />
                            </>)
                        }
                    </ListItem>

                    <Divider />

                    <ListItem  >
                        <ListItemIcon>
                            <SdCardOutlinedIcon className={classes.icon} />
                        </ListItemIcon>
                        {
                            !showLoader && (<>
                                <ListItemText
                                    primary={
                                        <FormattedMessage
                                            id="release.fileSize"
                                            defaultMessage="File Size" />
                                    }
                                    secondary={release.size_human}
                                />
                            </>)
                        }

                        {/* Loading Placeholder */}
                        {
                            showLoader && (<>
                                <ListItemText
                                    primary={<LoadShimmer />}
                                    secondary={<LoadShimmer />}
                                />
                            </>)
                        }
                    </ListItem>

                    <Divider />

                    <ListItem  >
                        <ListItemIcon>
                            <VerifiedUserOutlined className={classes.icon} />
                        </ListItemIcon>
                        {
                            !showLoader && (<>
                                <ListItemText 
                                    primary="MD5"
                                    secondary={release.md5}
                                />
                            </>)
                        }

                        {/* Loading Placeholder */}
                        {
                            showLoader && (<>
                                <ListItemText
                                    primary={<LoadShimmer />}
                                    secondary={<LoadShimmer />}
                                />
                            </>)
                        }
                    </ListItem>

                    <Divider />

                    <List
                        component="div"
                        className={classes.nestedList} >

                        <ListItem
                            button
                            onClick={handleModalDL}
                        >
                            <ListItemIcon>
                                <GetAppIconOutlined fontSize="small" className={classes.icon} />
                            </ListItemIcon>
                            {
                                !showLoader && (<>
                                    <ListItemText primary={
                                        <FormattedMessage
                                            id="release.download"
                                            defaultMessage="Download" />
                                    } />
                                </>)
                            }

                            {/* Loading Placeholder */}
                            {
                                showLoader && (<>
                                    <ListItemText
                                        primary={<LoadShimmer />}
                                        secondary={<LoadShimmer />}
                                    />
                                </>)
                            }
                        </ListItem>

                        {
                            release?.changelog && (
                                <ListItem button onClick={handleModalLog}>
                                    <ListItemIcon>
                                        <DescriptionOutlined fontSize="small" className={classes.icon} />
                                    </ListItemIcon>
                                    {
                                        !showLoader && (<>
                                            <ListItemText primary={
                                                <FormattedMessage
                                                    id="release.changeLogs"
                                                    defaultMessage="Change Logs" />
                                            } />
                                        </>)
                                    }

                                    {/* Loading Placeholder */}
                                    {
                                        showLoader && (<>
                                            <ListItemText
                                                primary={<LoadShimmer />}
                                                secondary={<LoadShimmer />}
                                            />
                                        </>)
                                    }
                                </ListItem>
                            )
                        }

                        {
                            release?.notes && (
                                <ListItem button onClick={handleModalNote}>
                                    <ListItemIcon>
                                        <SpeakerNotesOutlined fontSize="small" className={classes.icon} />
                                    </ListItemIcon>
                                    {
                                        !showLoader && (<>
                                            <ListItemText primary={
                                                <FormattedMessage
                                                    id="release.buildNotes"
                                                    defaultMessage="Build Notes" />
                                            } />
                                        </>)
                                    }

                                    {/* Loading Placeholder */}
                                    {
                                        showLoader && (<>
                                            <ListItemText
                                                primary={<LoadShimmer />}
                                                secondary={<LoadShimmer />}
                                            />
                                        </>)
                                    }
                                </ListItem>
                            )
                        }

                        {
                            release?.bugs && (
                                <ListItem button onClick={handleModalBug} className={classes.bug} >
                                    <ListItemIcon className={classes.bug}>
                                        <BugReportIcon fontSize="small" className={classes.icon + ' ' + classes.bug} />
                                    </ListItemIcon>
                                    {
                                        !showLoader && (<>
                                            <ListItemText primary={
                                                <FormattedMessage
                                                    id="release.bugs"
                                                    defaultMessage="Bugs" />
                                            } />
                                        </>)
                                    }

                                    {/* Loading Placeholder */}
                                    {
                                        showLoader && (<>
                                            <ListItemText
                                                primary={<LoadShimmer />}
                                                secondary={<LoadShimmer />}
                                            />
                                        </>)
                                    }
                                </ListItem>
                            )
                        }
                    </List>
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <Modal
            showModal={showModalDL}
            toggleModal={handleModalDL}
        >
            <DialogTitle>
                <FormattedMessage
                        id="modal.download"
                        defaultMessage="Downloads" />
            </DialogTitle>
            <DialogContent dividers>
                {
                    !tmoDL && (
                        <Button variant="outlined" color="secondary">
                            <CircularProgress color="secondary" size="18px" />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <FormattedMessage
                                id="modal.fetchLink"
                                defaultMessage="Fetching Links" />
                        </Button>
                    )
                }
                {
                    tmoDL && (<>
                        <Button variant="contained" color="secondary">
                            <a
                                href={release.direct_url || release.url}
                                className="link no-hover"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FormattedMessage
                                    id="modal.directLink"
                                    defaultMessage="Direct Link" />
                            </a>
                        </Button>

                        {
                            release?.sf?.url && (<>
                                &nbsp;
                                &nbsp;
                                <Button variant="outlined" color="secondary">
                                    <a
                                        href={release?.sf?.url}
                                        className="link orange no-hover"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FormattedMessage
                                            id="modal.mirrorLink"
                                            defaultMessage="Mirror Link" />
                                    </a>
                                </Button>
                            </>)
                        }
                    </>)
                }
                <br />
                <br />
                <PoweredBy />
            </DialogContent>
        </Modal>

        <Modal
            showModal={showModalLog}
            toggleModal={handleModalLog}
        >
            <DialogTitle>
                <FormattedMessage
                    id="release.changeLogs"
                    defaultMessage="Change Logs" />
            </DialogTitle>
            <DialogContent dividers>
                { release?.changelog?.split('\n').map((m, i) => <p key={i}>{m}</p>) }
            </DialogContent>
        </Modal>

        <Modal
            showModal={showModalBug}
            toggleModal={handleModalBug}
        >
            <DialogTitle>
                <FormattedMessage
                        id="release.bugs"
                        defaultMessage="Bugs" />
            </DialogTitle>
            <DialogContent dividers>
                { release?.bugs?.split('\n').map((m, i) => <p key={i}>{m}</p>) }
            </DialogContent>
        </Modal>

        <Modal
            showModal={showModalNote}
            toggleModal={handleModalNote}
        >
            <DialogTitle>
                <FormattedMessage
                        id="release.buildNotes"
                        defaultMessage="Build Notes" />
            </DialogTitle>
            <DialogContent dividers>
                { release?.notes?.split('\n').map((m, i) => <p key={i}>{m}</p>) }
            </DialogContent>
        </Modal>
    </>);
}

export { Release };
