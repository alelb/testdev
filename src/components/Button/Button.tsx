import { ReactNode } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  ${({ theme }) => `
    height: 32px;
    min-width: 100px;
    border-radius: 5px;
    &.primary {
      background-color: ${theme.palette.primary};
    }
    &.standard {
      background-color: ${theme.palette.standard};
    }
  `}
`

type Props = {
  onClick: () => void
  children: ReactNode
  className?: string
  variation?: 'primary' | 'standard'
}

const Button = ({ children, className, onClick, variation = 'standard' }: Props) => (
  <StyledButton className={className ?? ` ${variation}`} onClick={onClick}>
    {children}
  </StyledButton>
)

export { Button }
