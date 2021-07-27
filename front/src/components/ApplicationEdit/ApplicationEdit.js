import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GoodsEditByAdmin from "../GoodsEditByAdmin/GoodsEditByAdmin";
import GoodsList from "../GoodsList/GoodsList";
export default function ApplicationEdit() {

    const [Goods, setGoods] = useState(true);
    const {id} = useParams();
    const goodsDiv = useRef();
    const applications = useSelector(state => state.adminReducer.applications)
    const application = applications.find(el => el.regnumber===+id)
    let aplicationGoods
    if (application){ 
        aplicationGoods = application.goods
    }
    useEffect(()=>{
        setGoods(true)
    }, [application])
    const handlerDeleteApp = ()=>{
        fetch(`/admin/application/${id}`, {method:"delete"})
    }
    const handlerSubmitApp = ()=>{
        fetch(`/admin/application/${id}`, {
            method:"put", 
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({goods:aplicationGoods})
        })
    }




  const handlerAddToApplication = () => {
    setGoods(false);
  };

  return (
    <>
      {application ? (
        Goods ? (
          <>
            <div className="admingoodsbox">
              <div>
                {aplicationGoods.map((el) => (
                  <GoodsEditByAdmin key={el.title} el={el} />
                ))}
              </div>
              <div>
                <button onClick={handlerAddToApplication}>
                  Добавить товар в заявку
                </button>
                <Link
                  to="/admin/applicationlist"
                  className="button"
                  onClick={handlerDeleteApp}
                >
                  Удалить заявку
                </Link>
                <Link
                  to="/admin/applicationlist"
                  className="button"
                  onClick={handlerSubmitApp}
                >
                  Подвердить заявку
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div ref={goodsDiv}>
            <GoodsList />
          </div>
        )
      ) : (
        <p>Nothing to show</p>
      )}
    </>
  );
}
