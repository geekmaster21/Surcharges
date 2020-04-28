import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IntlProvider } from 'react-intl';
import { Footer } from '../../components';
import { LoadTranslations, SetCurrentLocale } from '../../i18n';
import { useStyles } from './constants';
import { Drawer } from './Drawer';

interface HomeProps extends RouteComponentProps {
    lang?: string;
}

const Home: React.SFC<HomeProps> = ({ children, lang }) => {
    const locale = lang || 'en';
    const classes = useStyles();
    const translations = LoadTranslations(locale);
    SetCurrentLocale(locale);

    return (<>
        <IntlProvider locale={locale} messages={translations} >

            <div className={classes.root}>
                <Drawer />

                <main className={classes.routeContent}>
                    {children}
                </main>
            </div>

            <Footer />

        </IntlProvider>
    </>);
}

export { Home };
