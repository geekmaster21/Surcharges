import Linkify from "linkifyjs/react";

export function SplitMsg({ msg }: { msg?: string }) {
  return (
    <>
      {msg?.split("\n").map((m, i) => (
        <p key={i}>
          <Linkify
            options={{
              className: "link orange",
              attributes: {
                rel: "noopener nofollow noreferrer",
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
