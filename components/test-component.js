import _ from 'lodash'
import useSWR from 'swr'

const fetchData = (apiUrl, parseResp) => {
  const fetcher = (url) => fetch(url).then(parseResp)
  return useSWR(apiUrl, fetcher)
}

const greetingData = () => {
  const { data, err } = fetchData('/api/test-greeting', (res) => res.json())
  if (err) return 'Something went wrong.' 
  if (!data) return 'Loading...' 
  return _.get(data, 'greeting')
};

const cookiesData = () => {
  const { data, err } = fetchData('/api/test-cookies', (res) => res.text())
  if (err) return 'Something went wrong.' 
  if (!data) return 'Loading...' 
  return data
};

export default function testComponent() {
  return <>
    <h1>test</h1>
    <div>{greetingData()}</div>
    <div>{cookiesData()}</div>
  </>
}