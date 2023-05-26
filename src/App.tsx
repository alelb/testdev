import { useCallback, useState } from 'react'
import { Modal } from './components'

const App = () => {
  const [show, setShow] = useState<boolean>(false)

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  const handleClick = useCallback(() => {
    setShow(true)
  }, [])

  return (
    <>
      <button onClick={handleClick}>Open modal</button>
      <>{show && <Modal onClose={handleClose} />}</>
    </>
  )
}

export default App
