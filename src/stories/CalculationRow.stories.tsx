import { Paper } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import NumberField from '../mui-components/NumberField';
import NewNumberField from '../mui-components/NumberFieldFunc';
import RadioCalcRows from '../mui-components/RadioCalcRows';
import CalculationRowWithProps from './CalculationRowWithProps';
import NewCalculationRowWithProps from './CalculationRowWithPropsNew';
import { withTheme } from './index.stories';

storiesOf('CalculationRow', module)
  .add('enabled with €', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          editable
          label='Eigenkapital'
          units={['€']}
          value={100000}
        />
      </Paper>
    );
  })
  .add('enabled with € and %', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          editable
          label='Eigenkapital'
          units={['€', '%']}
        />
      </Paper>
    );
  })
  .add('disabled with € and info', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          value={1000}
          label='Eigenkapital'
          units={['€']}
          infoText='Hallo ich bin ein Eigenkapital'
        />
      </Paper>
    );
  })
  .add('misc with border and colors', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          value={1000}
          label='Eigenkapital'
          units={['€']}
          infoText='Hallo ich bin ein Eigenkapital'
          borderBottom
          numberBackgroundColor={{
            notEditable: '#fce1bd',
            editable: '#c1fffa',
            editing: '#1ed9ff',
          }}
        />
        <CalculationRowWithProps
          value={1000}
          label='Eigenkapital'
          units={['€']}
          borderBottom
          editable
          numberBackgroundColor={{
            notEditable: '#fce1bd',
            editable: '#c1fffa',
            editing: 'pink',
          }}
        />
        <CalculationRowWithProps
          value={1000}
          label='Eigenkapital'
          units={['€']}
          bold
        />
      </Paper>
    );
  })
  .add('validation error', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          value={1000}
          label='Eigenkapital'
          units={['€']}
          infoText='Hallo ich bin ein Eigenkapital'
          errorText='Du hast zu wenig Geld!'
          editable
        />
      </Paper>
    );
  })
  .add('misc with text and radio', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          value={1000}
          label='Eigenkapital'
          units={['€']}
          infoText='Hallo ich bin ein Eigenkapital'
          borderBottom
          numberBackgroundColor={{
            notEditable: '#fce1bd',
            editable: '#c1fffa',
            editing: '#1ed9ff',
          }}
        />
        <CalculationRowWithProps
          label='Zinsbindung'
          infoText='Erklärung für Zinsbingung'
          undefinedValuePlaceholder=''
        />
        <RadioCalcRows
          onChange={(v) => console.log(v)}
          selectedValue='option1'
          values={['option0', 'option1', 'option2']}
        >
          <CalculationRowWithProps
            label='5 Jahre zu 1,50%'
            infoText='5 Jahre ist echt kurz'
            undefinedValuePlaceholder=''
          />
          <CalculationRowWithProps
            label='10 Jahre zu 1,70%'
            infoText='10 Jahre sind schon lange'
            undefinedValuePlaceholder=''
          />
          <CalculationRowWithProps
            value={120}
            label='Wunsch-Zinsbindung'
            units={['Jahre']}
            editable
            decimalDigits={0}
          />
        </RadioCalcRows>
      </Paper>
    );
  })
  .add('newNumberInput', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NewNumberField />
      </Paper>
    );
  })
  .add('oldNumberInput', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NumberField />
      </Paper>
    );
  });

// new Component

storiesOf('NewCalculationRow', module)
  .add('enabled with €', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NewCalculationRowWithProps
          classes={{}}
          editable
          label='Eigenkapital'
          units={['€']}
          value={100000}
        />
      </Paper>
    );
  })
  .add('enabled with € and %', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NewCalculationRowWithProps
          classes={{}}
          editable
          label='Eigenkapital'
          units={['€', '%']}
        />
      </Paper>
    );
  })
  .add('disabled with € and info', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NewCalculationRowWithProps
          classes={{}}
          value={1000}
          label='Eigenkapital'
          units={['€']}
          infoText='Hallo ich bin ein Eigenkapital'
        />
      </Paper>
    );
  })
  .add('misc with border and colors', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NewCalculationRowWithProps
          classes={{}}
          value={1000}
          label='Eigenkapital'
          units={['€']}
          infoText='Hallo ich bin ein Eigenkapital'
          borderBottom
          numberBackgroundColor={{
            notEditable: '#fce1bd',
            editable: '#c1fffa',
            editing: '#1ed9ff',
          }}
        />
        <NewCalculationRowWithProps
          classes={{}}
          value={1000}
          label='Eigenkapital'
          units={['€']}
          borderBottom
          editable
          numberBackgroundColor={{
            notEditable: '#fce1bd',
            editable: '#c1fffa',
            editing: 'pink',
          }}
        />
        <NewCalculationRowWithProps
          classes={{}}
          value={1000}
          label='Eigenkapital'
          units={['€']}
          bold
        />
      </Paper>
    );
  })
  .add('validation error', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NewCalculationRowWithProps
          classes={{}}
          value={1000}
          label='Eigenkapital'
          units={['€']}
          infoText='Hallo ich bin ein Eigenkapital'
          errorText='Du hast zu wenig Geld!'
          editable
        />
      </Paper>
    );
  })
  .add('misc with text and radio', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NewCalculationRowWithProps
          classes={{}}
          value={1000}
          label='Eigenkapital'
          units={['€']}
          infoText='Hallo ich bin ein Eigenkapital'
          borderBottom
          numberBackgroundColor={{
            notEditable: '#fce1bd',
            editable: '#c1fffa',
            editing: '#1ed9ff',
          }}
        />
        <NewCalculationRowWithProps
          classes={{}}
          label='Zinsbindung'
          infoText='Erklärung für Zinsbingung'
          undefinedValuePlaceholder=''
        />
        <RadioCalcRows
          onChange={(v) => console.log(v)}
          selectedValue='option1'
          values={['option0', 'option1', 'option2']}
        >
          <NewCalculationRowWithProps
            classes={{}}
            label='5 Jahre zu 1,50%'
            infoText='5 Jahre ist echt kurz'
            undefinedValuePlaceholder=''
          />
          <NewCalculationRowWithProps
            classes={{}}
            label='10 Jahre zu 1,70%'
            infoText='10 Jahre sind schon lange'
            undefinedValuePlaceholder=''
          />
          <NewCalculationRowWithProps
            classes={{}}
            value={120}
            label='Wunsch-Zinsbindung'
            units={['Jahre']}
            editable
            decimalDigits={0}
          />
        </RadioCalcRows>
      </Paper>
    );
  })
  .add('newNumberInput', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NewNumberField />
      </Paper>
    );
  })
  .add('oldNumberInput', () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NumberField />
      </Paper>
    );
  });
