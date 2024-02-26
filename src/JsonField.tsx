import React from "react";
import { FieldProps, useRecordContext } from "react-admin";
import JsonViewer, { JsonViewerProps } from "@textea/json-viewer";

type Props = {
  source: string;
  jsonString?: boolean;
  reactJsonOptions?: Omit<JsonViewerProps, "src">;
} & FieldProps;

export const JsonField: React.FC<Props> = ({
  source,
  jsonString = false,
  reactJsonOptions = {},
}) => {
  const record = useRecordContext();

  let src = record[source];

  if (jsonString) {
    src = JSON.parse(src);
  }

  return <JsonViewer {...reactJsonOptions} src={src || {}} />;
};
