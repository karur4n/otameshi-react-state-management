import React, { useCallback } from 'react'
import { queryKey } from '../../queryKey'
import { API_HOST } from '../../api'
import { useAppEventSubscribe } from '../../AppEventContainer'
import useSWR, { mutate } from 'swr/esm/use-swr'

export const UserList: React.FCX = () => {
  const { data } = useSWR(
    queryKey.userList,
    async () => {
      const res = await fetch(API_HOST + '/users')
      return ((await res.json()) as unknown) as Array<{ name: string }>
    },
    { suspense: true }
  )

  if (!data) throw new Error('data not found')

  const revalidate = useCallback(() => {
    mutate(queryKey.userList)
  }, [])

  useAppEventSubscribe('addUser', revalidate)

  return (
    <div>
      <h2 className="font-bold mb-4">ユーザー一覧</h2>
      <div>
        {data.map((c, i) => (
          <div key={i}>・{c.name}</div>
        ))}
      </div>
    </div>
  )
}
