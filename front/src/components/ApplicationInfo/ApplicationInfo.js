import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminApplicationView from "../AdminApplicationView/AdminApplicationView";
import { Link } from "react-router-dom";

export default function ApplicationInfo() {
  const { id } = useParams();
  const applications = useSelector((state) => state.adminReducer.applications);
  const application = applications.filter((el) => el.regnumber == id)[0];
  let aplicationGoods;
  let total;
  if (application) {
    aplicationGoods = application.goods;
    total = aplicationGoods.reduce((acc, el) => {
      console.log(el);
      return acc + el.good.price * el.value;
    }, 0);
  }

  const submitApplication = () => {
    fetch(`/admin/application/${id}`, { method: "put" })
      .then((res) => res.json())
      // .then((message) => alert(message.message));
  };

  return (
    <div className="admingoodsbox">
      {application ?
      <><div>
        <div>
          <div><h3>Заявка №{id}</h3></div>
        </div>
        {aplicationGoods.map((el) => (
          <AdminApplicationView key={el.title} el={el} />
        ))}
      </div>
      <div>
        <h3>Общая сумма заявки:<br />{total} руб.</h3>
        <strong>Комментарий к заказу:</strong>
        <div>
          {(application.comment && application.comment.length) ?
            <div className="appcomment">{application.comment}</div> :
            "отсутствует"
          }
        </div>
        {application.isready === "Готовится к отгрузке" ? application.isready : (
          <>
            <Link className="button" to={`/admin/application/edit/${id}`}>
              Редактировать заявку
            </Link>
            <button className="button" onClick={submitApplication}>Одобрить заявку</button>
          </>
        )}
      </div></>: <p>Nothing to show</p>}
    </div>

    // <div style={{position:"absolute", right:"650px", border:"2px solid black", top:"600px"}}>Комментарий к заказу: {application.comment}</div>
  );


}
