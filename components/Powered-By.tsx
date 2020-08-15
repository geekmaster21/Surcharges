import { FormattedMessage } from "react-intl";
import { OpenOutside } from "./Open-Outside";

const PoweredBy = () => {
  return (
    <span>
      <FormattedMessage
        id="footer.poweredBy"
        defaultMessage="Powered by {hostWebsite}"
        values={{
          hostWebsite: (
            <OpenOutside className="link" href="https://www.ua-hosting.company">
              UA-Hosting Company
            </OpenOutside>
          ),
        }}
      />
    </span>
  );
};

export { PoweredBy };
