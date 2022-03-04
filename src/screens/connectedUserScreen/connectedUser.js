import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../../shared/Api/shared-service';
import "./connectedUser.css";
import { Toast } from 'primereact/toast';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import AddConnectedUser from './connectedUserForm/AddConnctedUser';
import { Sidebar } from 'primereact/sidebar';

export  function ConnectedUsers(){
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

    useEffect(() => {
        console.log("Public URL: ", process.env.PUBLIC_URL);
        // setToken(userInfo.token)
        // console.log("Token: ", userInfo.token);
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
    }, [connection]);


    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const verifiedBodyTemplate = (rowData) => {
        console.log("rowData", rowData);
        return(
       <div>
        <a className='RA-13-anchor-style'>
            <i className='fas fa-edit RA-13-icon-style' onClick={(id) => addSecondAdminUser(rowData._id)}></i>
        </a>
        <a>
            <i className='fas fa-trash-alt' style={{cursor: "pointer"}} onClick={() => deleteUser('error','Danger Message','User Deleted Successfully',rowData._id)}></i>
        </a>
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

// const filterAdminUser= (e) =>{
//     console.log("Here is Selected Id: ", e.target.value)
//     let filterDataConnection =  connection.filter((data) =>{
//         console.log("Data: ", data)
//         // return console.log("Data: ", data)
//         return data.secondAdmin._id == e.target.value;
//     })
//     console.log("Filtered: ", filterDataConnection);
//     setConnectionUser(filterDataConnection);
//     // instance.get(`/api/connection`).then((response) => {
//     //     console.log("Here is my response connection: ", response.data);
//     //     let filterDataConnection = response.data.filter((data) => {
//     //         console.log(`Filtered val: ${data.secondAdmin._id}`);
//     //         console.log(`Filtered val: ${e.target.value}`);
//     //         return data.secondAdmin._id == e.target.value
//     //     })
//     //     console.log("Filtered: ", filterDataConnection);
//     //     setConnectionUser(filterDataConnection);
//     //   })
//    console.log(`Here is admin user ${e.target.value}`);
// }

    return (
      <>
      <Toast ref={myToastDanger}></Toast>
      <CEOSidebar />
        <div id="wrapper" style={{marginTop:"-11px"}}>
        <div className='RA-13-rw-tp'>
                <div>
                    <div className='row'>
                    <div className='col-md-6'>
                    <h1 className='RA-13-heading-data-table'>Connected User</h1>
                    <a className='RA-13-bread-crumb'>Users / Users Listing</a>
                    <div className="p-d-flex p-jc-between RA-13-search-input" style={{    marginLeft: "5rem"}}>
                        {/* <select style={{width: "100%"}} onChange={e => filterAdminUser(e)}>
                        {
                        adminData.map((option) => {
                        return <option key={option._id} value={option._id}>{option.name}</option>
                        })
                        }
                        </select> */}
                        {/* <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText placeholder="Keyword Search" />
                        </span> */}
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='float-right'>
                    {/* <a onClick={() => addSecondAdminUser()}>
                            <i className='fas fa-plus-circle RA-13-plus-icon'></i>
                        </a> */}
                    </div>
                    </div>
                    </div>
                </div>
                        <DataTable value={connection}  responsiveLayout="scroll" stripedRows className="mt-4"
                          
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                                <Column header="Users ID" body={(data, props) => props.rowIndex + 1}>                
</Column>
                            <Column field="key" header="Users Key" sortable className="RA-13-datatable-p"></Column>
                            <Column field="password" header="Users Password" sortable className="RA-13-datatable-p"></Column>
                            <Column field="secondAdmin.name" header="Users Company/Company Name" sortable className="RA-13-datatable-p"></Column>
                        
                            <Column  header="Action" sortable className="RA-13-datatable-p" body={verifiedBodyTemplate}>
                            </Column>
                        </DataTable>
                </div>
        </div>
            

        <Sidebar visible={visible} onHide={() => setAdminUserSidebar(false)}  baseZIndex="10000" position="right" style={{width:'30em'}} >
            <AddConnectedUser  hitSidebar={succesRecord} adminId={adminId}/>
        </Sidebar>
      </>
        
    );
}

