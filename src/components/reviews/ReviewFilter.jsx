import { useContext, useState } from "react";
import { VisualModeContext } from "../_context/VisualModeContext";

const ReviewFilter = ({ setSortValues, sortValues }) => {
  //visual mode
  const { mode } = useContext(VisualModeContext);
  //component

  let tempSortValue = sortValues.sort_by;
  if (sortValues.sort_by === "created_at") tempSortValue = "Posted";
  if (sortValues.sort_by === "comment_count") tempSortValue = "Comments";

  const [selectValue, setSelectValue] = useState(tempSortValue);
  const [orderValue, setOrderValue] = useState(sortValues.order);

  const sortOptions = [
    "Title",
    "Designer",
    "Category",
    "Posted",
    "Votes",
    "Comments",
  ];

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const handleOrder = (e) => {
    e.target.value === "desc" ? setOrderValue("asc") : setOrderValue("desc");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let checkedSelectValue = selectValue;
    if (selectValue === "Posted") checkedSelectValue = "created_at";
    if (selectValue === "Comments") checkedSelectValue = "comment_count";

    setSortValues((currValues) => {
      let newValues = { ...currValues };
      newValues.sort_by = checkedSelectValue.toLowerCase();
      newValues.order = orderValue;
      return newValues;
    });
  };

  return (
    <>
      <form className={`Filtering--Sort--Form ${mode}`} onSubmit={handleSubmit}>
        <label htmlFor="sortSelector">Sort By:</label>
        <select id="sortSelector" value={selectValue} onChange={handleSelect}>
          {sortOptions.map((option, index) => {
            return <option key={`${option}${index}`}>{option}</option>;
          })}
        </select>
        <button
          id="sortOrderButton"
          type="button"
          onClick={handleOrder}
          value={orderValue}
          aria-label="sort order"
        >
          {orderValue}
        </button>
        <button type="submit">Sort Results</button>
      </form>
    </>
  );
};

export default ReviewFilter;
