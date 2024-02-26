import { FormHelperText } from "@mui/material";
import React from "react";
import { InputHelperText, InputProps, Labeled, useInput } from "react-admin";
import JsonViewer, {
  DataItemProps,
  JsonViewerProps,
} from "@textea/json-viewer";

type Props = {
  source: string;
  label?: string;
  helperText?: string;
  jsonString?: boolean;
  reactJsonOptions?: Omit<JsonViewerProps, "src">;
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
    reactJsonOptions,
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

  function onEdit(edit: DataItemProps) {
    change(edit.updated_src);

    if (reactJsonOptions?.onEdit) {
      reactJsonOptions.onEdit(edit);
    }
  }

  function onAdd(add: DataItemProps) {
    change(add.updated_src);

    if (reactJsonOptions?.onAdd) {
      reactJsonOptions.onAdd(add);
    }
  }

  function onDelete(del: DataItemProps) {
    change(del.updated_src);

    if (reactJsonOptions?.onDelete) {
      reactJsonOptions.onDelete(del);
    }
  }

  let src = value;

  if (jsonString) {
    src = value ? JSON.parse(value) : value;
  }

  return (
    <div>
      <Labeled source={source} label={label} isRequired={isRequired}>
        <JsonViewer
          {...reactJsonOptions}
          src={src || {}}
          onEdit={reactJsonOptions?.onEdit === false ? false : onEdit}
          onAdd={reactJsonOptions?.onAdd === false ? false : onAdd}
          onDelete={reactJsonOptions?.onDelete === false ? false : onDelete}
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
