import { createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as _ from 'lodash';
import * as React from 'react';

export namespace LPTexts {
    export interface Props extends WithStyles<typeof styles> {
        texts: string[];
        noMarginOnEnd?: boolean;
        moreMarginOnTop?: boolean;
    }
}

class LPTexts extends React.Component<LPTexts.Props> {

    renderText = (value: string, index: number, length: number) => {
        let endMargin = true;
        let isLast = index === length - 1;
        let isFirst = index === 0;
        let topMargin = false;
        let style = {};
        if (this.props.noMarginOnEnd) {
            endMargin = false;
        }
        if (this.props.moreMarginOnTop) {
            topMargin = true;
        }
        if ((isLast && endMargin) || !isLast) {
            _.assign(style, { marginBottom: 20 });
        }
        if (topMargin && isFirst) {
            _.assign(style, { marginTop: 20 });
        }
        return (
            <Typography
                variant="body1"
                gutterBottom={endMargin && isLast}
                style={
                    style
                }
            >
                {value}
            </Typography>
        );
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                {this.props.texts && this.props.texts.length > 0 &&
                    this.props.texts.map((text: string, index: number) => {
                        return this.renderText(text, index, this.props.texts.length);
                    })}
            </div>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    out: {
        background: theme.palette.common.white
    }
});

export default withStyles(styles)(LPTexts);