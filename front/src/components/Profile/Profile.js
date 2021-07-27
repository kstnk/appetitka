import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initAgentApplicationsAC } from '../../utils/redux/actionCreators';
import ApplicationProfile from '../ApplicationProfile/ApplicationProfile';

export default function Profile() {

  const applicationsState = useSelector(state => state.agentReducer.applications.applications);

  const agentName = useSelector(state => state.agentReducer.currentUser);
  
  const dispatch = useDispatch()
  const [agentDetails, setAgentDetails] = useState()

  useEffect(() => {
    fetch(`/agent/getAgentDetails/${agentName}`)
      .then((res) => res.json())
      .then((data) => setAgentDetails(data));
  }, [agentName]);
  useEffect(() => {
    (async() => {
      const responce = await fetch(`/agent/profile/${agentName}`);
        const resultApp = await responce.json();
        console.log('resultApp');  
        if(!responce.message){
          dispatch(initAgentApplicationsAC(resultApp))
        }
    })()
    
  }, [dispatch,agentName,applicationsState])
  return (
    <div>
      <b>Компания:</b> {agentDetails && agentDetails.title}<br />
      <b>Телефон:</b> {agentDetails && agentDetails.phone}<br />
      <b>ИНН:</b> {agentDetails && agentDetails.itn}<br />
      {applicationsState ?
        applicationsState.map(el => <ApplicationProfile key={el._id} el={el} />) : 'заявок нет'}
    </div>
  );
}

