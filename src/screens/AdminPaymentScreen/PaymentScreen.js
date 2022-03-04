import React, { useState, useEffect, useRef} from 'react';

import "./PaymentScreen.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import axios from "axios";
import { Dialog } from 'primereact/dialog';

export  function AdminPaymentSettings(){

    const [blt_per_point, setblt_per_point] = useState();
    const [blt_limit, setblt_limit] = useState();
    const [blt1_prix, setblt1_prix] = useState();
    const [blt2_prix, setblt2_prix] = useState();
    const [blt3_prix, setblt3_prix] = useState();
    const [mrg_per_point, setmrg_per_point] = useState();
    const [mrg_limit, setmrg_limit] = useState();
    const [mrg_prix, setmrg_prix] = useState();
    const [l4c1_prix, setl4c1_prix] = useState();
    const [l4c1_limit, setl4c1_limit] = useState();
    const [l4c2_prix, setl4c2_prix] = useState();
    const [l4c2_limit, setl4c2_limit] = useState();
    const [l4c3_prix, setl4c3_prix] = useState();
    const [l4c3_limit, setl4c3_limit] = useState();
    const [l5c1_prix, setl5c1_prix] = useState();
    const [l5c1_limit, setl5c1_limit] = useState();
    const [l5c2_prix, setl5c2_prix] = useState();
    const [l5c3_prix, setl5c3_prix] = useState();
    const [l5c3_limit, setl5c3_limit] = useState();
    const [l3c_prix, setl3c_prix] = useState();
    const [l3c_per_point, setl3c_per_point] = useState();
    const [l4c1_per_point, setl4c1_per_point] = useState();
    const [l5c1_per_point, setl5c1_per_point] = useState();
    const [l5c2_per_point, setl5c2_per_point] = useState();
    const [l5c3_per_point, setl5c3_per_point] = useState();
    const [l3c_limit, setl3c_limit] = useState();
    const [l4c2_per_point, setl4c2_per_point] = useState(); 
    const [mgra_prix, setmgra_prix] = useState(); 
    const [mgra_limit, setmgra_limit] = useState(); 
    const [mgra_per_point, setmgra_per_point] = useState(); 
    const [l5c2_limit, setl5c2_limit] = useState(); 
    const [lotteryType, setLotteryType] = useState(); 
    const [hidePaymentCondition, setHidePaymentCondition] = useState(false); 
    const myToastDanger = useRef(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [filterResult, setFilterResults] = useState();

    const instance = axios.create({
        baseURL: 'https://gwtech-node-app.herokuapp.com',
        headers: {
            Accept: "application/json",
            'content-type':'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A`
        },
    });
    useEffect(() => {
        dialogFuncMap[`displayBasic`](true);

    }, []);

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }
    const handleSubmit= (e) => {
        e.preventDefault();
        instance.put(`/api/payment-condition/${filterResult[0]._id}`, {
            "kind": lotteryType,
            "radio": "radio",
            "groupid": "groupid",
            "banqueid": "banqueid",
            "blt1_prix": e.target.blt1_prix.value,
            "blt2_prix": e.target.blt2_prix.value,
            "blt3_prix": e.target.blt3_prix.value,
            "blt_per_point": e.target.blt_per_point.value,
            "blt_limit": e.target.blt_limit.value,
            "l3c_prix": e.target.l3c_prix.value,
            "l3c_per_point": e.target.l3c_per_point.value,
            "l3c_limit": e.target.l3c_limit.value,
            "mrg_prix": e.target.mrg_prix.value,
            "mrg_per_point": e.target.mrg_per_point.value,
            "mrg_limit": e.target.mrg_limit.value,
            "mgra_prix": e.target.mgra_prix.value,
            "mgra_per_point": e.target.mgra_per_point.value,
            "mgra_limit": e.target.mgra_limit.value,
            "l4c1_prix": e.target.l4c1_prix.value,
            "l4c2_prix": e.target.l4c2_prix.value,
            "l4c1_limit": e.target.l4c1_limit.value,
            "l4c2_limit": e.target.l4c2_limit.value,
            "l4c3_limit": e.target.l4c3_limit.value,
            "l4c1_per_point": e.target.l4c1_per_point.value,
            "l4c2_per_point": e.target.l4c2_per_point.value,
            "l4c3_per_point": e.target.l4c3_per_point.value,
            "l5c1_prix": e.target.l5c1_prix.value,
            "l5c2_prix": e.target.l5c2_prix.value,
            "l5c3_prix": e.target.l5c3_prix.value,
            "l5c1_limit": e.target.l5c1_limit.value,
            "l5c2_limit": e.target.l5c2_limit.value,
            "l5c3_limit": e.target.l5c3_limit.value,
            "l5c1_per_point": e.target.l5c1_per_point.value,
            "l5c2_per_point": e.target.l5c2_per_point.value,
            "l5c3_per_point": e.target.l5c3_per_point.value,
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
        })   
        myToastDanger.current.show({severity: "success", summary: "Success Message", detail: "Data Added Sucessfully"});
   
      }
      const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        window.location.href="/second-admin"
    }

    const hideModal = (name) =>{
        dialogFuncMap[`${name}`](false);
        setHidePaymentCondition(true);
        instance.get("/api/payment-condition").then((response) => {
            console.log("Here is my response", response.data);
            let filterResults = response.data.filter((x)=>{
                return x.kind == lotteryType
             })
             setFilterResults(filterResults);
             console.log("Search Result: ", filterResults);
          })
    }

    return (
        
      <>
      <Toast ref={myToastDanger}></Toast>
      <CEOSidebar />
        <div id="wrapper" style={{marginTop:"-11px"}}>
        <div className='row' style={{margin: "0px",marginTop: "-10px"}}>
                    <div className='col-md-6'>
                    <h1 className='RA-13-heading-data-table'>Payment Condition({lotteryType})</h1>
                    <a className='RA-13-bread-crumb'>Payment / Payment Condition</a>
                    <div className="p-d-flex p-jc-between RA-13-search-input" style={{    marginLeft: "5rem"}}>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='float-right'>
                    </div>
                    </div>
                    </div>
        <div className='container'>
      {
          hidePaymentCondition == true ?   <form onSubmit={e => { handleSubmit(e) }}>
          <div className='row justify-content-center animate__animated  animate__zoomIn  animate__slow'>
          <div className='col-md-6'>
            <table className='table table-striped table-bordered m-0 table-responsive table-sm'>
              <tr>
                  <th><b>Game Type</b></th>
                  <th><b>Conditions</b></th>
                  <th><b>Limit</b></th>
              </tr>
              <tr>
                  <td className='RA-13-td-cls' style={{ width: "20rem"}}>BLT:</td>
                  <td style={{ width: "20rem"}}><input style={{width: "100%"}} defaultValue={filterResult == undefined ? "": filterResult[0].blt_per_point} onChange={e => setblt_per_point(e.target.value)} name="blt_per_point"/></td>  

                  <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='blt_limit' defaultValue={filterResult == undefined ? "": filterResult[0].blt_limit} onChange={e => setblt_limit(e.target.value)}/></td>   
              </tr>
              <tr>
                  <td style={{ width: "20rem"}}>First:</td>
                  <td style={{ width: "20rem"}}><input style={{width: "100%"}} name="blt1_prix"  defaultValue={filterResult == undefined ? "": filterResult[0].blt1_prix} onChange={e => setblt1_prix(e.target.value)}/></td>    
                  <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>   
              </tr>
              <tr>
                  <td style={{ width: "20rem"}}>Second:</td>
                  <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='blt2_prix'  defaultValue={filterResult == undefined ? "": filterResult[0].blt2_prix} onChange={e => setblt2_prix(e.target.value)}/></td>
                  <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>   
              </tr>
              <tr>
                  <td style={{ width: "20rem"}}>Third:</td>
                  <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='blt3_prix' onChange={e => setblt3_prix(e.target.value)}  defaultValue={filterResult == undefined ? "": filterResult[0].blt3_prix}/></td>   

                  <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>   
              </tr>
              <tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>MRG</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}}  defaultValue={filterResult == undefined ? "": filterResult[0].mrg_per_point} onChange={e => setmrg_per_point(e.target.value)} name='mrg_per_point'/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='mrg_limit' defaultValue={filterResult == undefined ? "": filterResult[0].mrg_limit} onChange={e => setmrg_limit(e.target.value)}/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}}  defaultValue={filterResult == undefined ? "": filterResult[0].mrg_prix}  onChange={e => setmrg_prix(e.target.value)} name='mrg_prix'/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr>
              <tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>L3C</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}}  defaultValue={filterResult == undefined ? "": filterResult[0].l3c_per_point} onChange={e => setl3c_per_point(e.target.value)} name='l3c_per_point'/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}}  defaultValue={filterResult == undefined ? "": filterResult[0].l3c_limit} onChange={e => setl3c_limit(e.target.value)} name='l3c_limit'/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l3c_prix' defaultValue={filterResult == undefined ? "": filterResult[0].l3c_prix} onChange={e => setl3c_prix(e.target.value)}/></td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr>
              <tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>L4C1</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l4c1_per_point' defaultValue={filterResult == undefined ? "": filterResult[0].l4c1_per_point}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l4c1_limit' defaultValue={filterResult == undefined ? "": filterResult[0].l4c1_limit} onChange={e => setl4c1_limit(e.target.value)}/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l4c1_prix'  defaultValue={filterResult == undefined ? "": filterResult[0].l4c1_prix} onChange={e => setl4c1_prix(e.target.value)}/></td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr>
              <tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>L4C2</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l4c2_per_point' defaultValue={filterResult == undefined ? "": filterResult[0].l4c2_per_point} onChange={e => setl4c2_per_point(e.target.value)}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l4c2_limit'  defaultValue={filterResult == undefined ? "": filterResult[0].l4c2_limit} onChange={e => setl4c2_limit(e.target.value)}/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l4c2_prix' defaultValue={filterResult == undefined ? "": filterResult[0].l4c2_prix} onChange={e => setl4c2_prix(e.target.value)}/></td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr>
              <tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>L4C3</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}}  onChange={e => setl4c1_per_point(e.target.value)} name='l4c3_per_point'  defaultValue={filterResult == undefined ? "": filterResult[0].l4c3_per_point} /></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l4c3_limit' defaultValue={filterResult == undefined ? "": filterResult[0].l4c3_limit} onChange={e => setl4c3_limit(e.target.value)}/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l4c3_prix'  defaultValue={filterResult == undefined ? "": filterResult[0].l4c3_prix} onChange={e => setl4c3_prix(e.target.value)}/></td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr>
              <tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>L5C1</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l5c1_per_point'  defaultValue={filterResult == undefined ? "": filterResult[0].l5c1_per_point} onChange={e => setl5c1_per_point(e.target.value)}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l5c1_limit'  defaultValue={filterResult == undefined ? "": filterResult[0].l5c1_limit} onChange={e => setl5c1_limit(e.target.value)}/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l5c1_prix'  defaultValue={filterResult == undefined ? "": filterResult[0].l5c1_prix} onChange={e => setl5c1_prix(e.target.value)}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr>
              <tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>L5C2</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}}  defaultValue={filterResult == undefined ? "": filterResult[0].l5c2_per_point} onChange={e => setl5c2_per_point(e.target.value)} name='l5c2_per_point'/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l5c2_limit' defaultValue={filterResult == undefined ? "": filterResult[0].l5c2_limit} onChange={e => setl5c2_limit(e.target.value)}/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l5c2_prix'  defaultValue={filterResult == undefined ? "": filterResult[0].l5c2_prix} onChange={e => setl5c2_prix(e.target.value)}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr>
              <tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>L5C3</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}}  name='l5c3_per_point' defaultValue={filterResult == undefined ? "": filterResult[0].l5c3_per_point} onChange={e => setl5c3_per_point(e.target.value)}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l5c3_limit'  defaultValue={filterResult == undefined ? "": filterResult[0].l5c3_limit} onChange={e => setl5c3_limit(e.target.value)}/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='l5c3_prix'  defaultValue={filterResult == undefined ? "": filterResult[0].l5c3_prix} onChange={e => setl5c3_prix(e.target.value)}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr><tr>
              <td className='RA-13-td-cls' style={{ width: "20rem"}}>MRG GRA</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='mgra_per_point'  defaultValue={filterResult == undefined ? "": filterResult[0].mgra_per_point} onChange={e => setmgra_per_point(e.target.value)}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='mgra_limit' defaultValue={filterResult == undefined ? "": filterResult[0].mgra_limit} onChange={e => setmgra_limit(e.target.value)}/></td>
              </tr>
              <tr>
              <td style={{ width: "20rem"}}>WIN</td>
              <td style={{ width: "20rem"}}><input style={{width: "100%"}} name='mgra_prix' defaultValue={filterResult == undefined ? "": filterResult[0].mgra_prix} onChange={e => setmgra_prix(e.target.value)}/></td>

              <td style={{ width: "20rem"}}><input style={{width: "100%"}} disabled/></td>
              </tr>
              </table>
              <div style={{textAlign: "right"}}>
              <button className='RA-13-btn-cls mt-3'>Save</button>
              </div>
            </div>
          
          </div>
          </form>

          : ""
      }
     

        </div>
        </div>

        <Dialog header="Payment conditions" visible={displayBasic} style={{ width: '50vw' }}  onHide={() => onHide('displayBasic')}>
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
                <br />
                <div className='float-right'>
                <button className='RA-13-btn' onClick={() => hideModal('displayBasic')}>Rechercher</button>
                </div>
</Dialog>
      </>
        
        
    );
}

