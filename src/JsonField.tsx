import React from "react";
import { FieldProps, useRecordContext } from "react-admin";
import { JsonEditor, JsonEditorProps } from "json-edit-react";

type Props = {
  source: string;
  jsonString?: boolean;
  jsonEditorOptions?: Omit<JsonEditorProps, "data">;
} & FieldProps;

export const JsonField: React.FC<Props> = ({
  source,
  jsonString = false,
  jsonEditorOptions = {},
}) => {
  const record = useRecordContext();

  let data = record[source];

  if (jsonString) {
    data = JSON.parse(data);
  }

  return <JsonEditor {...jsonEditorOptions} data={data || {}} />;
};
