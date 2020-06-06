import EventEmitter from 'eventemitter3'
import { useEffect, useRef } from 'react'
import { createContainer } from 'unstated-next'

type Events = {
  addUser: []
}

function useAppEvent() {
  const eeRef = useRef(new EventEmitter<Events>())
  const ee = eeRef.current

  return {
    on: ee.on.bind(ee),
    once: ee.once.bind(ee),
    off: ee.off.bind(ee),
    emit: ee.emit.bind(ee),
  }
}

export const AppEventContainer = createContainer(useAppEvent)

export function useAppEventSubscribe<T extends EventEmitter.EventNames<Events>>(
  event: T,
  fn: EventEmitter.EventListener<Events, T>
) {
  const { on, off } = AppEventContainer.useContainer()

  useEffect(() => {
    on(event, fn)

    return () => {
      off(event, fn)
    }
  }, [event, fn])
}
