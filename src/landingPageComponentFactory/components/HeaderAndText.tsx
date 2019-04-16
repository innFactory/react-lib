import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { LandingPageHeader } from '../model/landingPageEditor';
import LPCard from '../subComponents/LPCard';
import LPHeader from '../subComponents/LPHeader';
import LPTexts from '../subComponents/LPTexts';

export namespace HeaderAndText {
    export interface Props extends WithStyles<typeof styles> {
        header: LandingPageHeader;
        texts: string[];
    }

    export interface State {
    }
}

class HeaderAndText extends React.Component<HeaderAndText.Props, HeaderAndText.State> {

    state = {
    };

    render() {
        const { header, texts } = this.props;
        return (
            <LPCard>
                <LPHeader header={header} />
                <LPTexts texts={texts} noMarginOnEnd />
            </LPCard>
        );
    }

}

const styles = (theme: Theme) => createStyles({
});

export default withStyles(styles)(HeaderAndText);