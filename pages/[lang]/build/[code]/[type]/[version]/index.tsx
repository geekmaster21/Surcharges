import { EReleaseType } from "models";
import { useRouter } from "next/router";

type Props = {
  code?: string;
  version?: string;
  type?: EReleaseType;
};

const Build = () => {
  const router = useRouter();
  const { code, type, version } = router.query as Props;
  return (
    <>
      {router.pathname}
      <br />
      {router.asPath}
      <br />
      {code}
      <br />
      {type}
      <br />
      {version}
    </>
  );
};

export default Build;
