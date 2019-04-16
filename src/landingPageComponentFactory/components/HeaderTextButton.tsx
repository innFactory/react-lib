import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { LandingPageButton, LandingPageHeader } from '../model/landingPageEditor';
import LPButton from '../subComponents/LPButton';
import LPCard from '../subComponents/LPCard';
import LPHeader from '../subComponents/LPHeader';
import LPTexts from '../subComponents/LPTexts';

export namespace HeaderTextButton {
    export interface Props extends WithStyles<typeof styles> {
        header: LandingPageHeader;
        texts: string[];
        button: LandingPageButton;
        appHistory: any;
    }

    export interface State {
    }
}

class HeaderTextButton extends React.Component<HeaderTextButton.Props, HeaderTextButton.State> {

    state = {
    };

    render() {
        const { header, texts, button, appHistory } = this.props;
        return (

            <LPCard>
                <LPHeader header={header} />
                <LPTexts texts={texts} />
                <LPButton
                    standalone={true}
                    values={button}
                    appHistory={appHistory}
                />
            </LPCard>
        );
    }

}

const styles = (theme: any) => createStyles({
    root: {
        background: theme.palette.common.white
    }
});

export default withStyles(styles)(HeaderTextButton);