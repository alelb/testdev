import { useCallback, useState } from 'react'
import { Button, Modal } from './components'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

const App = () => {
  const [show, setShow] = useState<boolean>(false)

  const handleClose = () => setShow(false)

  const handleClick = () => setShow(true)

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={handleClick}>Open modal</Button>
      <Modal show={show} onClose={handleClose} />
    </ThemeProvider>
  )
}

export default App
