import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestGoodsAC } from '../../utils/redux/actionCreators';
import AdminGood from '../AdminGood/AdminGood';

function AdminGoodsList() {

  const goodsList = useSelector((state) => state.adminReducer.goodsList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/admin/goodslist')
      .then(response => response.json())
      .then(goods => dispatch(requestGoodsAC(goods.goods)))
  }, [dispatch])

  return (
    <div>
      {goodsList && goodsList.map(el => <AdminGood key={el.title} el={el} />)}
    </div>
  );
}

export default AdminGoodsList;
