import { Button, createStyles, Menu, MenuItem, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import SelectIcon from '@material-ui/icons/KeyboardArrowDown';
import * as classNames from 'classnames';
import * as lodash from 'lodash';
import * as React from 'react';

export namespace NumberInput {
    export interface Props {
        onChange?: (value: any) => void; // Called if value of input has changed
        onFilled?: (value: number) => void; // Called if input is filled completely
        onSelectorChange?: (index: number) => void; // Called if selector index is changed
        initialValue?: any; // Will only be set on mount
        decimalPlaces?: number;
        length?: number;
        mobile: boolean;
        thousandDivider?: boolean;
        unitLables?: {
            lable: string;
            thousandDivider: boolean;
            length: number;
            decimalPlaces: number;
            description: string;
        }[];
    }

    export interface State {
    }
}

class NumberInput extends React.Component<WithStyles & NumberInput.Props, NumberInput.State> {

    constructor(props?: (WithStyles & NumberInput.Props), context?: any) {
        super(props as any, context);
    }

    state = {
        active: false,
        value: '',
        error: '',
        decimalPlaces: 0,
        thousandDivider: false,
        length: 0,
        lable: '',
        selectorIndex: 0,
        anchorEl: undefined
    };

    componentWillMount() {
        if (this.props.initialValue) {
            this.setState({ value: this.props.initialValue });
        }
        if (this.props.unitLables) {
            this.setState({
                thousandDivider: this.props.unitLables[this.state.selectorIndex].thousandDivider,
                decimalPlaces: this.props.unitLables[this.state.selectorIndex].decimalPlaces,
                lable: this.props.unitLables[this.state.selectorIndex].lable,
                length: this.props.unitLables[this.state.selectorIndex].length,
            });
        }
        if (this.props.decimalPlaces) {
            this.setState({ decimalPlaces: this.props.decimalPlaces });
        }
        if (this.props.thousandDivider) {
            this.setState({ thousandDivider: this.props.thousandDivider });
        }
        if (this.props.length) {
            this.setState({ length: this.props.length });
        }
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.decimalPlaces) {
            this.setState({ decimalPlaces: nextProps.decimalPlaces });
        }
        if (nextProps.thousandDivider) {
            this.setState({ thousandDivider: nextProps.thousandDivider });
        }
        if (nextProps.length) {
            this.setState({ length: nextProps.length });
        }
    }

    // Selecter index changed, calling this.props.selectorChange()
    onSelectorChange(index: number) {
        if (this.props.onSelectorChange) {
            this.props.onSelectorChange(index);
        }
        this.setState({
            anchorEl: undefined,
            value: ''
        });
        if (this.props.unitLables) {
            this.setState({
                decimalPlaces: this.props.unitLables[index].decimalPlaces,
                lable: this.props.unitLables[index].lable,
                thousandDivider: this.props.unitLables[index].thousandDivider,
                length: this.props.unitLables[index].length,
            });
        }

    }

    // Check if each char is a number
    checkEachChar = (value: string) => {
        var isValid = true;
        for (var i = 0; i < value.length; i++) {
            var int = parseInt(value.charAt(i), 10);
            if (typeof int !== 'number' || isNaN(int)) {
                isValid = false;
            }
            if (value.charAt(i) === '.' || value.charAt(i) === ',') {
                isValid = false;
            }
        }
        return !isValid;
    }

    // On Input Change, calling this.props.onChange and this.props.onFilled
    onChange = (event: any) => {
        const value = parseInt(event.target.value, 10);
        if (event.target.value === '') {
            this.setState({
                value: '',
                error: ''
            });
            if (this.props.onChange) {
                this.props.onChange('');
            }

        } else if (
            typeof value !== 'number' ||
            isNaN(value)
        ) {
            this.setState({
                value: '',
                error: 'Keine Zahl'
            });
            if (this.props.onChange) {
                this.props.onChange('');
            }
        } else if (event.target.value.length > this.state.length) {
            // Block
        } else if (this.checkEachChar(event.target.value)) {
            this.setState({
                error: 'Keine Zahl'
            });
        } else {
            this.setState({
                error: '',
                value: event.target.value
            });
            if (this.state.length === event.target.value.length && this.props.onFilled) {
                this.props.onFilled(value / Math.pow(10, this.state.decimalPlaces));
            }
            if (this.props.onChange) {
                this.props.onChange(event.target.value);
            }
        }

    }

    onBlur = () => {
        if (this.state.value.length < this.state.decimalPlaces + 1) {
            var zeros = lodash.repeat('0', this.state.decimalPlaces + 1 - this.state.value.length);
            this.setState({ value: zeros + '' + this.state.value });
        }
    }

    renderDivider = () => {
        const { classes } = this.props;
        const { length, decimalPlaces, thousandDivider } = this.state;
        var counter = length - 1;
        var dividerArray: any = [];
        while (counter > 0) {
            if (counter === decimalPlaces) {

                dividerArray = dividerArray.concat([
                    (
                        <div
                            className={classes.dividerCommaWrapper}
                            style={counter === length - 1 ? { marginLeft: 21 } : {}}
                        >
                            <div
                                style={{ margin: 0 }}
                                key={counter}
                                className={classNames(classes.divider, this.state.active && classes.dividerActive)}
                            />
                            <div className={classes.dividerComma} />
                        </div>

                    )
                ]);
            } else if ((counter - decimalPlaces + 1) % 3 === 1 &&
                counter > decimalPlaces &&
                thousandDivider) {
                dividerArray = dividerArray.concat([
                    (
                        <div
                            className={classes.dividerDotWrapper}
                            style={counter === length - 1 ? { marginLeft: 21 } : {}}
                        >
                            <div
                                key={counter}
                                style={{ margin: 0 }}
                                className={classNames(classes.divider, this.state.active && classes.dividerActive)}
                            />
                            <div className={classes.dividerDot} />
                        </div>
                    )
                ]);
            } else {
                dividerArray = dividerArray.concat([
                    (
                        <div
                            key={counter}
                            className={classNames(classes.divider, this.state.active && classes.dividerActive)}
                            style={counter === length - 1 ? { marginLeft: 21 } : {}}
                        />
                    )
                ]);
            }

            counter--;
        }
        return dividerArray;
    }

    handleMenuClick = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    renderSelector() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    className={classNames(classes.selectorButton, this.state.active && classes.selectorButtonActive)}
                    onClick={this.handleMenuClick}
                >
                    <SelectIcon />
                </Button>
                {this.state.anchorEl && this.props.unitLables &&
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleMenuClose}
                        className={this.props.classes.menu}
                    >
                        {

                            this.props.unitLables.map((unit: any, index: number) => {
                                return (
                                    <MenuItem
                                        onClick={() => {
                                            this.onSelectorChange(index);
                                        }}
                                        key={index}
                                    >
                                        {unit.description}
                                    </MenuItem>);
                            })
                        }

                    </Menu>
                }
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        const { length, lable } = this.state;
        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                    className={
                        classes.wrapperDiv
                    }
                    style={this.state.active ? {} : {}}
                >
                    <input
                        onFocus={(event: any) => { event.target.select(); this.setState({ active: true }); }}
                        onBlur={() => { this.onBlur(); this.setState({ active: false }); }}
                        pattern="[0-9]+([0-9]+)?"
                        style={this.state.active ?
                            this.state.error ?
                                {
                                    width: length * 20.6 + 5,
                                    borderColor: 'red'
                                } :
                                { width: length * 20.6 + 5 } :
                            this.state.error ? {
                                width: length * 20.6 + 5,
                                borderColor: 'red'
                            } :
                                { width: length * 20.6 + 5 }
                        }
                        className={
                            classNames(classes.input, this.state.active &&
                                classes.inputActive)

                        }
                        type={this.props.mobile ? 'tel' : ''}
                        onChange={(event: any) => this.onChange(event)}
                        value={this.state.value}
                    />
                    <div className={classes.splitterWrapper}>
                        {this.renderDivider()}
                    </div>
                    <div className={classes.errorLabel}>
                        <Typography>{this.state.error}</Typography>
                    </div>
                </div>
                {lable &&
                    <span
                        className={
                            classNames(
                                classes.unitLable,
                                this.state.active && classes.unitLableActive,
                                this.props.mobile && classes.unitLableMobile
                            )
                        }
                    >
                        {lable}
                    </span>
                }
                {lable && this.props.unitLables && this.props.unitLables.length > 1 &&
                    this.renderSelector()
                }
            </div>

        );
    }
}

const styles = (theme: Theme) => createStyles({
    input: {
        borderRadius: 2,
        fontSize: 24,
        height: 24 * 1.2,
        fontFamily: 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
        letterSpacing: 6,
        outline: 0,
        border: '1px solid',
        overflow: 'hidden',
        paddingLeft: 3,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
        borderColor: theme.palette.primary.main,
        direction: 'rtl'
    },
    inputActive: {
        borderColor: theme.palette.secondary.main,
    },

    wrapperDiv: {
        height: 24 * 1.2 + 10,
    },

    splitterWrapper: {
        height: 24 * 1.2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        top: -24 * 1.2,
        pointerEvents: 'none'
    },

    divider: {
        border: '1px dashed',
        borderBottom: 0,
        borderLeft: 0,
        borderTop: 0,
        height: 24 * 1.2,
        width: 1,
        marginLeft: 18,
        marginRight: 1.5,
        pointerEvents: 'none',
        borderColor: theme.palette.primary.main,
    },
    dividerActive: {
        borderColor: theme.palette.secondary.main,
    },
    dividerCommaWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: 1,
        marginLeft: 18,
        marginRight: 1.5,
        pointerEvents: 'none',
        height: 24 * 1.2,
    },
    dividerComma: {
        borderBottom: '9px solid #494949',
        borderRight: 0,
        borderLeft: 0,
        borderTop: 0,
        position: 'relative',
        left: -2,
        transform: 'rotate(10deg)',
        width: 4,
        pointerEvents: 'none'
    },
    unitLable: {
        height: 24 * 1.2,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
        backgroundColor: 'white',
        paddingRight: 5,
        border: '1px solid',
        borderRadius: 2,
        paddingLeft: 3,
        position: 'relative',
        left: -4,
    },
    unitLableActive: {
        borderColor: theme.palette.secondary.main,
    },
    unitLableMobile: {
        lineHeight: '24px'
    },
    errorLabel: {
        color: 'red',
        fontSize: 12,
        position: 'relative',
        top: -24 * 1.2 + 1,
        fontFamily: theme.typography.fontFamily
    },

    dividerDotWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: 1,
        marginLeft: 18,
        marginRight: 1.5,
        pointerEvents: 'none',
        height: 24 * 1.2,
    },
    dividerDot: {
        borderBottom: '3px solid #494949',
        borderRight: 0,
        borderLeft: 0,
        borderTop: 0,
        position: 'relative',
        left: -1.4,
        top: -1,
        width: 3,
        pointerEvents: 'none'
    },
    selectorButton: {
        height: 24 * 1.2,
        width: 24 * 1.2,
        maxHeight: 24 * 1.2,
        maxWidth: 24 * 1.2,
        minHeight: 24 * 1.2,
        minWidth: 24 * 1.2,
        padding: 0,
        margin: 0,
        borderRadius: 2,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        border: '1px solid',
        position: 'relative',
        background: theme.palette.primary.light,
        left: -5,
        transition: 'border-color 0s',
        '&:hover': {
            background: theme.palette.primary.main,
        }
    },
    selectorButtonActive: {
        borderColor: theme.palette.secondary.main
    }

});

export default withStyles(styles)(NumberInput);