import { FormControl, MenuItem, Select } from '@material-ui/core';
import { KeyboardArrowDownRoundedIcon } from 'components';
import config from 'config';
import { useRouter } from 'next/router';
// @ts-ignore
import emoji from 'react-easy-emoji';
import useStyles from 'styles/mui/language-toggle';
import { GetCurrentLocale, SetCurrentLocale } from 'utils';
import { TranslateIcon } from './Icons';

const LanguageToggle = () => {
  const classes = useStyles();
  const router = useRouter();
  const { availableLanguages: langs } = config;
  const locale =
    GetCurrentLocale(false) || router.locale || config.locale.default;

  const handleChange = ({ target: { value: locale } }: any) => {
    if (!locale) {
      return window.open(
        'https://translate.orangefox.tech/downloads-website',
        '_blank'
      );
    }
    const query = (router.query || {}) as any;
    SetCurrentLocale(locale);
    const url = router.pathname;
    let as = url;
    Object.keys(query).forEach(key => {
      as = as.replace(`[${key}]`, query[key]);
    });
    router.push(url, as, { locale, shallow: false });
  };

  function getEmoji() {
    const lang = langs?.find(f => f.code === locale);
    return lang ? emoji(lang.emoji) : null;
  }

  return langs?.length ? (
    <FormControl
      size='small'
      variant='outlined'
      className={classes.formControl}
    >
      <Select
        displayEmpty
        value={locale}
        onChange={handleChange}
        className={classes.select}
        IconComponent={KeyboardArrowDownRoundedIcon}
        classes={{ icon: classes.arrowIcon }}
        renderValue={() => getEmoji()}
      >
        <MenuItem key='help-translate' className={classes.listItemHelp}>
          <TranslateIcon fontSize='small' style={{ fontSize: '16px' }} />
          <span>Help us Translate!</span>
        </MenuItem>
        {langs.map(m => (
          <MenuItem
            key={m.code}
            value={m.code}
            className={classes.listItem}
            classes={{ selected: classes.listItemSelected }}
          >
            <span>{emoji(m.emoji)}</span>
            <span>{m.name}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : null;
};

export { LanguageToggle };
