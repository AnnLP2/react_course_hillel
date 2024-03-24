import { useState, useEffect } from "react";
import { list as service } from "../../services/list";
import "./style.sass";

export default function ListTransfer() {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await service.get();
      setList1(response.slice(0, 10));
    })();
  }, []);

  const transferFirstToRight = () => {
    if (list1.length > 0) {
      const selectedItem = list1[0];
      const newList1 = list1.slice(1);
      setList1(newList1);
      setList2([selectedItem, ...list2]);
    }
  };

  const transferFirstToLeft = () => {
    if (list2.length > 0) {
      const selectedItem = list2[0];
      const newList2 = list2.slice(1);
      setList2(newList2);
      setList1([selectedItem, ...list1]);
    }
  };

  const transferSecondToRight = () => {
    if (list2.length > 0) {
      const selectedItem = list2[0];
      const newList2 = list2.slice(1);
      setList2(newList2);
      setList3([selectedItem, ...list3]);
    }
  };

  const removeLastItem = async () => {
    try {
      const lastItemId = list3[list3.length - 1].id;
      await service.delete(lastItemId);
      setList3((prevState) => prevState.slice(0, -1));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="list">
        {list1.length > 0 ? (
          <>
            <ul>
              {list1.map((item, index) => (
                <li key={index}>{item.title}</li>
              ))}
            </ul>
            <button onClick={transferFirstToRight}>
              Transfer first to right
            </button>
          </>
        ) : null}
      </div>
      <div className="list">
        {list2.length > 0 ? (
          <>
            <ul>
              {list2.map((item, index) => (
                <li key={index}>{item.title}</li>
              ))}
            </ul>
            <div>
              <button onClick={transferFirstToLeft}>
                Transfer first to left
              </button>
              <button onClick={transferSecondToRight}>
                Transfer second to right
              </button>
            </div>
          </>
        ) : null}
      </div>
      <div className="list">
        {list3.length > 0 ? (
          <>
            <ul>
              {list3.map((item, index) => (
                <li key={index}>{item.title}</li>
              ))}
            </ul>
            <button onClick={removeLastItem}>Remove last item</button>
          </>
        ) : null}
      </div>
    </div>
  );
}
