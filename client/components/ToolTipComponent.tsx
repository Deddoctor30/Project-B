import { FC, useRef, useState } from 'react';
import classes from '../styles/ToolTipComponent.module.scss';
import { CSSTransition } from 'react-transition-group';

type PropsType = {
  children: React.ReactNode;
  text: string | any[];
};

const transitionClasses = {
  enter: classes.onEnter,
  enterActive: classes.onEnterActive,
  exit: classes.onExit,
  exitActive: classes.onExitActive,
};

const ToolTipComponent: FC<PropsType> = ({children, text}) => {  
  const refSetTimeout = useRef<NodeJS.Timeout>();
  const [showToolTip, setShowToolTip] = useState(false);

  const onMouseEnterHandler = () => {
    refSetTimeout.current = setTimeout(() => {
      setShowToolTip(true);
    }, 400);
  };

  const onMouseLeaveHandler = () => {
    clearTimeout(refSetTimeout.current);
    setShowToolTip(false);
  };

  return (    
    <div className={classes.container} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      {children}
      <CSSTransition in={showToolTip} timeout={400} classNames={transitionClasses} unmountOnExit>
        {Array.isArray(text) 
          ?
            <div className={classes.tooltip}>
              {text.map((item, i) => (
                <div className={classes.tooltip__item} key={i}>{item.name}</div>
              )
              )}
            </div>
          :
            <div className={classes.tooltip}>{text}</div>
        }
      </CSSTransition>
    </div>
  );
};

export default ToolTipComponent;