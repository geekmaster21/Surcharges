import React from 'react';
import { DialogContent, DialogTitle, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { IRelease } from '../../models';
import { BugReportIcon } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { Modal } from '../Modal';
import { useStylesRelease } from './helpers';
import { SplitMsg } from './Split-Msg';

interface BugsProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const Bugs: React.SFC<BugsProps> = ({ release, showLoader }) => {
    const classes = useStylesRelease();
    const [showModal, toggleModal] = React.useState(false);
    const handleModal = () => toggleModal(!showModal);
    const Title = () => (
        <FormattedMessage
            id="release.bugs"
            defaultMessage="Bugs" />
    );

    return release?.bugs ? (<>

        <ListItem
            button
            onClick={handleModal}
            className={classes.bug}
        >
            <ListItemIcon className={classes.bug}>
                <BugReportIcon
                    fontSize="small"
                    className={classes.icon + ' ' + classes.bug}
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
                <SplitMsg msg={release.bugs} />
            </DialogContent>
        </Modal>
    </>
    ) : null;

}

export { Bugs };
