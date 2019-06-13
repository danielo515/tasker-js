import ReactDOM from "react-dom";

import React from "react";
import posed, { PoseGroup } from "react-pose";
import "./styles.css";

import { ListItem, ListItemText, Avatar } from "@material-ui/core";
import ArchiveIcon from "@material-ui/icons/Archive";

import { transform, value } from "popmotion";
const { pipe, interpolate, clamp, blendColor } = transform;

const triggerDistance = 90;

const Swipeable = posed.li({
  draggable: "x",
  dragBounds: {
    right: 0
  },
  dragEnd: {
    transition: ({ from, to, velocity }) => {
      if (from <= -triggerDistance) {
        return {
          type: "tween",
          ease: "linear",
          from,
          // for some reason, transitioning
          // to "100%" doesn't work properly
          // in real life, make sure to use "window.innerWidth" instead
          to: -window.innerWidth,
          duration: 280
        };
      }
      return {
        type: "spring",
        from,
        to,
        velocity,
        stiffness: 750,
        damping: 50
      };
    }
  },
  flip: {
    scale: 1,
    transition: {
      default: {
        type: "tween",
        duration: 200
      }
    }
  }
});

const SwipeableForeground = posed.div({
  passive: {
    backgroundColor: [
      "x",
      pipe(
        interpolate([0, -triggerDistance], [0, 1]),
        clamp(0, 1),
        blendColor("#ccc", "#4D11DA")
      ),
      true
    ]
  }
});

class SwipeableList extends React.Component {

  onDragEnd = id => e => {
    console.log('Dragged',id);

    if (x <= -triggerDistance) {
      setTimeout(() => {
        this.props.onSwipe(id);
      }, 280);
    }
  };

  render() {
    const items = this.props.items;

    return (
      <>
        {items.map((it) => (
          <SwipeableForeground
            key={it.i}
            style={{ top: i * 60 }}
            parentValues={{ x: it.x }}
            className="item item--behind"
          >
            <ArchiveIcon />
          </SwipeableForeground>
        ))}
        <PoseGroup>
          {items.map((it,i) => (
            <Swipeable
              key={"rabo"+i}
              style={{ top: i * 60 }}
              onDragEnd={this.onDragEnd(i)}
              values={{ x: it.x }}
              className="item"
            >
              {it}
            </Swipeable>
          ))}
        </PoseGroup>
      </>
    );
  }
}

export default SwipeableList;