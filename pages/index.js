import _ from "lodash";
import appPageHandler from "middleware/app-page-handler";
import StepsComponent from "components/steps-component";
import FormComponent from "components/form-component";
import HeaderComponent from "components/header-component";
import FooterComponent from "components/footer-component";

export default function Index(props) {
  return (
    <>
      <HeaderComponent {...props} />
      <FormComponent {...props} />
      <StepsComponent {...props} />
      <FooterComponent {...props} />
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
