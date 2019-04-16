import { ButtonProps } from '@material-ui/core/Button';
import { TypographyProps } from '@material-ui/core/Typography';

export interface LandingPageBase {
    type: string;
    values: any;
}

export interface LandingPageButton {
    text: string;
    link: string;
    color: ButtonProps['color'];
    variant: ButtonProps['variant'];
}

export interface LandingPageHeader {
    text: string;
    color: TypographyProps['color'];
    variant: TypographyProps['variant'];
}

export interface LandingPageAvatarCards {
    avatarCards: LandingPageAvatarCard[];
}

export interface LandingPageAvatarCard {
    text: string;
    backgroundColor: string;
    src: string;
    textColor: string;
    textVariant: TypographyProps['variant'];
}

export interface LandingPageCard {
    text: string;
    header: string;
    headerColor: string;
    textColor: string;
    headerVariant: TypographyProps['variant'];
    textVariant: TypographyProps['variant'];
    backgroundColor: string;
}

export interface TestComponentModel extends LandingPageBase {
    type: string;
    values: { text1: string };
}

export type LandingPageValue = TestComponentModel | LandingPageBase;