import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Theme, CircularProgress, Button } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { apiGetRelease } from '../apis';
import {
    createStyles, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    LinkLocale, makeStyles, Modal, Typography, PoweredBy,
} from '.';
import {
    ArchiveOutlined, BugReportIcon, DescriptionOutlined, VerifiedUserOutlined, ExpandMore,
    GetAppIconOutlined, LabelImportantOutlinedIcon, SdCardOutlinedIcon, SpeakerNotesOutlined
} from './Icons';
import { IRelease, EReleaseType } from '../models';

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
            padding: '5px 10px 10px'
        },
        nestedList: {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'wrap'
            },
        },
        modal: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
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
    const [release, setReleaseDetail] = useState<IRelease>({} as IRelease);
    const [tmoDL, toggleTmoDL] = React.useState(false);
    const [showModalDL, toggleModalDL] = React.useState(false);
    const [showModalLog, toggleModalLog] = React.useState(false);
    const [showModalBug, toggleModalBug] = React.useState(false);
    const [showModalNote, toggleModalNote] = React.useState(false);

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
                .then(data => setReleaseDetail(data));
        }
    }, [code, type, version]);

    const _version = release?.version || version;

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
                        {_version}
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
                            <ArchiveOutlined fontSize="small" className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary={release.file_name}
                            secondary={release.date}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem  >
                        <ListItemIcon>
                            <SdCardOutlinedIcon fontSize="small" className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <FormattedMessage
                                    id="release.fileSize"
                                    defaultMessage="File Size" />
                            }
                            secondary={release.size_human}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem  >
                        <ListItemIcon>
                            <VerifiedUserOutlined fontSize="small" className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary="MD5"
                            secondary={release.md5}
                        />
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
                            <ListItemText primary={
                                <FormattedMessage
                                    id="release.download"
                                    defaultMessage="Download" />
                            } />
                        </ListItem>

                        {
                            release?.changelog && (
                                <ListItem button onClick={handleModalLog}>
                                    <ListItemIcon>
                                        <DescriptionOutlined fontSize="small" className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <FormattedMessage
                                            id="release.changeLogs"
                                            defaultMessage="Change Logs" />
                                    } />
                                </ListItem>
                            )
                        }

                        {
                            release?.notes && (
                                <ListItem button onClick={handleModalNote}>
                                    <ListItemIcon>
                                        <SpeakerNotesOutlined fontSize="small" className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <FormattedMessage
                                            id="release.buildNotes"
                                            defaultMessage="Build Notes" />
                                    } />
                                </ListItem>
                            )
                        }

                        {
                            release?.bugs && (
                                <ListItem button onClick={handleModalBug} className={classes.bug} >
                                    <ListItemIcon className={classes.bug}>
                                        <BugReportIcon fontSize="small" className={classes.icon + ' ' + classes.bug} />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <FormattedMessage
                                            id="release.bugs"
                                            defaultMessage="Bugs" />
                                    } />
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
            <div className={classes.modal} >
                <FormattedMessage
                    id="modal.download"
                    defaultMessage="Downloads" />:
                <br />
                <br />
                {
                    !tmoDL && (<div style={{ display: 'flex', alignItems: 'center' }} >
                        <FormattedMessage
                            id="modal.fetchLink"
                            defaultMessage="Fetching Links" />: &nbsp;
                        <CircularProgress color="secondary" size="20px" />
                    </div>)
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
                                <Button variant="contained" color="primary">
                                    <a
                                        href={release?.sf?.url}
                                        className="link no-hover"
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
                        <br />
                    </>)
                }
                <br />
                <PoweredBy />
            </div>
        </Modal>

        <Modal
            showModal={showModalLog}
            toggleModal={handleModalLog}
        >
            <div className={classes.modal} >
                <FormattedMessage
                    id="release.changeLogs"
                    defaultMessage="Change Logs" />:
                <br />
                <br />
                {
                    release?.changelog?.split('\n').map((m, i) => <p key={i}>{m}</p>)
                }
            </div>
        </Modal>

        <Modal
            showModal={showModalBug}
            toggleModal={handleModalBug}
        >
            <div className={classes.modal} >
                <FormattedMessage
                    id="release.bugs"
                    defaultMessage="Bugs" />:
                <br />
                <br />
                {
                    release?.bugs?.split('\n').map((m, i) => <p key={i}>{m}</p>)
                }
            </div>
        </Modal>

        <Modal
            showModal={showModalNote}
            toggleModal={handleModalNote}
        >
            <div className={classes.modal} >
                <FormattedMessage
                    id="release.buildNotes"
                    defaultMessage="Build Notes" />:
                <br />
                <br />
                {
                    release?.notes?.split('\n').map((m, i) => <p key={i}>{m}</p>)
                }
            </div>
        </Modal>
    </>);
}

export { Release };
