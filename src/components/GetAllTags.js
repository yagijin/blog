import React from 'react'
import { kebabCase } from 'lodash'
import { Link, graphql, StaticQuery } from 'gatsby'

const GetAllTags = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
    <ul className="taglist">
      {group.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
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
