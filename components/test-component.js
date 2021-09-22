import _ from 'lodash'
import fetchApiData from 'utils/fetch-api-data'

const GreetingData = () => {
  const url = '/api/test-greeting?name=Randy' 
  const fetchParse = (res) => res.json()
  const { data, err } = fetchApiData(url, fetchParse)
  if (err) return <div>Something went wrong.</div> 
  if (!data) return <div>Loading...</div>
  return <div>{_.get(data, 'greeting')}</div>
};

export default function testComponent(props) {
  return <>
    <GreetingData { ...props } />
  </>
}
