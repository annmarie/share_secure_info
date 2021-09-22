import _ from 'lodash'
import appPageHandler from 'middleware/app-page-handler'

export default function Index(props) {
  // render html page
  return <>
    This is the secret: {props.params}
  </>
}

// using this instead of `getInitialProps`
export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res)
  const appConfig = ctx.req.appConfig
  _.set(appConfig, 'secret', "NEED TO ADD IT HERE")

  //_.set(appConfig, 'params', ctx.req.params)

  // pass config data to page props
  return { props: { ...appConfig } }
}
