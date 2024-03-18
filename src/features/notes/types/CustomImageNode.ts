import { SerializedElementNode } from "lexical";

export interface SerializedCustomImageNode extends SerializedElementNode {
  src: string;
  altText: string;
}
