import { createStyles, withStyles } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import * as React from 'react';
import CalculationRow, { CalculationRow as CR } from '../mui-components/CalculationRow';

export namespace CalculationRowWithProps {
    export interface Props extends CR.Props {
    }

    export interface State {
        value?: number;
    }
}

class CalculationRowWithProps extends React.Component<CalculationRowWithProps.Props, CalculationRowWithProps.State> {


    state = {
        value: undefined
    };

    render() {

        return (
            <CalculationRow
                {...this.props}
                value={this.state.value}
                onChange={this.onChange}
            />
        );
    }

    onChange = (value: number) => {
        console.log(value);
        this.setState({ value });
    }
}
const styles = () => createStyles({
});

export default withStyles(styles)(withWidth()(CalculationRowWithProps));
