const DropdownSelect = ({name, value, setValue, data}) => {
  return ( 
    <div className="selectionWithLabel">
      <label htmlFor={name}>{name}:</label>
      <select name={name} id={name} value={value} onChange={e => setValue(e.target.value)}>
        { Object.keys(data).map((entry, i) => <option value={entry} key={i}>{entry}</option>) }
      </select>
    </div>
  );
}
 
export default DropdownSelect;