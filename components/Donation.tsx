import { Button, Hidden } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { OpenOutside } from ".";
import { IconButton, MonetizationOnOutlinedIcon } from "./Icons";

export interface DonationsProps {
  className?: string;
}

const Donations: React.SFC<DonationsProps> = ({ className }) => {
  return (
    <>
      <OpenOutside
        title="Donations"
        className={className}
        href="https://opencollective.com/orangefox"
      >
        <Hidden smUp implementation="css">
          <IconButton color="inherit" aria-label="Open Donations link">
            <MonetizationOnOutlinedIcon />
          </IconButton>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Button
            color="primary"
            className="whiteColor"
            startIcon={<MonetizationOnOutlinedIcon className="bigIcon" />}
          >
            <span style={{ whiteSpace: "nowrap" }}>
              <FormattedMessage
                id="mainPage.donation"
                defaultMessage="Donations"
              />
            </span>
          </Button>
        </Hidden>
      </OpenOutside>
    </>
  );
};

export { Donations };
