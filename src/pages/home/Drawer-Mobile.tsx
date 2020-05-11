import React from 'react';
import { SwipeableDrawer } from '../../components';

export interface DrawerMobileProps {
    openDrawer: boolean;
    onStateChange?: (open: boolean) => void;
}

const DrawerMobile: React.SFC<DrawerMobileProps> = ({ openDrawer, onStateChange, children }) => {

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
        >
            {children}
        </SwipeableDrawer>
    );
}

export { DrawerMobile };
