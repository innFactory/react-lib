import { ClickAwayListener, Input, InputAdornment, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import Cleave from 'cleave.js/react';
import * as React from 'react';

interface Props {
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

export default function NumberField(props: Props) {
  const classes = useStyles();

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

  // Component will Receive Props
  React.useEffect(() => {
    let newValue: string = props.value ? props.value + '' : value;
    newValue = value.replace(
      '.',
      props.decimalSeparator ? props.decimalSeparator : ','
    );
    setValue(newValue);
    setThousandSeparator(props.thousandSeparator ?? thousandSeparator);
    setDecimalSeparator(props.decimalSeparator ?? decimalSeparator);
    setIsNumericString(props.isNumericString ?? isNumericString);
    setTooltipPlacement(props.tooltipPlacement ?? tooltipPlacement);
    setIsTooltipOpen(props.isTooltipOpen ?? isTooltipOpen);
    setTooltipTitle(props.tooltipTitle ?? tooltipTitle);
    setCloseTooltip(props.closeTooltip ?? closeTooltip);
  }, [
    props.value,
    props.thousandSeparator,
    props.decimalSeparator,
    props.decimalSeparator,
    props.isNumericString,
    props.tooltipPlacement,
    props.isTooltipOpen,
    props.tooltipTitle,
    props.closeTooltip,
  ]);

  /**
   * select entire input if field is focused
   */
  const handleFocus = () => (event: React.FocusEvent<HTMLDivElement>) => {
    if (isTooltipOpen) {
      closeTooltip();
    }
    // assign event to local variable and call event persist
    // https://stackoverflow.com/questions/49500255/warning-this-synthetic-event-is-reused-for-performance-reasons-happening-with
    event.persist();
    const { target } = event;
    target.focus();
    setTimeout(() => target.focus(), 20);
  };

  /**
   * use default style, defined in styles, if no style is given for input and underline
   */
  const tooltipClassesStyle = () => {
    const classes = useStyles();

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
    const classes = useStyles();

    if (props.inputClassesStyle) {
      return props.inputClassesStyle;
    } else {
      return { input: classes.input, underline: classes.underline };
    }
  };

  const maskedTextField = (props: any) => {
    const { decimalSeparator, thousandSeparator } = props;
    let { options, inputRef, ...other } = props;
    return (
      <Cleave
        {...other}
        ref={(ref: any) => {
          inputRef = ref;
        }}
        options={{
          numeral: true,
          numeralDecimalMark: decimalSeparator ? decimalSeparator : ',',
          delimiter: thousandSeparator ? thousandSeparator : '.',
        }}
      />
    );
  };

  const onKeyPress = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === 'Enter') {
      onFinished();
    }
  };

  const onChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { onChange } = props;
    const value = ev.target.value;
    console.log('onChange');
    if (onChange) {
      const numValue = stringValueToNum(value);
      onChange(numValue !== undefined ? numValue : 0);
    }
    setValue(value);
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
    const { negativeValue, decimalSeparator, thousandSeparator } = props;

    try {
      value = value.replace(thousandSeparator ? thousandSeparator : '.', '');
      value = value.replace(thousandSeparator ? thousandSeparator : '.', '');
      value = value.replace(decimalSeparator ? decimalSeparator : ',', '.');
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
    <div>
      <form className={props.className} style={props.style}>
        <Tooltip
          classes={tooltipClassesStyle()}
          title={tooltipTitle}
          open={isTooltipOpen}
          placement={tooltipPlacement}
        >
          <ClickAwayListener onClickAway={onFinished}>
            <Input
              data-cy='numberField'
              autoFocus
              onBlur={() => onFinished()}
              onKeyPress={onKeyPress}
              onKeyDown={(ev) => {
                if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
                  onFinished();
                }
              }}
              classes={inputClassesStyle()}
              value={value ? value : ''}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => onChange(event)}
              endAdornment={
                <InputAdornment
                  className={classes.endAdornment}
                  position={'end'}
                >
                  <Typography variant='subtitle1'>
                    {props.endAdornment}
                  </Typography>
                </InputAdornment>
              }
              onFocusCapture={handleFocus}
              disableUnderline={true}
              type={'text'}
              inputComponent={maskedTextField}
              inputProps={{ inputMode: 'decimal' }}
            />
          </ClickAwayListener>
        </Tooltip>
      </form>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
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
    marginBottom: 5,
  },
}));
