import { Image } from "components";
import { FormattedMessage } from "react-intl";

export default function Splash() {
  return (
    <div>
      <div className="hero big-image">
        <Image
          src="/images/select_device.svg"
          alt="Select Device from List"
          className="select-dev-img"
        />

        <span className="select-dev">
          {
            <FormattedMessage
              id="mainPage.hintText"
              defaultMessage="Select device from the list or use search"
            />
          }
        </span>
      </div>

      <div className="bottom-logo">
        <Image alt="OrangeFox Logo" className="logo" src="/images/logo.svg" />

        <div className="title-container">
          <h1 className="title">OrangeFox</h1>
          <h2 className="sub-title">Recovery</h2>
        </div>
      </div>
    </div>
  );
}
