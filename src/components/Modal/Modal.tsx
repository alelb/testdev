import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ProfileCard, ToggleBar } from '../../components'
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
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [users, setUsers] = useState<unknown[]>()
  const [size, setSize] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(false)

  const currentUser = users?.[selectedIndex]

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    await fetch(`https://random-data-api.com/api/users/random_user?size=${size}`)
      .then(async (response) => setUsers(await response.json()))
      .finally(() => setLoading(false))
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
        {loading && <div>loading...</div>}
        {!loading && <ToggleBar users={users} />}
        <input type='number' value={size} onChange={handleChange} />
        <button onClick={handleClick}>Next</button>
        {currentUser && <ProfileCard user={currentUser} />}
      </div>
      <div className='footer'>
        <button onClick={onClose}>Close</button>
      </div>
    </Container>
  )
}

export { Modal }
