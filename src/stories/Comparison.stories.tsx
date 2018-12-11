import { Paper } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import NumberInput from '../mui-components/NumberInput';
import { withTheme } from './index.stories';
import CalculationRowWithProps from './CalculationRowWithProps';

storiesOf('Input Comparison', module)
    .add('€ and %', () => {
        return withTheme(
            <Paper style={{ margin: 20, padding: 20, display: 'flex', flexDirection: 'row', width: 700 }}>
                <NumberInput
                    initialValue={''}
                    mobile={false}
                    unitLables={[
                        { lable: '€', description: 'Gesamt Eigenkapital in Euro', thousandDivider: true, decimalPlaces: 2, length: 8 },
                        { lable: '%', description: 'Prozent der Gesamtkosten als Eigenkapital', thousandDivider: true, decimalPlaces: 2, length: 5 }
                    ]}
                />
                <div style={{ minHeight: '100%', width: '1px', backgroundColor: 'black', marginLeft: 50, marginRight: 50 }} />
                <div>
                    <CalculationRowWithProps
                        editable
                        label="Eigenkapital"
                        units={['€', '%']}
                    />
                </div>
            </Paper>
        )
    }).add('Zinsbindung in %', () => {
        return withTheme(
            <Paper style={{ margin: 20, padding: 20, display: 'flex', flexDirection: 'row', width: 700 }}>
                <NumberInput
                    initialValue={''}
                    mobile={false}
                    unitLables={[
                        { lable: '%', description: 'Zinsbindung in %', thousandDivider: true, decimalPlaces: 2, length: 5 }
                    ]}
                />
                <div style={{ minHeight: '100%', width: '1px', backgroundColor: 'black', marginLeft: 50, marginRight: 50 }} />
                <div>
                    <CalculationRowWithProps
                        editable
                        label="Zinsbindung in %"
                        units={['%']}
                    />
                </div>
            </Paper>
        )
    });

