import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import LPCard from '../subComponents/LPCard';
import LPTexts from '../subComponents/LPTexts';

export namespace TextComponent {
    export interface Props extends WithStyles<typeof styles> {
        texts: string[];
    }

    export interface State {
    }
}

class TextComponent extends React.Component<TextComponent.Props, TextComponent.State> {

    state = {
    };

    render() {
        return (
            <LPCard>
                <LPTexts texts={this.props.texts} noMarginOnEnd />
            </LPCard>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    root: {
        background: theme.palette.common.white
    }
});

export default withStyles(styles)(TextComponent);