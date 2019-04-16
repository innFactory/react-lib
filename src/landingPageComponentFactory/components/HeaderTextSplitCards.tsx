import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { LandingPageCard, LandingPageHeader } from '../model/landingPageEditor';
import LPCard from '../subComponents/LPCard';
import LPCardWithText from '../subComponents/LPCardWithText';
import LPHeader from '../subComponents/LPHeader';
import LPTexts from '../subComponents/LPTexts';

export namespace HeaderTextSplitCards {
    export interface Props extends WithStyles<typeof styles> {
        header: LandingPageHeader;
        texts: string[];
        isMobile: boolean;
        cards: LandingPageCard[];
    }

    export interface State {
    }
}

class HeaderTextSplitCards extends React.Component<HeaderTextSplitCards.Props, HeaderTextSplitCards.State> {

    state = {
    };

    renderLPCardsWithText = (card: LandingPageCard, index: number) => {
        return (
            <LPCardWithText
                isMobile={this.props.isMobile}
                text={card.text}
                header={card.header}
                headerColor={card.headerColor}
                textColor={card.textColor}
                headerVariant={card.headerVariant}
                textVariant={card.textVariant}
                backgroundColor={card.backgroundColor}
                cardsLength={this.props.cards.length}
                index={index}
            />
        );
    }

    render() {
        const { header, texts, cards, classes } = this.props;
        return (
            <LPCard>
                <LPHeader header={header} />
                <LPTexts texts={texts} />
                <div className={classes.cardWrapper}>
                    {cards.map((c, index) => { return this.renderLPCardsWithText(c, index); })}
                </div>
            </LPCard>
        );
    }

}

const styles = (theme: Theme) => createStyles({
    cardWrapper: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    root: {
        background: theme.palette.common.white
    }
});

export default withStyles(styles)(HeaderTextSplitCards);