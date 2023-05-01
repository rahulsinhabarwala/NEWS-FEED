import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {searchQuery} from "../redux/slice/NewsSearch";
import {fetchSearchResults, setPage} from "../redux/slice/SearchResultsSlices";

function SearchResultsPage() {
  const {newsSearchQuery} = useSelector((state) => state.newsSearchQuery);
  const [page, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  let pageSize = 10;

  const {data, loading, error, totalPages} = useSelector(
    (state) => state.searchResults
  );

  useEffect(() => {
    dispatch(fetchSearchResults({query: newsSearchQuery, page, pageSize}));
  }, [dispatch, newsSearchQuery, pageSize]);

  const handleKeywordClick = (keyword) => {
    dispatch(searchQuery(keyword));
  };

  const RenderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const handlePageChange = (page) => {
      setPageNumber(page);
      dispatch(setPage(page));
      dispatch(
        fetchSearchResults({
          query: newsSearchQuery,
          page: page,
          pageSize: 10,
        })
      );
    };

    const renderButtons = () => {
      const firstPage = 1;
      const lastPage = totalPages;
      const maxButtonsToShow = 5;
      const buttons = [];

      // Calculate the middle button index
      const middleIndex = Math.floor(maxButtonsToShow / 2);
      let start = page - middleIndex;
      let end = page + middleIndex;

      // Adjust start and end if they go beyond the pagination range
      if (start < firstPage) {
        end += firstPage - start;
        start = firstPage;
      }

      if (end > lastPage) {
        start -= end - lastPage;
        end = lastPage;
      }

      // Render first button
      if (start > firstPage) {
        buttons.push(
          <button
            key={firstPage}
            className="page-link"
            onClick={() => handlePageChange(firstPage)}>
            {firstPage}
          </button>
        );
      }

      // Render "..." if there are pages before the first button
      if (start > firstPage + 1) {
        buttons.push(
          <span key="ellipsis1" className="page-link">
            ...
          </span>
        );
      }

      // Render middle buttons
      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            className={`page-link ${i === page ? "active" : ""}`}
            onClick={() => handlePageChange(i)}>
            {i}
          </button>
        );
      }

      // Render "..." if there are pages after the last button
      if (end < lastPage - 1) {
        buttons.push(
          <span key="ellipsis2" className="page-link">
            ...
          </span>
        );
      }

      // Render last button
      if (end < lastPage) {
        buttons.push(
          <button
            key={lastPage}
            className="page-link"
            onClick={() => handlePageChange(lastPage)}>
            {lastPage}
          </button>
        );
      }

      return buttons;
    };

    return (
      <nav>
        <div className="pagination">{renderButtons()}</div>
      </nav>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="container">
      {!loading && !error && data.length === 0 && <p>No results found.</p>}
      <div>Search for: {newsSearchQuery}</div>
      {data?.map((result) => {
        return (
          <div key={result.id} className="blog-card">
            <div className="meta">
              <div
                className="photo"
                style={{
                  backgroundImage: `url(${result.fields.thumbnail})`,
                }}></div>
              <ul className="details">
                {result?.tags?.map((keyword) => {
                  return (
                    <li
                      className="author"
                      key={keyword.id}
                      onClick={() => handleKeywordClick(keyword.webTitle)}>
                      <a>{keyword.webTitle}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="description">
              <h2>{result.fields.headline}</h2>
              <p>{result.fields.webTitle}</p>
              <p className="read-more">
                <a
                  href={result.webUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  Read More
                </a>
              </p>
            </div>
          </div>
        );
      })}
      <RenderPaginationButtons />
    </div>
  );
}

export default SearchResultsPage;
