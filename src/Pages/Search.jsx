import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import useDebounce from "./../hooks/useDebounce";
import {searchQuery} from "../redux/slice/NewsSearch";
import {fetchTags} from "../utils/apis";

function Search() {
  const [searchString, setSearchString] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const debouncedSearchString = useDebounce(searchString, 300);

  useEffect(() => {
    fetchTags(debouncedSearchString)
      .then((results) => setSuggestedTags(results))
      .catch((error) => console.error(error));
  }, [debouncedSearchString]);

  const handleDispatch = (tag) => {
    dispatch(searchQuery(tag.webTitle));
    navigate(`/newsfeeds`);
    setSearchString(tag.webTitle);
  };

  const handleSearch = () => {
    dispatch(searchQuery(searchString));
    navigate(`/newsfeeds`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {suggestedTags.map((tag) => (
          <li key={tag.id} onClick={() => handleDispatch(tag)}>
            {tag.webTitle}
          </li>
        ))}
      </div>
    </div>
  );
}

export default Search;
