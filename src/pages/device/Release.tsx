import React, { useEffect, useState } from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Theme, CircularProgress, Button } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { getRelease } from '../../apis';
import {
    createStyles, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    makeStyles, Modal, Typography, PoweredBy
} from '../../components';
import {
    ArchiveOutlined, BugReportIcon, DescriptionOutlined, VerifiedUserOutlined, ExpandMore,
    GetAppIconOutlined, LabelImportantOutlinedIcon, SdCardOutlinedIcon, SpeakerNotesOutlined
} from '../../components/Icons';
import { IRelease } from '../../models';


interface ReleaseProps extends RouteComponentProps {
    code?: string;
    version: string;
    expanded?: boolean;
    type: 'stable' | 'beta';
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
        }
    }),
);

const Release: React.SFC<ReleaseProps> = ({ code, expanded, version, type }) => {
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
            getRelease(code, type, version)
                .then(data => setReleaseDetail(data));
        }
    }, [code, type, version]);

    const _version = release?.version || version;

    return (<>
        <ExpansionPanel
            className={classes.root}
            defaultExpanded={expanded}
        >
            <ExpansionPanelSummary
                id={_version}
                expandIcon={<ExpandMore className={classes.icon} />}
                aria-controls={`${_version} [ ${release.date} ]`}
            >
                <Typography className={classes.version} >
                    <LabelImportantOutlinedIcon className={classes.icon + ' ' + classes.iconM5} />
                    {_version}
                </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className={classes.details} >
                <List component="nav" className={classes.list} >
                    <ListItem button>
                        <ListItemIcon>
                            <ArchiveOutlined fontSize="small" className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary={release.file_name}
                            secondary={release.date}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem button>
                        <ListItemIcon>
                            <SdCardOutlinedIcon className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary="File Size"
                            secondary={release.size_human}
                        />
                    </ListItem>

                    <Divider />

                    <ListItem button>
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
                            <ListItemText primary="Download" />
                        </ListItem>

                        {
                            release?.changelog && (
                                <ListItem button onClick={handleModalLog}>
                                    <ListItemIcon>
                                        <DescriptionOutlined fontSize="small" className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary="Change Logs" />
                                </ListItem>
                            )
                        }

                        {
                            release?.notes && (
                                <ListItem button onClick={handleModalNote}>
                                    <ListItemIcon>
                                        <SpeakerNotesOutlined fontSize="small" className={classes.icon} />
                                    </ListItemIcon>
                                    <ListItemText primary="Build Notes" />
                                </ListItem>
                            )
                        }

                        {
                            release?.bugs && (
                                <ListItem button onClick={handleModalBug} className={classes.bug} >
                                    <ListItemIcon className={classes.bug}>
                                        <BugReportIcon className={classes.icon + ' ' + classes.bug} />
                                    </ListItemIcon>
                                    <ListItemText primary="Bugs" />
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
                DOWNLOADS:
                <br />
                <br />
                {
                    !tmoDL && (<div style={{ display: 'flex', alignItems: 'center' }} >
                        Fetching Links &nbsp;
                        <CircularProgress color="secondary" size="20px" />
                    </div>)
                }
                {
                    tmoDL && (<>
                        <Button variant="contained" color="secondary">
                            <a
                                href={release.url}
                                className="link no-hover"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Main Link
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
                                        Mirror Link
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
                CHANGE LOGS:
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
                BUGS:
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
                BUILD NOTES:
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
