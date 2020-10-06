import React from 'react'
import { kebabCase } from 'lodash'
import { Link, graphql, StaticQuery } from 'gatsby'

const GetAllTags = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
    <ul className="taglist tag-list">
      {group.sort(function (a, b) {return b.totalCount - a.totalCount}).filter((_,index)=>{return index<8}).map(tag => (
        <li key={tag.fieldValue} className="tag-all is-primary is-medium tag-child">
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className="tag-child-link">
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
)

export default () => (
  <StaticQuery
    query={graphql`
      query GetAllTagsQuery {
        allMarkdownRemark(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={(data) => <GetAllTags data={data}/>}
  />
)
