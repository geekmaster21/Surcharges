import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { IRelease } from '../../models';
import { ArchiveOutlined } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { FileDate } from './File-Date';
import { useStylesRelease } from './helpers';

interface FileNameProps extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const FileName: React.SFC<FileNameProps> = ({ release, showLoader }) => {
    const classes = useStylesRelease();

    return release ? (<>

        <ListItemIcon>
            <ArchiveOutlined className={classes.icon} />
        </ListItemIcon>
        {
            !showLoader && (<>
                <ListItemText
                    primary={release.file_name}
                    secondary={<FileDate release={release} />}
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

export { FileName };
