import React from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../hooks/ThemeStore'

const StyledToggle = styled.div`
  display: flex;
  align-items: center;
  width: 55px;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  input {
    display: none;
  }

  .toggle {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #83d8ff;
    border-radius: 50px;
    transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .toggle__handler {
    margin: 3px 0;
    display: block;
    left: 3px;
    position: relative;
    z-index: 1;
    width: calc(25px - 6px);
    height: calc(25px - 6px);
    background-color: #ffcf96;
    border-radius: 50px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: rotate(-45deg);

    .crater {
      position: absolute;
      background-color: #e8cda5;
      opacity: 0;
      transition: opacity 200ms ease-in-out;
      border-radius: 100%;
    }

    .crater--1 {
      top: 8px;
      left: 6px;
      width: 2px;
      height: 2px;
    }

    .crater--2 {
      top: 12px;
      left: 10px;
      width: 3px;
      height: 3px;
    }

    .crater--3 {
      top: 4px;
      left: 12px;
      width: 4px;
      height: 4px;
    }
  }

  .star {
    position: absolute;
    background-color: #ffffff;
    transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    border-radius: 50%;
  }

  .star--1 {
    top: 6px;
    left: 15px;
    z-index: 0;
    width: 30px;
    height: 2px;
  }

  .star--2 {
    top: 12px;
    left: 15px;
    z-index: 1;
    width: 20px;
    height: 2px;
  }

  .star--3 {
    top: 18px;
    left: 25px;
    z-index: 0;
    width: 20px;
    height: 2px;
  }

  .star--4,
  .star--5,
  .star--6 {
    opacity: 0;
    transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .star--4 {
    top: 5px;
    left: 25px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  .star--5 {
    top: 12px;
    left: 20px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  .star--6 {
    top: 15px;
    left: 26px;
    z-index: 0;
    width: 2px;
    height: 2px;
    transform: translate3d(3px, 0, 0);
  }

  input:checked {
    + .toggle {
      background-color: #749dd6;

      .toggle__handler {
        background-color: #ffe5b5;
        transform: translate3d(30px, 0, 0) rotate(0);

        .crater {
          opacity: 1;
        }
      }

      .star--1 {
        width: 3px;
        height: 3px;
      }

      .star--2 {
        width: 2px;
        height: 2px;
        transform: translate3d(-5px, 0, 0);
      }

      .star--3 {
        width: 2px;
        height: 2px;
        transform: translate3d(-7px, 0, 0);
      }

      .star--4,
      .star--5,
      .star--6 {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      .star--4 {
        transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      }
      .star--5 {
        transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      }
      .star--6 {
        transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
      }
    }
  }
`

const Toggle = () => {
  const { theme, themeToggler } = React.useContext(ThemeContext)
  return (
    <StyledToggle>
      <input checked={theme === 'dark'} readOnly onClick={themeToggler} type='checkbox' id='dn' />
      <label htmlFor='dn' className='toggle'>
        <span className='toggle__handler'>
          <span className='crater crater--1'></span>
          <span className='crater crater--2'></span>
          <span className='crater crater--3'></span>
        </span>
        <span className='star star--1'></span>
        <span className='star star--2'></span>
        <span className='star star--3'></span>
        <span className='star star--4'></span>
        <span className='star star--5'></span>
        <span className='star star--6'></span>
      </label>
    </StyledToggle>
  )
}

export default Toggle
