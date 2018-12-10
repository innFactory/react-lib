import { Paper } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import CalculationRow from '../mui-components/CalculationRow';
import RadioCalcRows from '../mui-components/RadioCalcRows';
import { withTheme } from './index.stories';

storiesOf('CalculationRow', module)
    .add('enabled with €', () => {
        return withTheme(
            <Paper style={{ margin: 20, maxWidth: 500 }}>
                <CalculationRow
                    editable
                    label="Eigenkapital"
                    units={['€']}
                />
            </Paper>
        )
    }).add('enabled with € and %', () => {
        return withTheme(
            <Paper style={{ margin: 20, maxWidth: 500 }}>
                <CalculationRow
                    editable
                    value={0}
                    label="Eigenkapital"
                    units={['€', '%']}
                />
            </Paper>
        )
    }).add('disabled with € and info', () => {
        return withTheme(
            <Paper style={{ margin: 20, maxWidth: 500 }}>
                <CalculationRow
                    value={1000}
                    label="Eigenkapital"
                    units={['€']}
                    infoText="Hallo ich bin ein Eigenkapital"
                />
            </Paper>
        )
    }).add('misc with border and colors', () => {
        return withTheme(
            <Paper style={{ margin: 20, maxWidth: 500 }}>
                <CalculationRow
                    value={1000}
                    label="Eigenkapital"
                    units={['€']}
                    infoText="Hallo ich bin ein Eigenkapital"
                    borderBottom
                    numberBackgroundColor={{ notEditable: '#fce1bd', editable: '#c1fffa', editing: '#1ed9ff' }}
                />
                <CalculationRow
                    value={1000}
                    label="Eigenkapital"
                    units={['€']}
                    borderBottom
                    editable
                    numberBackgroundColor={{ notEditable: '#fce1bd', editable: '#c1fffa', editing: 'pink' }}
                />
                <CalculationRow
                    value={1000}
                    label="Eigenkapital"
                    units={['€']}
                    bold
                />
            </Paper>
        )
    }).add('validation error', () => {
        return withTheme(
            <Paper style={{ margin: 20, maxWidth: 500 }}>
                <CalculationRow
                    value={1000}
                    label="Eigenkapital"
                    units={['€']}
                    infoText="Hallo ich bin ein Eigenkapital"
                    errorText="Du hast zu wenig Geld!"
                    editable
                />
            </Paper>
        )
    }).add('misc with text and radio', () => {
        return withTheme(
            <Paper style={{ margin: 20, maxWidth: 500 }}>
                <CalculationRow
                    value={1000}
                    label="Eigenkapital"
                    units={['€']}
                    infoText="Hallo ich bin ein Eigenkapital"
                    borderBottom
                    numberBackgroundColor={{ notEditable: '#fce1bd', editable: '#c1fffa', editing: '#1ed9ff' }}
                />
                <CalculationRow
                    label="Zinsbindung"
                    infoText="Erklärung für Zinsbingung"
                    undefinedValuePlaceholder=''
                />
                <RadioCalcRows onChange={v => console.log(v)} selectedValue='option1' values={['option0', 'option1', 'option2']}>
                    <CalculationRow
                        label="5 Jahre zu 1,50%"
                        infoText="5 Jahre ist echt kurz"
                        undefinedValuePlaceholder=''
                    />
                    <CalculationRow
                        label="10 Jahre zu 1,70%"
                        infoText="10 Jahre sind schon lange"
                        undefinedValuePlaceholder=''
                    />
                    <CalculationRow
                        value={120}
                        label="Wunsch-Zinsbindung"
                        units={['Jahre']}
                        editable
                        decimalDigits={0}
                    />
                </RadioCalcRows>
            </Paper>
        )
    });

