import { useEffect, useState } from "react";

const ReviewFilter = ({ setSortValues, sortValues }) => {
  let tempSortValue = sortValues.sort_by;
  if (sortValues.sort_by === "created_at") tempSortValue = "Review Date";
  const [selectValue, setSelectValue] = useState(tempSortValue);
  const [orderValue, setOrderValue] = useState(sortValues.order);

  const sortOptions = [
    "Title",
    "Designer",
    "Category",
    "Review Date",
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
    if (selectValue === "Review Date") checkedSelectValue = "created_at";
    setSortValues((currValues) => {
      let newValues = { ...currValues };
      newValues.sort_by = checkedSelectValue.toLowerCase();
      newValues.order = orderValue;
      return newValues;
    });
  };

  return (
    <>
      <form className="Filtering--Sort--Form" onSubmit={handleSubmit}>
        <label htmlFor="sortSelector">Sort By</label>
        <select id="sortSelector" value={selectValue} onChange={handleSelect}>
          {sortOptions.map((option, index) => {
            return <option key={`${option}${index}`}>{option}</option>;
          })}
        </select>
        <button type="button" onClick={handleOrder} value={orderValue}>
          {orderValue}
        </button>
        <button type="submit">Sort Results</button>
      </form>
    </>
  );
};

export default ReviewFilter;
