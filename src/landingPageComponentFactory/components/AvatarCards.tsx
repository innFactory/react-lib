import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { LandingPageAvatarCard } from '../model/landingPageEditor';
import LPAvatarCardWithText from '../subComponents/LPAvatarCardWithText';

export namespace AvatarCards {
    export interface Props extends WithStyles<typeof styles> {
        avatarCards: LandingPageAvatarCard[];
        isMobile: boolean;
    }

    export interface State {
    }
}

class AvatarCards extends React.Component<AvatarCards.Props, AvatarCards.State> {

    state = {
    };

    renderAvatarCards = (card: LandingPageAvatarCard, index: number) => {
        return (
            <LPAvatarCardWithText
                isMobile={this.props.isMobile}
                index={index}
                textVariant={card.textVariant}
                textColor={card.textColor}
                avatarCardsLength={this.props.avatarCards.length}
                src={card.src}
                backgroundColor={card.backgroundColor}
                text={card.text}
            />
        );
    }

    render() {
        const { avatarCards, classes } = this.props;
        return (
            <div className={classes.root}>
                {avatarCards.map((c, index) => { return this.renderAvatarCards(c, index); })}
            </div>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    out: {
        background: theme.palette.common.white
    }
});

export default withStyles(styles)(AvatarCards);