import React from 'react';

const Social: React.SFC = () => {
    function ExternalLink(label: string, link: string) {
        const safeLink = 'https://' + link;
        return <a className="link underline" href={safeLink} target="_blank" rel="noopener noreferrer">{`${label} - ${link}`}</a>
    };

    return (
        <div id="social" className="hash-wrapper">
            <div className="title-container">
                <span className="hash">#</span>
                <span className="title">social</span>
            </div>
            <div className="contents" >
                We are on Telegram. Connect with us:
                <span><i className="fa fa-telegram"></i> {ExternalLink('News', 't.me/OrangeFoxNEWS')}</span>
                <span><i className="fa fa-telegram"></i> {ExternalLink('Chat', 't.me/OrangeFoxChat')}</span>
            </div>
        </div>
    );
}

export { Social };
