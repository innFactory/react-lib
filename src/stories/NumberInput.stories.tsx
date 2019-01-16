import { Paper } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import NumberInput from '../mui-components/NumberInput';
import { withTheme } from './index.stories';

storiesOf('NumberInput', module)
    .add('€ and %', () => {
        return withTheme(
            <Paper style={{ margin: 20, padding: 20 }}>
                <NumberInput
                    initialValue={''}
                    mobile={false}
                    thousandDivider={true}
                    unitLables={[
                        { lable: '€', description: 'Euro', thousandDivider: true, decimalPlaces: 2, length: 9 },
                        {
                            lable: '%', description: 'Maklergebühr in %',
                            thousandDivider: false, decimalPlaces: 2, length: 3
                        }
                    ]}
                />
            </Paper>
        )
    }).add('€', () => {
        return withTheme(
            <Paper style={{ margin: 20, padding: 20 }}>
                <NumberInput
                    initialValue={'10000000'}
                    mobile={false}
                    unitLables={[
                        { lable: '€', description: 'Euro', thousandDivider: true, decimalPlaces: 2, length: 8 }
                    ]}
                />
            </Paper>
        )
    }).add('no decimal places', () => {
        return withTheme(
            <Paper style={{ margin: 20, padding: 20 }}>
                <NumberInput
                    initialValue={'99999'}
                    mobile={false}
                    unitLables={[
                        { lable: '€', description: 'Euro', thousandDivider: true, decimalPlaces: 0, length: 5 }
                    ]}
                />
            </Paper>
        )
    });

