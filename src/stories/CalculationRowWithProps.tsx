import { createStyles, withStyles } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import * as React from 'react';
import CalculationRow, {
  CalculationRow as CR,
} from '../mui-components/CalculationRow';

export namespace CalculationRowWithProps {
  export interface Props extends CR.Props {}

  export interface State {
    value?: number;
  }
}

class CalculationRowWithProps extends React.Component<
  CalculationRowWithProps.Props,
  CalculationRowWithProps.State
> {
  state = {
    value: this.props.value,
  };

  render() {
    return (
      <CalculationRow
        {...this.props}
        value={this.state.value}
        onFinished={this.onFinished}
        onChange={this.onChange}
      />
    );
  }

  onChange = (value: number) => {
    console.log('Changed:', value);
  };

  onFinished = (value: number) => {
    console.log('Finished:', value);
    this.setState({ value });
  };
}
const styles = () => createStyles({});

export default withStyles(styles)(withWidth()(CalculationRowWithProps));
