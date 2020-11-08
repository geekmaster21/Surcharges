import {
  Button,
  Paper, Step,
  StepContent, StepLabel, Stepper,
  Typography
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CheckRoundedIcon } from 'components';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Adb } from 'webadb-node';


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

  const installOF = async () => {
    let webusb = await Adb.open("WebUSB");
    let adb = await webusb.connectAdb("host::");
    setActiveStep(1);
    console.log(`su -c "echo su_ok" && curl --progress-bar -L ` + release.url + ` -o "/sdcard/.ofupdate.zip" && su -c 'echo "install /sdcard/.ofupdate.zip" > /cache/recovery/openrecoveryscript' && reboot recovery`);
    let shell = await adb.shell(`su -c "echo su_ok" && curl --progress-bar -L ` + release.url + ` -o "/sdcard/.ofupdate.zip" && su -c 'echo "install /sdcard/.ofupdate.zip" > /cache/recovery/openrecoveryscript' && reboot recovery`);
    console.log(await shell.receive());
  }

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
