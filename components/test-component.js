import _ from 'lodash'
import useSWR from 'swr'

const fetchData = (apiUrl, parseResp) => {
  const fetcher = (url) => fetch(url).then(parseResp)
  return useSWR(apiUrl, fetcher)
}

const GreetingData = () => {
  const { data, err } = fetchData('/api/test-greeting', (res) => res.json())
  if (err) return <div>Something went wrong.</div> 
  if (!data) return <div>Loading...</div>
  return <div>{_.get(data, 'greeting')}</div>
};

const CookiesData = () => {
  const { data, err } = fetchData('/api/test-cookies', (res) => res.text())
  if (err) return <div>Something went wrong.</div> 
  if (!data) return <div>Loading...</div>
  return <div>{data}</div>
};

export default function testComponent() {
  return <>
    <h1>test</h1>
    <GreetingData />
    <CookiesData />
  </>
}