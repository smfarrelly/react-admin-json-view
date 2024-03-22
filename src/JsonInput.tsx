import { FormHelperText } from "@mui/material";
import React from "react";
import { InputHelperText, InputProps, Labeled, useInput } from "react-admin";
import { JsonEditor, JsonEditorProps, UpdateFunction } from "json-edit-react";

type Props = {
  source: string;
  label?: string;
  helperText?: string;
  jsonString?: boolean;
  jsonEditorOptions?: Omit<JsonEditorProps, "data">;
} & InputProps;

export const JsonInput: React.FC<Props> = (props) => {
  const {
    field: { value, onChange },
    fieldState: { isTouched, error },
    formState: { isSubmitted },
    isRequired,
  } = useInput(props);

  const {
    source,
    label,
    helperText,
    jsonString = false,
    jsonEditorOptions,
  } = props;

  function change(updatedSrc: any) {
    let updatedValue = updatedSrc;

    if (jsonString) {
      updatedValue =
        Object.keys(updatedSrc).length === 0
          ? null
          : JSON.stringify(updatedSrc);
    }

    onChange(updatedValue);
  }

  function onEdit(edit: UpdateFunction) {
    change(edit.updated_src);

    if (jsonEditorOptions?.onEdit) {
      jsonEditorOptions.onEdit(edit);
    }
  }

  function onAdd(add: UpdateFunction) {
    change(add.updated_src);

    if (jsonEditorOptions?.onAdd) {
      jsonEditorOptions.onAdd(add);
    }
  }

  function onDelete(del: UpdateFunction) {
    change(del.updated_src);

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
};
