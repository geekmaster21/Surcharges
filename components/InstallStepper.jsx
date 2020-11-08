import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import { CheckRoundedIcon } from 'components';
import { IRelease } from 'models';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

async function installOF() {
  console.log('no');
}

function getSteps() {
  return ['Connect device to PC and select it', 'Wait'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `
      You need preinstalled custom recovery (like TWRP),
      enabled USB debugging and internet connection on your phone.
      Connect your phone to PC and press 'Select Device'.
      Your phone will be rebooted.`;
    case 1:
      return `OrangeFox recovery is installing to your phone.
              This process may be slow if you has slow internet connection.
              Your phone will reboot after installation is complete.`;
    default:
      return 'Unknown step';
  }
}

const InstallStepper = ({ release }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              {index === 0 && (
                <Button
                  color='secondary'
                  variant='contained'
                  disableElevation
                  onClick={installOF}
                  className={classes.button}
                  startIcon={<CheckRoundedIcon />}
                >
                  {/* {release.direct_url || release.url} */}

                  <FormattedMessage
                    id='release.install.select'
                    defaultMessage='Select Device'
                  />
                </Button>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>OrangeFox is installed. Check it out!</Typography>
        </Paper>
      )}
    </div>
  );
};

export { InstallStepper };
