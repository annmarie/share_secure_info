import _ from 'lodash'

export default function HeaderComponent(props) {
  if (!props.useHeader) return ''

  return <div>
    <h2>ShareSecure</h2>
  </div>
}
