import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { LandingPageHeader } from '../model/landingPageEditor';

export namespace LPHeader {
    export interface Props extends WithStyles<typeof styles> {
        header: LandingPageHeader;
    }
}

class LPHeader extends React.Component<LPHeader.Props> {

    render() {
        const { header, classes } = this.props;
        return (
            <Typography
                variant={header.variant}
                className={classes.header}
                color={header.color}
            >
                {header.text}
            </Typography>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    header: {
        marginBottom: 20
    }
});

export default withStyles(styles)(LPHeader);