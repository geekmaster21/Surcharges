import { Image, LinkLocale } from "components/common";
import { FormattedMessage } from "react-intl";

function Error() {
  return (
    <div className="hero big-image">
      <Image src="/images/404.svg" alt="Not Found" className="nf-img" />

      <LinkLocale
        ATagProps={{
          className: "link underline",
        }}
      >
        <FormattedMessage
          id="mainPage.notFound"
          defaultMessage="This is the end. Take me back Home!"
        />
      </LinkLocale>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
