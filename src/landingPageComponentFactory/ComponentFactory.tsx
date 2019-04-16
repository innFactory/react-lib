import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import AvatarCards from './components/AvatarCards';
import HeaderAndText from './components/HeaderAndText';
import HeaderTextButton from './components/HeaderTextButton';
import HeaderTextButtonText from './components/HeaderTextButtonText';
import HeaderTextSplitCards from './components/HeaderTextSplitCards';
import TextComponent from './components/TextComponent';
import { LandingPageValue } from './model/landingPageEditor';

export namespace ComponentFactory {
    export interface Props extends WithStyles<typeof styles> {
        landingPageArray: LandingPageValue[];
        appHistory: any;
        isMobile: boolean;
    }

    export interface State {
    }
}

class ComponentFactory extends React.Component<ComponentFactory.Props, ComponentFactory.State> {

    state = {
    };

    selectWithType = (landingPageValue: LandingPageValue) => {

        switch (landingPageValue.type) {
            case 'TextComponent': {
                return (
                    <TextComponent
                        texts={landingPageValue.values.texts}
                    />
                );
            }
            case 'HeaderTextButton': {
                return (
                    <HeaderTextButton
                        appHistory={this.props.appHistory}
                        texts={landingPageValue.values.texts}
                        header={landingPageValue.values.header}
                        button={landingPageValue.values.button}
                    />);
            }

            case 'HeaderTextButtonText': {
                return (
                    <HeaderTextButtonText
                        appHistory={this.props.appHistory}
                        texts={landingPageValue.values.texts}
                        header={landingPageValue.values.header}
                        button={landingPageValue.values.button}
                        texts2={landingPageValue.values.texts2}
                    />);
            }

            case 'HeaderTextSplitCards': {
                return (
                    <HeaderTextSplitCards
                        isMobile={this.props.isMobile}
                        texts={landingPageValue.values.texts}
                        header={landingPageValue.values.header}
                        cards={landingPageValue.values.cards}
                    />);
            }

            case 'HeaderAndText': {
                return (
                    <HeaderAndText
                        texts={landingPageValue.values.texts}
                        header={landingPageValue.values.header}
                    />);
            }
            case 'AvatarCards': {
                return (
                    <AvatarCards
                        isMobile={this.props.isMobile}
                        avatarCards={landingPageValue.values.avatarCards}
                    />);
            }
            default: { return; }
        }

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={this.props.isMobile ? classes.mobileFactoryRoot : classes.factoryRoot}>
                {this.props.landingPageArray.map((lPV: LandingPageValue) => { return this.selectWithType(lPV); })}
            </div>
        );
    }
}

const styles = (theme: Theme) => createStyles({
    factoryRoot: {
        width: '1000px',
        margin: 'auto',
        paddingTop: 10,
        paddingBottom: 10
    },
    mobileFactoryRoot: {
        width: '100%',
        margin: 0,
        paddingTop: 10,
        paddingBottom: 10
    },
    root: {
        background: theme.palette.common.white
    }
});

export default withStyles(styles)(ComponentFactory);