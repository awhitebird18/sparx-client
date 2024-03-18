import type { Klass, LexicalNode } from "lexical";
import { ImageNode } from "./ImageNode/ImageNode";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { YouTubeNode } from "./YoutubeNode/YoutubeNode";
import { MentionNode } from "./MentionNode/MentionNode";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode } from "@lexical/rich-text";

const Nodes: Array<Klass<LexicalNode>> = [
  ImageNode,
  AutoLinkNode,
  LinkNode,
  YouTubeNode,
  MentionNode,
  CodeHighlightNode,
  CodeNode,
  ListNode,
  ListItemNode,
  HeadingNode,
];

export default Nodes;
