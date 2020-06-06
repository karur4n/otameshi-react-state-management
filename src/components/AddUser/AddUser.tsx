import React, { useState } from 'react'
import { API_HOST } from '../../api'
import { AppEventContainer } from '../../AppEventContainer'

export const AddUser: React.FC = () => {
  const { emit } = AppEventContainer.useContainer()
  const [name, setName] = useState('')

  const submit = async () => {
    await fetch(API_HOST + '/users', {
      method: 'POST',
      body: JSON.stringify({
        name,
      }),
    })

    setName('')
    emit('addUser')
  }

  return (
    <div>
      <h2 className="font-bold mb-4">ユーザーを追加する</h2>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          className="border border-gray-400 rounded focus:outline-none py-1 px-2 w-full"
          placeholder="名前"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        className="bg-purple-700 text-white py-1 px-3 rounded disabled:opacity-50 disabled:cur"
        disabled={!name}
        onClick={submit}
      >
        追加する
      </button>
    </div>
  )
}
