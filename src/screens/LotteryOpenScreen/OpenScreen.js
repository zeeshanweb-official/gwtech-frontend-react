import React, { useEffect, useRef, useState} from 'react';
import "./OpenScreen.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import axios from "axios";


export function LotteryOpeningScreen(){
    const instance = axios.create({
        baseURL: 'https://gwtech-node-app.herokuapp.com',
        headers: {
            Accept: "application/json",
            'content-type':'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A`
        },
    });



    const myToastDanger = useRef(null);
    const [openingClosingTime,SetOpeningClosingTime] = useState(null);
    useEffect(() => {
        instance.get("/api/opening-closing-lottery").then((response) => {
            console.log("Here is my response", response.data);
            SetOpeningClosingTime(response.data);
          })

    }, []);
  const handleSubmit= (e) => {
        e.preventDefault();
        instance.put(`/api/opening-closing-lottery/${openingClosingTime[0]._id}`, {
            MIDIlotteryStartTime: e.target.MIDIlotteryStartTime.value,
            MIDIlotteryEndTime: e.target.MIDIlotteryEndTime.value,
            MIDIlotteryStartDate: new Date(),
            MIDIlotteryEndDate: new Date(),
       
            NYlotteryStartTime: e.target.NYlotteryStartTime.value,
            NYlotteryEndTime: e.target.NYlotteryEndTime.value,
            NYlotteryStartDate: new Date(),
            NYlotteryEndDate: new Date(),
           
            FLMIDIlotteryStartTime: e.target.FLMIDIlotteryStartTime.value,
            FLMIDIlotteryEndTime: e.target.FLMIDIlotteryEndTime.value,
            FLMIDIlotteryStartDate: new Date(),
            FLMIDIlotteryEndDate: new Date(),
       
            FLSOIRlotteryStartTime: e.target.FLSOIRlotteryStartTime.value,
            FLSOIRlotteryEndTime: e.target.FLSOIRlotteryEndTime.value,
            FLSOIRlotteryStartDate: new Date(),
            FLSOIRlotteryEndDate: new Date(),
            lotteryTimezone: "UTC/GMT -5:00",

            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
        })   
        myToastDanger.current.show({severity: "success", summary: "Success Message", detail: "Data Added Sucessfully"});
   
      }
    return (
      <>
      <Toast ref={myToastDanger}></Toast>
      <CEOSidebar />
        <div id="wrapper" style={{marginTop:"-11px"}}>
        <div className='RA-13-rw-tp'>
                <div>
                    <div className='row'>
                    <div className='col-md-6'>
                    <h1 className='RA-13-heading-data-table'>Lottery Opening</h1>
                    <a className='RA-13-bread-crumb'>Lottery / Opening-Closing</a>
                    </div>
                    <div className='col-md-6'>
                    <div className='float-right'>
                    </div>
                    </div>
                    </div>

                  <form onSubmit={e => { handleSubmit(e) }}>
                  <table>
                        <tr>
                            <th>Lottery Type</th>
                            {/* <th>Start Date</th> */}
                            <th>Start Time</th>
                            {/* <th>End Date</th> */}
                            <th>End Time</th>
                        </tr>
                        <tr>
                            <td>MIDI</td>
                            
                            {/* <td>
                            <input type="date" defaultValue={openingClosingTime != undefined ? openingClosingTime : ""} name="MIDIlotteryStartDate" className='form-control'/>
                            </td> */}
                            
                        <td>
                            <input type="time" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].MIDIlotteryStartTime : ""} name="MIDIlotteryStartTime"className='form-control'/>
                        </td>
                        
                            {/* <td>
                            <input type="date" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].MIDIlotteryEndDate.split("T")[0]: ""} name="MIDIlotteryEndDate"className='form-control'/>
                            </td> */}
                            
                        <td>
                            <input type="time" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].MIDIlotteryEndTime: ""} name="MIDIlotteryEndTime"className='form-control'/>
                        </td>
                            
                        </tr>
                        <tr>
                            <td>NY</td>
                            
                            {/* <td>
                            <input type="date" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].NYlotteryStartDate.split("T")[0]: ""} name="NYlotteryStartDate"className='form-control'/>
                            </td> */}
                            
                        <td>
                            <input type="time" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].NYlotteryStartTime: ""} name="NYlotteryStartTime"className='form-control'/>
                        </td>
                        
                            {/* <td>
                            <input type="date" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].NYlotteryEndDate.split("T")[0]: ""} name="NYlotteryEndDate"className='form-control'/>
                            </td> */}
                            
                        <td>
                            <input type="time" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].NYlotteryEndTime: ""} name="NYlotteryEndTime"className='form-control'/>
                        </td>
                        </tr>
                        <tr>
                            <td>FLMIDI</td>
                            
                            {/* <td>
                            <input type="date" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].FLMIDIlotteryStartDate.split("T")[0]: ""} name="FLMIDIlotteryStartDate"className='form-control'/>
                            </td> */}
                            
                        <td>
                            <input type="time" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].FLMIDIlotteryStartTime : ""} name="FLMIDIlotteryStartTime"className='form-control'/>
                        </td>
                        
                            {/* <td>
                            <input type="date" 
                            defaultValue={openingClosingTime != undefined ? openingClosingTime[0].FLMIDIlotteryEndDate.split("T")[0] : ""} name="FLMIDIlotteryEndDate"className='form-control'/>
                            </td> */}
                            
                        <td>
                            <input type="time" defaultValue={openingClosingTime != undefined ? openingClosingTime[0].FLMIDIlotteryEndTime : ""} name="FLMIDIlotteryEndTime"className='form-control'/>
                        </td>
                        </tr>
                        <tr>
                            <td>FLSOIR</td>
                            
                            {/* <td>
                            <input type="date"  
                            defaultValue={openingClosingTime != undefined ? openingClosingTime[0].FLSOIRlotteryStartDate : ""}  name="FLSOIRlotteryStartDate"className='form-control'/>
                            </td> */}
                            
                        <td>
                            <input type="time"  defaultValue={openingClosingTime != undefined ? openingClosingTime[0].FLSOIRlotteryStartTime : ""}  name="FLSOIRlotteryStartTime"className='form-control'/>
                        </td>
                        
                            {/* <td>
                            <input type="date"  defaultValue={openingClosingTime != undefined ? openingClosingTime[0].FLSOIRlotteryEndDate : ""}  name="FLSOIRlotteryEndDate"className='form-control'/>
                            </td>
                             */}
                        <td>
                            <input type="time"  defaultValue={openingClosingTime != undefined ? openingClosingTime[0].FLSOIRlotteryEndTime : ""}  name="FLSOIRlotteryEndTime"className='form-control'/>
                        </td>
                        </tr>
                        </table>
                        <div className='float-right'>
                          <button>Save</button>
                        </div>
                  </form>


                </div>
                      
                </div>
        </div>
            

      
      </>
        
    );
}

