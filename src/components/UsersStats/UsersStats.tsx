import React, { useCallback } from 'react'
import useSWR, { mutate } from 'swr/esm/use-swr'
import { queryKey } from '../../queryKey'
import { API_HOST } from '../../api'
import { useAppEventSubscribe } from '../../AppEventContainer'

export const UsersStats: React.FC = () => {
  const { data } = useSWR(
    queryKey.usersStats,
    async () => {
      const res = await fetch(API_HOST + '/users-info')
      return ((await res.json()) as unknown) as Array<{
        label: string
        value: number
      }>
    },
    { suspense: true }
  )

  if (!data) throw new Error('data not found')

  const revalidate = useCallback(() => {
    mutate(queryKey.usersStats)
  }, [])

  useAppEventSubscribe('addUser', revalidate)

  return (
    <div>
      <h2 className="font-bold">ユーザー統計</h2>
      <div>
        {data.map((d) => (
          <div key={d.label}>
            {d.label}: {d.value}
          </div>
        ))}
      </div>
    </div>
  )
}
