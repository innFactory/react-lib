import {
  ClickAwayListener,
  createStyles,
  FormControl,
  Input,
  InputAdornment,
  Theme,
  Tooltip,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import * as React from 'react';

interface Props {
  maxValue?: number | null;
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
  decimalPlaces?: number;
  onFinished?: (value: number) => void;
  onChange?: (value: number) => void;
  autoFocus?: boolean;
  style?: any;
  negativeValue?: boolean; // allow negative values (default: false)
}

const NumberFieldStyles = (theme: Theme) =>
  createStyles({
    tooltip: () => ({
      backgroundColor: '#FF0000',
      color: '#ffffff',
    }),

    input: () => ({
      color: theme.typography.subtitle1.color,
      fontSize: theme.typography.subtitle1.fontSize,
      fontWeight: theme.typography.subtitle1.fontWeight,
      fontFamily: theme.typography.subtitle1.fontFamily,
      lineHeight: theme.typography.subtitle1.lineHeight,
      textAlign: 'right',
      paddingLeft: '10px',
      width: '100%',
    }),

    underline: () => ({
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
    }),
    endAdornment: () => ({
      padding: '4px 5px 0 0',
      marginBottom: 5,
    }),
  });

export const NumberField = withStyles(NumberFieldStyles)(function NumberField(
  props: Props & WithStyles<typeof NumberFieldStyles>
) {
  const [thousandSeparator, setThousandSeparator] = React.useState<string>('.');
  const [decimalSeparator, setDecimalSeparator] = React.useState<string>(',');
  const [isNumericString, setIsNumericString] = React.useState<boolean>(true);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState<boolean>(false);
  const [tooltipPlacement, setTooltipPlacement] = React.useState<any>(
    undefined
  );
  const [tooltipTitle, setTooltipTitle] = React.useState<string>('');
  const [closeTooltip, setCloseTooltip] = React.useState<any>(() => {
    return;
  });
  const [value, setValue] = React.useState<string>('');
  const { classes } = props;
  const inputEl = React.useRef(null);

  // Component will Receive Props
  React.useEffect(() => {
    setThousandSeparator(props.thousandSeparator ?? thousandSeparator);
    setDecimalSeparator(props.decimalSeparator ?? decimalSeparator);
    setIsNumericString(props.isNumericString ?? isNumericString);
    setTooltipPlacement(props.tooltipPlacement ?? tooltipPlacement);
    setIsTooltipOpen(props.isTooltipOpen ?? isTooltipOpen);
    setTooltipTitle(props.tooltipTitle ?? tooltipTitle);
    setCloseTooltip(props.closeTooltip ?? closeTooltip);
  }, []);

  React.useEffect(() => {
    let newValue: string = props.value ? props.value.toString() : value;

    newValue = newValue.replace(
      /\./,
      decimalSeparator ? decimalSeparator : ','
    );

    setValue(newValue);
  }, [props.value]);

  /**
   * select entire input if field is focused
   */
  function handleFocus(event: any) {
    if (isTooltipOpen) {
      closeTooltip();
    }
    // assign event to local variable and call event persist
    // https://stackoverflow.com/questions/49500255/warning-this-synthetic-event-is-reused-for-performance-reasons-happening-with
    event.persist();
    const { target } = event;
    target.select();
    setTimeout(() => target.select(), 20);
  }

  /**
   * use default style, defined in styles, if no style is given for input and underline
   */
  const tooltipClassesStyle = () => {
    const { classes } = props;

    if (props.tooltipClassesStyle) {
      return props.tooltipClassesStyle;
    } else {
      return { tooltip: classes.tooltip };
    }
  };

  /**
   * use default style, defined in styles, if no style is given for input and underline
   */
  const inputClassesStyle = () => {
    const { classes } = props;

    if (props.inputClassesStyle) {
      return props.inputClassesStyle;
    } else {
      return { input: classes.input, underline: classes.underline };
    }
  };

  const onKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'Enter') {
      onFinished();
    }
  };

  const onChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { onChange, maxValue } = props;
    const eventValue = ev.target.value;
    const numValue = stringValueToNum(eventValue);
    const convertedValue = valueToString(eventValue);

    if (maxValue && numValue && numValue > maxValue) {
      onFinished();
      return;
    }
    if (onChange && convertedValue) {
      onChange(numValue !== undefined ? numValue : 0);
    }

    setValue(convertedValue ? convertedValue : value);
  };

  const valueToString = (value: string) => {
    if (value) {
      let convertedValue: string = value;
      if (value.indexOf(',') > 0) {
        const splittString = value.split(',');

        if (!isNaN(parseInt(splittString[0])) && splittString[1].length === 0) {
          return value;
        } else if (
          props.decimalPlaces
            ? splittString[1].length > props.decimalPlaces
            : splittString[1].length > 2
        ) {
          return;
        }
      } else {
        const numValue = stringValueToNum(value);
        convertedValue = Intl.NumberFormat('de-DE', {
          style: 'decimal',
        }).format(numValue ? numValue : parseInt(value));
      }
      return convertedValue;
    }
    return value;
  };

  const onFinished = () => {
    const { onFinished } = props;

    if (!onFinished) {
      return;
    }

    const numValue = stringValueToNum(value);

    if (numValue !== undefined) {
      onFinished(numValue);
      setValue(numValue + '');
    } else {
      onFinished(0);
      setValue('');
    }
  };

  const stringValueToNum = (value: string): number | undefined => {
    const { negativeValue, thousandSeparator } = props;

    try {
      const thousandReg = new RegExp(thousandSeparator ?? /\./, 'gm');
      value = value.replace(thousandReg, '');
      const decimalReg = new RegExp(decimalSeparator ?? ',', 'g');
      value = value.replace(decimalReg, '.');
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
  };

  return (
    <FormControl className={props.className} style={props.style}>
      <Tooltip
        classes={tooltipClassesStyle()}
        title={tooltipTitle}
        open={isTooltipOpen}
        placement={tooltipPlacement}
      >
        <ClickAwayListener onClickAway={onFinished}>
          <Input
            ref={inputEl}
            data-cy='numberField'
            autoFocus={props.autoFocus}
            onBlur={() => onFinished()}
            onKeyPress={onKeyPress}
            onKeyDown={(ev) => {
              if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
                onFinished();
              }
            }}
            classes={inputClassesStyle()}
            value={value ? value : ''}
            onChange={onChange}
            endAdornment={
              <InputAdornment className={classes.endAdornment} position={'end'}>
                <Typography variant='subtitle1'>
                  {props.endAdornment}
                </Typography>
              </InputAdornment>
            }
            onFocusCapture={handleFocus}
            disableUnderline={true}
            type={'text'}
            inputProps={{ inputMode: 'decimal' }}
          />
        </ClickAwayListener>
      </Tooltip>
    </FormControl>
  );
});

export default withStyles(NumberFieldStyles)(NumberField);
