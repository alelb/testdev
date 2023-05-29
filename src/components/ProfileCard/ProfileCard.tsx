import styled from 'styled-components'

const Card = styled.article`
  margin: 12px;
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  .avatar {
    height: 150px;
  }
  .info {
    display: flex;
    flex-flow: column nowrap;
  }
`

type Props = {
  user: unknown
  className?: string
}

const ProfileCard = ({ user, className }: Props) => (
  <Card className={className ?? ''}>
    <img className='avatar' src={user['avatar']} alt='avatar' />
    <div className='info'>
      <h1>{`${user['first_name']} ${user['last_name']}`}</h1>
      <p>{user['email']}</p>
    </div>
  </Card>
)

export { ProfileCard }
