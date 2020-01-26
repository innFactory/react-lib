import {
  createStyles,
  Popper,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core";
import MUISlider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

export namespace StyledSlider {
  export interface Props extends WithStyles<typeof styles> {
    onChange: (value: number) => void;
    onChangeRawValue?: (value: number) => void;
    defaultValue?: number;
    step: number;
    min: number;
    max: number;
    unit?: string;
    thumbWidth?: number;
    thumbColor?: string;
    thumbBackgroundColor?: string;
    thumbBorderRadius?: number;
    thumbBorderColor?: string;
    popperCardBackgroundColor?: string;
    popperCardColor?: string;
    popperCardBorderRadius?: string;
    popperCardWidth?: string;
    trackBefore?: "primary" | "secondary" | "white";
    trackAfter?: "primary" | "secondary" | "white";
  }

  export interface State {}
}

class StyledSlider extends React.Component<
  StyledSlider.Props,
  StyledSlider.State
> {
  state = {
    number: 0,
    open: false,
    anchorEl: undefined,
    arrowRef: undefined
  };

  UNSAFE_componentWillMount() {
    this.setState({ number: this.getOr(this.props.defaultValue, 0) });
  }

  handleArrowRef = (node: any) => {
    this.setState({
      arrowRef: node
    });
  };

  handleChange = (event: any, value: any) => {
    var x = event;
    const newRoundedValue =
      Math.round(value / this.props.step) * this.props.step;
    if (newRoundedValue !== this.getRoundedValue()) {
      this.props.onChange(newRoundedValue);
      if (this.props.onChangeRawValue) {
        this.props.onChangeRawValue(value);
      }
    }
    if (x !== event) {
      console.log("EVENT");
    }
    this.setState({ number: value });
  };

  handleAnchor = () => {
    this.setState({ anchorEl: this.refs });
  };

  getRoundedValue = () => {
    return Math.round(this.state.number / this.props.step) * this.props.step;
  };

  getOr = (maybeValue: any | undefined, defaultValue: any) => {
    if (maybeValue) {
      return maybeValue;
    } else {
      return defaultValue;
    }
  };

  getTrackAfterClass = () => {
    var afterClass = this.getOr(this.props.trackAfter, "white");
    if (afterClass === "primary") {
      return this.props.classes.trackAfterPrimary;
    }
    if (afterClass === "secondary") {
      return this.props.classes.trackAfterSecondary;
    }
    return this.props.classes.trackAfter;
  };

  getTrackBeforeClass = () => {
    var beforeClass = this.getOr(this.props.trackBefore, "primary");
    if (beforeClass === "primary") {
      return this.props.classes.trackPrimary;
    }
    if (beforeClass === "secondary") {
      return this.props.classes.trackSecondary;
    }
    return this.props.classes.track;
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: 100 }}>
        <MUISlider
          classes={{
            root: classes.slider,
            rail: this.getTrackAfterClass(),
            track: this.getTrackBeforeClass()
          }}
          value={this.state.number}
          onChange={this.handleChange}
          max={this.props.max}
          min={this.props.min}
          ThumbComponent={() => (
            <div
              onTouchMove={this.handleAnchor}
              onTouchStart={this.handleAnchor}
              onTouchEndCapture={() => this.setState({ anchorEl: undefined })}
              onTouchEnd={() => this.setState({ anchorEl: undefined })}
              onTouchCancelCapture={() =>
                this.setState({ anchorEl: undefined })
              }
              onTouchCancel={() => this.setState({ anchorEl: undefined })}
              className={this.props.classes.sliderThumb}
              ref={(ref: any) => (this.refs = ref)}
              style={{
                touchAction: "none",
                minWidth: this.getOr(this.props.thumbWidth, 100),
                maxWidth: this.getOr(this.props.thumbWidth, 100),
                color: this.getOr(this.props.thumbColor, "inherit"),
                backgroundColor: this.getOr(
                  this.props.thumbBackgroundColor,
                  "white"
                ),
                borderRadius: this.getOr(this.props.thumbBorderRadius, 5),
                borderColor: this.getOr(this.props.thumbBorderColor, 5)
              }}
            >
              {
                <Typography
                  variant="h4"
                  style={
                    this.state.anchorEl !== undefined
                      ? {
                          color: this.getOr(
                            this.props.thumbBackgroundColor,
                            "white"
                          ),
                          touchAction: "none"
                        }
                      : { touchAction: "none" }
                  }
                >
                  {this.getRoundedValue() +
                    (this.props.unit !== undefined ? this.props.unit : "")}
                </Typography>
              }
            </div>
          )}
        />
        <Popper
          open={this.state.anchorEl !== undefined}
          anchorEl={this.state.anchorEl}
          placement="top"
          disablePortal={true}
          modifiers={{
            flip: {
              enabled: false
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "scrollParent"
            }
          }}
        >
          <div
            className={classes.popperCard}
            style={{
              backgroundColor: this.getOr(
                this.props.popperCardBackgroundColor,
                "white"
              ),
              color: this.getOr(this.props.popperCardColor, "inherit"),
              width: this.getOr(this.props.popperCardWidth, 80),
              borderRadius: this.getOr(this.props.popperCardBorderRadius, 25)
            }}
          >
            <Typography variant="h5" style={{ textAlign: "center" }}>
              {this.getRoundedValue() +
                (this.props.unit !== undefined ? this.props.unit : "")}
            </Typography>
          </div>
        </Popper>
      </div>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    sliderThumb: {
      background: "white",
      borderRadius: 10,
      boxShadow: theme.shadows[5],
      position: "relative",
      top: -20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 50,
      maxHeight: 50,
      border: "1px solid",
      borderColor: theme.palette.primary.light
    },
    slider: {
      padding: 5
    },
    track: {
      height: 10,
      opacity: 1,
      borderRadius: 5,
      border: "1px solid",
      borderColor: "black",
      color: "white"
    },
    trackPrimary: {
      height: 10,
      opacity: 1,
      borderRadius: 5,
      border: "1px solid",
      borderColor: "black",
      color: theme.palette.primary.dark
    },
    trackSecondary: {
      height: 10,
      opacity: 1,
      borderRadius: 5,
      border: "1px solid",
      borderColor: "black",
      color: theme.palette.secondary.dark
    },
    trackAfter: {
      color: "white",
      borderRadius: 5
    },
    trackAfterPrimary: {
      color: theme.palette.primary.dark,
      borderRadius: 5
    },
    trackAfterSecondary: {
      color: theme.palette.secondary.dark,
      borderRadius: 5
    },

    popperCard: {
      backgroundColor: "white",
      borderRadius: 25,
      boxShadow: theme.shadows[8],
      padding: 1,
      width: 80,
      marginLeft: 10,
      marginRight: 10,
      height: 30,
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    arrow: {
      position: "absolute",
      fontSize: 7,
      width: "3em",
      height: "3em",
      "&::before": {
        content: '""',
        margin: "auto",
        display: "block",
        width: 0,
        height: 0,
        borderStyle: "solid"
      }
    }
  });

export default withStyles(styles)(StyledSlider);
