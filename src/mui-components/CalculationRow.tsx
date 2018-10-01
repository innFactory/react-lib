import { createStyles, FormControlLabel, Radio, RadioGroup, Theme, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import * as classnames from 'classnames';
import * as React from 'react';
import { numberToString } from '../utils';
import NumberField from './NumberField';

export namespace CalculationRow {
    export interface Props extends WithStyles<typeof styles> {
        value: number | undefined;
        editable?: boolean;
        label?: string;
        units?: string[]; // e.g. ['€', '%']
        selectedUnit?: string;
        numberBackgroundColor?: { notEditable: string, editable: string, editing: string };
        onUnitChange?: (unit: string) => void;
        infoText?: string;
        onChange?: Function;
        bold?: boolean;
        borderBottom?: boolean;
        isEditing?: boolean;
        errorText?: string | null;
        decimalDigits?: number;
        onFocusCapture?: Function;
        disabled?: boolean;
    }

    export interface State {
        isEditing: boolean;
        value: number | undefined;
        currentUnit: string;
        decimalDigits: number;
    }
}

class CalculationRow extends React.Component<CalculationRow.Props, CalculationRow.State> {

    state = {
        isEditing: false,
        value: 0,
        currentUnit: '€',
        decimalDigits: 2,
    };

    componentWillMount() {
        const { value, decimalDigits, isEditing, selectedUnit, units } = this.props;

        this.setState({
            value: value,
            currentUnit: selectedUnit ? selectedUnit : (units ? units[0] : ''),
            decimalDigits: (decimalDigits === undefined) ? 2 : decimalDigits,
            isEditing: isEditing ? isEditing : false
        });
    }

    componentWillReceiveProps(nextProps: CalculationRow.Props) {

        this.setState({
            value: nextProps.value,
            isEditing: nextProps.isEditing ? nextProps.isEditing : false
        });
    }

    render() {
        const { classes, label, borderBottom, bold, editable, errorText, disabled } = this.props;

        return (
            <div className={classnames(classes.root, borderBottom && classes.borderBottom)}>
                <div
                    className={classnames(classes.horizontalContainer)}
                    onFocusCapture={() => this.receiveFocus()}
                    tabIndex={editable && !disabled ? 0 : -1}
                    style={{
                        backgroundColor: errorText ? '#FFF0F0' : 'white'
                    }}
                >
                    {label &&
                        <div className={classes.labelContainer}>
                            <Typography
                                variant="subheading"
                                className={
                                    classnames(classes.text, bold && classes.bold, disabled && classes.disabledText)}
                            >
                                {label}
                            </Typography>
                            {this.renderInfoIcon()}
                        </div>}
                    {this.renderNumberField()}
                </div >
                {this.renderUnitSwitch()}
            </div>
        );
    }

    renderNumberField() {
        const { classes, editable, numberBackgroundColor, bold, errorText, disabled } = this.props;
        const { isEditing, value, currentUnit, decimalDigits } = this.state;

        // default backgroundColors
        var nbColor = { notEditable: 'transparent', editable: 'lightgrey', editing: 'lightgrey' };
        if (numberBackgroundColor) {
            nbColor = numberBackgroundColor;
        }

        if (isEditing && editable && !disabled) {
            return (
                <div>
                    <NumberField
                        className={classes.numberField}
                        value={(typeof value === 'number') ? parseFloat(value.toFixed(decimalDigits)) : value}
                        onChange={(v: number) => this.setState({ value: v })}
                        endAdornment={currentUnit}
                        inputClassesStyle={{
                            input: classes.input,
                            underline: classes.underline
                        }}
                        onFinished={() => this.onFinished()}
                        autoFocus
                        style={{
                            backgroundColor: nbColor.editing,
                        }}
                        isTooltipOpen={errorText !== null && errorText !== undefined}
                        tooltipTitle={errorText ? errorText : ''}
                    />
                </div>
            );
        } else {
            var bgColor = editable && !disabled ? nbColor.editable : nbColor.notEditable;
            if (errorText) {
                bgColor = 'red';
            }

            return (
                <div>
                    <Typography
                        variant="subheading"
                        className={classnames(
                            classes.number,
                            bold && classes.bold,
                            errorText && classes.errorText,
                            disabled && classes.disabledText
                        )}
                        style={{
                            cursor: editable && !disabled ? 'pointer' : 'default',
                            backgroundColor: bgColor,
                            width: editable && !disabled ? '150px' : ''
                        }}
                        onClick={() => this.receiveFocus()}
                    >
                        {numberToString(value, decimalDigits)} {' ' + this.state.currentUnit}
                    </Typography >
                </div>
            );
        }
    }

    renderUnitSwitch() {
        const { units, selectedUnit, classes } = this.props;
        const sUnit = selectedUnit ? selectedUnit : this.state.currentUnit;

        if (units && units.length > 1) {

            return (
                <RadioGroup
                    className={classes.unitSwitch}
                    value={sUnit}
                    onChange={this.onModeChange()}
                >
                    {units.map((unit) => {
                        return (
                            <FormControlLabel
                                key={unit}
                                value={unit}
                                label={<Typography variant="subheading">{unit}</Typography>}
                                control={<Radio className={classes.radio} />}
                            />
                        );
                    })}
                </RadioGroup>
            );
        } else { return null; }
    }

    onModeChange = () => (event: any) => {
        const unit = event.target.value;
        if (this.state.currentUnit !== unit) {
            this.setState({ currentUnit: unit });
            if (this.props.onUnitChange) { this.props.onUnitChange(unit); }
        }
    }

    renderInfoIcon() {
        const { infoText, disabled, classes } = this.props;

        if (infoText) {
            return (
                <Tooltip
                    title={<Typography variant="subheading" className={classes.tooltipText}>{infoText}</Typography>}
                >
                    <InfoIcon color={disabled ? 'disabled' : 'inherit'} />
                </Tooltip>
            );
        } else { return null; }
    }

    onFinished() {
        this.setState({ isEditing: false });
        if (this.props.onChange) { this.props.onChange(this.state.value); }
    }

    receiveFocus() {
        const { onFocusCapture } = this.props;

        this.setState({ isEditing: true });

        if (onFocusCapture) { onFocusCapture(); }
    }
}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },

    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#ffffff',
        padding: '5px',
        alignItems: 'center'
    },

    borderBottom: {
        borderBottomStyle: 'dashed',
        borderBottomColor: '#d3d3d3',
        borderBottomWidth: '1px',
    },

    labelContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    text: {
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 10,
    },

    bold: {
        fontWeight: 'bold',
    },

    errorText: {
        color: 'white'
    },

    disabledText: {
        color: 'lightgrey'
    },

    number: {
        lineHeight: theme.typography.subheading.lineHeight,
        textAlign: 'right',
        marginTop: 5,
        marginRight: 5,
        marginBottom: 5,
        paddingTop: 6,
        paddingBottom: 7,
        paddingRight: 5,
    },

    numberField: {
        width: 150,
        borderColor: 'black',
        textAlign: 'right',
        borderWidth: 1,
        marginTop: 5,
        marginRight: 5,
        marginBottom: 5
    },

    input: {
        color: theme.typography.subheading.color,
        fontSize: theme.typography.subheading.fontSize,
        fontWeight: theme.typography.subheading.fontWeight,
        fontFamily: theme.typography.subheading.fontFamily,
        lineHeight: theme.typography.subheading.lineHeight,
        textAlign: 'right',
        paddingLeft: '10px',
        width: '100%',
    },
    underline: {
        '&:hover:before': {
            backgroundColor: '#d3d3d3' + '!important',
            height: 0,
        },
        '&:before': {
            backgroundColor: '#d3d3d3',
            height: 0,
        },
        '&:after': {
            backgroundColor: '#d3d3d3',
            height: 2,
        },
    },

    switchButton: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },

    unitSwitch: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: -15
    },

    radio: {
        transform: 'scale(0.75, 0.75)'
    },

    tooltipText: {
        color: '#ffffff',
    },
});

export default withStyles(styles)(CalculationRow);