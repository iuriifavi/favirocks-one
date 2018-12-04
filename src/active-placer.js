import React, { Component } from "react";
import debounce from "lodash/debounce";
import "./active-placer.css";

class ActivePlacer extends Component {
  constructor() {
    super();

    this.target = React.createRef();

    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleMousePosition = debounce(this.handleMousePosition.bind(this), 150, { maxWait: 30 });

    this.state = {
      projectionPoint: { x: 0.0001, y: 0.0001 },
      size: { hw: 0.0001, hh: 0.0001 }
    }
  }

  transform() {
    let rp = (Math.PI / 180) * this.props.limit;
    let py = -rp * (this.state.projectionPoint.x - this.state.size.hw) / this.state.size.hw;
    let px = rp * (this.state.projectionPoint.y - this.state.size.hh) / this.state.size.hh;

    let sx = Math.sin(px), cx = Math.cos(px);
    let sy = Math.sin(py), cy = Math.cos(py);

    let matrix = [cy, sx * sy, cx * sy, 0,
                  0, cx, -sx, 0,
                  -sy, sx, cx * cy, 0,
                  0, 0, 0, 1];

    return { transform: "perspective(" + (this.props.perspective || 200) + "px) matrix3d(" + matrix.join(",") + ")" };
  }

  onMouseMove(event) {
    event.preventDefault();
    this.handleMousePosition(event.pageX, event.pageY);
  }

  handleMousePosition(pX, pY) {
    var x = pX - this.target.current.offsetLeft;
    var y = pY - this.target.current.offsetTop;

    this.setState({
      projectionPoint: { x, y },
      size: {
        hw: this.target.current.offsetWidth / 2,
        hh: this.target.current.offsetHeight / 2
      }
    });
  }

  render() {
    return <div onMouseMove={(this.props.handlePointer === true) && this.onMouseMove} style={{ overflow: "hidden" }}>
        <div ref={this.target} className="tilt-pan-surface" style={this.transform()}>
          {this.props.children}
        </div>
      </div>;
  }
}

export default ActivePlacer;
