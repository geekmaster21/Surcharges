import { Paper } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import useStyles from "styles/mui/footer";
import { OpenOutside } from "./Open-Outside";
import { PoweredBy } from "./Powered-By";

const Footer = () => {
  const classes = useStyles();
  const Dot = () => <>&#x25CF;</>;

  return (
    <footer>
      <Paper elevation={3} className={classes.root}>
        <OpenOutside
          href="https://gitlab.com/OrangeFox/infrastructure/dsite"
          className={"link " + classes.mx}
        >
          <FormattedMessage
            id="footer.openSource"
            defaultMessage="Open-Source Project"
          />
        </OpenOutside>
        <Dot />
        <span className={classes.mx}>
          <PoweredBy />
        </span>
      </Paper>
    </footer>
  );
};

export { Footer };
