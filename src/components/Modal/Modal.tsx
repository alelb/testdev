import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Button, ProfileCard, ToggleBar } from '../../components'
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
  background-color: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.black};

  .header,
  .body,
  .footer {
    padding: 18px;
  }

  .header {
  }
  .body {
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    overflow-y: hidden:    
  }
  .footer {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
  }
  .error {
    color: ${({ theme }) => theme.palette.error};
    font-size: 13px;
    margin-top: 6px;
  } 
  .users-section {
    height: 80%;
    .toggle-bar {
      padding-bottom: 12px;
    }
  }
  .control-section {
    align-items: center;
    height: 20%;
  }
  .control-input {
    display: flex;
    flex-flow: row wrap;
    gap: 6px;
    align-items: center;

    #size-input {
      box-sizing: border-box;
      height: 32px;
      outline-color: ${({ theme }) => theme.palette.primary}
    }
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
    if (size > MAX_USERS || size <= 0) {
      setError('Error: Insert a valid number')
      return
    }
    error && setError('')
    fetchUsers()
    setSelectedIndex(0)
  }, [error, fetchUsers, size])

  const handleToggleButtonClick = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex)
  }

  return (
    <>
      {show && (
        <Container>
          <div className='header'>
            <h2 className='title'>Fetch Users</h2>
          </div>
          <div className='body'>
            {loading && <div className='loading'>loading...</div>}
            {!loading && (
              <div className='users-section'>
                <ToggleBar
                  className='toggle-bar'
                  currentIndex={selectedIndex}
                  onToggleButtonClick={handleToggleButtonClick}
                  users={users}
                />
                {currentUser && <ProfileCard user={currentUser} />}
              </div>
            )}
            <div className='control-section'>
              <div className='control-input'>
                <label htmlFor='size-input'>Next users</label>
                <input id='size-input' type='number' value={size} onChange={handleInputChange} />
                <Button variation='primary' onClick={handleButtonClick}>
                  Next
                </Button>
                {error && <div className='error'>{error}</div>}
              </div>
            </div>
          </div>
          <div className='footer'>
            <Button onClick={onClose}>Close</Button>
          </div>
        </Container>
      )}
    </>
  )
}

export { Modal }
