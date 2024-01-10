const Dropdown = ({ datalist, selectOption, setSelectOption}) => {

    const handleOptionChange = (event) => {
        setSelectOption(event.target.value);
      };


  return (
    <div className=" flex-col w-full h-full text-sm">
      <p>Filter by Artist</p>
      
      <select value={selectOption} onChange={handleOptionChange}>
        <option value="">Select</option>
        {datalist.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
