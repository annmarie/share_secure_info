import _ from 'lodash'
import useSWR from 'swr'

const fetchData = (apiUrl, parseResp) => {
  const fetcher = (url) => fetch(url).then(parseResp)
  return useSWR(apiUrl, fetcher)
}

const loadingDiv = () => <div>Loading...</div> 
const failedToLoad = () => <div>Something went wrong.</div>

const greetingData = () => {
  const { data, err } = fetchData('/api/test-greeting', (res) => res.json())
  if (err) return failedToLoad(err)
  if (!data) return loadingDiv()

  return <div>{_.get(data, 'greeting')}</div>
};

const cookiesData = () => {
  const { data, err } = fetchData('/api/test-cookies', (res) => res.text())
  if (err) return failedToLoad(err)
  if (!data) return loadingDiv()

  return <div>{data}</div>;
};

export default function testComponent() {
  return <>
    <h1>test</h1>
    {greetingData()}
    {cookiesData()}
    {JSON.stringify(this.colors)}
  </>
}