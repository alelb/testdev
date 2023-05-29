import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { ProfileCard, ToggleBar } from '../../components'
import styled from 'styled-components'
import { createPortal } from 'react-dom'

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
    overflow-y: hidden:
  }
  .footer {
    margin-top: 12px;
    flex-flow: row;
    align-items: flex-end;
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
  }
  .error {
    color: red;
    font-size: 13px;
    margin-top: 6px;
  }
`

const MAX_USERS = 20

type Props = {
  show: boolean
  onClose: () => void
}

const Modal = ({ show, onClose }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [users, setUsers] = useState<unknown[]>()
  const [size, setSize] = useState<number>(10)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSize(parseInt(value))
  }

  const handleButtonClick = useCallback(() => {
    if (size > MAX_USERS) {
      setError(
        'Error: Max number of users exceeded. Please insert a valid number of users to fetch'
      )
      return
    }
    error && setError('')
    fetchUsers()
    setSelectedIndex(0)
  }, [error, fetchUsers, size])

  const handleToggleButtonClick = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex)
  }

  return createPortal(
    <>
      {show && (
        <Container>
          <div className='header'>
            <h2 className='title'>Fetch Users</h2>
          </div>
          <div className='body'>
            {loading && <div className='loading'>loading...</div>}
            {!loading && (
              <>
                <ToggleBar
                  currentIndex={selectedIndex}
                  onToggleButtonClick={handleToggleButtonClick}
                  users={users}
                />
                {currentUser && <ProfileCard user={currentUser} />}
              </>
            )}
            <h4>Refetch users</h4>
            <input type='number' value={size} onChange={handleInputChange} />
            <button onClick={handleButtonClick}>Next</button>
            {error && <div className='error'>{error}</div>}
          </div>
          <div className='footer'>
            <button onClick={onClose}>Close</button>
          </div>
        </Container>
      )}
    </>,
    document.getElementById('modal')
  )
}

export { Modal }
