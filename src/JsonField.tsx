import React from "react";
import { FieldProps, useRecordContext } from "react-admin";
import { JsonEditor, JsonEditorProps } from "json-edit-react";

type JsonFieldProps = {
  source: string;
  jsonString?: boolean;
  jsonEditorOptions?: Omit<JsonEditorProps, "data">;
} & FieldProps;

function JsonField({
  source,
  jsonString = false,
  jsonEditorOptions = {
    restrictAdd: true,
    restrictEdit: true,
    restrictDelete: true,
    rootName: source,
  },
}: JsonFieldProps) {
  const record = useRecordContext();

  let data = record[source];

  if (jsonString) {
    data = JSON.parse(data);
  }

  return <JsonEditor {...jsonEditorOptions} data={data || {}} />;
}

export default JsonField;
