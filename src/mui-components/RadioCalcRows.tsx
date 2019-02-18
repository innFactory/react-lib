import { createStyles, FormControlLabel, Radio, RadioGroup, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

export namespace RadioCalcRows {
    export interface Props extends WithStyles<typeof styles> {
        selectedValue?: string;
        values?: string[];
        onChange?: (v: string) => void;
    }

    export interface State {
        value: string;
    }
}

class RadioCalcRows extends React.Component<RadioCalcRows.Props, RadioCalcRows.State> {

    state = {
        value: this.props.selectedValue ? this.props.selectedValue : ''
    };

    render() {
        const { classes, children, values } = this.props;
        const { value } = this.state;
        const rows = Array.isArray(children) ? children : [];

        return (
            <div className={classes.root}>
                <RadioGroup
                    value={value}
                    onChange={this.onChange}
                >
                    {rows.map((c, i) =>
                        <FormControlLabel
                            key={values ? values[i] : 'radio' + i}
                            value={values ? values[i] : 'radio' + i}
                            control={<Radio data-cy="radioButton" color="primary" />}
                            classes={{
                                label: classes.label,
                                root: classes.labelRoot
                            }}
                            label={c}
                        />
                    )}
                </RadioGroup>
            </div>
        );
    }

    onChange = (v: any) => {

        const { onChange } = this.props;

        this.setState({ value: v.target.value })

        if (onChange) {
            onChange(v.target.value);
        }
    }
}

const styles = () => createStyles({
    root: {
        paddingLeft: 10
    },

    labelRoot: {
        padding: 0,
        margin: 0
    },

    label: {
        width: '100%',
    }
});

export default withStyles(styles)(RadioCalcRows);