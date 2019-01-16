import { Paper } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Slider from '../slider/StyledSlider';
import { withTheme } from './index.stories';

storiesOf('StyledSlider', module)
    .add('enabled with €', () => {
        return withTheme(
            <Paper style={{ margin: 20, maxWidth: 500, height: 400, paddingTop: 1 }}>
                <Slider
                    step={10}
                    min={0}
                    max={1500}
                    unit={'€'}
                    thumbWidth={120}
                    onChange={(value: number) => console.log(value)}
                    trackAfter={'white'}
                />
            </Paper>
        )
    });

