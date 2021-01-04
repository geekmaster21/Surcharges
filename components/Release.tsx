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
import { apiRelease } from 'apis';
import { AnchorLink, ExpandMore } from 'components';
import { IRelease, IReleaseWithDetails } from 'models';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release';
import { StopEvent } from 'utils';
import Bugs from './Bugs';
import BuildHyperLink from './Build-Hyperlink';
import BuildNotes from './Build-Notes';
import ChangeLogs from './Change-Logs';
import Downloads from './Downloads';
import FileName from './File-Name';
import FileSize from './File-Size';
import { LoadShimmer } from './Load-Shimmer';
import MD5 from './MD5';

type Props = {
  data: IRelease;
  code: string;
  popup?: string;
  expanded?: boolean;
  onClick?: () => void;
  showAllReleases?: boolean;
  defaultExpanded?: boolean;
};

const Release: React.FunctionComponent<Props> = props => {
  const {
    data,
    code,
    popup,
    onClick,
    expanded,
    defaultExpanded,
    showAllReleases,
  } = props;
  const classes = useStyles();
  const isExpanded = props.expanded || props.defaultExpanded;
  const [release, setReleaseDetail] = useState({
    code,
    ...data,
  } as IReleaseWithDetails);
  const hasMirrors = Boolean(Object.keys(release?.mirrors || {}).length);
  const [fetched, setFetched] = useState(hasMirrors);

  useEffect(() => {
    if (code && isExpanded && !hasMirrors) {
      apiRelease
        .getById(data._id)
        .then(r => setReleaseDetail(r.data!))
        .catch(() => {
          showAllReleases && Router.push(`/404`);
        })
        .finally(() => setFetched(true));
    }
  }, [code, release, showAllReleases, isExpanded]);

  const { version } = release;

  return (
    <>
      <Accordion
        expanded={expanded}
        className={classes.root}
        defaultExpanded={defaultExpanded}
        onChange={() => onClick && onClick()}
      >
        <AccordionSummary
          id={version}
          expandIcon={<ExpandMore className={classes.icon} />}
          aria-controls={`${version} [ ${release.date} ]`}
        >
          <div className={classes.summary}>
            <Typography className={classes.version}>
              {version} {showAllReleases && <>( {release.type} )</>}
            </Typography>
            <span
              onClick={StopEvent}
              style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
            >
              <BuildHyperLink release={release} />
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
              <FileName showLoader={!fetched} release={release} />
            </ListItem>

            <Divider />

            <ListItem>
              <FileSize release={release} />
            </ListItem>

            <Divider />

            <MD5 release={release} />

            <List component='div' className={classes.nestedList}>
              {fetched ? (
                <>
                  {release.mirrors?.DL && (
                    <Downloads popup={popup} release={release} />
                  )}

                  {release.changelog?.length && (
                    <ChangeLogs popup={popup} release={release} />
                  )}

                  {release.notes?.length && (
                    <BuildNotes popup={popup} release={release} />
                  )}

                  {release.bugs?.length && (
                    <Bugs popup={popup} release={release} />
                  )}
                </>
              ) : (
                <>
                  {[...Array(4).keys()].map(m => (
                    <LoadShimmer
                      style={{
                        height: '35px',
                        width: '100px',
                        marginRight: '10px',
                      }}
                      key={m}
                    />
                  ))}
                </>
              )}
            </List>
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Release;
