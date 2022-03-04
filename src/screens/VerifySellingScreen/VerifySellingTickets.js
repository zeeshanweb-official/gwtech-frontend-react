import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../../shared/Api/shared-service';
import "./VerifySellingTickets.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';

export  function VerifySellingTickets(){
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
    const [chooseDate, setDate] = useState();
    const [LotteryType, setLotteryType] = useState();
    const [ticketDelID, setDeleteTicketId] = useState();
    const [filterBaseOnDateType, setFilteredBaseRecord] = useState();
    const [filterOnId, setFilteredOnId] = useState();

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayBasic3': setDisplayBasic3,
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
            let conUser = response.data.filter((x)=>{
            return x?.secondAdmin?._id === userInfo._id
            })
            setConnectionUser(conUser);
          })

        instance.get(`/api/ticket`).then((response) => {
            console.log("Here is my ticket api: ", response.data);
           let filterCompanyTickets = response.data.filter((x)=>{
               return x.company_name === userInfo.name
           })
           console.log("Company Filtered Data: ", filterCompanyTickets);
            setTicketsData(filterCompanyTickets);
          })
    }, []);

    useEffect(() => {
        dialogFuncMap[`displayBasic`](true);
    } , [])

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const verifiedBodyTemplate = (rowData) => {
        console.log("rowData", rowData);
        return(
       <div>
           <button className='RA-13-ticket-selling-btn' onClick={() => { filterData(rowData.user_id); onClick('displayBasic2');}} >Tickets</button>
       </div>
        );
    }



    const verifiedBodyTemplate2 = (rowData) => {
        console.log("rowData", rowData);
        return(
       <div>
         <h1>{rowData.rowIndex}</h1>

       </div>
        );
    }

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
     setFilterTicketSum(filterTickets[0].sum);
     console.log("filterTickets", filterTickets);
     let sum = 0;
     for(let i=0; i < filterTickets.length; i++){
         sum += parseInt(filterTickets[i].sum);       
     }
     console.log(`Here is my sum: ${sum}`);
     setTicketSum(sum);
     console.log(`Calculated: ${sum}`);
     
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
     console.log("filterTickets", JSON.parse(filterTickets[0].Data));
    }

    const handleSubmit= (e) => {
          // to remove the duplicate records
          const uniqueArray = tickets.filter((v,i,a)=>a.findIndex(t=>( t.user_id == v.user_id))==i)
        console.log(`Here is my lottery type ${LotteryType} && ${chooseDate}`);
        e.preventDefault();
        let filterOnDate = uniqueArray.filter((ticket_list,index)=>{
            console.log(`Here is ticket list: ${ticket_list}`)
            let ticket_Date = ticket_list.date_time.split(" ")[0];
            let lotter_Type = ticket_list.lottery;
            console.log(`Here is ticket date: ${ticket_Date} && ${lotter_Type}`);
           return ticket_Date == chooseDate && lotter_Type == LotteryType;
        })
        setFilteredBaseRecord(filterOnDate);
        if(filterOnDate == ""){
            myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "No user found with this date & time and lottery type"});
        }
        console.log(`Filter on Date Basis:`, filterOnDate);
        dialogFuncMap[`displayBasic`](false);

      }

      const deleteTicket = (severityValue, summaryValue, detailValue) => { 
        instance
        .delete(`/api/users/${ticketDelID}`, {
        })  
        myToastDanger.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});   
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
                    <h1 className='RA-13-heading-data-table'>Verify Selling Tickets</h1>
                    <a className='RA-13-bread-crumb'>Users / Tickets Listing</a>
                    <div className="p-d-flex p-jc-between RA-13-search-input" style={{    marginLeft: "5rem"}}>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='float-right'>
                    </div>
                    </div>
                    </div>
                </div>     
                {
                    filterBaseOnDateType != "" && filterBaseOnDateType != undefined ?
                    <DataTable value={filterBaseOnDateType} responsiveLayout="scroll" stripedRows className="mt-4">
                    <Column header="Users ID" body={(data, props) => props.rowIndex + 1}></Column>
                    <Column field="lottery" header="Lottery Type" sortable className="RA-13-datatable-p"></Column>
                    <Column field="company_name" header="Company" sortable className="RA-13-datatable-p"></Column>
                    {/* <Column field="secondAdmin.name" header="Users Company/Company Name" sortable className="RA-13-datatable-p"></Column> */}
                
                    <Column  header="Action" sortable className="RA-13-datatable-p" body={verifiedBodyTemplate}>
                    </Column>
                </DataTable>
                : ""

                }                     
                       
                </div>
        </div>

        <Dialog header="Verify Selling Ticket" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide2('displayBasic')}>

        <form onSubmit={e => { handleSubmit(e) }} style={{padding: "10px"}}>
                            {/* <h1 className='RA-13-add-user-sidebar RA-13-form-heading'> Verify Selling Tickets</h1> */}
                            <br />
                           <div className='form-group'>
                           <label htmlFor="title"><b>Lottery Type</b></label> <br /> 
                            <select className='form-control' onChange={e => setLotteryType(e.target.value)} style={{width: "100%"}}>
                                    <option value=""></option>
                                    <option value="MIDI">MIDI</option>
                                    <option value="NY">NY</option>
                                    <option value="FL">FL</option>
                                    <option value="SOIR">SOIR</option>
                            </select>
                           </div>
                            <div className='form-group'> 
                                <label htmlFor="title"><b>Choose Date</b></label> <br /> 
                                <input className='form-control' type="date" onChange={e => setDate(e.target.value)} style={{width: "100%"}}/>
                        </div>
                            <div className='form-group'> 
                                <label htmlFor="title"><b>Auto Actualisation</b></label> <br /> 
                                <input className='form-control' type="text" placeholder='2min'/>
                        </div>
                        <br />
                        <div className='float-right'>
                        <button className='RA-13-btn'>Rechercher</button>
                        </div>
                </form>
       </Dialog>

        <Dialog header="Verify Selling Tickets" visible={displayBasic2} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
        <table className='NB23Tablecontainer '>
                    <thead>
                    <tr>
                    <th>Sec</th>
                    <th>Lottery</th>
                    <th>Ticket <br/> Number</th>
                    <th>Montant</th>
                    <th>Temp</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                       filterOnId != undefined ?  filterOnId.map((ticket,index)=>{
                        console.log("Here is my ticket: ", index+1);
                        return(
                        <>
                            <tr>
                                <td>
                                    <h6 className='RA-13-h6'>{index+1}</h6> <hr />
                                </td>

                                <td>
                                    <h6 className='RA-13-h6'>{ticket.lottery}</h6> <hr />
                                </td>

                                <td>
                                    <button onClick={() => { filterDataDetail(ticket._id); onClick('displayBasic3');}}>{index+1}</button>  <hr />
                                </td>

                                <td>
                                    <h6 className='RA-13-h6'>{ticket.sum}</h6> <hr />
                                </td>

                                <td>
                                    <h6 className='RA-13-h6'>{ticket.date_time}</h6> <hr />
                                </td>
                        </tr>
                        
                        </>
                        
                        )
                        
                            })
                            : "No ticket found at this date and lottery type"
                    }

                         {
                             filterOnId != "" ?
                             <tr>
                             <td>
                               <h1 className='RA-13-total'>Total </h1>
                             </td>
                             <td></td>
                            <td>

                            </td>

                            <td>
                            <h1 className='RA-13-total'>{ticketSum}</h1>
                            </td>

                            <td>
                            
                            </td>
                           </tr> 
                           : ""
                         }
                           
                    </tbody>
                    </table>
       </Dialog>

        <Dialog header="Tikects per la Banque" visible={displayBasic3} style={{ width: '50vw' }} footer={renderFooter('displayBasic3')} onHide={() => onHide('displayBasic3')}>
                <table className='NB23Tablecontainer'>
                    <thead>
                    <tr>
                    <th>Jeu</th>
                    <th>Numberos</th>
                    <th>Sum </th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        
                        filterTicket != undefined ?
                        filterTicket.map((ticketDetail) =>{
                            let parseData = []
                            parseData = JSON.parse(ticketDetail?.Data);
                            console.log("Here is my ticket parse data: ", parseData);
                           return(
                         <>
                            <td>
                            {parseData.map((x,index)=>{
                               return(
                              <>
                              <h6 className='RA-13-h6'>{ x.tp_type} <br /></h6> <hr />
                              </>
                               )
                            })}
                            </td>
                            <td>
                            {parseData.map((x,index)=>{
                               return(
                              <>
                              <h6 className='RA-13-h6'>{ x.tp_strnum} <br /></h6> <hr />
                              </>
                               )
                            })}
                            </td>
                            <td>
                            {parseData.map((x,index)=>{
                               return(
                              <>
                              <h6 className='RA-13-h6'>{ x.tp_opt1} <br /></h6> <hr />
                              </>
                               )
                            })}
                            </td>

                         </>
                           )
                        })
                        : ""
                    }

                    {
                        filterTicket != undefined ?
                       <>
                        <tr>
                        <td>
                          <h1 className='RA-13-total'>Total </h1>
                        </td>
                        <td></td>

                        <td>
                       <h1 className='RA-13-total'>{filterTicketSum}</h1>
                       </td>

                       <td>

                       </td>

                    

                     
                      </tr>
                      <tr>
                       <td>
                           <button onClick={() => deleteTicket('error','Danger Message','Ticket Deleted Successfully')}>Delete</button>
                       </td>
                      </tr>
                       </>
                      : ""
                    }

                    </tbody>
                </table>
       </Dialog>
      </>
        
    );
}

