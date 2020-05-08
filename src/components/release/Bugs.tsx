import React from 'react';
import { DialogContent, DialogTitle, ListItemIcon, ListItemText } from '@material-ui/core';
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
    const [showModal, toggleModal] = React.useState(false);
    const handleModal = () => toggleModal(!showModal);
    const classes = useStylesRelease();

    return release?.bugs ? (<>

        <span
            onClick={handleModal}
            className={classes.actionSpan + ' ' + classes.bug}
        >
            <ListItemIcon className={classes.bug}>
                <BugReportIcon
                    fontSize="small"
                    className={classes.icon + ' ' + classes.bug}
                />
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
        </span>

        <Modal
            showModal={showModal}
            toggleModal={handleModal}
        >
            <DialogTitle>
                <FormattedMessage
                    id="release.bugs"
                    defaultMessage="Bugs"
                />
            </DialogTitle>
            <DialogContent dividers>
                <SplitMsg msg={release.bugs} />
            </DialogContent>
        </Modal>
    </>
    ) : null;

}

export { Bugs };
