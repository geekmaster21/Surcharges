import React from 'react';

export function SplitMsg({ msg }: { msg?: string }) {
    return <>{msg?.split('\n').map((m, i) => <p key={i}>{m}</p>)}</>;
}
