import React, { useState, useEffect } from "react";
import "./App.css";
import datas from "./Jap.json";

function App() {
  const [filtered, setFiltered] = useState([]);
  const [editedItem, setEditedItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemValues, setNewItemValues] = useState({ name: "", age: "" });

  useEffect(() => {
    // Set the filtered data when the component mounts
    setFiltered(datas.data || []);
  }, []);

  function handleEdit(index) {
    const editedItem = filtered[index];
    setEditedItem(editedItem);
    setNewItemValues(editedItem);
  }

  function handleDelete(index) {
    const updatedData = [...filtered];
    updatedData.splice(index, 1);
    setFiltered(updatedData);
  }

  function handleAdd() {
    setIsAdding(true);
  }

  function handleSave() {
    if (editedItem) {
      const updatedData = [...filtered];
      updatedData[filtered.indexOf(editedItem)] = newItemValues;
      setFiltered(updatedData);
      setEditedItem(null);
      setNewItemValues({ name: "", age: "" });
    } else {
      const newItem = { name: newItemValues.name, age: newItemValues.age };
      const updatedData = [...filtered, newItem];
      setFiltered(updatedData);
      setIsAdding(false);
      setNewItemValues({ name: "", age: "" });
    }
  }

  function handleCancel() {
    setEditedItem(null);
    setIsAdding(false);
    setNewItemValues({ name: "", age: "" });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewItemValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return (
    <div className="container bg-dark text-white my-4">
      <div className="row">
        <div className="col-sm">One of three columns</div>
        <div className="col-sm">One of three columns</div>
        <div className="col-sm">One of three columns</div>
      </div>
      {filtered.map((filt, index) => (
        <div className="row" key={index}>
          <div className="col-sm">{filt.name}</div>
          <div className="col-sm">{filt.name}</div>
          <div className="col-sm">{filt.age}</div>
          <div className="col-sm">
            <button onClick={() => handleDelete(index)}>delete</button>
          </div>
          <div className="col-sm">
            <button onClick={() => handleEdit(index)}>edit</button>
          </div>
        </div>
      ))}
      {isAdding || editedItem ? (
        <div className="row">
          <div className="col-sm">
            <input
              type="text"
              name="name"
              value={newItemValues.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </div>
          <div className="col-sm">
            <input
              type="text"
              name="age"
              value={newItemValues.age}
              onChange={handleInputChange}
              placeholder="Enter age"
            />
          </div>
          <div className="col-sm">
            <button onClick={handleSave}>Save</button>
          </div>
          <div className="col-sm">
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm">
            <button onClick={handleAdd}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
