import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IntlProvider } from 'react-intl';
import { apiGetTranslation } from '../../apis';
import { Footer } from '../../components';
import { GetCurrentLocale, SetCurrentLocale } from '../../utils';
import { useStyles } from './constants';
import { Drawer } from './Drawer';

interface HomeProps extends RouteComponentProps {
    lang?: string;
}

const Home: React.SFC<HomeProps> = ({ children, lang }) => {
    const locale = lang || 'en';
    const classes = useStyles();
    const [translations, setTranslations] = React.useState();

    React.useLayoutEffect(() => {
        apiGetTranslation(locale)
            .then(data => setTranslations(data))
            .catch(() => setTranslations({} as any))
    }, [locale])

    const currentLocale = GetCurrentLocale();
    if (locale !== currentLocale) {
        SetCurrentLocale(locale);
    }

    return translations ? (<>
        <IntlProvider locale={locale} messages={translations} >

            <div className={classes.root}>
                <Drawer />

                <main className={classes.routeContent}>
                    {children}
                </main>
            </div>

            <Footer />

        </IntlProvider>
    </>) : null;
}

export default Home;
