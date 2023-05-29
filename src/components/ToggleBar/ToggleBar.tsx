import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Bar = styled.div`
  display: flex;
  align-content: flex-start;
  flex-flow: row nowrap;
  border: 1px solid red;

  .bar-item {
    flex: 0 1 20%;
    height: 32px;

    border: 1px solid green;
  }
`

const divisors = [5, 4, 3, 2, 1]

type Props = {
  users?: unknown[]
}

const ToggleBar = ({ users }: Props) => {
  const [chunks, setChunks] = useState<unknown[][]>()

  useEffect(() => {
    const divider = calculateDivider(users?.length)
    setChunks(sliceIntoChunks(users, divider))
  }, [users])

  const calculateDivider = (size) => {
    if (size === undefined) return 0
    const remainders = divisors.map((d) => size % d)
    const firstZeroRemainderIndex = remainders.findIndex((r) => r === 0)
    const maxRemainder = Math.max(...remainders)
    const maxRemainderIndex = remainders.findIndex((r) => r === maxRemainder)
    if (firstZeroRemainderIndex !== -1) {
      if (firstZeroRemainderIndex < maxRemainderIndex) {
        return divisors[firstZeroRemainderIndex]
      } else {
        if (divisors[firstZeroRemainderIndex] > maxRemainder) {
          return divisors[firstZeroRemainderIndex]
        } else {
          return divisors[maxRemainderIndex]
        }
      }
    } else {
      return divisors[maxRemainderIndex]
    }
  }

  const sliceIntoChunks = (arr, size) => {
    const chunks = []
    for (let i = 0; i < arr?.length; i += size) {
      const chunk = arr.slice(i, i + size)
      chunks.push(chunk)
    }
    return chunks
  }

  return (
    <>
      {chunks?.map((chunk, index) => (
        <Bar key={index}>
          {chunk?.map((user, index) => (
            <div className='bar-item' key={index}>
              {user['first_name']}
            </div>
          ))}
        </Bar>
      ))}
    </>
  )
}

export { ToggleBar }
