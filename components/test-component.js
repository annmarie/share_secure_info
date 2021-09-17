import _ from 'lodash'
import useSWR from 'swr'

const fetchApiData = (apiUrl, parseResp) => {
  const fetcher = (url) => fetch(url).then(parseResp)
  return useSWR(apiUrl, fetcher)
}

const GreetingData = () => {
  const url = '/api/test-greeting?name=Randy' 
  const fetchParse = (res) => res.json()
  const { data, err } = fetchApiData(url, fetchParse)
  if (err) return <div>Something went wrong.</div> 
  if (!data) return <div>Loading...</div>
  return <div>{_.get(data, 'greeting')}</div>
};

const CookiesData = () => {
  const url = '/api/test-cookies'
  const fetchParse = (res) => res.text()
  const { data, err } = fetchApiData(url, fetchParse)
  if (err) return <div>Something went wrong.</div> 
  if (!data) return <div>Loading...</div>
  return <div>{data}</div>
};

const RedisData = () => {
  const url = '/api/test-redis'
  const fetchParse = (res) => res.json()
  const { data, err } = fetchApiData(url, fetchParse)
  if (err) return <div>Something went wrong.</div>
  if (!data) return <div>Loading...</div>
  return <div>{JSON.stringify(data)}</div>
};


export default function testComponent() {
  return <>
    <h1>test</h1>
    <GreetingData />
    <CookiesData />
    <RedisData />
  </>
}
