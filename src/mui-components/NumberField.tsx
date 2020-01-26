import {
  createStyles,
  FormControl,
  Input,
  InputAdornment,
  Theme,
  Tooltip,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import withWidth, { WithWidth } from "@material-ui/core/withWidth";
import Cleave from "cleave.js/react";
import * as React from "react";

export namespace NumberField {
  export interface Props extends WithStyles<typeof styles>, WithWidth {
    value?: number | null;
    endAdornment?: string;
    className?: string;
    isTooltipOpen?: boolean;
    tooltipTitle?: string;
    closeTooltip?: any;
    tooltipPlacement?: any;
    inputClassesStyle?: any;
    tooltipClassesStyle?: any;
    thousandSeparator?: string;
    decimalSeparator?: string;
    isNumericString?: boolean;
    onFinished?: (value: number) => void;
    onChange?: (value: number) => void;
    autoFocus?: boolean;
    style?: any;
    negativeValue?: boolean; // allow negative values (default: false)
  }
  export interface State {
    thousandSeparator: string;
    decimalSeparator: string;
    isNumericString: boolean;
    isTooltipOpen: boolean;
    tooltipTitle: string;
    closeTooltip: any;
    tooltipPlacement: any;
    value: string;
  }
}

class NumberField extends React.Component<
  NumberField.Props,
  NumberField.State
> {
  state = {
    thousandSeparator: ".",
    decimalSeparator: ",",
    isNumericString: true,
    tooltipPlacement: undefined,
    isTooltipOpen: false,
    tooltipTitle: "",
    closeTooltip: () => {
      return;
    },
    value: ""
  };

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    let value = nextProps.value ? nextProps.value + "" : this.state.value;

    const { decimalSeparator } = nextProps;
    value = value.replace(".", decimalSeparator ? decimalSeparator : ",");

    this.setState({
      thousandSeparator: nextProps.thousandSeparator
        ? nextProps.thousandSeparator
        : this.state.thousandSeparator,
      decimalSeparator: nextProps.decimalSeparator
        ? nextProps.decimalSeparator
        : this.state.decimalSeparator,
      isNumericString:
        nextProps.isNumericString !== undefined
          ? nextProps.isNumericString
          : this.state.isNumericString,
      tooltipPlacement: nextProps.tooltipPlacement
        ? nextProps.tooltipPlacement
        : "left",
      isTooltipOpen:
        nextProps.isTooltipOpen !== undefined
          ? nextProps.isTooltipOpen
          : this.state.isTooltipOpen,
      tooltipTitle: nextProps.tooltipTitle
        ? nextProps.tooltipTitle
        : this.state.tooltipTitle,
      closeTooltip: nextProps.closeTooltip
        ? nextProps.closeTooltip
        : this.state.closeTooltip,
      value
    });
  }

  /**
   * select entire input if field is focused
   */
  handleFocus = () => (event: any) => {
    if (this.state.isTooltipOpen) {
      this.state.closeTooltip();
    }

    // assign event to local variable and call event persist
    // https://stackoverflow.com/questions/49500255/warning-this-synthetic-event-is-reused-for-performance-reasons-happening-with
    event.persist();
    const { target } = event;

    setTimeout(() => target.select(), 20);
  };

  /**
   * use default style, defined in styles, if no style is given for input and underline
   */
  tooltipClassesStyle() {
    const { classes } = this.props;

    if (this.props.tooltipClassesStyle) {
      return this.props.tooltipClassesStyle;
    } else {
      return { tooltip: classes.tooltip };
    }
  }

  /**
   * use default style, defined in styles, if no style is given for input and underline
   */
  inputClassesStyle() {
    const { classes } = this.props;

    if (this.props.inputClassesStyle) {
      return this.props.inputClassesStyle;
    } else {
      return { input: classes.input, underline: classes.underline };
    }
  }

  render() {
    const { classes, autoFocus } = this.props;

    return (
      <FormControl className={this.props.className} style={this.props.style}>
        <Tooltip
          classes={this.tooltipClassesStyle()}
          title={this.state.tooltipTitle}
          open={this.state.isTooltipOpen}
          placement={this.state.tooltipPlacement}
        >
          <Input
            data-cy="numberField"
            autoFocus={autoFocus}
            onBlur={() => this.onFinished()}
            onKeyPress={this.onKeyPress}
            onKeyDown={ev => {
              if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
                this.onFinished();
              }
            }}
            classes={this.inputClassesStyle()}
            value={this.state.value ? this.state.value : ""}
            onChange={this.onChange}
            endAdornment={
              <InputAdornment className={classes.endAdornment} position={"end"}>
                <Typography variant="subtitle1">
                  {this.props.endAdornment}
                </Typography>
              </InputAdornment>
            }
            onFocus={this.handleFocus()}
            disableUnderline={true}
            type={"text"}
            inputComponent={this.maskedTextField}
            inputProps={{ inputmode: "decimal" }}
          />
        </Tooltip>
      </FormControl>
    );
  }

  maskedTextField = (props: any) => {
    const { decimalSeparator, thousandSeparator } = this.props;
    let { options, inputRef, ...other } = props;
    return (
      <Cleave
        {...other}
        ref={(ref: any) => {
          inputRef = ref;
        }}
        options={{
          numeral: true,
          numeralDecimalMark: decimalSeparator ? decimalSeparator : ",",
          delimiter: thousandSeparator ? thousandSeparator : "."
        }}
      />
    );
  };

  onKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === "Enter") {
      this.onFinished();
    }
  };

  onChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { onChange } = this.props;
    const value = ev.target.value;

    if (onChange) {
      const numValue = this.stringValueToNum(value);
      onChange(numValue !== undefined ? numValue : 0);
    }
    this.setState({ value });
  };

  onFinished() {
    const { onFinished } = this.props;
    let { value } = this.state;

    if (!onFinished) {
      return;
    }
    const numValue = this.stringValueToNum(value);

    if (numValue !== undefined) {
      onFinished(numValue);
      this.setState({ value: numValue + "" });
    } else {
      onFinished(0);
      this.setState({ value: "" });
    }
  }

  stringValueToNum(value: string): number | undefined {
    const { negativeValue, decimalSeparator, thousandSeparator } = this.props;

    try {
      value = value.replace(thousandSeparator ? thousandSeparator : ".", "");
      value = value.replace(thousandSeparator ? thousandSeparator : ".", "");
      value = value.replace(decimalSeparator ? decimalSeparator : ",", ".");
      const num = Number.parseFloat(value);

      if (isNaN(num)) {
        return;
      } else {
        // if value is allowed to be negative
        if (negativeValue) {
          return num;
        } else {
          // make sure value is not negative
          return Math.abs(num);
        }
      }
    } catch (e) {
      return;
    }
  }
}

const styles = (theme: Theme) =>
  createStyles({
    tooltip: {
      backgroundColor: "#FF0000",
      color: "#ffffff"
    },
    input: {
      color: theme.typography.subtitle1.color,
      fontSize: theme.typography.subtitle1.fontSize,
      fontWeight: theme.typography.subtitle1.fontWeight,
      fontFamily: theme.typography.subtitle1.fontFamily,
      lineHeight: theme.typography.subtitle1.lineHeight,
      textAlign: "right",
      paddingLeft: "10px",
      width: "100%"
    },

    underline: {
      "&:hover:before": {
        backgroundColor: "#d3d3d3" + "!important",
        height: 2
      },
      "&:before": {
        backgroundColor: "#d3d3d3",
        height: 2
      },
      "&:after": {
        backgroundColor: "#d3d3d3",
        height: 2
      }
    },
    endAdornment: {
      padding: "4px 5px 0 0",
      marginBottom: 5
    }
  });

export default withStyles(styles)(withWidth()(NumberField));
