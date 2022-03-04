import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../../shared/Api/shared-service';
import { Sidebar } from 'primereact/sidebar';
import "./FirstAdminScreen.css";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import {  useSelector } from 'react-redux';
import axios from "axios";
import AddFirstAdmin from './AddFirstAdmin/AddFirstAdmin';

export  function FirstAdminScreen(){
    const instance = axios.create({
        baseURL: 'https://gwtech-node-app.herokuapp.com',
        headers: {
            Accept: "application/json",
            'content-type':'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A`
        },
    });
    const userSignin = useSelector((state) => state.userSignin);
    const [customers1, setCustomers1] = useState([]);
    const [visible, setAdminSidebar] = useState(false);
    const [adminData, setAdminData] = useState(false);
    const [adminId, setAdminID] = useState();
    const [imageBaseURL, setImageBaseURL] = useState("https://gwtech-node-app.herokuapp.com/");
    const customerService = new CustomerService();
    const myToastDanger = useRef(null);
    const { userInfo } = userSignin;
    const [token, setToken] = useState([]);
    useEffect(() => {
        // setToken(userInfo.token)
        // console.log("Token: ", userInfo.token);
        instance.get("/api/users").then((response) => {
            console.log("Here is my response", response.data);
            let filterResults = response.data.filter((x)=>{
                return x.isFirstAdmin == true
             })
            setAdminData(filterResults);
          })
    }, [adminData]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const verifiedBodyTemplate = (rowData) => {
        return(
       <div>
        <a className='RA-13-anchor-style'>
            <i className='fas fa-edit RA-13-icon-style' onClick={(id) => addSecondAdmin(rowData._id)}></i>
        </a>
        {/* <a>
            <i className='fas fa-trash-alt' style={{cursor: "pointer"}} onClick={() => deleteAdmin('error','Danger Message','Admin Deleted Successfully',rowData._id)}></i>
        </a> */}
       </div>
        );
    }
    const verifiedBodyTemplate2 = (rowData) => {
        console.log("Row Data Image: ", imageBaseURL+rowData.image);
        return(
       <div>
          {
               rowData.image != null && rowData.image != undefined ?
               <img className='RA-13-image-tb' src={imageBaseURL+rowData.image} alt=""/> :""
          }
       </div>
        );
    }

    const succesRecord = () => {   
        setAdminSidebar(false); 
        myToastDanger.current.show({severity: "success", summary: "Success Message", detail: "Successfully"});
     }
    const addSecondAdmin = (id) => { 
        setAdminID(id)  
        setAdminSidebar(true); 
     }

     const deleteAdmin = (severityValue, summaryValue, detailValue, id) => { 
        instance
        .delete(`/api/users/${id}`, {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWQ3ZmQ5NWU5OWI4ZmJhMTk0YWMyMTEiLCJuYW1lIjoiUmFiaWEgSW1yYW4iLCJlbWFpbCI6ImF6YW4ucmFiaWExQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlzU2VsbGVyIjpmYWxzZSwiaWF0IjoxNjQyNDEwNjcwLCJleHAiOjE2NDUwMDI2NzB9.jLLFtH_o72m7G60rvAZjO43imhKEgZjUfxoaXy1ik_A` },
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
                    <h1 className='RA-13-heading-data-table'>Add First Admin</h1>
                    <a className='RA-13-bread-crumb'>CEO / Add-First-Admin</a>
                    <div className="p-d-flex p-jc-between RA-13-search-input">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText placeholder="Keyword Search" />
                        </span>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='float-right'>
                    <a onClick={() => addSecondAdmin()}>
                            <i className='fas fa-plus-circle RA-13-plus-icon'></i>
                        </a>
                    </div>
                    </div>
                    </div>
                </div>
                        <DataTable value={adminData}  responsiveLayout="scroll" stripedRows className="mt-4">
                                  <Column header="ID" body={(data, props) => props.rowIndex+1}>                
                                  </Column>
                            {/* <Column field="_id" header="Company ID" sortable className="RA-13-datatable-p"></Column> */}
                            <Column field="name" header="Name" sortable className="RA-13-datatable-p"></Column>
                            <Column field="password" header="Password" sortable className="RA-13-datatable-p"></Column>
                            <Column  header="Action" sortable className="RA-13-datatable-p" body={verifiedBodyTemplate}>
                            </Column>
                        </DataTable>
                </div>
        </div>
            

        <Sidebar visible={visible} onHide={() => setAdminSidebar(false)}  baseZIndex="10000" position="right" style={{width:'30em'}} >
            <AddFirstAdmin hitSidebar={succesRecord} adminId={adminId}/>
        </Sidebar>
      </>
        
    );
}

