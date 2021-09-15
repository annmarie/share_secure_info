import _ from 'lodash'

export default function FooterComponent(props) {
  return <>
    <hr />
    <div>{props.footerText}</div>
  </>
}
