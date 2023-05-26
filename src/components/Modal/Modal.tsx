import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;

  .header,
  .body,
  .footer {
    padding: 24px;
  }

  .header {
  }
  .body {
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    border: 2px solid green;
  }
  .footer {
    margin-top: 12px;
    flex-flow: row;
    align-items: flex-end;
  }
`

type Props = {
  onClose: () => void
}

const Modal = ({ onClose }: Props) => {
  const [size, setSize] = useState<number>(10)

  const fetchUsers = useCallback(async () => {
    const response = await fetch(`https://random-data-api.com/api/users/random_user?size=${size}`)
    const jsonData = await response.json()
    console.log(jsonData)
  }, [size])

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSize(parseInt(value))
  }, [])

  const handleClick = useCallback(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <Container>
      <div className='header'>
        <h2 className='title'>Fetch Users</h2>
      </div>
      <div className='body'>
        <input type='number' value={size} onChange={handleChange} />
        <button onClick={handleClick}>Next</button>
        <span>Content goes here</span>
      </div>
      <div className='footer'>
        <button onClick={onClose}>Close</button>
      </div>
    </Container>
  )
}

export { Modal }
