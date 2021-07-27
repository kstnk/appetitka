import React from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { base64 } from './pdfLogo';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



export default function ApplicationProfile({ el }) {
  const value = el.goods.reduce((acc, el) => {
    return acc + el.value * el.good.price;
  }, 0);
  function makePDF() {
    console.log('123');
    const docDefinition = {
      content: [
        {
          image: `data:image/jpeg;base64,${base64}`
        },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 4,
            widths: [150, 150, 150],
            body: [
              // [{text: 'продавец:', style: 'header'} , 'Аппетикино', 'тел: +78985232616'],
              [{text:'покупатель:', style: 'header'}, el.buyer.title, `ИНН:${el.buyer.itn}`,],
              ['номер заявки:', el.regnumber, '',],
              [' ', ' ', ' '],
              ['Товар:', 'количество (шт)', 'цена (руб)'],
              ...el.goods.map((good) => {
                return [good.title, good.value, good.good.price * good.value];
              }),
              ['', '', 'Итог:'],
              ['', '', value]
            ]
          }
        }
      ],
      styles: {
        header: {
          bold: true
        },
      }
    };
    pdfMake.createPdf(docDefinition).download();
  }
  return (
    <>
    <div className="admingoodsbox">
      <div>
        <div>
          <div><h3>Заявка №{el.regnumber}</h3></div>
        </div>
        {el.goods.map((el) => (
          <div>
            <div className="fieldpair applicationpair">
              <div style={{width: "60%"}}>{el.title}</div>
              <div style={{width: "40%"}}>{el.value} шт.</div>
            </div>
          </div>
        ))}
      </div>
      <div className="verticalmid">
        <button onClick={makePDF}>заявка в PDF</button>
      </div>
    </div>
  </>
  );
}
