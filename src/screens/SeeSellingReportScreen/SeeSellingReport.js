import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../../shared/Api/shared-service';
import "./SeeSellingReport.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import moment from 'moment';

export  function VerifySellingReport(){
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
    const [visible, setAdminUserSidebar] = useState(false);
    const [connection, setConnectionUser] = useState([]);
    const [token, setToken] = useState([]);
    const customerService = new CustomerService();
    const myToastDanger = useRef(null);
    const [adminId, setAdminID] = useState();
    const [adminData, setAdminData] = useState([]);
    const [tickets, setTicketsData] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayBasic3, setDisplayBasic3] = useState(false);
    const [position, setPosition] = useState('center');
    const [ticketSum, setTicketSum] = useState();
    const [filterTicketSum, setFilterTicketSum] = useState();
    const [filterTicket, setFilterTicket] = useState();
    const [fromDate, setFromDate] = useState();
    const [ToDate, setToDate] = useState();
    const [LotteryType, setLotteryType] = useState();
    const [ticketDelID, setDeleteTicketId] = useState();
    const [filterBaseOnDateType, setFilteredBaseRecord] = useState();
    const [filterOnId, setFilteredOnId] = useState();
    const [filteredTickets, setFilteredTickets] = useState();
    const [ticketSale, setTicketTotalSale] = useState();
    const [winningNumber, setWinningNumber] = useState();
    const [WinningNumberInfo, setWinningNumberInfo] = useState();


    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayBasic3': setDisplayBasic3,
    }

    useEffect(() => {

        instance.get(`/api/winning-number`).then((response) => {
            console.log("Here is my response win", response.data);
            setWinningNumberInfo(response.data);
          })

        instance.get("/api/users").then((response) => {
            console.log("Here is my response", response.data);
            let filterResults = response.data.filter((x)=>{
                return x.isSecondAdmin == true
             })
            setAdminData(filterResults);
          })

        instance.get(`/api/connection`).then((response) => {
            console.log("Here is my response", response.data);
            let conUser = response.data.filter((x)=>{
            return x?.secondAdmin?._id === userInfo._id
            })
            setConnectionUser(conUser);
          })

        instance.get(`/api/ticket`).then((response) => {
            console.log("Here is my ticket api: ", JSON.parse(response.data[0].Data));

        let filterCompanyTickets = response.data.filter((x)=>{
            return x.company_name === userInfo.name 
        })
        setTicketTotalSale(response.data);
        const uniqueArray = filterCompanyTickets.filter((v,i,a)=>a.findIndex(t=>( t.user_id == v.user_id))==i)

        console.log("Company Filtered Data: ", uniqueArray);
            setTicketsData(uniqueArray);
          })
    }, [tickets,WinningNumberInfo]);

    useEffect(() => {
        dialogFuncMap[`displayBasic`](true);
    } , [])

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const addSecondAdminUser = (id) => {
        setAdminID(id)  
        setAdminUserSidebar(true); 
     }

     
    const succesRecord = () => {   
        setAdminUserSidebar(false); 
        myToastDanger.current.show({severity: "success", summary: "Success Message", detail: "Successfully"});
     }


     const deleteUser = (severityValue, summaryValue, detailValue, id) => {   
        instance
        .delete(`/api/connection/${id}`, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
        })
        .then((response) => {
            myToastDanger.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});   
        });
      }

      useEffect(() => {
        instance.get("/api/users").then((response) => {
            console.log("Here is my response", response.data);
            let filterResults = response.data.filter((x)=>{
                return x.isSecondAdmin == true
             })
            setAdminData(filterResults);
          })

        instance.get(`/api/connection`).then((response) => {
            console.log("Here is my response", response.data);
            setConnectionUser(response.data);
          })
    }, [])


    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const onHide2 = (name) => {
        dialogFuncMap[`${name}`](false);
        window.location.href = "/conncted-users"

    }

    const renderFooter = (name) => {
        return (
            <div>
                {/* <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" /> */}
                {/* <Button label="close" icon="pi pi-check" onClick={() => onHide(name)} autoFocus /> */}
            </div>
        );
    }
     const filterData = (e) =>{
     console.log("filterData", e);
     setDeleteTicketId(e);
     let filterTickets = tickets.filter((ticket_id,index)=>{
         let userId = e;
        return ticket_id.user_id == userId;
     })
     setFilteredOnId(filterTickets);
     setFilterTicketSum(filterTickets[0].mega_total);
     console.log("filterTickets", filterTickets);
    }

     const filterDataDetail = (e) =>{
     console.log("filterData", e);
     setDeleteTicketId(e);
     let filterTickets = tickets.filter((ticket_id,index)=>{
         let ticketid = e;
        return ticket_id._id == ticketid;
     })
     setFilterTicket(filterTickets);
     setFilterTicketSum(filterTickets[0].sum);
     console.log("filterTickets", filterTickets);
    }

    const handleSubmit= (e) => {
        console.log("Here is my Winning Num: ", WinningNumberInfo);
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
     let winningnum_arr = [];
     let myFilterDate = dates.filter((fetch_Date)=>{
        let myConvertedDate = []
        myConvertedDate = fetch_Date.split(" ")[0].replace("/","-").replace("/","-");
         console.log(`Here is my converted date ${myConvertedDate}`);
        tickets.filter((filterTicket) => {
            console.log("Comparison: ", filterTicket.date_time.split(" ")[0] +" && "+ myConvertedDate);
       if(filterTicket.date_time.split(" ")[0] == moment(myConvertedDate).format("YYYY-MM-DD") && filterTicket.lottery == LotteryType){
                // alert("You have already sold a ticket on this date"+ filterTicket.date_time);
                console.log("Filtered Tickets: ", filterTicket);

                my_final_dislayArray.push(filterTicket);
                setFilteredTickets(my_final_dislayArray);
                myToastDanger.current.show({severity: "success", summary: "Success Message", detail: "Report is found in the following date range."});   
                dialogFuncMap[`displayBasic`](false);
            }
          if( filterTicket.date_time.split(" ")[0] != moment(myConvertedDate).format("YYYY-MM-DD")){
                myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "No report is found in the following date range."});   
                dialogFuncMap[`displayBasic`](false);
            }
            return;
        })
        WinningNumberInfo.filter((winningnum)=>{
            console.log("Comparison Winning: ", moment(winningnum.date).format("YYYY-MM-DD") +" && "+  moment(myConvertedDate).format("YYYY-MM-DD")); 
            if(moment(winningnum.date).format("YYYY-MM-DD") == moment(myConvertedDate).format("YYYY-MM-DD") && winningnum.kind == LotteryType){
                winningnum_arr.push(winningnum);
                setWinningNumber(winningnum_arr);
                myToastDanger.current.show({severity: "success", summary: "Success Message", detail: "Winning number found in the following date range."});
            }
            console.log("Filtered Winning Num: ", winningnum_arr);
            return winningnum_arr;
        })
    })
    console.log("myFilterDate", myFilterDate);
      }
 
    const verifiedBodyTemplate = (rowData) => {
        console.log("rowData", rowData);
        let parseConData = ticketSale.filter((x)=>{
            return x.user_id === rowData.user_id
        });
        console.log("Parse Arr: ", parseConData);
        let sum = 0;
        for(let i=0; i < parseConData.length; i++){
            sum += parseInt(parseConData[i].sum);       
        }
        console.log(`Here is my sum: ${sum}`);       
        return(
       <div>
          {sum}
       </div>
        );
    }
    const verifiedBodyTemplate2 = (rowData) => {
        if( winningNumber.length != 0){
            console.log("rowData Winning Number", winningNumber[0]);
            return(
                <div>
                   {winningNumber[0].l3c} 
                </div>
                 );
        }
       
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
                    <h1 className='RA-13-heading-data-table'>Verify Selling Report</h1>
                    {
                        filteredTickets != "" && filteredTickets != undefined ?  
                      <>
                     <main>
                     <a className='RA-13-bread-crumb'>GW Center</a>
                        <p>From: {fromDate} To: {ToDate} | {LotteryType}</p>
                         <p>Entity: User</p>
                     </main>
                      </>
                     : ""
                   }
                    </div>
                    <div className='col-md-6'>
                    {
                        filteredTickets != "" && filteredTickets != undefined ?  
                      <>
                     <main>
                     <div className='float-right'>
                         <p>{ToDate}</p>
                         <p>{moment(ToDate).format('h:mm:ss')}</p>
                        
                     </div>
                     </main>
                      </>
                     : ""
                   }
                    </div>
                    </div>
                </div>     
                {
                    filteredTickets != "" && filteredTickets != undefined ?
                    <DataTable value={filteredTickets}  responsiveLayout="scroll" stripedRows className="mt-4">
                    <Column header="Users ID" body={(data, props) => props.rowIndex + 1}></Column>
                    <Column body={verifiedBodyTemplate} header="Total Sale" sortable className="RA-13-datatable-p"></Column>
                    <Column body={verifiedBodyTemplate2} header=" Total paid" sortable className="RA-13-datatable-p"></Column>
                    <Column field="company_name" header=" Total Result" sortable className="RA-13-datatable-p"></Column>
                </DataTable>
                : ""

                }                     
                       
                </div>
        </div>

        <Dialog header="Selling Report" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide2('displayBasic')}>

        <form  style={{padding: "10px"}}>
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
                        <button className='RA-13-btn' onClick={e => {handleSubmit(e)}}>Rechercher</button>
                        </div>
                </form>
       </Dialog>
      </>
        
    );
}

