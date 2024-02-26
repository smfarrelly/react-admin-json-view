# React Admin JSON view

JSON field and input for [react-admin](https://github.com/marmelab/react-admin).
Built with [@textea/json-viewer](https://github.com/TexteaInc/json-viewer).

Field:

![JSON show](docs/images/json-show.png)

Input:

![JSON edit](docs/images/json-edit.png)

## Installation

```sh
npm install react-admin-json-view
```

## Usage

```jsx
import { JsonField, JsonInput } from "react-admin-json-view";

// ...

export const ExampleShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <JsonField
        source="example"
        jsonString={false} // Set to true if the value is a string, default: false
        reactJsonOptions={{
          // Props passed to react-json-view
          name: null,
          collapsed: true,
          enableClipboard: false,
          displayDataTypes: false,
        }}
      />
    </SimpleShowLayout>
  </Show>
);

export const ExampleEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <JsonInput
        source="example"
        validate={[required()]}
        jsonString={false} // Set to true if the value is a string, default: false
        reactJsonOptions={{
          // Props passed to react-json-view
          name: null,
          collapsed: true,
          enableClipboard: false,
          displayDataTypes: false,
        }}
      />
    </SimpleForm>
  </Edit>
);
```
