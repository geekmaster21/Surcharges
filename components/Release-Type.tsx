import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { isEqual, sortBy } from 'core';
import { usePreviousProps } from 'hooks';
import { IRelease, TReleaseType } from 'models';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/release-type';
import {
  BugReportOutlined,
  CheckBoxOutlined,
  ExpandMore,
  ReportOutlined,
} from './Icons';
import { OpenOutside } from './Open-Outside';
import Release from './Release';

type Props = {
  code: string;
  version?: string;
  data: IRelease[];
  type: TReleaseType;
  expanded?: boolean;
  releaseLabel: JSX.Element;
};

const ReleaseType = (props: Props) => {
  const classes = useStyles();
  const { expanded, data, type, version, releaseLabel } = props;
  const sortedData = sortBy(data, d => d.actualDate).reverse();
  const [expandPanel, setExpanded] = useState<number>(0);

  const handleChange = (panel: number) => {
    setExpanded(expandPanel === panel ? -1 : panel);
  };

  const prevProps = usePreviousProps(props);
  if (
    prevProps?.code &&
    props.code &&
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
          aria-controls={`release-${type}-content`}
          expandIcon={<ExpandMore className={classes.icon} />}
        >
          <Typography className='flexd v-center'>
            {type === 'beta' ? (
              <BugReportOutlined className={classes.iconM5} fontSize='small' />
            ) : (
              <CheckBoxOutlined className={classes.iconM5} fontSize='small' />
            )}
            {releaseLabel}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {type === 'beta' && (
            <>
              <Alert
                severity='warning'
                variant='outlined'
                className={classes.alert}
                icon={<ReportOutlined fontSize='inherit' />}
              >
                <FormattedMessage
                  id='release.type.betaInfo'
                  defaultMessage='Beta releases should work as far as basic functionality is concerned. However, you may encounter issues and/or bugs, which you can report to our {telegramChannel} channel'
                  values={{
                    telegramChannel: (
                      <OpenOutside
                        className='link orange'
                        href='https://t.me/OrangeFoxBeta'
                      >
                        Telegram Beta
                      </OpenOutside>
                    ),
                  }}
                />
              </Alert>
            </>
          )}
          {sortedData.map((m, i) => (
            <Release
              data={m}
              key={m.version}
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
