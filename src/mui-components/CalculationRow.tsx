import {
  ClickAwayListener,
  Collapse,
  createStyles,
  FormControlLabel,
  Radio,
  RadioGroup,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import classnames from 'classnames';
import * as React from 'react';
import { numberToString } from '../utils';
import { NumberField } from './NumberField';

export interface Props {
  value?: number;
  editable?: boolean;
  label?: string;
  units?: string[]; // e.g. ['€', '%']
  selectedUnit?: string;
  numberBackgroundColor?: {
    notEditable: string;
    editable: string;
    editing: string;
  };
  onUnitChange?: (unit: string) => void;
  infoText?: string;
  onChange?: (value: number) => void;
  onFinished?: (value: number) => void;
  bold?: boolean;
  borderBottom?: boolean;
  isEditing?: boolean;
  errorText?: string | null;
  decimalDigits?: number;
  onFocusCapture?: Function;
  disabled?: boolean;
  undefinedValuePlaceholder?: string; // default is '-'
  maxValue?: number;
}

const CalculationRowStyles = (theme: Theme) =>
  createStyles({
    root: () => ({
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    }),

    horizontalContainer: () => ({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      backgroundColor: '#ffffff',
      padding: '5px',
      alignItems: 'center',
    }),

    borderBottom: () => ({
      borderBottomStyle: 'dashed',
      borderBottomColor: '#d3d3d3',
      borderBottomWidth: '1px',
    }),

    labelContainer: () => ({
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }),

    text: () => ({
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 10,
      marginRight: 10,
    }),

    bold: () => ({
      fontWeight: 'bold',
    }),

    errorText: () => ({
      color: 'white',
    }),

    disabledText: () => ({
      color: 'lightgrey',
    }),

    number: () => ({
      lineHeight: 1.3,
      textAlign: 'right',
      marginTop: 5,
      marginRight: 5,
      marginBottom: 5,
      paddingTop: 6,
      paddingBottom: 7,
      paddingRight: 5,
      width: 150,
    }),

    numberField: () => ({
      width: 150,
      borderColor: 'black',
      textAlign: 'right',
      borderWidth: 1,
      marginTop: 5,
      marginRight: 5,
      marginBottom: 5,
    }),
    input: () => ({
      color: theme.typography.subtitle1.color,
      fontSize: theme.typography.subtitle1.fontSize,
      fontWeight: theme.typography.subtitle1.fontWeight,
      fontFamily: theme.typography.subtitle1.fontFamily,
      textAlign: 'right',
      paddingLeft: '10px',
      width: '100%',
      paddingBottom: 8,
    }),

    switchButton: () => ({
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    }),

    unitSwitch: () => ({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: -15,
    }),

    radio: () => ({
      transform: 'scale(0.75, 0.75)',
    }),

    tooltipText: () => ({
      color: '#ffffff',
    }),

    infoContainer: () => ({
      backgroundColor: theme.palette.primary.light,
    }),

    collapseText: () => ({
      padding: 2,
      color: 'white',
    }),

    errorContainer: () => ({
      backgroundColor: 'red',
    }),

    tooltip: {},

    underline: {},

    endAdornment: {},
  });

export const CalculationRow = withStyles(CalculationRowStyles)(
  function CalculationRowNew(
    props: Props & WithStyles<typeof CalculationRowStyles>
  ) {
    const { classes } = props;
    const [isEditing, setEditing] = React.useState<boolean>(false);
    const [currentUnit, setCurrentUnit] = React.useState<string>('€');
    const [decimalDigits, setDecimalDigits] = React.useState<number>(2);
    const [isInfoContainerOpen, setInfoContainerOpen] = React.useState<boolean>(
      false
    );
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    React.useEffect(() => {
      const { decimalDigits, isEditing, selectedUnit, units } = props;

      setCurrentUnit(selectedUnit ? selectedUnit : units ? units[0] : '');
      setDecimalDigits(decimalDigits === undefined ? 2 : decimalDigits);
      setEditing(isEditing ? isEditing : false);
    }, []);

    React.useEffect(() => {
      setEditing(isEditing ? isEditing : false);
    }, []);

    const renderNumberField = () => {
      const {
        onChange,
        editable,
        numberBackgroundColor,
        bold,
        errorText,
        disabled,
        undefinedValuePlaceholder,
        value,
        maxValue,
        classes,
      } = props;

      // default backgroundColors
      let nbColor = {
        notEditable: 'transparent',
        editable: 'lightgrey',
        editing: 'lightgrey',
      };
      if (numberBackgroundColor) {
        nbColor = numberBackgroundColor;
      }

      if (isEditing && editable && !disabled) {
        return (
          <div>
            <NumberField
              className={classes.numberField}
              maxValue={maxValue}
              value={
                typeof value === 'number'
                  ? parseFloat(value.toFixed(decimalDigits))
                  : value
              }
              endAdornment={currentUnit}
              classes={{
                input: classes.input,
                endAdornment: classes.endAdornment,
                tooltip: classes.tooltip,
                underline: classes.underline,
              }}
              onFinished={(v: number) => onFinished(v)}
              onChange={onChange}
              autoFocus
              style={{
                backgroundColor: nbColor.editing,
              }}
              isTooltipOpen={
                errorText !== null && errorText !== undefined && !isMobile
              }
              tooltipTitle={errorText ? errorText : ''}
            />
          </div>
        );
      } else {
        let bgColor =
          editable && !disabled ? nbColor.editable : nbColor.notEditable;
        if (errorText) {
          bgColor = 'red';
        }

        return (
          <div>
            <Typography
              data-cy='calculationRowValue'
              variant='subtitle1'
              className={classnames(
                classes.number,
                bold && classes.bold,
                errorText && classes.errorText,
                disabled && classes.disabledText
              )}
              style={{
                cursor: editable && !disabled ? 'pointer' : 'default',
                backgroundColor: bgColor,
                width: editable && !disabled ? '150px' : '',
              }}
              onClick={() => receiveFocus()}
            >
              {numberToString(value, decimalDigits, undefinedValuePlaceholder)}{' '}
              {' ' + currentUnit}
            </Typography>
          </div>
        );
      }
    };

    const renderUnitSwitch = () => {
      const { units, selectedUnit, classes } = props;
      const sUnit = selectedUnit ? selectedUnit : currentUnit;

      if (units && units.length > 1) {
        return (
          <RadioGroup
            className={classes.unitSwitch}
            value={sUnit}
            onChange={onModeChange()}
          >
            {units.map((unit) => {
              return (
                <FormControlLabel
                  key={unit}
                  value={unit}
                  label={<Typography variant='subtitle1'>{unit}</Typography>}
                  control={
                    <Radio
                      data-cy={'unitSwitch' + unit}
                      className={classes.radio}
                    />
                  }
                />
              );
            })}
          </RadioGroup>
        );
      } else {
        return null;
      }
    };

    const onModeChange = () => (event: any) => {
      const unit = event.target.value;
      if (currentUnit !== unit) {
        setCurrentUnit(unit);
        if (props.onUnitChange) {
          props.onUnitChange(unit);
        }
      }
    };

    const renderInfoIcon = () => {
      const { infoText, disabled, classes } = props;

      if (infoText && !isMobile) {
        return (
          <Tooltip
            title={
              <Typography variant='subtitle1' className={classes.tooltipText}>
                {infoText}
              </Typography>
            }
          >
            <InfoIcon color={disabled ? 'disabled' : 'inherit'} />
          </Tooltip>
        );
      } else if (infoText && isMobile) {
        return (
          <ClickAwayListener onClickAway={onInfoAway}>
            <InfoIcon
              onClick={onInfoClick}
              color={disabled ? 'disabled' : 'inherit'}
            />
          </ClickAwayListener>
        );
      } else {
        return null;
      }
    };

    const onFinished = (v: number) => {
      setEditing(false);
      if (props.onFinished) {
        props.onFinished(v);
      }
    };

    const receiveFocus = () => {
      const { onFocusCapture } = props;

      setEditing(true);

      if (onFocusCapture) {
        onFocusCapture();
      }
    };

    /**
     * Its a collapsing conatainer for info text. Design for mobile usage as replacement for tooltips.
     */
    const renderInfoContainer = () => {
      const { infoText, classes } = props;

      return (
        <Collapse in={isInfoContainerOpen} className={classes.infoContainer}>
          <Typography className={classes.collapseText}>{infoText}</Typography>
        </Collapse>
      );
    };

    const onInfoClick = () => {
      setInfoContainerOpen(!isInfoContainerOpen);
    };

    const onInfoAway = () => {
      setInfoContainerOpen(false);
    };

    /**
     * Its a collapsing conatainer for error text. Design for mobile usage as replacement for tooltips.
     */
    const renderErrorContainer = () => {
      const { errorText, classes } = props;

      const isError =
        errorText !== '' && errorText !== null && errorText !== undefined;

      return (
        <Collapse in={isError} className={classes.errorContainer}>
          <Typography className={classes.collapseText}>{errorText}</Typography>
        </Collapse>
      );
    };

    return (
      <div
        className={classnames(
          classes.root,
          props.borderBottom && classes.borderBottom
        )}
      >
        <div
          className={classnames(classes.horizontalContainer)}
          onFocusCapture={() => receiveFocus()}
          tabIndex={props.editable && !props.disabled ? 0 : -1}
          style={{
            backgroundColor: props.errorText ? '#FFF0F0' : 'white',
          }}
        >
          {props.label && (
            <div className={classes.labelContainer}>
              <Typography
                variant='subtitle1'
                className={classnames(
                  classes.text,
                  props.bold && classes.bold,
                  props.disabled && classes.disabledText
                )}
              >
                {props.label}
              </Typography>
              {renderInfoIcon()}
            </div>
          )}
          {renderNumberField()}
        </div>
        {renderUnitSwitch()}
        {isMobile && renderInfoContainer()}
        {isMobile && renderErrorContainer()}
      </div>
    );
  }
);
