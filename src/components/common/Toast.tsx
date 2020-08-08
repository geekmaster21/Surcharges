import { Slide, SlideProps, Snackbar } from "@material-ui/core";
import { ReactNode, useEffect, useState } from "react";
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
      autoHideDuration={1500}
      anchorOrigin={
        isMobile ? undefined : { vertical: "top", horizontal: "right" }
      }
      message={children}
      onClose={handleClose}
      TransitionComponent={transition}
      key={transition ? transition.name : ""}
    />
  );
}
