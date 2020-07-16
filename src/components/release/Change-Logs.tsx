import {
    DialogContent, DialogTitle, ListItem,
    ListItemIcon, ListItemText
} from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IRelease } from '../../models';
import { DescriptionOutlined } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { Modal } from '../Modal';
import { useStylesRelease } from './helpers';
import { SplitMsg } from './Split-Msg';

interface ChangeLogsProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const ChangeLogs: React.SFC<ChangeLogsProps> = ({ release, showLoader }) => {
    const [showModal, toggleModal] = React.useState(false);
    const handleModal = () => toggleModal(!showModal);
    const classes = useStylesRelease();
    const Title = () => (
        <FormattedMessage
            id="release.changeLogs"
            defaultMessage="Change Logs" />
    );

    return (<>
        <ListItem
            button
            onClick={handleModal}
        >
            <ListItemIcon>
                <DescriptionOutlined
                    fontSize="small"
                    className={classes.icon}
                />
            </ListItemIcon>
            {
                !showLoader && (<ListItemText primary={<Title />} />)
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
                <SplitMsg msg={release.changelog} />
            </DialogContent>
        </Modal>
    </>)
}

export { ChangeLogs };
