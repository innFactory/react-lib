import {
  Card,
  createStyles,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import * as React from "react";
import LPAvatar from "./LPAvatar";

export namespace LPAvatarCardWithText {
  export interface Props extends WithStyles<typeof styles> {
    src: string;
    text: string;
    textColor: string;
    textVariant: TypographyProps["variant"];
    backgroundColor: string;
    avatarColor: string;
    avatarCardsLength: number;
    index: number;
    isMobile: boolean;
  }
}

class LPAvatarCardWithText extends React.Component<LPAvatarCardWithText.Props> {
  render() {
    const mobile = this.props.isMobile;
    const { index, avatarCardsLength } = this.props;
    let isFirst = index === 0;
    // Total width - 15px * total cards - 1 / total cards
    let maxWidth = (1000 - (avatarCardsLength - 1) * 15) / avatarCardsLength;

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
      maxWidth: "calc(100% - 10px)",
      width: "calc(100% - 10px)"
    };

    return (
      <Card
        style={mobile ? mobileStyle : style}
        className={this.props.classes.root}
      >
        <LPAvatar
          src={this.props.src}
          color={this.props.avatarColor}
          alt={this.props.text}
        />
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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: 15,
      borderRadius: 5,
      height: "calc(100% - 15)",
      minHeight: "calc(100% - 15)",
      padding: 35,
      flexGrow: 2,
      boxShadow: theme.shadows[6]
    },
    typography: {
      textAlign: "center"
    }
  });

export default withStyles(styles)(LPAvatarCardWithText);
