import { ClickAwayListener, Collapse, createStyles, FormControlLabel, Radio, RadioGroup, Theme, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth, { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import classnames from 'classnames';
import * as React from 'react';
import { numberToString } from '../utils';
import NumberField from './NumberField';

export namespace CalculationRow {
    export interface Props extends WithStyles<typeof styles>, WithWidth {
        value?: number;
        editable?: boolean;
        label?: string;
        units?: string[]; // e.g. ['€', '%']
        selectedUnit?: string;
        numberBackgroundColor?: { notEditable: string, editable: string, editing: string };
        onUnitChange?: (unit: string) => void;
        infoText?: string;
        onChange?: (value: number) => void;
        bold?: boolean;
        borderBottom?: boolean;
        isEditing?: boolean;
        errorText?: string | null;
        decimalDigits?: number;
        onFocusCapture?: Function;
        disabled?: boolean;
        undefinedValuePlaceholder?: string; // default is '-'
    }

    export interface State {
        isEditing: boolean;
        currentUnit: string;
        decimalDigits: number;
        isInfoContianerOpen: boolean;
    }
}

class CalculationRow extends React.Component<CalculationRow.Props, CalculationRow.State> {

    state = {
        isEditing: false,
        value: 0,
        currentUnit: '€',
        decimalDigits: 2,
        isInfoContianerOpen: false,
    };

    componentWillMount() {
        const { decimalDigits, isEditing, selectedUnit, units } = this.props;

        this.setState({
            currentUnit: selectedUnit ? selectedUnit : (units ? units[0] : ''),
            decimalDigits: (decimalDigits === undefined) ? 2 : decimalDigits,
            isEditing: isEditing ? isEditing : false
        });
    }

    componentWillReceiveProps(nextProps: CalculationRow.Props) {

        this.setState({
            isEditing: nextProps.isEditing ? nextProps.isEditing : false
        });
    }

    render() {
        const { classes, label, borderBottom, bold, editable, errorText, disabled, width } = this.props;

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
                                variant="subtitle1"
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
                {isMobile(width) && this.renderInfoContainer()}
                {isMobile(width) && this.renderErrorContainer()}
            </div>
        );
    }

    renderNumberField() {
        const { classes, editable, numberBackgroundColor, bold, errorText, disabled, width, undefinedValuePlaceholder, value } = this.props;
        const { isEditing, currentUnit, decimalDigits } = this.state;

        // default backgroundColors
        let nbColor = { notEditable: 'transparent', editable: 'lightgrey', editing: 'lightgrey' };
        if (numberBackgroundColor) {
            nbColor = numberBackgroundColor;
        }

        if (isEditing && editable && !disabled) {
            return (
                <div>
                    <NumberField
                        className={classes.numberField}
                        value={(typeof value === 'number') ? parseFloat(value.toFixed(decimalDigits)) : value}
                        endAdornment={currentUnit}
                        inputClassesStyle={{
                            input: classes.input,
                        }}
                        onFinished={v => this.onFinished(v)}
                        autoFocus
                        style={{
                            backgroundColor: nbColor.editing,
                        }}
                        isTooltipOpen={errorText !== null && errorText !== undefined && !isMobile(width)}
                        tooltipTitle={errorText ? errorText : ''}
                    />
                </div>
            );
        } else {
            let bgColor = editable && !disabled ? nbColor.editable : nbColor.notEditable;
            if (errorText) {
                bgColor = 'red';
            }

            return (
                <div>
                    <Typography
                        data-cy="calculationRowValue"
                        variant="subtitle1"
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
                        {numberToString(value, decimalDigits, undefinedValuePlaceholder)} {' ' + this.state.currentUnit}
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
                                label={<Typography variant="subtitle1">{unit}</Typography>}
                                control={<Radio data-cy={'unitSwitch' + unit} className={classes.radio} />}
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
        const { infoText, disabled, classes, width } = this.props;

        if (infoText && !isMobile(width)) {
            return (
                <Tooltip
                    title={<Typography variant="subtitle1" className={classes.tooltipText}>{infoText}</Typography>}
                >
                    <InfoIcon color={disabled ? 'disabled' : 'inherit'} />
                </Tooltip>
            );
        } else if (infoText && isMobile(width)) {
            return (
                <ClickAwayListener onClickAway={this.onInfoAway}>
                    <InfoIcon onClick={this.onInfoClick} color={disabled ? 'disabled' : 'inherit'} />
                </ClickAwayListener>
            );
        }

        else { return null; }
    }

    onFinished(v: number) {
        this.setState({ isEditing: false });
        if (this.props.onChange) { this.props.onChange(v); }
    }

    receiveFocus() {
        const { onFocusCapture } = this.props;

        this.setState({ isEditing: true });

        if (onFocusCapture) { onFocusCapture(); }
    }

    /**
     * Its a collapsing conatainer for info text. Design for mobile usage as replacement for tooltips.
     */
    renderInfoContainer() {

        const { classes, infoText } = this.props;

        return (
            <Collapse in={this.state.isInfoContianerOpen} className={classes.infoContainer}>
                <Typography className={classes.collapseText}>
                    {infoText}
                </Typography>
            </Collapse>
        );
    }

    onInfoClick = () => {

        this.setState({ isInfoContianerOpen: !this.state.isInfoContianerOpen });
    }

    onInfoAway = () => {
        this.setState({ isInfoContianerOpen: false });
    }


    /**
   * Its a collapsing conatainer for error text. Design for mobile usage as replacement for tooltips.
   */
    renderErrorContainer() {

        const { classes, errorText } = this.props;
        const isError = errorText !== '' && errorText !== null && errorText !== undefined;

        return (
            <Collapse in={isError} className={classes.errorContainer}>
                <Typography className={classes.collapseText}>
                    {errorText}
                </Typography>
            </Collapse>
        );
    }
}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flex: 1,
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
        lineHeight: 1.3,
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
        color: theme.typography.subtitle1.color,
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: theme.typography.subtitle1.fontWeight,
        fontFamily: theme.typography.subtitle1.fontFamily,
        textAlign: 'right',
        paddingLeft: '10px',
        width: '100%',
        paddingBottom: 8
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

    infoContainer: {
        backgroundColor: theme.palette.primary.light,
    },

    collapseText: {
        padding: 2,
        color: 'white'
    },

    errorContainer: {
        backgroundColor: 'red',
    },
});

export default withStyles(styles)(withWidth()(CalculationRow));


function isTablet(width: Breakpoint): boolean {
    return isWidthDown('sm', width);
}

function isMobile(width: Breakpoint): boolean {
    return isTablet(width);
}