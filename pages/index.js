import _ from "lodash";
import appPageHandler from "middleware/app-page-handler";
import StepsComponent from "components/steps-component";
import FormComponent from "components/form-component";

export default function Index(props) {
  return (
    <>
      <FormComponent {...props} />
      <StepsComponent {...props} />
    </>
  );
}

export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res);
  const appConfig = _.get(ctx, "req.appConfig", {});

  // pass config data to page props
  return { props: { ...appConfig } };
}
