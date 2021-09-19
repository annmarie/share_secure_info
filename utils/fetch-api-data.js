import useSWR from 'swr'

export default function fetchApiData(apiUrl, parseResp) {
  const fetcher = (url) => fetch(url).then(parseResp)
  return useSWR(apiUrl, fetcher)
}
