import React  from "react";
import { useSelector } from "react-redux";
import Application from "../Application/Application";

export default function AdminApplicationList() {
  const applicationList = useSelector(
    (state) => state.adminReducer.applications
  );

  return (
    <div>
      {applicationList.length > 0
        ? applicationList.map((el) => (
            <Application key={el.regnumber} el={el} />
          ))
        : "Нет зарегистрированных заявок"}
    </div>
  );
}
