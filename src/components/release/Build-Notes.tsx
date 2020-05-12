import React from 'react';
import {
    DialogContent, DialogTitle, ListItem,
    ListItemIcon, ListItemText
} from '@material-ui/core';
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
    const classes = useStylesRelease();
    const [showModal, toggleModal] = React.useState(false);
    const handleModal = () => toggleModal(!showModal);
    const Title = () => (
        <FormattedMessage
            id="release.buildNotes"
            defaultMessage="Build Notes" />
    );

    return (<>

        <ListItem
            button
            onClick={handleModal}
        >
            <ListItemIcon>
                <SpeakerNotesOutlined
                    fontSize="small"
                    className={classes.icon}
                />
            </ListItemIcon>
            {
                !showLoader && (<>
                    <ListItemText primary={<Title />} />
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

        <Modal
            showModal={showModal}
            toggleModal={handleModal}
        >
            <DialogTitle>
                <Title />
            </DialogTitle>
            <DialogContent dividers>
                <SplitMsg msg={release.notes} />
            </DialogContent>
        </Modal>
    </>)

}

export { BuildNotes };
