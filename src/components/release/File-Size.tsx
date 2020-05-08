import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { FormattedMessage } from 'react-intl';
import { IRelease } from '../../models';
import { SdCardOutlinedIcon } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { useStylesRelease } from './helpers';

interface FileSizeProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const FileSize: React.SFC<FileSizeProps> = ({ release, showLoader }) => {
    const classes = useStylesRelease();

    return release ? (<>

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
    </>
    ) : null;

}

export { FileSize };
