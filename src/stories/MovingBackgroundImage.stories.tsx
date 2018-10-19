import { Paper } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { MovingBackgroundImage } from '..';
import { withTheme } from './index.stories';

storiesOf('MovingBackgroundImage', module)
    .add('some demo pics', () => {
        return withTheme(
            <Paper style={{ width: 750, height: 750, margin: 20 }}>
                <MovingBackgroundImage
                    images={[
                        './1.jpg',
                        './2.jpg',
                        './3.jpg',
                        './4.jpg',
                        './5.jpg',
                    ]}
                />
            </Paper>
        )
    });

