import { FormControl, MenuItem, Select } from "@material-ui/core";
import { KeyboardArrowDownRoundedIcon } from "components/common";
import config from "config";
import { useRouter } from "next/router";
import useStyles from "styles/mui/language-toggle";

const LanguageToggle: React.SFC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { availableLanguages: langs, currentLocale } = config;

  const handleChange = ({ target: { value } }: any) => {
    const path = (router.asPath || "")
      .split("/")
      .filter(Boolean)
      .slice(1)
      .join("/");
    const url = `${value}${path ? `${path}` : ""}`;
    router.push(`/${url}`);
  };

  function getEmoji() {
    const lang = langs?.find((f) => f.code === currentLocale);
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
        value={currentLocale}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownRoundedIcon}
        classes={{ icon: classes.selectIcon }}
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
