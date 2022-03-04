import React, { useState, useEffect, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../../shared/Api/shared-service';
import { Sidebar } from 'primereact/sidebar';
import "./SaleReportScreen.css";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import FilterSaleReport from './FilterSaleReport/FilterSaleReport';
export  function AdminSaleReport(){
    const [customers1, setCustomers1] = useState([]);
    const [visible, setAdminUserSidebar] = useState(false);
    const customerService = new CustomerService();
    const myToastDanger = useRef(null);
    useEffect(() => {
        customerService.getCustomersLarge().then(data => setCustomers1(data));
    }, []);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const verifiedBodyTemplate = (rowData) => {
        return(
       <div>
        <a className='RA-13-anchor-style'>
            <i className='fas fa-edit RA-13-icon-style' onClick={() => addSecondAdminUser()}></i>
        </a>
        <a>
            <i className='fas fa-trash-alt' style={{cursor: "pointer"}} onClick={() => deleteUser('error','Danger Message','User Deleted Successfully')}></i>
        </a>
       </div>
        );
    }

    const addSecondAdminUser = () => {   
        setAdminUserSidebar(true); 
     }

     const deleteUser = (severityValue, summaryValue, detailValue) => {   
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
                    <h1 className='RA-13-heading-data-table'>Admin Sale Report</h1>
                    <a className='RA-13-bread-crumb'>Admin  / Report Listing</a>
                    <div className="p-d-flex p-jc-between RA-13-search-input">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText placeholder="Keyword Search" />
                        </span>
                    </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='float-right'>
                    <a onClick={() => addSecondAdminUser()}>
                            <i className='fas fa-plus-circle RA-13-plus-icon'></i>
                        </a>
                    </div>
                    </div>
                    </div>
                </div>
                        <DataTable value={customers1} paginator responsiveLayout="scroll" stripedRows className="mt-4"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                            <Column field="name" header="User ID" sortable className="RA-13-datatable-p"></Column>
                            <Column field="country.name" header="Day Sale Total" sortable className="RA-13-datatable-p"></Column>
                            <Column field="name" header="User ID" sortable className="RA-13-datatable-p"></Column>
                            <Column field="country.name" header="Day Sale Total" sortable className="RA-13-datatable-p"></Column>
                            <Column field="country.name" header="Action" sortable className="RA-13-datatable-p" body={verifiedBodyTemplate}>
                            </Column>
                        </DataTable>
                </div>
        </div>
            

        <Sidebar visible={visible} onHide={() => setAdminUserSidebar(false)}  baseZIndex="10000" position="right" style={{width:'30em'}} >
            <FilterSaleReport />
        </Sidebar>
      </>
        
    );
}

