import { AnchorLocale, Image } from 'components';
import { IDevice } from 'models';
import useStyles from 'styles/mui/sitemap';

type Props = {
  deviceList: IDevice[];
};
export default function Sitemap({ deviceList }: Props) {
  const classes = useStyles();
  return (
    <>
      <AnchorLocale
        ATagProps={{
          className: 'link no-hover ' + classes.topLogo,
        }}
      >
        <Image alt='OrangeFox Logo' className='logo' src='/images/logo.svg' />
        OrangeFox Recovery
      </AnchorLocale>
      <div className={classes.root}>
        {deviceList.map(m => (
          <AnchorLocale
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
          </AnchorLocale>
        ))}
      </div>
    </>
  );
}
