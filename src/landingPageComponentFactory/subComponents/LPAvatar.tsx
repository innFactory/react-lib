import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export namespace LPAvatar {
    export interface Props extends WithStyles<typeof styles> {
        src: string;
    }
}

class LPAvatar extends React.Component<LPAvatar.Props> {

    render() {
        return (
            <div className={this.props.classes.circle}>
                <img className={this.props.classes.image} src={this.props.src} />
            </div>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    image: {
        height: 100,
    },
    circle: {
        width: 140,
        height: 140,
        margin: 'auto',
        display: 'flex',
        marginTop: 30,
        objectFit: 'contain',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#ff983f',
        marginBottom: 50,
        borderRadius: '50%',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});

export default withStyles(styles)(LPAvatar);