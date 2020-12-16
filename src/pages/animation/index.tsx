import React, { useState } from 'react'
import { Transition } from 'react-transition-group';
const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
export interface AnimationProps {

}

const animation_types = ['react-transition-group']
export const Animation: React.FunctionComponent<AnimationProps> = (props) => {
  const [ss,setSS] = useState(false)
  return (
    <div>
      <button onClick={()=>{
        setSS(!ss)
      }}>{ss?'out':'in'}</button>
      <Transition in={ss} timeout={duration}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state as 'exited']
          }}>
            I'm a fade Transition!
          </div>
        )}
      </Transition>
    </div>
  );
}