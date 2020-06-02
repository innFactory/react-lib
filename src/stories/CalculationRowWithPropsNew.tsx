// prettier-ignore
import * as React from 'react';
import CalculationRowNew, {
  Props as CRP,
} from '../mui-components/CalculationRowNew';

interface Props extends CRP {}

export default function CalculationRowWithPropsNew(props: Props) {
  const [value, setValue] = React.useState<number>(0);

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
