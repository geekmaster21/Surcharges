import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { IntlProvider } from 'react-intl';
import { apiGetTranslation } from '../../apis';
import { Footer } from '../../components';
import { SetCurrentLocale } from '../../utils';
import { useStyles } from './constants';
import { Drawer } from './Drawer';

interface HomeProps extends RouteComponentProps {
    lang?: string;
}

const Home: React.SFC<HomeProps> = ({ children, lang }) => {
    const locale = lang || 'en';
    const classes = useStyles();
    const [translations, setTranslations] = React.useState();

    SetCurrentLocale(locale);

    React.useEffect(() => {
        apiGetTranslation(locale)
            .then(data => {
                setTranslations(data);
            });
    }, [locale])

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
