import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { apiDevice } from 'apis';
import {
  ClearOutlinedIcon,
  ExpandLess,
  ExpandMore,
  Image,
  OpenOutside,
  SearchIcon,
} from 'components';
import config from 'config';
import { matchSorter } from 'match-sorter';
import { IDevice } from 'models';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/device-list';

export type DeviceListState = {
  search: string;
  allDevices?: IDevice[];
  filterByAll?: boolean;
  currentList?: IDevice[];
  supportedDevices?: IDevice[];
};

const placeholders = [...Array(10).keys()];

function filteredDevices(devices: IDevice[], search = '') {
  if (search.trim().length) {
    return matchSorter(devices, search, {
      keys: ['codenames', 'model_names'],
    });
  }
  return devices;
}

export default function DeviceList({
  onUpdate,
  onDeviceClick,
  ...listState
}: {
  onDeviceClick?: () => void;
  onUpdate: (dl: DeviceListState) => void;
} & DeviceListState) {
  const router = useRouter();
  const classes = useStyles();
  const [state, setState] = useState<DeviceListState>(listState);
  const [fetched, setFetched] = useState(false);
  const [collapseOEM, setCollapseOEM] = useState<{ [p: string]: boolean }>({});

  function callApi(supported = false) {
    setState(s => ({ ...s, currentList: undefined }));
    apiDevice
      .getAll(supported && { supported })
      .then(r => {
        const list = r.data?.list || [];
        setState(s => ({
          ...s,
          [supported ? 'supportedDevices' : 'allDevices']: list,
          currentList: filteredDevices(list, state.search),
        }));
      })
      .finally(() => setFetched(true));
  }

  useEffect(() => {
    if (state.filterByAll) {
      if (!state.allDevices) {
        callApi();
      }
    } else {
      if (!state.supportedDevices) {
        callApi(true);
      }
    }
  }, [state.filterByAll]);

  function toggleFilter(filterByAll = false) {
    if (
      (state.filterByAll && filterByAll) ||
      (!state.filterByAll && !filterByAll)
    ) {
      return;
    } else {
      setState(s => ({ ...s, filterByAll }));
      handleFilter();
    }
  }

  function handleFilter(search = '') {
    setState(s => ({
      ...s,
      search,
      currentList: filteredDevices(
        (s.filterByAll ? s.allDevices : s.supportedDevices) || [],
        search
      ),
    }));
  }

  function handleDeviceClick(dev: IDevice) {
    router.push('/device/[code]', `/device/${dev._id}`);
    onDeviceClick && onDeviceClick();
  }

  useEffect(() => {
    onUpdate(state);
  }, [state]);

  return (
    <>
      <div className={classes.root}>
        {/* Search Field */}
        <div className={classes.searchContainer}>
          <TextField
            className={classes.searchTxtField}
            size='small'
            color='secondary'
            variant='outlined'
            value={state.search}
            disabled={!state.currentList}
            label={
              <FormattedMessage
                id='deviceList.searchDevice'
                defaultMessage='Search Device'
              />
            }
            style={{ width: 'calc(100% - 20px)' }}
            onInput={e => handleFilter((e?.target as HTMLInputElement).value)}
            InputProps={{
              endAdornment: (
                <>
                  {state.search && (
                    <ClearOutlinedIcon
                      fontSize='small'
                      className={classes.clearSearch}
                      onClick={() => handleFilter()}
                    />
                  )}
                  <SearchIcon fontSize='small' />
                </>
              ),
            }}
          />

          {/* Filter */}
          {state.currentList && (
            <>
              <ToggleButtonGroup
                exclusive
                size='small'
                value={state.filterByAll}
                aria-label='Filter devices based on official support'
                onChange={e => {
                  toggleFilter(e.currentTarget.id === 'all');
                }}
                style={{ width: '100%', padding: '0 10px' }}
              >
                <ToggleButton
                  id='supported'
                  value={false}
                  style={{ width: '100%' }}
                  aria-label='Supported Devices'
                  className={classes.filterBtn}
                >
                  <FormattedMessage
                    id='deviceList.filter.supported'
                    defaultMessage='Supported Devices'
                  />
                </ToggleButton>
                <ToggleButton
                  id='all'
                  value={true}
                  style={{ width: '100%' }}
                  aria-label='All Devices'
                  className={classes.filterBtn}
                >
                  <FormattedMessage
                    id='deviceList.filter.all'
                    defaultMessage='All Devices'
                  />
                </ToggleButton>
              </ToggleButtonGroup>
            </>
          )}
        </div>

        {
          // Loading Placeholder
          !state.currentList && (
            <ul className='device-list-loading'>
              {placeholders.map(m => (
                <li key={m}></li>
              ))}
            </ul>
          )
        }

        {
          // Search didn't yield any results
          state.currentList?.length === 0 && state.search && (
            <>
              <div className={classes.notFound}>
                <FormattedMessage
                  id='deviceList.notFound'
                  defaultMessage='Device not found!'
                />

                <OpenOutside
                  className='link'
                  href='https://wiki.orangefox.tech/en/dev'
                >
                  <FormattedMessage
                    id='deviceList.diy'
                    defaultMessage={`Looks like we don't have that device yet! But you are welcome to build one for yourself and the community. Click here to know more.`}
                  />
                </OpenOutside>
              </div>
            </>
          )
        }

        {
          // Api called but couldn't fetch any data
          fetched &&
            !(state.allDevices?.length || state.supportedDevices?.length) && (
              <span className={classes.listNotFound}>
                <FormattedMessage
                  id='error.server'
                  defaultMessage="Couldn't connect with OrangeFox! Try again later."
                />
              </span>
            )
        }

        {
          // Device list
          state.currentList && (
            <List style={{ height: '100%', overflow: 'auto' }}>
              {state.currentList.map(deviceGroup => (
                <Fragment key={deviceGroup.oem_name}>
                  {/* OEM Group */}
                  <ListItem
                    button
                    onClick={() =>
                      setCollapseOEM(s => ({
                        ...s,
                        [deviceGroup.oem_name]: !s[deviceGroup.oem_name],
                      }))
                    }
                  >
                    <ListItemText
                      primary={deviceGroup.oem_name}
                      style={
                        deviceGroup.supported
                          ? { color: '#ececec' }
                          : { color: '#7b7b7b', fontStyle: 'italic' }
                      }
                    />
                    {collapseOEM[deviceGroup.oem_name] ? (
                      <ExpandLess fontSize='small' />
                    ) : (
                      <ExpandMore fontSize='small' />
                    )}
                  </ListItem>

                  {/* Devices under OEM */}
                  <Collapse
                    timeout='auto'
                    unmountOnExit
                    in={
                      !!state.search.trim() || collapseOEM[deviceGroup.oem_name]
                    }
                  >
                    <List>
                      {deviceGroup.model_names!.map(modelName => {
                        const Text = (lp: {
                          supported: boolean;
                          content: string;
                        }) => (
                          <span
                            style={
                              lp.supported
                                ? {
                                    color: '#ececec',
                                  }
                                : {
                                    color: '#7b7b7b',
                                    fontStyle: 'italic',
                                  }
                            }
                          >
                            {lp.content}
                          </span>
                        );
                        return (
                          <ListItem
                            button
                            key={modelName}
                            onClick={() => handleDeviceClick(deviceGroup)}
                            title={
                              deviceGroup.supported ? undefined : 'Unsupported'
                            }
                          >
                            <ListItemIcon>
                              <Image
                                alt='dev'
                                src='/images/device.svg'
                                className='device-list-item-icon'
                              />
                            </ListItemIcon>

                            <ListItemText
                              primary={
                                <Text
                                  content={modelName}
                                  supported={deviceGroup.supported}
                                />
                              }
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </List>
          )
        }
        <small className={classes.version}>v{config.version}</small>
      </div>
    </>
  );
}
