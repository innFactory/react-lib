import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export namespace PictureAndText {
    export interface Props extends WithStyles<typeof styles> {
        text1: string;
    }

    export interface State {
    }
}

class PictureAndText extends React.Component<PictureAndText.Props, PictureAndText.State> {

    state = {
    };

    render() {
        return (
            <div>{this.props.text1}</div>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    root: {
        background: theme.palette.common.white
    }
});

export default withStyles(styles)(PictureAndText);