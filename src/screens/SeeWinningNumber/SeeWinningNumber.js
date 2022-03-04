import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../../shared/Api/shared-service';
import "./SeeWinningNumber.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import moment from 'moment';

export  function SeeWinningNumber(){
    const instance = axios.create({
        baseURL: 'https://gwtech-node-app.herokuapp.com',
        headers: {
            Accept: "application/json",
            'content-type':'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A`
        },
    });
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin
    const myToastDanger = useRef(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [fromDate, setFromDate] = useState();
    const [ToDate, setToDate] = useState();
    const [LotteryType, setLotteryType] = useState();
    const [ticketDelID, setDeleteTicketId] = useState();
    const [filteredTickets, setFilteredTickets] = useState();
    const [WinningNumber, setWinningNumber] = useState(false);
    const [WinningNumberInfo, setWinningNumberInfo] = useState(false);

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }

    useEffect(() => {
        instance.get(`/api/winning-number`).then((response) => {
            console.log("Here is my response", response.data);
            setWinningNumber(response.data);
          })
    }, [WinningNumber]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;




    const onHide2 = (name) => {
        dialogFuncMap[`${name}`](false);
        window.location.href = "/conncted-users"

    }



    const handleSubmit= (e) => {
        console.log(`Here is my lottery type ${LotteryType} && ${fromDate} && ${ToDate}`);
        e.preventDefault();
        const d1 = new Date(`${fromDate}`),
      d2 = new Date(`${ToDate}`),
      diff = (d2-d1)/864e5,
      dateFormat = { year: "numeric",month:'numeric',day:'numeric', weekday:'long',},
      dates = Array.from(
        {length: diff+1},
        (_,i) => {
          const date = new Date() 
          date.setDate(d1.getDate()+i) 
          const [weekdayStr, dateStr] = date.toLocaleDateString('en-US',dateFormat).split(', ')
          return `${dateStr} ${weekdayStr}`
        }
      )
     let my_final_dislayArray = [];
     let myFilterDate = dates.filter((fetch_Date)=>{
        let myConvertedDate = []
        myConvertedDate = fetch_Date.split(" ")[0].replace("/","-").replace("/","-");
         console.log(`Here is my converted date ${myConvertedDate}`);
         WinningNumber.filter((filterTicket) => {
            console.log("Comparison: ", moment(filterTicket.date).format("YYYY-MM-DD") +" && "+  moment(myConvertedDate).format("YYYY-MM-DD"));

            if( moment(filterTicket.date).format("YYYY-MM-DD") == moment(myConvertedDate).format("YYYY-MM-DD") && filterTicket.kind == LotteryType){
                // alert("You have already sold a ticket on this date"+ filterTicket.date_time);
                my_final_dislayArray.push(filterTicket);
                setFilteredTickets(my_final_dislayArray);
                myToastDanger.current.show({severity: "success", summary: "Success Message", detail: "Winning number found in the following date range."});   
                dialogFuncMap[`displayBasic`](false);
            }
          if( moment(filterTicket.date).format("YYYY-MM-DD") != moment(myConvertedDate).format("YYYY-MM-DD")){
                myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "No Winning number found in the following date range."});   
                dialogFuncMap[`displayBasic`](false);
            }
            return;
        })
         return;
    })
    console.log("myFilterDate", myFilterDate);
      }

      const verifiedBodyTemplate = (rowData) => {
        return(
         <a>{rowData.date.split("T")[0]}</a>
        );
    }

    const verifiedBodyTemplate2 = (rowData) => {
        return(
         <a>{rowData?.l3c + " " + rowData?.second + " " + rowData?.third}</a>
        );
    }

    useEffect(() => {
        dialogFuncMap[`displayBasic`](true);
    } , [])


    return (
      <>
      <Toast ref={myToastDanger}></Toast>
      <CEOSidebar />
        <div id="wrapper" style={{marginTop:"-11px"}}>
        <div className='RA-13-rw-tp'>
                <div>
                    <div className='row'>
                    <div className='col-md-6'>
                    <h1 className='RA-13-heading-data-table'>See Winning Number</h1>
                    <a className='RA-13-bread-crumb'>Lottery / Winning Number</a>
                    </div>
                    </div>
                </div>    
                {
                    filteredTickets != "" && filteredTickets != undefined ?
                    <DataTable value={filteredTickets}  responsiveLayout="scroll" stripedRows className="mt-4"
                   >
                    <Column body={verifiedBodyTemplate} header="Date" sortable className="RA-13-datatable-p"></Column>
                    <Column field="kind" header="Kind" sortable className="RA-13-datatable-p"></Column>
                    <Column body={verifiedBodyTemplate2} header="Numbers" sortable className="RA-13-datatable-p"></Column>
                </DataTable>
                : ""

                }                     
                       
                </div>
        </div>

        <Dialog header="Verify Selling Report" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => onHide2('displayBasic')}>

        <form onSubmit={e => { handleSubmit(e) }} style={{padding: "10px"}}>
                            {/* <h1 className='RA-13-add-user-sidebar RA-13-form-heading'> Verify Selling Tickets</h1> */}
                            <br />
                            <div className='form-group'> 
                                <label htmlFor="title"><b>From</b></label> <br /> 
                                <input className='form-control' type="date" onChange={e => setFromDate(e.target.value)} style={{width: "100%"}}/>
                        </div>
                            <div className='form-group'> 
                                <label htmlFor="title"><b>To</b></label> <br /> 
                                <input className='form-control' type="date" onChange={e => setToDate(e.target.value)} style={{width: "100%"}}/>
                        </div>
                        <br />
                           <div className='form-group'>
                           <label htmlFor="title"><b>Lottery Type</b></label> <br /> 
                            <select className='form-control' onChange={e => setLotteryType(e.target.value)} style={{width: "100%"}}>
                                    <option value=""></option>
                                    <option value="MIDI">ALL</option>
                                    <option value="MIDI">MIDI</option>
                                    <option value="NY">NY</option>
                                    <option value="FL">FL</option>
                                    <option value="FL SOIR">FL SOIR</option>
                            </select>
                           </div>
                            
                         
                        <br />
                        <div className='float-right'>
                        <button className='RA-13-btn'>Rechercher</button>
                        </div>
                </form>
       </Dialog>
      </>
        
    );
}

