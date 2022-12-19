import React from "react";
import {} from "react-icons";
import List from "./List";
import Alert from "./Alert";

const App = () => {
  const [item, setItem] = React.useState("");
  const [list, setList] = React.useState([]);
  const [isEdited, setIsEdited] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [alert, setAlert] = React.useState({
    show: true,
    msg: "",
    type: "",
  });

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!item) {
      showAlert(true, "danger", "Please, enter a correct value");
    } else if (item && isEdited) {
      setList(
        list.map((listItem) => {
          if (listItem.id === editId) return { ...listItem, title: item };
          else return listItem;
        })
      );
      setEditId(null);
      setIsEdited(false);
      setItem("");
      showAlert(true, "success", "Item changed");
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: item,
        done: false,
      };
      setList([...list, newItem]);
      setItem("");
      showAlert(true, "success", "New item added");
    }
  };

  const clearBtnHandler = (e) => {
    e.preventDefault();
    setList(list.filter((listItem) => listItem.done === false));
    showAlert(true, "danger", "Marked items cleared");
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const thisItem = list.find((item) => item.id === id);
    setIsEdited(true);
    setEditId(id);
    setItem(thisItem.title);
  };

  const markItem = (id) => {
    setList(
      list.map((listItem) => {
        if (listItem.id === id) return { ...listItem, done: !listItem.done };
        else return listItem;
      })
    );
    showAlert(true, "success", "Item status changed");
  };

  return (
    <section className="section-center">
      <form className="item-form" onSubmit={submitFormHandler}>
        {alert.show && <Alert {...alert} items={list} clearAlert={showAlert} />}
        <h3>Shopping list</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. bread"
            name="item"
            id="item"
            value={item}
            onChange={(e) => {
              setItem(e.target.value.trim());
            }}
          />
          <button type="submit" className="submit-btn">
            {isEdited ? "Change item" : "Add item"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="list-container">
          <List
            items={list}
            removeItem={removeItem}
            editItem={editItem}
            markItem={markItem}
          />
          <button className="clear-btn" onClick={clearBtnHandler}>
            Clear marked items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
