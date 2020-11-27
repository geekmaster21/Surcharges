import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { isEqual, sortBy } from 'core';
import { usePreviousProps } from 'hooks';
import { EReleaseType, IRelease } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release-type';
import { ExpandMore, Release } from './';
import { BugReportOutlined, CheckBoxOutlined, ReportOutlined } from './Icons';
import { OpenOutside } from './Open-Outside';

type Props = {
  code: string;
  version?: string;
  data: IRelease[];
  type: EReleaseType;
  expanded?: boolean;
  releaseLabel: JSX.Element;
};

const ReleaseType = (props: Props) => {
  const { code, expanded, data, type, version, releaseLabel } = props;
  const classes = useStyles();
  const sortedData = sortBy(data, d => d.actualDate).reverse();
  const [expandPanel, setExpanded] = useState<number>(0);

  const handleChange = (panel: number) => {
    setExpanded(expandPanel === panel ? -1 : panel);
  };

  const prevProps = usePreviousProps(props);
  if (
    prevProps &&
    prevProps?.code &&
    code &&
    !isEqual(
      sortBy(prevProps?.data || [], p => p.actualDate),
      sortBy(data || [], p => p.actualDate)
    )
  ) {
    // hack to open first panel automatically
    setTimeout(() => setExpanded(0), 0);
  }

  return (
    <>
      <Accordion className={classes.root} defaultExpanded={expanded}>
        <AccordionSummary
          id={`release-${type}-header`}
          expandIcon={<ExpandMore className={classes.icon} />}
          aria-controls={`release-${type}-content`}
        >
          <Typography className='flexd v-center'>
            {type === EReleaseType.beta ? (
              <BugReportOutlined className={classes.iconM5} fontSize='small' />
            ) : (
              <CheckBoxOutlined className={classes.iconM5} fontSize='small' />
            )}
            {releaseLabel}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {type === EReleaseType.beta && (
            <>
              <Alert
                severity='warning'
                variant='outlined'
                className={classes.alert}
                icon={<ReportOutlined fontSize='inherit' />}
              >
                <FormattedMessage
                  id='release.type.betaInfo'
                  defaultMessage='These releases are not guaranteed to work. Please consider reporting to our beta telegram channel'
                />{' '}
                <OpenOutside
                  className='link orange'
                  href='https://t.me/OrangeFoxBeta'
                >
                  https://t.me/OrangeFoxBeta
                </OpenOutside>
              </Alert>
            </>
          )}
          {sortedData.map((m, i) => (
            <Release
              key={m.version}
              version={m.version}
              code={code}
              type={type}
              onClick={() => handleChange(i)}
              expanded={version ? m.version === version : expandPanel === i}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export { ReleaseType };
