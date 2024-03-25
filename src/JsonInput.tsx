import { FormHelperText } from "@mui/material";
import React from "react";
import { InputHelperText, InputProps, Labeled, useInput } from "react-admin";
import { JsonEditor, JsonEditorProps, UpdateFunction } from "json-edit-react";

type JsonInputProps = {
  source: string;
  label?: string;
  helperText?: string;
  jsonString?: boolean;
  jsonEditorOptions?: Omit<JsonEditorProps, "data">;
} & InputProps;

function JsonInput({
  source,
  label = undefined,
  helperText = undefined,
  jsonString = false,
  jsonEditorOptions = {},
  ...props
}: JsonInputProps) {
  const {
    field: { value, onChange },
    fieldState: { isTouched, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput({ ...props, source });

  function change(updatedData: unknown) {
    let updatedValue = updatedData;

    if (jsonString) {
      updatedValue =
        Object.keys(updatedData).length === 0
          ? null
          : JSON.stringify(updatedData);
    }

    onChange(updatedValue);
  }

  function onEdit(edit: UpdateFunction) {
    change(edit.newData);

    if (jsonEditorOptions?.onEdit) {
      jsonEditorOptions.onEdit(edit);
    }
  }

  function onAdd(add: UpdateFunction) {
    change(add.newData);

    if (jsonEditorOptions?.onAdd) {
      jsonEditorOptions.onAdd(add);
    }
  }

  function onDelete(del: UpdateFunction) {
    change(del.newData);

    if (jsonEditorOptions?.onDelete) {
      jsonEditorOptions.onDelete(del);
    }
  }

  let data = value;

  if (jsonString) {
    data = value ? JSON.parse(value) : value;
  }

  return (
    <div>
      <Labeled source={source} label={label} isRequired={isRequired}>
        <JsonEditor
          {...jsonEditorOptions}
          data={data || {}}
          onEdit={jsonEditorOptions?.onEdit === false ? false : onEdit}
          onAdd={jsonEditorOptions?.onAdd === false ? false : onAdd}
          onDelete={jsonEditorOptions?.onDelete === false ? false : onDelete}
        />
      </Labeled>
      <FormHelperText error={(isTouched || isSubmitted) && !!error}>
        <InputHelperText
          touched={isTouched || isSubmitted}
          error={error?.message}
          helperText={helperText}
        />
      </FormHelperText>
    </div>
  );
}

export default JsonInput;
