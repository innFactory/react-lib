import { Card, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export namespace LPCard {
    export interface Props extends WithStyles<typeof styles> {
    }
}

class LPCard extends React.Component<LPCard.Props> {

    render() {
        return (
            <Card className={this.props.classes.root}>
                {this.props.children}
            </Card>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        minWidth: '100%',
        marginBottom: 15,
        borderRadius: 5,
        padding: 35,
        backgroundColor: 'white',
        boxShadow: theme.shadows[6]
    }
});

export default withStyles(styles)(LPCard);