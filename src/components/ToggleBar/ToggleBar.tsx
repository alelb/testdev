import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const Bar = styled.div`
  display: flex;
  align-content: flex-start;
  flex-flow: row nowrap;

  .bar-item {
    flex: 0 1 20%;
    height: 32px;

    border: 1px solid #0449d1;
  }
  > button {
    background-color: #4bcadf;
    color: #0449d1;
  }
  > button.selected {
    background-color: #2690d8;
  }
  > button:first-child {
    border-radius: 5px 0 0 5px;
  }
  > button:last-child {
    border-radius: 0 5px 5px 0;
  }
`

const divisors = [5, 4, 3, 2, 1]

type Props = {
  users?: unknown[]
  currentIndex: number
  onToggleButtonClick: (currentIndex: number) => void
}

const ToggleBar = ({ users, currentIndex, onToggleButtonClick }: Props) => {
  const [divider, setDivider] = useState<number>()
  const [chunks, setChunks] = useState<unknown[][]>()

  useEffect(() => {
    const divider = calculateDivider(users?.length)
    setDivider(divider)
    setChunks(sliceIntoChunks(users, divider))
  }, [users])

  const calculateDivider = (size: number) => {
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

  const handleClick = useCallback(
    (i: number, j: number) => {
      onToggleButtonClick(i * divider + j)
    },
    [divider, onToggleButtonClick]
  )

  return (
    <>
      {chunks?.map((chunk, i) => (
        <Bar key={i}>
          {chunk?.map((user, j) => (
            <button
              className={`bar-item ${currentIndex === i * divider + j ? 'selected' : ''}`}
              key={j}
              onClick={() => handleClick(i, j)}
            >
              {user['first_name']}
            </button>
          ))}
        </Bar>
      ))}
    </>
  )
}

export { ToggleBar }
