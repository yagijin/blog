import React from 'react'
import PropTypes from 'prop-types'
import rehypeReact from "rehype-react"
import Kifu from "../components/Kifu"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "kifu": Kifu }
}).Compiler

export const HTMLContent = ({ content, className }) => (
  /*<div className={className} dangerouslySetInnerHTML={{ __html: content }} />*/
  <div >{renderAst(content)}</div>
)

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
