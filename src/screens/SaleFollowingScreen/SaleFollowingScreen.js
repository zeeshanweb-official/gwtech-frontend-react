import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../../shared/Api/shared-service';
import "./ScreenFollowing.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';

export  function SaleFollowing(){
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
    const [BltTotal, setBLTTotal] = useState();
    const [L3CTotal, setL3cTotal] = useState();
    const [MrgTotal, setMrgTotal] = useState();
    const [L4cTotal, setL4cTotal] = useState();
    const [prixCount, setPrixCount] = useState();
    const [gameTypeTotal, setGameTypeTotal] = useState();
    const [detailDialog, setDetailDialog] = useState();
    const [paymentCondition, setPaymentCondition] = useState();
    const [limitData, setLimitData] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [quatityTickets, setTicketQuantity] = useState();
    const [totalquatityTickets, setTotalTicketQuantity] = useState();
    const [disponsibleVal, setDisponsibleValue] = useState();

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
    }

    useEffect(() => {
        instance.get("/api/users").then((response) => {
            console.log("Here is my response", response.data);
            let filterResults = response.data.filter((x)=>{
                return x.isSecondAdmin == true
             })
            setAdminData(filterResults);
          })

        instance.get("/api/payment-condition").then((response) => {
            console.log("Here is my paymnet Condition", response.data);
            setPaymentCondition(response.data);
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
        let sum = 0;
           for(let i=0; i < response.data.length; i++){
               sum += parseInt(response.data[i].sum);
            console.log(`Here is my sum: ${response.data[i].sum}`);
       
           }
           setTicketSum(sum);
           console.log(`Calculated: ${sum}`);
           let filterCompanyTickets = response.data.filter((x)=>{
            return x.company_name === userInfo.name
        })
        console.log("Company Filtered Data: ", filterCompanyTickets);
            setTicketsData(filterCompanyTickets);
          })
    }, [tickets]);

    useEffect(() => {
        dialogFuncMap[`displayBasic`](true);
    } , [])

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const verifiedBodyTemplate = (rowData) => {
        let filterparis;
        console.log("rowData", rowData, filterBaseOnDateType);

        let myData = prixCount.filter((filterRecord)=>{
            return filterRecord.number == rowData.number && filterRecord.type == rowData.type
        })

       let ticketLen = myData.length;

        console.log('Filtered Record: ',  myData.length);


        return(
       <div>
          <a>{myData.length}</a>
       </div>
       
        );
        
    }

    const verifiedBodyTemplate2 = (rowData) => {
        return(
       <div>
        <button onClick={(e1,e2)=> showDetails(rowData.number,rowData.type)}>{rowData.number}</button>
       </div>
       
        );
        
    }

    const verifiedBodyTemplate3 = (rowData) => {
        let myData = prixCount.filter((filterRecord)=>{
            return  filterRecord.type == rowData.type && filterRecord.number == rowData.number
        })
        console.log('Filtered Record for prix: ',  myData);
        return(
       <div>
           {
               myData != undefined ?
               myData.reduce(function(accumulator, currentValue) {
                return accumulator + parseInt(currentValue?.price) 
             }, 0)
                 : "0"
            }
       </div>
       
        );
        
    }

const showDetails = (e1,e2) => {
    let myData = prixCount.filter((filterRecord)=>{
        return  filterRecord.type == e2 && filterRecord.number == e1
    })
    setTotalTicketQuantity(myData.length);

   let FilterLimit = paymentCondition.filter((x)=>{
        return x.kind == LotteryType
    })
    const uniqueArray = myData.filter((v,i,a)=>a.findIndex(t=>( t.user_id == v. user_id))==i)
    if(e2 == "BLT"){
        console.log("Unique Array Length: ", uniqueArray.length);
        let totalPriceEachUser = 
        myData.reduce(function(accumulator, currentValue) {
         return accumulator + parseInt(currentValue?.price) 
      }, 0)

    setLimitData(FilterLimit[0].blt_limit);
    let desponsible =  FilterLimit[0].blt_limit - totalPriceEachUser;    
      console.log("Here is desponsible: ", desponsible);
      setDisponsibleValue(desponsible)
    }
    if(e2 == "MRG"){
        console.log("Unique Array Length: ", uniqueArray.length);
        let totalPriceEachUser = 
        myData.reduce(function(accumulator, currentValue) {
         return accumulator + parseInt(currentValue?.price) 
      }, 0)
        
    setLimitData(FilterLimit[0].mrg_limit);
    let desponsible =  FilterLimit[0].mrg_limit - totalPriceEachUser;    
      console.log("Here is desponsible: ", desponsible);
      setDisponsibleValue(desponsible)
    }
    if(e2 == "L3C"){
        console.log("Unique Array Length: ", uniqueArray.length);
        let totalPriceEachUser = 
        myData.reduce(function(accumulator, currentValue) {
         return accumulator + parseInt(currentValue?.price) 
      }, 0)
        
    setLimitData(FilterLimit[0].l3c_limit);
    let desponsible =  FilterLimit[0].l3c_limit - totalPriceEachUser;    
      console.log("Here is desponsible: ", desponsible);
      setDisponsibleValue(desponsible)
    }
    if(e2 == "L4C"){
        console.log("Unique Array Length: ", uniqueArray.length);
        let totalPriceEachUser = 
        myData.reduce(function(accumulator, currentValue) {
         return accumulator + parseInt(currentValue?.price) 
      }, 0)
        
        setLimitData(FilterLimit[0].l4c_limit);
    let desponsible =  FilterLimit[0].l4c_limit - totalPriceEachUser;    
      console.log("Here is desponsible: ", desponsible);
      setDisponsibleValue(desponsible)
    }
    console.log("Filter Limit Data: ", FilterLimit);

      console.log('Number Detail: ',  myData);


//     let myData2 = prixCount.filter((filterRecord)=>{
//         return filterRecord.number == e1 && filterRecord.type == e2
//     })
//    let ticQuantity = myData2.filter((x)=>{
//         return x.user_id == x.user_id
//    })

//     console.log("here is my tickent quantity: ", ticQuantity);


    if(myData != undefined){

        let totalPriceEachUser = 
        myData.reduce(function(accumulator, currentValue) {
         return accumulator + parseInt(currentValue?.price) 
      }, 0)

      setTotalPrice(totalPriceEachUser)
      console.log("Price of each user: ", totalPriceEachUser);
      }


     


    setTicketQuantity(uniqueArray.length)
    setDetailDialog(uniqueArray);

    connection.map((x)=>{
        
    })
    dialogFuncMap[`displayBasic2`](true);
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
    }

     const filterDataDetail = (e) =>{
     console.log("filterData", e);
     setDeleteTicketId(e);
     let filterTickets = tickets.filter((ticket_id,index)=>{
         let ticketid = e;
        return ticket_id._id == ticketid;
     })
     setFilterTicket(filterTickets);
     setFilterTicketSum(filterTickets[0].mega_total);
     console.log("filterTickets", filterTickets);
    }

    const handleSubmit= (e) => {
        console.log(`Here is my lottery type ${LotteryType} && ${chooseDate}`);
        e.preventDefault();
        let filterOnDate = tickets.filter((ticket_list,index)=>{
            console.log(`Here is ticket list: ${ticket_list}`)
            let ticket_Date = ticket_list.date_time.split(" ")[0];
            let lotter_Type = ticket_list.lottery;
            console.log(`Here is ticket date: ${ticket_Date} && ${lotter_Type}`);
           return ticket_Date == chooseDate && lotter_Type == LotteryType;
        })
        // setFilteredBaseRecord(filterOnDate);
        if(filterOnDate == ""){
            myToastDanger.current.show({severity: "error", summary: "Error Message", detail: "No user found with this date & time and lottery type"});
        }
        console.log(`Filter on Date Basis:`, filterOnDate);
        let obj = [];
        let bltTotal = [];
        let l3cTotal = [];
        let MrgTotal = [];
        let l4cTotal = [];
        filterOnDate.map((data)=>{
            console.log("Parse Data: ", JSON.parse(data.Data));
            Object.values(JSON.parse(data.Data)).map((value)=>{
              console.log("value: ", value);
              obj.push({
                  "ticket_id": data.ticket_id,
                  "user_id": data.user_id,
                  "type": value.tp_type,
                  "number": value.tp_strnum,
                  "price": value.tp_opt1,
              })
            });

        })

        bltTotal = obj.filter((bltType)=>{
            return bltType.type == "BLT" 
         })

         l3cTotal = obj.filter((bltType)=>{
            return bltType.type == "L3C"
         })

         MrgTotal = obj.filter((bltType)=>{
            return bltType.type == "MRG"
         })

         l4cTotal = obj.filter((bltType)=>{
            return bltType.type == "L4C"
         })
        
         console.log("BLT Total: ", bltTotal);
         console.log("L3C Total: ", l3cTotal);
         console.log("MRG Total: ", MrgTotal);
         console.log("L4C Total: ", l4cTotal);

       
        setBLTTotal(bltTotal);
        setL3cTotal(l3cTotal);
        setMrgTotal(MrgTotal);
        setL4cTotal(l4cTotal);
        let filteration = obj.filter((notshown)=>{
            return notshown.number != notshown.number 
        })
        console.log("Filteration: ", filteration);
        // to remove the duplicate records
        const uniqueArray = obj.filter((v,i,a)=>a.findIndex(t=>( t.type == v.type && t.number == v.number))==i)
        setFilteredBaseRecord(uniqueArray);
        console.log("obj: ", obj);
        setPrixCount(obj)

        // total Sum calculation
        let BltSum;
        let L3cSum;
        let mrgSum;
        let l4cSum;
     if(bltTotal != undefined){
        bltTotal.reduce(function(accumulator, currentValue) {

       return(
        BltSum = accumulator + parseInt(currentValue?.price)
          )
                    
        }, 0)
     }

     if(l3cTotal != undefined){

      l3cTotal.reduce(function(accumulator, currentValue) {
            return L3cSum =  accumulator + parseInt(currentValue?.price)
          }, 0)
     }

     if(MrgTotal != undefined){
        MrgTotal.reduce(function(accumulator, currentValue) {
            return mrgSum = accumulator + parseInt(currentValue?.price) 
          }, 0)
     }

     if(l4cTotal != undefined){
        l4cTotal.reduce(function(accumulator, currentValue) {
            return l4cSum = accumulator + parseInt(currentValue?.price) 
          }, 0)
     }

    let myfinalSumArray = [];
    myfinalSumArray.push(BltSum, L3cSum, mrgSum, l4cSum);
     console.log("My Blt Sum: ", BltSum);
     console.log("my L3c Sum: ", L3cSum);
     console.log("my Mrg Sum: ", mrgSum);
     console.log("my L4c Sum: ", l4cSum);

     const quickSum = () => {
        const sum = myfinalSumArray.reduce((acc, val) => {
           return acc + (val || 0);
        }, 0);
        return sum;
     };

     setGameTypeTotal(quickSum(myfinalSumArray));
        dialogFuncMap[`displayBasic`](false);

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
                    <h1 className='RA-13-heading-data-table'>Track sales</h1>
                    <a className='RA-13-bread-crumb'>Users / Track sales</a>
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

                   <div className='row'>
                       <div className='col-md-8'>
                        <DataTable value={filterBaseOnDateType}  responsiveLayout="scroll" stripedRows className="mt-4" style={{marginTop: "0px !important"}}>
                            <Column field="type" header="Game Type" sortable className="RA-13-datatable-p"></Column>
                            <Column body={verifiedBodyTemplate2}  header="Numéros" sortable className="RA-13-datatable-p"></Column>
                            <Column body={verifiedBodyTemplate3}  header="Prix" sortable className="RA-13-datatable-p"></Column>                
                            <Column body={verifiedBodyTemplate} header="Paris" sortable className="RA-13-datatable-p"></Column>                
                        </DataTable>
                       </div>
                       <div className='col-md-4 mb-auto'>
                       <table>
                            <tr>
                                <th></th>
                                <th>{LotteryType}</th>
                            </tr>
                            <tr>
                                <td>BLT</td>
                                <td>
                                    {
                                        BltTotal != undefined ?
                                        BltTotal.reduce(function(accumulator, currentValue) {

                                            return(
                                                accumulator + parseInt(currentValue?.price)
                                                // localStorage.setItem("bltSum",accumulator + parseInt(currentValue?.price))                                          

                                            )
                                            
                                          }, 0)
                                          : "0"
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>L3C</td>
                                <td>
                                {
                                        L3CTotal != undefined ?
                                        L3CTotal.reduce(function(accumulator, currentValue) {
                                            return accumulator + parseInt(currentValue?.price)
                                          }, 0)
                                          : "0"
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>MRG</td>
                                <td>
                                {
                                        MrgTotal != undefined ?
                                        MrgTotal.reduce(function(accumulator, currentValue) {
                                            return accumulator + parseInt(currentValue?.price) 
                                          }, 0)
                                          : "0"
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>L4C</td>
                                <td>
                                {
                                        L4cTotal != undefined ?
                                        L4cTotal.reduce(function(accumulator, currentValue) {
                                            return accumulator + parseInt(currentValue?.price) 
                                          }, 0)
                                          : "0"
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>
                                    {
                                      gameTypeTotal

                                    }
                                </td>
                            </tr>
                            </table>
                       </div>
                    </div>

                : ""

                }                     
                       
                </div>
        </div>

        <Dialog header="Track sales" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide2('displayBasic')}>

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

        <Dialog header="Detail" visible={displayBasic2} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
        <div className='row'>
            <div className='col-md-6'>
            <table>
            <tr>
                <td>
                {
                 detailDialog != undefined ? <div>
                     {
                        detailDialog[0]?.type == "BLT" ? <b>BORLETTE</b> : detailDialog[0]?.type == "MRG" ? <b>Marriage</b> : detailDialog[0]?.type == "L3C" ? <b>Lotto 3C</b> : detailDialog[0]?.type == "L4C" ? <b>Lotto 4C</b> : detailDialog[0]?.type
                     }
                 </div> :  ""
                 }
                </td>
                <td>
                   {
                      detailDialog !=undefined ?   detailDialog[0]?.number : "no number"
                   } 
                </td>
            </tr>
            <tr>
                <td><b>Date</b></td>
                <td>
                       {
                          chooseDate != undefined ? chooseDate : ""
                        }
                </td>
            </tr>
            <tr>
                <td><b>Lottrie</b></td>
                <td>
                     {
                            LotteryType != undefined ? LotteryType : ""
                        }
                </td>
            </tr>
            
            
            </table>
            </div>
            <div className='col-md-6'>
            <table>
                <tr>
                    <td>
                    <b>Limite</b>
                    </td>
                    <td>
                    {
                 limitData != undefined && detailDialog != undefined ? limitData :  ""
                 }  
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Prix</b>
                    </td>
                    <td>
                    {totalPrice != undefined ? totalPrice : "0"}
                     </td>
                </tr>
                <tr>
                    <td>
                        <b>Disponsible</b>
                    </td>
                    <td>
                  {disponsibleVal != undefined ? disponsibleVal: ""}
                    </td>
                </tr>
                
                
                </table>
            </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
          <table>
        <thead>
          <tr>
            <th>Banque</th>
            <th>Description</th>
            <th>Tickets</th>
            <th>Vendu</th>
          </tr>
        </thead>
        <tbody>
          
          {
          detailDialog != undefined ?
          detailDialog.map(item => {
            return (
              <tr>
                 <td>{item.user_id}</td>
                 <td>PERE ELOHIM LOTO</td>
                 <td>{quatityTickets != undefined ? quatityTickets : ""}</td>
                 <td>
                    {
                        detailDialog != undefined ?
                        detailDialog.reduce(function(accumulator, currentValue) {
                            return accumulator + parseInt(currentValue?.price) 
                        }, 0)
                            : "0"
                                    }
                     </td>    
           </tr>
            );
          })
        : "Not Found"}
        <tr>
            <td><span style={{color: "red"}}>Total</span></td>
            <td></td>
            <td>
            {
                  totalquatityTickets != undefined ? totalquatityTickets : "" 
                                    }
            </td>
            <td style={{color: "red"}}>
            {
             totalPrice != undefined ? totalPrice : "0"
}
            </td>
        </tr>
        </tbody>
      </table>
          </div>
        </div>
       </Dialog>

     
      </>
        
    );
}

