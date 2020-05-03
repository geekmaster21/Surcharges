import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import MatModal from '@material-ui/core/Modal';

interface ModalProps {
    children?: any;
    showModal: boolean;
    className?: string;
    toggleModal?: () => void;
}

const Modal: React.SFC<ModalProps> = ({ showModal, children, toggleModal, className }) => {
    const [open, setOpen] = React.useState(showModal);

    const handleClose = () => {
        toggleModal && toggleModal();
        setOpen(false);
    };

    const clsName = className ?? 'flexd center';

    return (
        <MatModal
            className={clsName}
            closeAfterTransition
            onClose={handleClose}
            open={open || showModal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 200,
            }}
        >
            {children}
        </MatModal>
    );
}

export { Modal };
