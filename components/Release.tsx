import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Paper,
  ListItem,
  Typography,
} from '@material-ui/core';
import { apiRelease } from 'apis';
import { AnchorLink, ExpandMore } from 'components';
import { titleCase } from 'core';
import { IRelease, Variants } from 'models';
import Router from 'next/router';
import { useRef } from 'react';
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
  popup?: string;
  expanded?: boolean;
  onClick?: () => void;
  showAllReleases?: boolean;
  defaultExpanded?: boolean;
};

const Release: React.FunctionComponent<Props> = props => {
  const { data, popup, onClick, expanded, defaultExpanded, showAllReleases } =
    props;
  const classes = useStyles();
  const refApiCall = useRef(false);
  const isExpanded = props.expanded || props.defaultExpanded;
  const [release, setReleaseDetail] = useState<IRelease>({} as IRelease);

  useEffect(() => {
    if (isExpanded && !refApiCall.current) {
      refApiCall.current = true;
      apiRelease
        .getById(data._id)
        .then(r => setReleaseDetail(r.data!))
        .catch(() => {
          showAllReleases && Router.push(`/404`);
        });
    }
  }, [data?.device_id, showAllReleases, isExpanded]);

  const { version } = release;

  console.log(release);

  return (
    <>
      <Accordion
        onChange={onClick}
        expanded={expanded}
        className={classes.root}
        defaultExpanded={defaultExpanded}
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
                  href='/device/[code_or_id]'
                  as={`/device/${data.device_id}`}
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
          <div className={classes.list}>
            <div className={classes.variants}>
              {release.variants &&
                Object.keys(release.variants)
                  .map(m => m as keyof Variants)
                  .map(variant => (
                    <Paper key={variant} className={classes.variant}>
                      <b className='title'>{titleCase(variant)}</b>
                      <Divider />
                      <ListItem>
                        <FileName
                          variant={variant}
                          release={release}
                          showLoader={!refApiCall.current}
                        />
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <FileSize variant={variant} release={release} />
                      </ListItem>
                      <Divider />
                      <MD5 variant={variant} release={release} />
                      {release.variants.miui?.mirrors && (
                        <Downloads
                          popup={popup}
                          variant={variant}
                          release={release}
                        />
                      )}
                    </Paper>
                  ))}
            </div>

            <div className={classes.nestedList}>
              {refApiCall.current ? (
                <>
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
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Release;
