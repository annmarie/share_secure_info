import _ from 'lodash'
import appPageHandler from 'middleware/app-page-handler'

export default function Index(props) {
  // render html page
  return <>
    This is the secret: {props.query.secret}
  </>
}

// using this instead of `getInitialProps`
export function getServerSideProps(ctx) {
  // middleware
  appPageHandler(ctx.req, ctx.res)
  const appConfig = ctx.req.appConfig
  _.set(appConfig, 'query', ctx.query)

  // pass config data to page props
  return { props: { ...appConfig } }
}
