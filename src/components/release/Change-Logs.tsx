import React from 'react';
import { DialogContent, DialogTitle, ListItemIcon, ListItemText } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
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

    return release?.changelog ? (<>

        <span
            onClick={handleModal}
            className={classes.actionSpan}
        >
            <ListItemIcon>
                <DescriptionOutlined
                    fontSize="small"
                    className={classes.icon}
                />
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
        </span>

        <Modal
            showModal={showModal}
            toggleModal={handleModal}
        >
            <DialogTitle>
                <FormattedMessage
                    id="release.changeLogs"
                    defaultMessage="Change Logs"
                />
            </DialogTitle>
            <DialogContent dividers>
                <SplitMsg msg={release.changelog} />
            </DialogContent>
        </Modal>
    </>
    ) : null;

}

export { ChangeLogs };
