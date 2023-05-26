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
  show: boolean
  onClose: () => void
}

const Modal = ({ show, onClose }: Props) => {
  return (
    <>
      {show && (
        <Container>
          <div className='header'>
            <h1 className='title'>Fetch Users</h1>
          </div>
          <div className='body'>
            <span>Content goes here</span>
          </div>
          <div className='footer'>
            <button onClick={onClose}>Close</button>
          </div>
        </Container>
      )}
    </>
  )
}

export { Modal }
