import { FormControl, MenuItem, Select } from "@material-ui/core";
import { KeyboardArrowDownRoundedIcon } from "components";
import config from "config";
import { useRouter } from "next/router";
import useStyles from "styles/mui/language-toggle";
import { GetCurrentLocale, SetCurrentLocale } from "utils";

const LanguageToggle = () => {
  const classes = useStyles();
  const router = useRouter();
  const { availableLanguages: langs } = config;
  const locale = GetCurrentLocale();

  const handleChange = ({ target: { value } }: any) => {
    const query = (router.query || {}) as any;
    query.lang = value;
    SetCurrentLocale(value);
    const url = router.pathname;
    let as = url;
    Object.keys(query).forEach((key) => {
      as = as.replace(`[${key}]`, query[key]);
    });
    router.push(url, as);
  };

  function getEmoji() {
    const lang = langs?.find((f) => f.code === locale);
    return lang ? lang.emoji : null;
  }

  return langs?.length ? (
    <FormControl
      size="small"
      variant="outlined"
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
        {langs.map((m) => (
          <MenuItem
            key={m.code}
            value={m.code}
            className={classes.listItem}
            classes={{ selected: classes.listItemSelected }}
          >
            {m.emoji} &nbsp;&nbsp; {m.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : null;
};

export { LanguageToggle };
