import React from "react";
import { FieldProps, useRecordContext } from "react-admin";
import ReactJson, { ReactJsonViewProps } from "@textea/json-viewer";

type Props = {
  source: string;
  jsonString?: boolean;
  reactJsonOptions?: Omit<ReactJsonViewProps, "src">;
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

  return <ReactJson {...reactJsonOptions} src={src || {}} />;
};
