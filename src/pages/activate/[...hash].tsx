import React from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { H3 } from '../../styles'
import styled from 'styled-components'
import Spinner from '../../../public/spinner.svg'

const Activate = () => {
  const router = useRouter()
  React.useEffect(() => {
    router.push('/')
    return () => {
      toast.success('Ваша почта подтверждена!')
    }
  }, [])

  return (
    <Wrapper>
      <Loader>
        <Spinner />
      </Loader>
      <H3 margin='20px 0'>Перенаправление на главную...</H3>
    </Wrapper>
  )
}

const Loader = styled.div`
  width: 100px;
  height: 100px;
  svg {
    width: 100%;
    height: 100%;
    circle {
      fill: ${({ theme }) => theme.palette?.primary};
    }
  }
`

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  text-align: center;
`

export default Activate
