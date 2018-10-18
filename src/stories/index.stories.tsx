import { createMuiTheme, CssBaseline, MuiThemeProvider, Paper } from '@material-ui/core';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import { Welcome } from '@storybook/react/demo';
import * as React from 'react';
import CalculationRow from '../mui-components/CalculationRow';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('CalculationRow', module)
  .add('enabled with €', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRow
          editable
          value={0}
          label="Eigenkapital"
          units={['€']}
        />
      </Paper>
    )
  }).add('enabled with € and %', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRow
          editable
          value={0}
          label="Eigenkapital"
          units={['€', '%']}
        />
      </Paper>
    )
  }).add('disabled with € and info', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRow
          value={1000}
          label="Eigenkapital"
          units={['€']}
          infoText="Hallo ich bin ein Eigenkapital"
        />
      </Paper>
    )
  }).add('misc with border and colors', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRow
          value={1000}
          label="Eigenkapital"
          units={['€']}
          infoText="Hallo ich bin ein Eigenkapital"
          borderBottom
          numberBackgroundColor={{ notEditable: '#fce1bd', editable: '#c1fffa', editing: '#1ed9ff' }}
        />
        <CalculationRow
          value={1000}
          label="Eigenkapital"
          units={['€']}
          borderBottom
          editable
          numberBackgroundColor={{ notEditable: '#fce1bd', editable: '#c1fffa', editing: '#1ed9ff' }}
        />
        <CalculationRow
          value={1000}
          label="Eigenkapital"
          units={['€']}
          bold
        />
      </Paper>
    )
  }).add('validation error', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRow
          value={1000}
          label="Eigenkapital"
          units={['€']}
          infoText="Hallo ich bin ein Eigenkapital"
          errorText="Du hast zu wenig Geld!"
          editable
        />
      </Paper>
    )
  });

const withTheme = (component: any) => {
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {component}
    </MuiThemeProvider>
  );
}
