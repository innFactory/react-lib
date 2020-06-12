// prettier-ignore
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import { CalculationRow, Props as CRP } from '../mui-components/CalculationRow';

interface Props extends CRP {
  onChange?: (value: number) => void;
}

const CalculationRowStyles = () =>
  createStyles({
    root: {},
    horizontalContainer: {},
    borderBottom: {},
    labelContainer: {},
    text: {},
    bold: {},
    errorText: {},
    disabledText: {},
    number: {},
    numberField: {},
    input: {},
    switchButton: {},
    unitSwitch: {},
    radio: {},
    tooltipText: {},
    infoContainer: {},
    collapseText: {},
    errorContainer: {},
    tooltip: {},
    underline: {},
    endAdornment: {},
  });

export const CalculationRowWithProps = withStyles(CalculationRowStyles)(
  function CalculationRowWithPropsNew(
    props: Props & WithStyles<typeof CalculationRowStyles>
  ) {
    const [value, setValue] = React.useState<number>(0);
    const { classes } = props;

    React.useEffect(() => {
      setValue(props.value ?? 0);
    }, []);

    const onChange = (value: number) => {
      console.log('Changed:', value);
      if (props.onChange) props.onChange(value);
    };

    const onFinished = (value: number) => {
      console.log('Finished:', value);
      setValue(value);
    };

    return (
      <CalculationRow
        {...props}
        value={value}
        onFinished={onFinished}
        onChange={onChange}
        classes={classes}
      />
    );
  }
);
