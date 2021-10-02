import Linkify from 'linkify-react';

export function LinkifyMessage({ msg }: { msg: string | string[] }) {
  return (
    <>
      {(Array.isArray(msg) ? msg : msg?.split('\n')).map((m, i) => (
        <p key={i}>
          <Linkify
            options={{
              className: 'link orange',
              attributes: {
                rel: 'noopener nofollow noreferrer',
              },
            }}
          >
            {m}
          </Linkify>
        </p>
      ))}
    </>
  );
}
