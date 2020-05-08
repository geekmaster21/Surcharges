import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';
import { IRelease } from '../../models';
import { VerifiedUserOutlined } from '../Icons';
import { LoadShimmer } from '../Load-Shimmer';
import { useStylesRelease } from './helpers';

interface MD5Props extends RouteComponentProps {
    release: IRelease;
    showLoader?: boolean;
}

const MD5: React.SFC<MD5Props> = ({ release, showLoader }) => {
    const classes = useStylesRelease();

    return release ? (<>

        <ListItemIcon>
            <VerifiedUserOutlined className={classes.icon} />
        </ListItemIcon>
        {
            !showLoader && (<>
                <ListItemText
                    primary="MD5"
                    secondary={release.md5}
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

export { MD5 };
