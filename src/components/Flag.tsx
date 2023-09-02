interface FlagProps {
    emoji: string | undefined;
}

const Flag: React.FunctionComponent<FlagProps> = ({ emoji }) => {
    if (emoji == undefined) return <></>
    const codePoints = [...emoji].map(c => c.codePointAt(0)?.toString(16)).filter(c => c !== "fe0f").join('_')
    return (
        <div className="flagEmoji">
            <img alt={emoji} src={`/images/flags/emoji_u${codePoints}.svg`} width="18" />
        </div>
    )
}

export { Flag };

