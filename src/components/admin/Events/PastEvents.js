import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import "../../../style/component/admin/events/live-events.css"
import { eventList } from "../json/eventList";

export const PastEvents = () => {
  const [listOfReceiver, setListOfReceiver] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await devitrackApi.get("/receiver/receiver-pool-list");
      if (response) {
        setListOfReceiver(response.data.receiversInventory);
      }
    };
    return () => {
      callApi();
    };
  }, []);

  const array = {}
  for (let data of eventList){
    if(!array[data.name]){
      return array[data.name] = data
    }
  }
  console.log("checking", array)
  
  const currentDate = new Date();

  return (
    <div className="container-live-events">
      <h5>Past Events</h5>
      <table className="table">
        <thead>
          <tr style={{borderBottom:"transparant", marginBottom:"5px"}}>
            <th scope="col">EVENT NAME</th>
            <th scope="col">EVENT LOCATION</th>
            <th scope="col">DEVICES AMOUNT</th>
          </tr>
        </thead>
        <tbody>
        {eventList.map((location) => {
          let arrayToCheck = []
          for( let data of listOfReceiver ){
            if(location.name === data.eventSelected){
              arrayToCheck.push(data)
            }
          }
            if (
              location.scheduleBeging >= currentDate &&
              location.scheduleEnd <= currentDate
            ) {
              return (
                <tr
                  style={{
                    cursor: "pointer",
                  }}
                  onClick
                >
                  <td>{location.name}</td>
                  <td>{location.location}</td>
                  <td>{arrayToCheck.length}</td>
                </tr>
              );
            }
            return null;
          })}
      
        </tbody>
      </table>
    </div>
  );
};