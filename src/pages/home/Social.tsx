import React from 'react';


const Social: React.SFC = () => {
    function ExternalLink(link: string) {
        const safeLink = 'https://' + link;
        return <a href={safeLink} className="link" target="_blank">{link}</a>
    };

    return (
        <div id="social" className="hash-wrapper">
            <div className="title-container">
                <span className="hash">#</span>
                <span className="title">social</span>
            </div>
            <div className="contents" >
                We are on Telegram. Connect with us:
                <span>News | {ExternalLink('t.me/OrangeFoxNEWS')}</span>
                <span>Chat | {ExternalLink('t.me/OrangeFoxChat')}</span>
            </div>
        </div>
    );
}

export { Social };
