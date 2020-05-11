import React from 'react';
import {
    Button, CircularProgress, DialogContent,
    DialogTitle, ListItemIcon, ListItemText
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { Modal, PoweredBy } from '..';
import { IRelease } from '../../models';
import { GetAppIconOutlined } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { OpenOutside } from '../Open-Outside';
import { useStylesRelease } from './helpers';

interface DownloadsProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const Downloads: React.SFC<DownloadsProps> = ({ release, showLoader }) => {
    let tmoDownload: NodeJS.Timeout;
    const classes = useStylesRelease();
    const [showModal, toggleModal] = React.useState(false);
    const [tmoDirectLink, toggleTmoDirectLink] = React.useState(false);
    const handleModal = () => {
        clearTimeout(tmoDownload);
        toggleTmoDirectLink(false);
        toggleModal(!showModal);
    };

    if (showModal) {
        tmoDownload = setTimeout(() => toggleTmoDirectLink(true), 2500);
    }

    return release ? (<>

        <span
            onClick={handleModal}
            className={classes.actionSpan}
        >
            <ListItemIcon>
                <GetAppIconOutlined
                    fontSize="small"
                    className={classes.icon}
                />
            </ListItemIcon>
            {
                !showLoader && (<>
                    <ListItemText primary={
                        <FormattedMessage
                            id="release.download"
                            defaultMessage="Download"
                        />
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
        </span>

        <Modal
            showModal={showModal}
            toggleModal={handleModal}
        >
            <DialogTitle>
                <FormattedMessage
                    id="modal.download"
                    defaultMessage="Downloads"
                />
            </DialogTitle>
            <DialogContent dividers>
                {
                    !tmoDirectLink && (
                        <Button
                            variant="outlined"
                            color="secondary"
                        >
                            <CircularProgress
                                size="18px"
                                color="secondary"
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <FormattedMessage
                                id="modal.fetchLink"
                                defaultMessage="Fetching Links"
                            />
                        </Button>
                    )
                }
                {
                    tmoDirectLink && (<>
                        <Button
                            color="secondary"
                            variant="contained"
                        >
                            <OpenOutside
                                className="link no-hover"
                                href={release.direct_url || release.url}
                            >
                                <FormattedMessage
                                    id="modal.directLink"
                                    defaultMessage="Direct Link"
                                />
                            </OpenOutside>

                        </Button>

                        {
                            release?.sf?.url && (<>
                                &nbsp;
                                &nbsp;
                                <Button
                                    color="secondary"
                                    variant="contained"
                                >
                                    <OpenOutside
                                        href={release?.sf?.url}
                                        className="link orange no-hover"
                                    >
                                        <FormattedMessage
                                            id="modal.directLink"
                                            defaultMessage="Direct Link"
                                        />
                                    </OpenOutside>

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
    </>
    ) : null;

}

export { Downloads };
