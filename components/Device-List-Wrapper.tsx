import { ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { ClearOutlinedIcon, Image, OpenOutside, SearchIcon } from 'components';
import { groupBy } from 'core';
import { matchSorter } from 'match-sorter';
import { IDevice, IDeviceGroup } from 'models';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from 'styles/mui/device-list';
import { LocalizedPaths } from 'utils';
import { DeviceList } from './Device-List';

interface DeviceListWrapperProps {
  data: IDevice[];
  handleDeviceClick?: (d: IDevice) => void;
}

const placeholders = [...Array(10).keys()];

const GroupList = (_data: IDevice[]) => {
  const arr: IDeviceGroup[] = [],
    obj = groupBy(_data, d => d.oem || 'Others');
  Object.keys(obj).forEach(key => {
    arr.push({
      oem: key,
      devices: obj[key],
    });
  });
  return arr;
};

const DeviceListWrapper: React.FunctionComponent<DeviceListWrapperProps> = ({
  data,
  handleDeviceClick,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [list, setList] = React.useState<IDeviceGroup[]>(GroupList(data));
  const [filter, setFilter] = React.useState<string>('');

  const onDeviceClick = (dev: IDevice) => {
    const [url, href] = LocalizedPaths(
      `device/${dev.codename}`,
      'device/[code]'
    );
    router.push(href, url);
    handleDeviceClick && handleDeviceClick(dev);
  };

  const onSearch = (value: any) => {
    const _filter = (value || '').toLocaleLowerCase();
    setFilter(_filter);
    if (_filter.trim() !== filter.trim()) setList(doFilter(_filter));
  };

  const doFilter = (_filter: string) => {
    const _f = _filter.trim();
    const _data = data || [];
    const filteredData = _f.trim()
      ? matchSorter(_data, _f, { keys: ['fullname', 'codename'] })
      : _data;
    return GroupList(filteredData);
  };

  if (data?.length && !filter?.trim() && !list.length) setList(doFilter(''));

  const hasList = !data // data will be undefined if api errors out, this will also stop loading placeholder
    ? true
    : Boolean(list.length);

  return (
    <div className={classes.drawerContainer}>
      <div className={classes.drawerStickySearch}>
        <TextField
          className={classes.root}
          size='small'
          color='secondary'
          variant='outlined'
          disabled={!data}
          value={filter}
          label={
            <FormattedMessage
              id='deviceList.searchDevice'
              defaultMessage='Search Device'
            />
          }
          onInput={e => onSearch((e?.target as any)['value'])}
          style={{ width: 'calc(100% - 35px)' }}
          InputProps={{
            endAdornment: (
              <>
                {filter && (
                  <ClearOutlinedIcon
                    fontSize='small'
                    className={classes.clearSearch}
                    onClick={() => onSearch(null)}
                  />
                )}
                <SearchIcon fontSize='small' />
              </>
            ),
          }}
        />
      </div>

      {
        // Device List
        hasList && (
          <DeviceList
            key={filter} // TODO: (remove this hack) if "filter" is persent, re-render list, with expanded groups
            data={list}
            keyParent='oem'
            keyChildren='codename'
            fieldChildren='devices'
            expanded={filter?.trim().length > 1}
            ContentParent={p => <ListItemText primary={p.oem} />}
            ContentChild={c => (
              <>
                <ListItemIcon>
                  <Image
                    alt='dev'
                    src='/images/device.svg'
                    className='device-list-item-icon'
                  />
                </ListItemIcon>

                <ListItemText primary={c.modelname} secondary={c.codename} />
              </>
            )}
            onClickChild={c => onDeviceClick(c)}
          />
        )
      }

      {
        // Loading Placeholder
        !hasList && !filter && (
          <ul className='device-list-loading'>
            {placeholders.map(m => (
              <li key={m}></li>
            ))}
          </ul>
        )
      }

      {
        // No results found
        !hasList && filter && (
          <div className={classes.notFound}>
            <FormattedMessage
              id='deviceList.notFound'
              defaultMessage='Device not found!'
            />

            <OpenOutside
              href='https://wiki.orangefox.tech/en/dev'
              className='link'
            >
              <FormattedMessage
                id='deviceList.diy'
                defaultMessage={`Looks like we don't have that device yet! But you are welcome to build one for yourself and the community. Click here to know more.`}
              />
            </OpenOutside>
          </div>
        )
      }

      {!data && (
        <span className={classes.listNotFound}>
          <FormattedMessage
            id='error.server'
            defaultMessage="Couldn't connect with OrangeFox! Try again later."
          />
        </span>
      )}
    </div>
  );
};

export { DeviceListWrapper };
