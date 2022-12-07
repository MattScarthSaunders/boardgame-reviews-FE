import { useContext } from "react";

const ReviewFilter = ({ setSortValues }) => {
  const [selectValue, setSelectValue] = useContext("");
  const [orderValue, setOrderValue] = useContext("desc");

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

  const handleSubmit = () => {
    setSortValues((currValues) => {
      let newValues = { ...currValues };
      newValues.sort_by = selectValue;
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
      </form>
      {/* pagination can go here */}
    </>
  );
};

export default ReviewFilter;
