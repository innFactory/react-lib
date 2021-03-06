import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import classnames from "classnames";
import * as React from "react";

export namespace MovingBackgroundImage {
  export interface Props extends WithStyles<typeof styles> {
    images: string[];
    initialPicture?: string;
  }

  export interface State {
    imageIndex: number;
    animationClassSwitch: boolean;
    mounted: boolean;
  }
}

class MovingBackgroundImage extends React.Component<
  MovingBackgroundImage.Props,
  MovingBackgroundImage.State
> {
  state = {
    imageIndex: 0,
    animationClassSwitch: false,
    mounted: false
  };

  // Preload images at the earliest possible lifecycle event
  componentWillMount() {
    if (this.props.initialPicture) {
      const img = document.createElement("img");
      img.src = this.props.initialPicture; // Assigning the img src immediately requests the image
    }
    this.props.images.forEach((src: string) => {
      const img = document.createElement("img");
      img.src = src; // Assigning the img src immediately requests the image
    });
  }

  componentDidMount() {
    let newIndex = 0;

    if (this.state.imageIndex + 1 < this.props.images.length) {
      newIndex = this.state.imageIndex + 1;
    }
    let b = !this.state.animationClassSwitch;

    if (!this.state.mounted && this.props.initialPicture) {
      setTimeout(() => this.setState({ mounted: true }), 6900);
    } else {
      setTimeout(
        () => this.setState({ imageIndex: newIndex, animationClassSwitch: b }),
        6900
      );
    }
  }

  componentDidUpdate() {
    let newIndex = 0;

    if (this.state.imageIndex + 1 < this.props.images.length) {
      newIndex = this.state.imageIndex + 1;
    }

    let b = !this.state.animationClassSwitch;
    setTimeout(
      () => this.setState({ imageIndex: newIndex, animationClassSwitch: b }),
      6900
    );
  }

  render() {
    const { classes, children, images, initialPicture } = this.props;
    const { imageIndex, animationClassSwitch, mounted } = this.state;

    const animation = animationClassSwitch ? 1 : 2;

    // Is first low quality picture loaded?
    if (!mounted && initialPicture) {
      return (
        <div className={classes.wrapper}>
          <div
            key={"initialimageContainer"}
            className={classnames(
              classes.background,
              animation === 1 ? classes.animation1 : classes.animation2
            )}
          >
            <img
              key={"initialimage"}
              src={initialPicture}
              className={classes.image}
              alt="background image"
            />
          </div>
          <div className={classes.content}>{children}</div>
        </div>
      );
    } else {
      return (
        <div className={classes.wrapper}>
          <div
            key={"mimageContainer" + imageIndex}
            className={classnames(
              classes.background,
              animation === 1 ? classes.animation1 : classes.animation2
            )}
          >
            <img
              key={"mimage" + imageIndex}
              src={images[imageIndex]}
              className={classes.image}
              alt={"background image " + imageIndex}
            />
          </div>
          <div className={classes.content}>{children}</div>
        </div>
      );
    }
  }
}

const styles = () =>
  createStyles({
    wrapper: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backgroundColor: "white"
    },

    background: {
      width: "100%",
      height: "calc(100% + 50px)",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0
    },

    animation1: {
      animation: "$bg-slide1 7s ease-out"
    },

    animation2: {
      animation: "$bg-slide2 7s ease-out"
    },

    content: {
      position: "relative",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 26,
      color: "white",
      height: "100%",
      flexDirection: "column"
    },

    image: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: "calc(100% + 50px)",
      minWidth: "100%"
    },

    "@keyframes bg-slide1": {
      "0%": {
        transform: "translateY(0)",
        opacity: 0
      },
      "2%": {
        opacity: 0.1
      },
      "7%": {
        transform: "translateY(-15px)",
        opacity: 0.6
      },
      "40%": {
        opacity: 1
      },
      "85%": {
        opacity: 1
      },
      "97%": {
        opacity: 0.2
      },
      "100%": {
        transform: "translateY(-50px)",
        opacity: 0
      }
    },

    "@keyframes bg-slide2": {
      "0%": {
        transform: "translateY(0)",
        opacity: 0
      },
      "2%": {
        opacity: 0.1
      },
      "7%": {
        transform: "translateY(-15px)",
        opacity: 0.6
      },
      "40%": {
        opacity: 1
      },
      "85%": {
        opacity: 1
      },
      "97%": {
        opacity: 0.1
      },
      "100%": {
        transform: "translateY(-50px)",
        opacity: 0
      }
    }
  });

export default withStyles(styles)(MovingBackgroundImage);
