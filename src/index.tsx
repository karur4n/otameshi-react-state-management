/** @jsx jsx */
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Panel } from './components/Panel/Panel'
import { css, jsx } from '@emotion/core'
import { UserList } from './components/UserList/UserList'
import { AddUser } from './components/AddUser/AddUser'
import { AppEventContainer } from './AppEventContainer'
import { UsersStats } from './components/UsersStats/UsersStats'

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root')

  ReactDOM.render(<App />, rootEl)
})

const App: React.FC = () => {
  return (
    <AppEventContainer.Provider>
      <div css={s.container}>
        <h1>ダッシュボードのテイ</h1>
        <div css={s.panelWrapper}>
          <Panel css={s.panel}>
            <Suspense fallback={<p>Loading...</p>}>
              <UserList />
            </Suspense>
          </Panel>
          <Panel css={s.panel}>
            <AddUser />
          </Panel>
          <Panel css={s.panel}>
            <Suspense fallback={<p>Loading...</p>}>
              <UsersStats />
            </Suspense>
          </Panel>
        </div>
      </div>
    </AppEventContainer.Provider>
  )
}

const s = {
  container: css`
    margin: 0 auto;
    width: 640px;
  `,
  panelWrapper: css`
    display: flex;
    flex-wrap: wrap;
  `,
  panel: css`
    width: 300px;
    margin: 8px;
  `,
}
