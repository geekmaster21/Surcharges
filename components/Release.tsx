import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { apiGetRelease } from 'apis';
import { AnchorLink, ExpandMore } from 'components';
import { EReleaseType, IRelease } from 'models';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { StopEvent } from 'utils';
import { Bugs } from './Bugs';
import { BuildHyperLink } from './Build-Hyperlink';
import { BuildNotes } from './Build-Notes';
import { ChangeLogs } from './Change-Logs';
import { Downloads } from './Downloads';
import { FileName } from './File-Name';
import { FileSize } from './File-Size';
import { MD5 } from './MD5';

type Props = {
  code?: string;
  popup?: string;
  version: string;
  type: EReleaseType;
  expanded?: boolean;
  onClick?: () => void;
  showAllReleases?: boolean;
  defaultExpanded?: boolean;
};

const Release: React.FunctionComponent<Props> = props => {
  const {
    code,
    type,
    popup,
    onClick,
    version,
    expanded,
    defaultExpanded,
    showAllReleases,
  } = props;
  const classes = useStyles();
  const isExpanded = props.expanded || props.defaultExpanded;
  const [release, setReleaseDetail] = useState<IRelease>({} as IRelease);

  useEffect(() => {
    if (code && isExpanded && !Object.keys(release || {}).length) {
      apiGetRelease(code, type, version)
        .then(data => setReleaseDetail(data))
        .catch(() => {
          showAllReleases && Router.push(`/404`);
        });
    }
  }, [code, type, version, release, showAllReleases, isExpanded]);

  const _version = release?.version || version;
  const showLoader = Boolean(!release?.codename);

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
            <Typography className={classes.version}>{_version}</Typography>
            <span
              onClick={StopEvent}
              style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            >
              <BuildHyperLink
                codename={code}
                buildType={type}
                version={_version}
              />
              {showAllReleases && (
                <AnchorLink
                  as={`/device/${code}`}
                  href='/device/[code]'
                  ATagProps={{
                    className: 'link',
                  }}
                >
                  <Button color='secondary'>
                    <FormattedMessage
                      id='release.allBuild'
                      defaultMessage='Show All Releases'
                    />
                  </Button>
                </AnchorLink>
              )}
            </span>
          </div>
        </AccordionSummary>

        <AccordionDetails className={classes.details}>
          <List component='nav' className={classes.list}>
            <ListItem>
              <FileName release={release} showLoader={showLoader} />
            </ListItem>

            <Divider />

            <ListItem>
              <FileSize release={release} showLoader={showLoader} />
            </ListItem>

            <Divider />

            <MD5 release={release} showLoader={showLoader} />

            <List component='div' className={classes.nestedList}>
              <Downloads
                popup={popup}
                release={release}
                showLoader={showLoader}
              />

              {release?.changelog && (
                <ChangeLogs
                  popup={popup}
                  release={release}
                  showLoader={showLoader}
                />
              )}

              {release?.notes && (
                <BuildNotes
                  popup={popup}
                  release={release}
                  showLoader={showLoader}
                />
              )}

              {release?.bugs && (
                <Bugs popup={popup} release={release} showLoader={showLoader} />
              )}
            </List>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { Release };
