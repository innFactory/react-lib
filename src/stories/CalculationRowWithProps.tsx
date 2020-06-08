// prettier-ignore
import { createStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import CalculationRowNew, {
  Props as CRP,
} from '../mui-components/CalculationRow';

interface Props extends CRP {}

function CalculationRowWithPropsNew(props: Props) {
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    setValue(props.value ?? 0);
  }, []);

  const onChange = (value: number) => {
    console.log('Changed:', value);
  };

  const onFinished = (value: number) => {
    console.log('Finished:', value);
    setValue(value);
  };

  return (
    <CalculationRowNew
      {...props}
      value={value}
      onFinished={onFinished}
      onChange={onChange}
    />
  );
}
const styles = () => createStyles({});

export default withStyles(styles)(CalculationRowWithPropsNew);
