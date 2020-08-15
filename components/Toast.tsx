import {
  Slide,
  SlideProps,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import { ReactNode, useEffect, useState } from "react";
import useStyles from "styles/mui/toast";
import { isMobile } from "utils";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction={isMobile ? "up" : "left"} />;
}

export function Toast({
  show,
  children,
  onClose,
}: {
  show: boolean;
  children?: ReactNode;
  onClose: () => void;
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClick = (
    Transition: React.ComponentType<TransitionProps>
  ) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  useEffect(() => {
    if (show) {
      handleClick(TransitionUp)();
    }
  }, [show]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      open={open}
      message={children}
      onClose={handleClose}
      autoHideDuration={1500}
      TransitionComponent={transition}
      anchorOrigin={
        isMobile ? undefined : { vertical: "top", horizontal: "right" }
      }
    >
      <SnackbarContent className={classes.toast} message={children} />
    </Snackbar>
  );
}
