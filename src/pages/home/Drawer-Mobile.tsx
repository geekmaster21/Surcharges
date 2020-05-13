import React from 'react';
import { SwipeableDrawer } from '../../components';
import { DrawerClassKey } from '@material-ui/core';

export interface DrawerMobileProps {
    openDrawer: boolean;
    onStateChange?: (open: boolean) => void;
    classes?: Partial<Record<DrawerClassKey, string>> | undefined
}

const DrawerMobile: React.SFC<DrawerMobileProps> = ({ openDrawer, onStateChange, children, ...rest }) => {

    const [state, setState] = React.useState(false);

    const toggleDrawer = (toggle: boolean) => {
        setState(toggle);
        onStateChange && onStateChange(toggle);
    };

    React.useLayoutEffect(() => {
        setState(openDrawer);
    }, [openDrawer])

    return (
        <SwipeableDrawer
            keepMounted
            anchor='left'
            open={state}
            style={{ width: '300px' }}
            onOpen={() => toggleDrawer(true)}
            onClose={() => toggleDrawer(false)}
            {...rest}
        >
            {children}
        </SwipeableDrawer>
    );
}

export { DrawerMobile };
