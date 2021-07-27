import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import XLSX from "xlsx";
import { initApplicationsAC } from "../../utils/redux/actionCreators";
import { base64 } from "../ApplicationProfile/pdfLogo";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Application({ el }) {
  const dispatch = useDispatch();
    useEffect(()=>{
      fetch('/admin/applications')
      .then(response => response.json())
      .then(applications => dispatch(initApplicationsAC(applications.applications)))
    },[dispatch])
  const date = new Date(el.date);
  const value = el.goods.reduce((acc, el) => {
    return acc + el.value * el.good?.price;
  }, 0);
  function makePDF() {
    const docDefinition = {
      content: [
        {
          image: `data:image/jpeg;base64,${base64}`
        },
        {
          layout: "lightHorizontalLines",
          table: {
            headerRows: 4,
            widths: [150, 150, 150],
            body: [
              ["продавец", "Солёнка", "тел: +78985232616"],
              ["покупатель:", el.buyer.title, `ИНН:${el.buyer.itn}`],
              ["номер заявки:", el.regnumber, ""],
              ["Товар:", "количество (шт)", "цена (руб)"],
              ...el.goods.map((good) => {
                return [good.title, good.value, good.good.price * good.value];
              }),
              ["", "", "Итог:"],
              ["", "", value],
            ],
          },
        },
      ],
    };
    pdfMake.createPdf(docDefinition).download();
  }
  function makeXLSX() {
    const data = {
      cols: [
        { name: "A", key: 0 },
        { name: "B", key: 1 },
        { name: "C", key: 2 },
      ],
      data: [
        ["id", "Дата заказа", "Наименование", "ИНН", "Номер телефона", "название","количество", "цена","сумма"],
        ...el.goods.map((good, i) => {
          return [i + 1, date, el.buyer.title, el.buyer.itn, el.buyer.phone, good.title,good.value, good.good.price, good.good.price * good.value];
        }),
        ["","","","","","","","",value]
      ],
    };
    var worksheet = XLSX.utils.aoa_to_sheet(data.data);
    var new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");

    XLSX.writeFile(new_workbook, `app_${el.regnumber}.xlsx`, { type: "xlsx" });
  }
  console.log(el);

  return (
    <div className="admingoodsbox">
      <div>
        <div className="fieldpair">
          <div>Номер заказа:</div>
          <div>{el.regnumber}</div>
        </div>
        <div className="fieldpair">
          <div>Заказчик:</div>
          <div>{el.buyer.title}</div>
        </div>
        <div className="fieldpair">
          <div>Дата заказа:</div>

          <div>{`${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`}</div>
        </div>
        <div className="fieldpair">
          <div>Статус заказа:</div>
          <div>{el.isready}</div>
        </div>
      </div>
      <div>
        <Link className="button" to={`/admin/application/${el.regnumber}`}>
          Просмотр заявки
        </Link>
        <button onClick={makePDF}>скачать PDF</button>
        <button onClick={makeXLSX}>скачать XLSX</button>
      </div>
    </div>
  );
}
