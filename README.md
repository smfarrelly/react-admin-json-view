# React Admin JSON view ![GitHub release (latest by date)](https://img.shields.io/github/v/release/MrHertal/react-admin-json-view) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/MrHertal/react-admin-json-view/Node.js%20CI)

JSON field and input for [react-admin](https://github.com/marmelab/react-admin).
Built with [json-edit-react](https://github.com/CarlosNZ/json-edit-react).

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
        jsonEditorOptions={{
          // Props passed to json-edit-react
          rootName: null,
          collapse: true,
          enableClipboard: false,
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
        jsonEditorOptions={{
          // Props passed to json-edit-react
          rootName: null,
          collapse: true,
          enableClipboard: false,
        }}
      />
    </SimpleForm>
  </Edit>
);
```
