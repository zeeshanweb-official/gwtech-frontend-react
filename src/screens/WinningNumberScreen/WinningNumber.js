import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../../shared/Api/shared-service';
import "./WinningNumber.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import moment from 'moment';

export  function WinningNumber(){
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
    const [displayBasic, setDisplayBasic] = useState(false);
    const myToastDanger = useRef(null);
    const [chooseDate, setDate] = useState();
    const [LotteryType, setLotteryType] = useState();
    const [FirstValue, setFirstvalue] = useState();
    const [SecondValue, setSecondValue] = useState();
    const [ThirdValue, setThirdValue] = useState();
    const [LThreeValue, setLThreeValue] = useState();
    const [MRG1Val, setMRG1] = useState("0000");
    const [filterResponse, setFilterResponse] = useState("0000");


    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }


    useEffect(() => {
        handleSubmit2();

        dialogFuncMap[`displayBasic`](true);
    } , [])


    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        window.location.href = "/second-admin";
    }

    const handleSubmit2= (e) => {
        instance.post(`/api/winning_number_info_get`, {
            "kind": "MIDI",
            "date": moment().format('YYYY-MM-DD'),
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
        }).then((response) =>{
            setFilterResponse(response.data);
            // document.getElementById('first').value = response.data[0].first;
            // document.getElementById('mrg1').value = response.data[0].mrg1;
            console.log("Here is my filter api response: ", response.data);
        }) 
      }


    const handleSubmit= (e) => {
        console.log(`form data: `, document.getElementById('mrg1').first
        );
        e.preventDefault();
        if(filterResponse.length == 0){
            instance.post(`/api/winning-number`, {
                "kind": LotteryType,
                "first": document.getElementById('first').value,
                 "second": document.getElementById('second').value,
                 "third":document.getElementById('third').value,
                 "l3c": document.getElementById('fourth').value,
                 "mrg1": document.getElementById('mrg1').value,
                 "mrg2": document.getElementById('mrg2').value,
                 "mrg3": document.getElementById('mrg3').value,
                 "mrg4": document.getElementById('mrg4').value,
                 "mrg5": document.getElementById('mrg5').value,
                 "mrg6": document.getElementById('mrg6').value,
                 "l4c1": document.getElementById('l4c1').value,
                 "l4c2": document.getElementById('l4c2').value,
                 "l4c3": document.getElementById('l4c3').value,
                 "l5c1": document.getElementById('l5c1').value,
                 "l5c2": document.getElementById('l5c2').value,
                 "l5c3": document.getElementById('l5c3').value,
                 "mgra": MRG1Val,
                 "date": chooseDate,
                headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
            })  
            dialogFuncMap[`displayBasic`](false);
        }
        else if(filterResponse.length > 0){
            instance.put(`/api/winning-number/${filterResponse[0]._id}`, {
                "kind": LotteryType,
                "first": document.getElementById('first').value,
                 "second": document.getElementById('second').value,
                 "third":document.getElementById('third').value,
                 "l3c": document.getElementById('fourth').value,
                 "mrg1": document.getElementById('mrg1').value,
                 "mrg2": document.getElementById('mrg2').value,
                 "mrg3": document.getElementById('mrg3').value,
                 "mrg4": document.getElementById('mrg4').value,
                 "mrg5": document.getElementById('mrg5').value,
                 "mrg6": document.getElementById('mrg6').value,
                 "l4c1": document.getElementById('l4c1').value,
                 "l4c2": document.getElementById('l4c2').value,
                 "l4c3": document.getElementById('l4c3').value,
                 "l5c1": document.getElementById('l5c1').value,
                 "l5c2": document.getElementById('l5c2').value,
                 "l5c3": document.getElementById('l5c3').value,
                 "mgra": MRG1Val,
                 "date": chooseDate == "" ? document.getElementById('date').value : chooseDate,
                headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
            })  
            dialogFuncMap[`displayBasic`](false);
        }
 

      }

     const hitToGetFocusInput = () =>{

         document.getElementsByName("mrg1")[0].value = document.getElementsByName("first")[0].value + "x" + document.getElementsByName("second")[0].value;

        document.getElementsByName("mrg2")[0].value = document.getElementsByName("first")[0].value + "x" + document.getElementsByName("third")[0].value;

        document.getElementsByName("mrg3")[0].value = document.getElementsByName("second")[0].value + "x" + document.getElementsByName("third")[0].value;

        document.getElementsByName("mrg4")[0].value = document.getElementsByName("second")[0].value + "x" + document.getElementsByName("first")[0].value;

        document.getElementsByName("mrg5")[0].value = document.getElementsByName("third")[0].value + "x" + document.getElementsByName("first")[0].value;

        document.getElementsByName("mrg6")[0].value = document.getElementsByName("third")[0].value + "x" + document.getElementsByName("second")[0].value;

        document.getElementsByName("l4c1")[0].value = document.getElementsByName("second")[0].value  + document.getElementsByName("third")[0].value;

        document.getElementsByName("l4c2")[0].value = document.getElementsByName("first")[0].value  + document.getElementsByName("second")[0].value;

        document.getElementsByName("l4c3")[0].value = document.getElementsByName("first")[0].value  + document.getElementsByName("third")[0].value;

        document.getElementsByName("l5c1")[0].value = document.getElementsByName("fourth")[0].value  + document.getElementsByName("third")[0].value;

        document.getElementsByName("l5c2")[0].value = document.getElementsByName("fourth")[0].value  + document.getElementsByName("second")[0].value;

        document.getElementsByName("l5c3")[0].value = document.getElementsByName("fourth")[0].value  + document.getElementsByName("first")[0].value;


        // console.log("hit to get focus input");
        // // document.getElementById('second').value = "rabai";

        // document.getElementById('second').focus();
      }
     const hitToGetFocusInput2 = () =>{
        // console.log("hit to get focus input");
        // document.getElementById('third').focus();
      }
     const hitToGetFocusInput3 = () =>{
        // console.log("hit to get focus input");
        // document.getElementById('fourth').focus();
      }
     const hitToGetFocusInput4 = () =>{
        // console.log("hit to get focus input");
        // document.getElementById('fifth').focus();
      }
      const updateInputVal = () =>{
        //   document.getElementById('second').value = SecondValue;
      }

      const filterLotteryType = (kind) =>{
        instance.get(`/api/winning-number`).then((response) => {
            console.log("Here is my response", response.data);
            let filteredData = response.data.filter((x)=>{
                console.log("splited date: ",x.date.split("T")[0] + "&& " + document.getElementById('date').value);
            return x.kind === document.getElementById('kind').value && x.date.split("T")[0] === document.getElementById('date').value;
            })
            console.log(`Here is my filtered Data: ${filteredData}`);
            setFilterResponse(filteredData);
          })
          
       
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
                    <h1 className='RA-13-heading-data-table'>Winning Numbers</h1>
                    <a className='RA-13-bread-crumb'>Lottery / Winning Numbers Listing</a>
                    <div className="p-d-flex p-jc-between RA-13-search-input" style={{    marginLeft: "5rem"}}>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='float-right'>
                    </div>
                    </div>
                    </div>
                </div>     
              
              
                         
                       
        </div>
        </div>

        <Dialog header="Winning Number" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => onHide('displayBasic')}>
        <form autoComplete='off' onSubmit={e => { handleSubmit(e) }}  style={{padding: "10px"}}>
                            {/* <h1 className='RA-13-add-user-sidebar RA-13-form-heading'> Verify Selling Tickets</h1> */}
                            <br />

                           <div className='form-group'>
                            <label htmlFor="title"><b>Lottery Type</b></label> <br /> 
                                <select className='form-control' id='kind' defaultValue={filterResponse.length !=0 ? filterResponse[0].kind : ""}  onChange={(e) => { setLotteryType(e.target.value); filterLotteryType(e.target.value);}}  style={{width: "100%"}}>
                                        <option value=""></option>
                                        <option value="MIDI">MIDI</option>
                                        <option value="NY">NY</option>
                                        <option value="FL">FL</option>
                                        <option value="SOIR">SOIR</option>
                                </select>
                           </div>

                            <div className='form-group'> 
                                <label htmlFor="title"><b>Choose Date</b></label> <br /> 
           <input className='form-control' type="date" onChange={(e) => { setDate(e.target.value); filterLotteryType(e.target.value);}}  defaultValue={filterResponse.length !=0 ? filterResponse[0].date?.split("T")[0] : ""}   style={{width: "100%"}} id='date'/>
                            </div>
                         
                         <div className='row'>
                           <div className='col-md-6'>
                           

                            <span className='mr-8'> First:</span> <br /> 
                          <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].first : ""} onChange={(e) => { setFirstvalue(e.target.value); hitToGetFocusInput();}} name='first'  id='first'/><br />

                            <span className='mr-8'> Second:</span> <br /> <input type="text" name='second' id="second" defaultValue={filterResponse.length !=0 ? filterResponse[0].second : ""}   onChange={(e) => { setSecondValue(e.target.value); hitToGetFocusInput();updateInputVal()}}  /><br />

                            <span className='mr-8'>Third:</span> <br />  <input type="text" name='third' id="third" defaultValue={filterResponse.length !=0 ? filterResponse[0].third : ""}  onChange={(e) => { setThirdValue(e.target.value); hitToGetFocusInput();}} /><br />

                            <span className='mr-8'>L3C:</span>  <br />   <input type="text" name='fourth' id='fourth' defaultValue={filterResponse.length !=0 ? filterResponse[0].l3c : ""}   onChange={(e) => { setLThreeValue(e.target.value); hitToGetFocusInput();}} /><br />

                           <span className='mr-8'> MGRA:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].mgra : ""}  id="fifth"/><br />
                           </div>
                           <div className='col-md-6'>
                           <span className='mr-8'>MRG1:</span>  <br />  
                            <input type="text" name='mrg1'   id="mrg1"   defaultValue={filterResponse.length !=0 ? filterResponse[0].mrg1 : FirstValue == undefined || SecondValue == undefined ?  "x" : FirstValue + "x" + SecondValue} disabled /><br />

                            <span className='mr-8'> MRG2:</span> <br /> 
                            <input type="text"  defaultValue={filterResponse.length !=0 ? filterResponse[0].mrg2: FirstValue == undefined || ThirdValue == undefined ?  "x" : FirstValue + "x" + ThirdValue} disabled name='mrg2' id="mrg2"/><br />

                            <span className='mr-8'>MRG3:</span> <br />  <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].mrg3 : SecondValue == undefined || ThirdValue == undefined ?  "x" : SecondValue + "x" + ThirdValue}  name='mrg3'  disabled id="mrg3"/><br />

                            <span className='mr-8'>MRG4:</span>  <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].mrg4 :  SecondValue == undefined ?  "x" : SecondValue + "x" + FirstValue} name='mrg4' disabled id="mrg4"/><br />

                           <span className='mr-8'> MRG5:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].mrg5 : FirstValue == undefined || ThirdValue == undefined ?  "x" : ThirdValue + "x" + FirstValue} disabled name='mrg5' id="mrg5"/><br />


                           <span className='mr-8'> MRG6:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].mrg6 : SecondValue == undefined || ThirdValue == undefined ?  "" : ThirdValue + "x" + SecondValue}
                           name='mrg6' id="mrg6" disabled/><br />

                           <span className='mr-8'> L4C1:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].l4c1 : SecondValue == undefined || ThirdValue == undefined ?  "" :  SecondValue+ThirdValue}   disabled name='l4c1' id="l4c1"/><br />

                           <span className='mr-8'> L4C2:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].l4c2 : FirstValue == undefined  || SecondValue == undefined?  "" : FirstValue+SecondValue} name='l4c2' disabled id="l4c2"/><br />

                           <span className='mr-8'> L4C3:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].l4c3 : FirstValue == undefined || ThirdValue == undefined ?  "" : FirstValue+ThirdValue} name='l4c3' disabled id="l4c3"/><br />

                           <span className='mr-8'> L5C1:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].l5c1 : ThirdValue == undefined || LThreeValue == undefined ?  "" : ThirdValue+LThreeValue} name='l5c1' disabled id="l5c1"/><br />

                           <span className='mr-8'> L5C2:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].l5c2 : SecondValue == undefined || LThreeValue == undefined ?  "" : LThreeValue+SecondValue}  disabled name='l5c2' id="l5c2"/><br />

                           <span className='mr-8'> L5C3:</span> <br />   <input type="text" defaultValue={filterResponse.length !=0 ? filterResponse[0].l5c3 :FirstValue == undefined || LThreeValue == undefined ?  "" : LThreeValue + FirstValue}
                             disabled name='l5c3' id="l5c3"/><br />
                           </div>
                         </div>

                        <br />
                        <div className='float-right'>
                        <button className='RA-13-btn'>Save Number</button> <br /> <br />
                        </div>
                </form>

     
       </Dialog>

      </>
        
    );
}

