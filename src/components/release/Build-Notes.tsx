import React from 'react';
import { DialogContent, DialogTitle, ListItemIcon, ListItemText } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { IRelease } from '../../models';
import { SpeakerNotesOutlined } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { Modal } from '../Modal';
import { useStylesRelease } from './helpers';
import { SplitMsg } from './Split-Msg';

interface BuildNotesProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const BuildNotes: React.SFC<BuildNotesProps> = ({ release, showLoader }) => {
    const [showModal, toggleModal] = React.useState(false);
    const handleModal = () => toggleModal(!showModal);
    const classes = useStylesRelease();

    return release?.notes ? (<>

        <span
            onClick={handleModal}
            className={classes.actionSpan}
        >
            <ListItemIcon>
                <SpeakerNotesOutlined
                    fontSize="small"
                    className={classes.icon}
                />
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
        </span>

        <Modal
            showModal={showModal}
            toggleModal={handleModal}
        >
            <DialogTitle>
                <FormattedMessage
                    id="release.buildNotes"
                    defaultMessage="Build Notes"
                />
            </DialogTitle>
            <DialogContent dividers>
                <SplitMsg msg={release.notes} />
            </DialogContent>
        </Modal>
    </>
    ) : null;

}

export { BuildNotes };
