import redisClient from './redisConnect'
import * as uuid from 'uuid';
import _ from 'lodash'

const redisKeyPrefix = 'share-secrets-'

export async function setValue (value)  {
  const id = uuid.v4()
  const key = `${redisKeyPrefix}-${id}`;
  const doc = {
    value: value,
    status: 'Current'
  }
  redisClient.setex(key, 123332, JSON.stringify(doc))
  return key
}

export async function getValue (id)  {
  return new Promise((resolve, reject) => {
    redisClient.get(id, (err, resp) => {
      if (err) reject(err);

      resolve(resp)
    })
  })
}