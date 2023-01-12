import React from 'react'

export const PastEvents = () => {
    return (
        <div className="container-live-events">
          <h5>Pasts Events</h5>
          <table className="table">
            <thead>
              <tr style={{borderBottom:"transparant", marginBottom:"5px"}}>
                <th scope="col">EVENT NAME</th>
                <th scope="col">EVENT LOCATION</th>
                <th scope="col">DEVICES AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>National Retail Conference</td>
                <td>New York, New York</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    };
