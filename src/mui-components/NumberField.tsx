import { createStyles, FormControl, Input, InputAdornment, Theme, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import NumberFormat from 'react-number-format';

export namespace NumberField {
    export interface Props extends WithStyles<typeof styles> {
        value?: number | null;
        onChange: Function;
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
        onFinished?: Function;
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
    }
}

class NumberField extends React.Component<NumberField.Props, NumberField.State> {

    state = {
        thousandSeparator: '.',
        decimalSeparator: ',',
        isNumericString: true,
        tooltipPlacement: undefined,
        isTooltipOpen: false,
        tooltipTitle: '',
        closeTooltip: () => { return; }
    };

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            thousandSeparator: nextProps.thousandSeparator ? nextProps.thousandSeparator
                : this.state.thousandSeparator,
            decimalSeparator: nextProps.decimalSeparator ? nextProps.decimalSeparator
                : this.state.decimalSeparator,
            isNumericString: (nextProps.isNumericString !== undefined) ? nextProps.isNumericString
                : this.state.isNumericString,
            tooltipPlacement: nextProps.tooltipPlacement ? nextProps.tooltipPlacement
                : 'left',
            isTooltipOpen: (nextProps.isTooltipOpen !== undefined) ? nextProps.isTooltipOpen
                : this.state.isTooltipOpen,
            tooltipTitle: nextProps.tooltipTitle ? nextProps.tooltipTitle
                : this.state.tooltipTitle,
            closeTooltip: nextProps.closeTooltip ? nextProps.closeTooltip
                : this.state.closeTooltip
        });
    }

    /**
     * false if the first character is a ',' until the field loses focus 
     * true if the floatValue has changed
     * @param newValue 
     */
    hasChanged(newFormattedValue: number, newFloatValue: number) {
        if (newFormattedValue[0] === ',') {
            return false;
        }
        if (this.props.value === newFloatValue) {
            return false;
        }
        return true;
    }

    /**
     * select entire input if field is focused
     */
    handleFocus = () => (event: any) => {
        if (this.state.isTooltipOpen) {
            this.state.closeTooltip();
        }
        event.target.select();
    }

    /**
     * renders a float number to a formatted number e.g. 10000.29 -> 10.000,29
     * and calls onChange if hasChanged() becomes true
     */
    numberFormatCustom = (props: any) => {
        const { inputRef, onChange, negativeValue, ...other } = props;
        return (
            <NumberFormat
                {...other}
                ref={inputRef}
                onValueChange={(values: any) => {
                    if (this.hasChanged(values.formattedValue, values.floatValue)) {
                        if (isNaN(values.floatValue)) {
                            onChange(null);
                        } else {

                            // if value is allowed to be negative
                            if (negativeValue) {
                                onChange(values.floatValue);
                            } else {
                                // make sure value is not negative
                                onChange(Math.abs(values.floatValue));
                            }

                        }
                    }
                }}
                thousandSeparator={this.state.thousandSeparator}
                decimalSeparator={this.state.decimalSeparator}
                isNumericString={this.state.isNumericString}
            />
        );
    }

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
                        autoFocus={autoFocus}
                        onBlur={() => this.onFinished()}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                this.onFinished();
                            }
                        }}
                        classes={this.inputClassesStyle()}
                        value={(this.props.value !== null) ? this.props.value : ''}
                        onChange={(e) => this.props.onChange(e)}
                        inputComponent={this.numberFormatCustom}
                        endAdornment={
                            <InputAdornment
                                className={classes.endAdornment}
                                position={'end'}
                            >
                                <Typography variant="subheading">
                                    {this.props.endAdornment}
                                </Typography>
                            </InputAdornment>}
                        onFocus={this.handleFocus()}
                        disableUnderline={true}
                    />
                </Tooltip>
            </FormControl>
        );
    }

    onFinished() {
        const { onFinished } = this.props;
        if (onFinished) {
            onFinished();
        }
    }
}

const styles = (theme: Theme) => createStyles({
    tooltip: {
        backgroundColor: '#FF0000',
        color: '#ffffff',
    },
    input: {
        color: theme.typography.subheading.color,
        fontSize: theme.typography.subheading.fontSize,
        fontWeight: theme.typography.subheading.fontWeight,
        fontFamily: theme.typography.subheading.fontFamily,
        lineHeight: theme.typography.subheading.lineHeight,
        textAlign: 'right',
        paddingLeft: '10px',
        width: '100%'
    },
    underline: {
        '&:hover:before': {
            backgroundColor: '#d3d3d3' + '!important',
            height: 2,
        },
        '&:before': {
            backgroundColor: '#d3d3d3',
            height: 2,
        },
        '&:after': {
            backgroundColor: '#d3d3d3',
            height: 2,
        },
    },
    endAdornment: {
        padding: '4px 5px 0 0',
    },
});

export default withStyles(styles)(NumberField);