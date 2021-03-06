import { Paper } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { NumberField } from "../mui-components/NumberField";
import RadioCalcRows from "../mui-components/RadioCalcRows";
import { CalculationRowWithProps } from "./CalculationRowWithProps";
import { withTheme } from "./index.stories";

storiesOf("CalculationRow", module)
  .add("enabled with €", () => {
    const [value, setValue] = React.useState(10000);

    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          editable
          label="Eigenkapital"
          units={["€"]}
          value={value}
          onChange={(v) => setValue(v)}
        />
        <CalculationRowWithProps
          maxValue={6000}
          editable
          label="Eigenkapital (max. 6000,-€)"
          units={["€"]}
          value={4000}
        />
      </Paper>,
    );
  })
  .add("enabled with € and %", () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          editable
          label="Eigenkapital"
          units={["€", "%"]}
        />
      </Paper>,
    );
  })
  .add("disabled with € and info", () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          value={1000}
          label="Eigenkapital"
          units={["€"]}
          infoText="Hallo ich bin ein Eigenkapital"
        />
      </Paper>,
    );
  })
  .add("misc with border and colors", () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          value={1000}
          label="Eigenkapital"
          units={["€"]}
          infoText="Hallo ich bin ein Eigenkapital"
          borderBottom
          numberBackgroundColor={{
            notEditable: "#fce1bd",
            editable: "#c1fffa",
            editing: "#1ed9ff",
          }}
        />
        <CalculationRowWithProps
          value={1000}
          label="Eigenkapital"
          units={["€"]}
          borderBottom
          editable
          numberBackgroundColor={{
            notEditable: "#fce1bd",
            editable: "#c1fffa",
            editing: "pink",
          }}
        />
        <CalculationRowWithProps
          value={1000}
          label="Eigenkapital"
          units={["€"]}
          bold
        />
      </Paper>,
    );
  })
  .add("validation error", () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <CalculationRowWithProps
          value={1000}
          label="Eigenkapital"
          units={["€"]}
          infoText="Hallo ich bin ein Eigenkapital"
          errorText="Du hast zu wenig Geld!"
          editable
        />
      </Paper>,
    );
  })
  .add("misc with text and radio", () => {
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 400 }}>
        <CalculationRowWithProps
          value={1000}
          label="Eigenkapital"
          units={["€"]}
          infoText="Hallo ich bin ein Eigenkapital"
          borderBottom
          numberBackgroundColor={{
            notEditable: "#fce1bd",
            editable: "#c1fffa",
            editing: "#1ed9ff",
          }}
        />
        <CalculationRowWithProps
          label="Zinsbindung"
          infoText="Erklärung für Zinsbindung"
          undefinedValuePlaceholder=""
        />
        <RadioCalcRows
          onChange={(v) => console.log(v)}
          selectedValue="option1"
          values={["option0", "option1", "option2"]}
        >
          <CalculationRowWithProps
            label="5 Jahre zu 1,50%"
            infoText="5 Jahre ist echt kurz"
            undefinedValuePlaceholder=""
          />
          <CalculationRowWithProps
            label="10 Jahre zu 1,70%"
            infoText="10 Jahre sind schon lange"
            undefinedValuePlaceholder=""
          />
          <CalculationRowWithProps
            value={120}
            label="Wunsch-Zinsbindung"
            units={["Jahre"]}
            editable
            decimalDigits={0}
          />
        </RadioCalcRows>
      </Paper>,
    );
  })
  .add("newNumberInput", () => {
    // const [value, setValue] = React.useState(1000);
    return withTheme(
      <Paper style={{ margin: 20, maxWidth: 500 }}>
        <NumberField
          value={1000}
          onChange={(value: number) => {
            console.log(value);
          }}
        />
      </Paper>,
    );
  });
