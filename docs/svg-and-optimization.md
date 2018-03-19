

https://codesandbox.io/embed/yvYE9NNW?codemirror=1

Replace the above link with the code below. Code Sand Box got stuck creating a repo for me



```javascript
import React, { Component } from "react";
import Transition from "react-transition-group/Transition";
// import TransitionPlus from "react-transition-group-plus";

const duration = 5000;

const lowerLeft = "#fed93f"

const upperLeft = "#00A74A"

const transitionYellow = "purple"

const defaultStyle = {
//   opacity: 0,
//   transform: "translate(800px, 0)"
};

const transitionStyles = {
//   entering: { opacity: 0 },
//   entered: { opacity: 1 }
};

class Fade extends Component {
  constructor(props) {
    super(props);
    // bind this
    this.triggerSuccess = this.triggerSuccess.bind(this);
    this.state = {
success: false
    };
  }
  
    triggerSuccess() {
      console.log("this.state")
      console.log(this)
      this.setState({
          success: true
      });
    }

  render() {
    return (
      <Transition
        in={this.props.in}
        timeout={duration}
        mountOnEnter={true}
        unmountOnExit={false}
        addEndListener={(n, done) => {
          if (this.props.in) {
//             TweenLite.to(n, 1, {
//               autoAlpha: 1,
//               x: 0,
//               ease: Back.easeOut,
//               onComplete: done
//             });
            console.log("this.props")
            console.log(this.props)
//             TweenLite.to(n, 1, { fill:"#13FF7C", delay:0.5})
            TweenLite.to("g[data-name='Active Buttons'] path[data-name='Upper left']", 0.7, {attr:{fill:`${transitionYellow}`}, onComplete: done}, 0);
            
            
          } else {
//             TweenLite.to("g[data-name='Active Buttons'] path[data-name='Upper left']", 1, { autoAlpha: 0, x: -100, onComplete: done })
//             TweenLite.to(n, 1, { fill:"#13FF7C", delay:0.5})
            TweenLite.to("g[data-name='Active Buttons'] path[data-name='Upper left']", 0.7, {attr:{fill:"green"}, onComplete: done}, 0);

          }
        }}
      >
         
        {state =>
      
       <svg heigt="800px" width="600px"  viewBox="0 0 486.04 486.09">   
 <g data-name="Active Buttons">
<path
  fill={lowerLeft} d="M108.63 279.32H21.82a224.21 224.21 0 0 0 186.93 185.17v-86.61a139.33 139.33 0 0 1-100.12-98.56z" data-name="Lower Left"/>
<path fill="#1c8cff" d="M278.67 377.48v86.76a224.24 224.24 0 0 0 185.39-184.92h-86.82a139.34 139.34 0 0 1-98.57 98.16z" data-name="Lower Right"/>
<path fill="#ff4c4c" d="M377.93 209.4h86.55A224.21 224.21 0 0 0 278.67 21.81v86.76a139.31 139.31 0 0 1 99.26 100.83z" data-name="Upper right"/>
 <path
                  onMouseOver={this.triggerSuccess}
                  onMouseOut={this.triggerSuccess}
                  onClick={this.triggerSuccess} fill={upperLeft} d="M208.75 108.17V21.56A224.2 224.2 0 0 0 21.39 209.4h86.55a139.31 139.31 0 0 1 100.81-101.23z" data-name="Upper left"/>
</g>
</svg>
        }
      </Transition>
    );
  }
}

export default Fade;

```

