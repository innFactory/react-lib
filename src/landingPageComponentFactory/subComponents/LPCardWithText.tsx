import { Card, createStyles, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import * as React from 'react';

export namespace LPCardWithText {
    export interface Props extends WithStyles<typeof styles> {
        text: string;
        header: string;
        headerColor: string;
        textColor: string;
        headerVariant: TypographyProps['variant'];
        textVariant: TypographyProps['variant'];
        backgroundColor: string;
        cardsLength: number;
        isMobile: boolean;
        index: number;
    }
}

class LPCardWithText extends React.Component<LPCardWithText.Props> {

    render() {
        const { index, cardsLength } = this.props;
        const mobile = this.props.isMobile;
        let isFirst = index === 0;
        // Total width - 15px * total cards - 1 / total cards
        let maxWidth = ((1000 - 70 - ((cardsLength - 1) * 15)) / cardsLength);
        let style = {
            backgroundColor: this.props.backgroundColor,
            marginLeft: isFirst ? 0 : 15,
            maxWidth: maxWidth,
            width: maxWidth
        };
        let mobileStyle = {
            backgroundColor: this.props.backgroundColor,
            marginLeft: 5,
            marginRight: 5,
            maxWidth: 'calc(100% - 10px)',
            width: 'calc(100% - 10px)'
        };
        return (
            <Card
                style={mobile ? mobileStyle : style}
                className={this.props.classes.root}
            >
                <Typography
                    variant={this.props.headerVariant}
                    gutterBottom
                    style={{ color: this.props.headerColor }}
                    className={this.props.classes.typography}
                >
                    {this.props.header}
                </Typography>
                <Typography
                    variant={this.props.textVariant}
                    gutterBottom
                    style={{ color: this.props.textColor }}
                    className={this.props.classes.typography}
                >
                    {this.props.text}
                </Typography>
            </Card>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    root: {
        marginBottom: 15,
        borderRadius: 5,
        height: 'calc(100% - 15)',
        minHeight: 'calc(100% - 15)',
        padding: 35,
        flexGrow: 2
    },
    typography: {
    }
});

export default withStyles(styles)(LPCardWithText);