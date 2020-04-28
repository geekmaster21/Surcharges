import React from 'react';
import { FormattedMessage } from 'react-intl';

const PoweredBy: React.SFC = () => {
    return (<>
        <span style={{ marginRight: '5px' }}>
            <FormattedMessage
                id="footer.poweredBy"
                defaultMessage="Powered by" />
        </span>
        <a href='https://www.ua-hosting.company'
            className="link"
            target="_blank"
            rel="noopener noreferrer"
        >UA-Hosting Company</a>
    </>);
}

export { PoweredBy };
