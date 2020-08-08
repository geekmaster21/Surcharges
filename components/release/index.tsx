import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { apiGetRelease } from "apis";
import {
  ExpandMore,
  LabelImportantOutlinedIcon,
  LinkLocale,
  LoadShimmer,
} from "components/common";
import { EReleaseType, IRelease } from "models";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import useStyles from "styles/mui/release";
import { StopEvent } from "utils";
import { Bugs } from "./Bugs";
import { BuildHyperLink } from "./Build-Hyperlink";
import { BuildNotes } from "./Build-Notes";
import { ChangeLogs } from "./Change-Logs";
import { Downloads } from "./Downloads";
import { FileName } from "./File-Name";
import { FileSize } from "./File-Size";
import { MD5 } from "./MD5";

type Props = {
  code?: string;
  version: string;
  type: EReleaseType;
  expanded?: boolean;
  onClick?: () => void;
  showAllBuild?: boolean;
  defaultExpanded?: boolean;
};

const Release: React.SFC<Props> = (props) => {
  const {
    code,
    version,
    type,
    onClick,
    expanded,
    defaultExpanded,
    showAllBuild,
  } = props;
  const classes = useStyles();
  const [release, setReleaseDetail] = useState<IRelease>({} as IRelease);
  const isDifferentDevice = code && release?.codename !== code;
  useEffect(() => {
    if (code) {
      apiGetRelease(code, type, version)
        .then((data) => setReleaseDetail(data))
        .catch(() => {
          // showAllBuild && navigate(`/${locale}/404`);
        });
    }
  }, [code, type, version, showAllBuild]);

  const _version = release?.version || version;
  const showLoader = Boolean(!release?.codename || isDifferentDevice);

  return (
    <>
      <Accordion
        expanded={expanded}
        className={classes.root}
        defaultExpanded={defaultExpanded}
        onChange={() => onClick && onClick()}
      >
        <AccordionSummary
          id={_version}
          expandIcon={<ExpandMore className={classes.icon} />}
          aria-controls={`${_version} [ ${release.date} ]`}
        >
          <div className={classes.summary}>
            <Typography className={classes.version}>
              <LabelImportantOutlinedIcon
                fontSize="small"
                className={classes.icon + " " + classes.iconM5}
              />
              {!showLoader && _version}

              {/* Loading Placeholder */}
              {showLoader && <LoadShimmer />}
            </Typography>
            <span onClick={StopEvent}>
              {release && <BuildHyperLink {...release} />}
              {showAllBuild && (
                <LinkLocale
                  as={`device/${code}`}
                  href="device/[code]"
                  ATagProps={{
                    className: "link",
                  }}
                >
                  <Button color="secondary">
                    <FormattedMessage
                      id="release.allBuild"
                      defaultMessage="Show All Builds"
                    />
                  </Button>
                </LinkLocale>
              )}
            </span>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <List component="nav" className={classes.list}>
            <ListItem>
              <FileName release={release} showLoader={showLoader} />
            </ListItem>

            <Divider />

            <ListItem>
              <FileSize release={release} showLoader={showLoader} />
            </ListItem>

            <Divider />

            <MD5 release={release} showLoader={showLoader} />

            <List component="div" className={classes.nestedList}>
              <Downloads release={release} showLoader={showLoader} />

              {release?.changelog && (
                <ChangeLogs release={release} showLoader={showLoader} />
              )}

              {release?.notes && (
                <BuildNotes release={release} showLoader={showLoader} />
              )}

              {release?.bugs && (
                <Bugs release={release} showLoader={showLoader} />
              )}
            </List>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { Release };
