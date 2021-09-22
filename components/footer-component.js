import _ from 'lodash'

export default function FooterComponent(props) {
  if (!props.useFooter) return ''

  return <>
    <div>{props.footerText}</div>
  </>
}
