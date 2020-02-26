import React, {useEffect} from 'react'
import './all.sass'
import { Link } from 'gatsby'

function PagenationBar(props) {

  useEffect(() => {
    console.log(props);
  });

  const pageContext = props.pageContext;
  const nextPage = (pageContext.currentPage >= pageContext.numPages)?("/not"):("/blog/" + (pageContext.currentPage+1));
  const backPage = (pageContext.currentPage === 1)?("/not"):("/blog/" + (pageContext.currentPage-1));

  return (
    <div className="pagenation-bar">
      <div className="pagenation-button">
        <Link to={backPage} className={(backPage==="/not")?"pagenation-button-link-disabled":"pagenation-button-link"}>
          Back
        </Link>
      </div>
      <div className="pagenation-text">
        {pageContext.currentPage} {"　/　"} {pageContext.numPages}
      </div>
      <div className="pagenation-button">
        <Link to={nextPage} className={(nextPage==="/not")?"pagenation-button-link-disabled":"pagenation-button-link"}>
          Next
        </Link>
      </div>
    </div>
  )
}

export default PagenationBar
