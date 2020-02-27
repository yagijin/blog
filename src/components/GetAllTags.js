import React from 'react'
import { kebabCase } from 'lodash'
import { Link, graphql, StaticQuery } from 'gatsby'

const GetAllTags = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
    <ul className="taglist tag-list">
      {group.map(tag => (
        <li key={tag.fieldValue} className="tag is-primary is-medium tag-child">
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
