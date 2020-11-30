import { apiGetAllDeviceList } from 'apis';
import { AnchorLink, Image } from 'components';
import { useIsMounted } from 'hooks/mount';
import { IDevice } from 'models';
import { useEffect, useState } from 'react';
import useStyles from 'styles/mui/sitemap';

const placeholders = Array(100).fill(null);

export default function Sitemap() {
  const classes = useStyles();
  const isMounted = useIsMounted();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([] as IDevice[]);

  useEffect(() => {
    if (isMounted) {
      apiGetAllDeviceList().then(x => {
        if (isMounted) {
          setLoading(false);
          setList(x);
        }
      });
    }
  }, []);

  return (
    <>
      <AnchorLink
        ATagProps={{
          className: 'link no-hover ' + classes.topLogo,
        }}
      >
        <Image alt='OrangeFox Logo' className='logo' src='/images/logo.svg' />
        OrangeFox Recovery
      </AnchorLink>
      <div className={classes.root}>
        {loading
          ? placeholders.map((_, i) => (
              <div
                key={i}
                className={classes.itemPlaceholder + ' shimmer-wrapper'}
              >
                <b className='shimmer' />
                <small className='shimmer' />
              </div>
            ))
          : list.map(m => (
              <AnchorLink
                key={m._id}
                href='device/[code]'
                as={`device/${m.codename}`}
                ATagProps={{
                  className: 'link',
                  title: `Download Orangefox Recovery - ${m.modelname} ( ${m.codename} )`,
                }}
              >
                <div className={classes.item}>
                  <b>{m.fullname}</b>
                  <small className={classes.code}>{m.codename}</small>
                </div>
              </AnchorLink>
            ))}
      </div>
    </>
  );
}
