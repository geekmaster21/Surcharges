import { NotFound } from "components";

function Page() {
  return <NotFound />;
}

Page.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Page;
