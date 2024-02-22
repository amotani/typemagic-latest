import hljs from "highlight.js";
import React, { FC, Ref, memo, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import { styles } from "../../styles";
import IconButton from "../base/IconButton";
import { Copy } from "@/icons";
import { styled } from "@stitches/react";

export const Markdown = memo((props: { content: string }) => {
  return (
    <Container>
      <ReactMarkdown
        children={props.content}
        components={{
          a({ node, ...props }) {
            return (
              <Link
                style={{ color: styles.markdownLinkColor, fontWeight: 500 }}
                href={props.href}
                target="_blank"
                rel="noreferrer"
              >
                {props.children}
              </Link>
            );
          },
          img({ node, ...props }) {
            return (
              <img
                src={props.src}
                style={{ maxWidth: "100%", marginTop: 24, marginBottom: 24 }}
              >
                {props.children}
              </img>
            );
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "language-js");
            let codeBody =
              !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  //@ts-ignore
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  wrapLongLines={true}
                  {...props}
                  customStyle={{ borderRadius: 0, fontSize: 13 }}
                />
              ) : (
                <code
                  style={{ color: styles.fontColor.special, fontWeight: 500 }}
                  className={className}
                  {...props}
                >
                  {children}
                </code>
              );

            return (
              <span>
                {!inline && (
                  <ToolBar>
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(children.toString());
                      }}
                      showCheckMarkOnClick={true}
                    >
                      <Copy fill={"white"} />
                    </IconButton>
                  </ToolBar>
                )}
                <CodeWrapper>{codeBody}</CodeWrapper>
              </span>
            );
          },
        }}
      />
    </Container>
  );
});

const Link = styled("a", {
  color: styles.fontColor.caption,

  "&:hover": {
    color: styles.fontColor.primary,
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
});

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const CodeWrapper = styled("span", {
  overflow: "scroll",
  position: "relative",
  borderRadius: "0px",
});

const ToolBar = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  border: "none",
  borderRadius: "0px",
  padding: "4px",
  width: "100%",
  marginBottom: "-8px",
  backgroundColor: "#242628",
});
