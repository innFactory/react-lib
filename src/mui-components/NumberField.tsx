import { createStyles, FormControl, Input, InputAdornment, Theme, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import * as React from 'react';

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

class NumberField extends React.Component<NumberField.Props, NumberField.State> {

    state = {
        thousandSeparator: '.',
        decimalSeparator: ',',
        isNumericString: true,
        tooltipPlacement: undefined,
        isTooltipOpen: false,
        tooltipTitle: '',
        closeTooltip: () => { return; },
        value: '',
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
                : this.state.closeTooltip,
            value: nextProps.value ? nextProps.value : this.state.value
        });
    }

    /**
     * false if the first character is a ',' until the field loses focus 
     * true if the floatValue has changed
     * @param newValue 
     */
    hasChanged(value: any) {
        if (value === ',') {
            return false;
        }
        if (this.props.value == value) {
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

        const { classes, autoFocus, width } = this.props;

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
                        value={this.state.value ? this.state.value : ''}

                        onChange={e => {
                            const value = e.target.value;
                            if (this.hasChanged(value)) {
                                this.setState({ value });
                            }
                        }}
                        endAdornment={
                            <InputAdornment
                                className={classes.endAdornment}
                                position={'end'}
                            >
                                <Typography variant="subtitle1">
                                    {this.props.endAdornment}
                                </Typography>
                            </InputAdornment>}
                        onFocus={this.handleFocus()}
                        disableUnderline={true}
                        type={isMobile(width) ? 'number' : undefined}
                    />
                </Tooltip>
            </FormControl>
        );
    }


    onFinished() {
        const { onFinished, negativeValue, decimalSeparator, thousandSeparator } = this.props;
        let { value } = this.state;

        if (!onFinished) {
            return;
        }

        try {
            value = value.replace(decimalSeparator ? decimalSeparator : ',', '.');
            value = value.replace(thousandSeparator ? thousandSeparator : ';', '.');
            const num = Number.parseFloat(value);


            if (isNaN(num)) {
                onFinished(0);
                this.setState({ value: '' })
            } else {

                // if value is allowed to be negative
                if (negativeValue) {
                    onFinished(num);
                    this.setState({ value: num + '' })
                } else {
                    // make sure value is not negative
                    onFinished(Math.abs(num));
                    this.setState({ value: Math.abs(num) + '' })
                }

            }

        } catch (e) {
            onFinished(0);
            this.setState({ value: '' })
        }

    }
}

const styles = (theme: Theme) => createStyles({
    tooltip: {
        backgroundColor: '#FF0000',
        color: '#ffffff',
    },
    input: {
        color: theme.typography.subtitle1.color,
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: theme.typography.subtitle1.fontWeight,
        fontFamily: theme.typography.subtitle1.fontFamily,
        lineHeight: theme.typography.subtitle1.lineHeight,
        textAlign: 'right',
        paddingLeft: '10px',
        width: '100%',
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
        marginBottom: 5
    },
});

export default withStyles(styles)(withWidth()(NumberField));

function isTablet(width: Breakpoint): boolean {
    return isWidthDown('sm', width);
}

function isMobile(width: Breakpoint): boolean {
    return isTablet(width);
}