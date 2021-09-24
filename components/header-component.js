import _ from 'lodash'
import Logo from 'svg/logo'

export default function HeaderComponent(props) {
  if (!props.useHeader) return ''

  return <div>
    <h2>ShareSecure <Logo { ...props } /></h2>
  </div>
}
