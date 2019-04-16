import { Button, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { LandingPageButton } from '../model/landingPageEditor';

export namespace LPButton {
    export interface Props extends WithStyles<typeof styles> {
        values: LandingPageButton;
        appHistory: any;
        standalone: boolean;
    }
}

class LPButton extends React.Component<LPButton.Props> {

    render() {
        const { values, classes, appHistory, standalone } = this.props;
        return (
            <Button
                className={standalone ? classes.buttonStandalone : classes.button}
                variant={values.variant}
                color={values.color}
                onClick={() => appHistory.push(values.link)}
            >
                {values.text}
            </Button>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    button: {
        margin: 'auto',
        marginBottom: 20,
        display: 'block'
    },
    buttonStandalone: {
        margin: 'auto',
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    },
    root: {
        background: theme.palette.common.white
    }
});

export default withStyles(styles)(LPButton);