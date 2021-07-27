import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import AdminApplicationView from '../AdminApplicationView/AdminApplicationView'
import ApplicationEdit from '../ApplicationEdit/ApplicationEdit'

export default function ApplicationEditList() {
    const {id} = useParams();
    const applications = useSelector((state) => state.adminReducer.applications);
    const application = applications.filter(el => el.regnumber==id)[0]
    console.log(application);
    const aplicationGoods = application.goods
    const goods = useSelector((state) => state.adminReducer.goodsList)
    // console.log(goods);
    let result = [];
    aplicationGoods.forEach(el => {
        let preresult = goods.find(good => good._id == el["good"])
        result.push({...preresult, value: el["value"]})
    })
    let total = result.reduce((acc, el)=>{
        return acc + el.price*el.value}, 0)
    return (
        <div>
            <h2>Заявка номер {id}</h2>
            <ul>
            {result.map(el => <li><ApplicationEdit key={el.title} el={el} /></li>)}
            </ul> 
        </div>
    )
}
