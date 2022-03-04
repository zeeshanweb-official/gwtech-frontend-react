import React from 'react';
import CEOSidebar from '../../menus/CeoSidbarScreen';
import "./CeoScreen.css"
export default function CEOSCREEN() {






  return (
 <>
 <CEOSidebar />
 <div className='RA-13-dashboard-margin-tp' id="wrapper">
  <div className="row auto_margin mt-5 marg-bottom" style={{margin: "0px"}}>
    <div className="col-md-12 col-xl-12 col-sm-12 col-lg-12 col-xxl-12 auto_margin">
      <div className="row auto_margin">
        <div className="col-md-6 col-xl-3 col-sm-12 col-lg-6 col-xxl-3">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className=" mb-0 text-capitalize font-weight-bold">Today's Money</p>
                    <h5 className="font-weight-bolder mb-0">
                      $53,000
                      <span className="text-success  font-weight-bolder fnt-size">+55%</span>
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="">
                    <i className="fas fa-coins icon icon-shape bg-gradient-primary shadow text-center border-radius-md"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 col-sm-12 col-lg-6 col-xxl-3">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className=" mb-0 text-capitalize font-weight-bold">Today's Users</p>
                    <h5 className="font-weight-bolder mb-0">
                      37389
                      <span className="text-success  font-weight-bolder fnt-size">+40%</span>
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="">
                    <i
                      className="far fa-user-circle icon icon-shape bg-gradient-primary shadow text-center border-radius-md"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 col-sm-12 col-lg-6 col-xxl-3">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className=" mb-0 text-capitalize font-weight-bold">New Clients</p>
                    <h5 className="font-weight-bolder mb-0">
                      +3,463
                      <span className="text-danger  font-weight-bolder fnt-size">-2%</span>
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="">
                    <i
                      className="far fa-id-badge icon icon-shape bg-gradient-primary shadow text-center border-radius-md"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 col-sm-12 col-lg-6 col-xxl-3">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className=" mb-0 text-capitalize font-weight-bold">Sales</p>
                    <h5 className="font-weight-bolder mb-0">
                      $103,430
                      <span className="text-success  font-weight-bolder fnt-size">+5%</span>
                    </h5>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="">
                    <i
                      className="fas fa-shopping-cart icon icon-shape bg-gradient-primary shadow text-center border-radius-md"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row auto_margin mt-5">
        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 col-xxl-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-md-12 col-xl-12 col-sm-12 col-lg-12 col-xxl-12">
                  <h5 className="font-weight-bolder mb-0 mt-1">
                    Sales Overview </h5>

               {/* <DashboardBarChart /> */}

                </div>


              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 col-xxl-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-md-12 col-xl-12 col-sm-12 col-lg-12 col-xxl-12">
                  <h5 className="font-weight-bolder mb-0 mt-1">
                    Active Users </h5>

                {/* <DashboardLineChart /> */}

                </div>


              </div>
            </div>
          </div>
        </div>


      </div>
      {/* <div className="row auto_margin mt-5">
        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 col-xxl-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">

                <div className="col-md-6 col-xl-7 col-sm-12 col-lg-6 col-xxl-7">
                  <div className="numbers">
                    <p className=" mb-0 text-capitalize font-weight-bold color-gray">Built by Developers</p>
                    <h5 className="font-weight-bolder mb-0 mt-1">
                      UI Dashboard

                    </h5>
                    <p className="p-style mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime id
                      aspernatur
                      exercitationem
                      sequi vel ipsum consectetur libero accusantium non qui. Rem, cupiditate? Voluptatibus officiis
                      architecto dolor enim tempore mollitia recusandae.</p>
                  </div>
                </div>
                <div className="col-md-6 col-xl-5 col-sm-12 col-lg-6 col-xxl-5 align-card-img">
                  <div className="">
                    <i
                      className="fas fa-rocket icon1 icon-shape bg-gradient-primary shadow text-center border-radius-md"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-6 col-sm-12 col-lg-6 col-xxl-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-md-12 col-xl-12 col-sm-12 col-lg-12 col-xxl-12">
                  <div className="myaddon1">
                    <div id="feeds-section" className="ember-view">
                      <div className="dashboard-panel">
                        <header className="title-header">

                          <p className="title-header-text mb-0 text-capitalize font-weight-bold color-gray">
                            What's the latest</p>

                          <div className="clearfix"></div>
                        </header>
                        <div id="feed-content-container" role="content">

                          <div className="myscroll RA-13-myscroll-content">
                            <div style={{marginTop: "16px"}} className="row">
                              <div className="col-md-3">
                                <img className="feed-image"
                                  src="https://cdn.pixabay.com/photo/2016/12/18/10/22/man-1915351_960_720.jpg"
                                  data-bindattr-1744="1744" width="100%" height="auto" />
                              </div>
                              <div className="col-md-9">
                                <div className="feed-content">
                                  <div className="title">New Chat Widget</div>
                                  <div className="meta">Sat May 22 2021</div>
                                  <div className="p-style ">Now you can share a video, qualify leads or offer a search
                                    bar in
                                    your widget with...!
                                  </div>
                                  <a>
                                    <div className="more">Read More</div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div style={{marginTop: "16px"}} className="row">
                              <div className="col-md-3">
                                <img className="feed-image"
                                  src="https://cdn.pixabay.com/photo/2016/10/29/07/48/structure-1779979_960_720.jpg"
                                  data-bindattr-1744="1744" width="100%" height="auto" />
                              </div>
                              <div className="col-md-9">
                                <div className="feed-content">
                                  <div className="title">New Chat Widget</div>
                                  <div className="meta">Sat May 22 2021</div>
                                  <div className="p-style ">Now you can share a video, qualify leads or offer a search
                                    bar in
                                    your widget with...!
                                  </div>
                                  <a>
                                    <div className="more">Read More</div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div style={{marginTop: "16px"}} className="row">
                              <div className="col-md-3">
                                <img className="feed-image"
                                  src="https://cdn.pixabay.com/photo/2018/02/16/10/23/web-3157323_960_720.jpg"
                                  data-bindattr-1744="1744" width="100%" height="auto" />
                              </div>
                              <div className="col-md-9">
                                <div className="feed-content">
                                  <div className="title">New Chat Widget</div>
                                  <div className="meta">Sat May 22 2021</div>
                                  <div className="p-style ">Now you can share a video, qualify leads or offer a search
                                    bar in
                                    your widget with...!
                                  </div>
                                  <a>
                                    <div className="more">Read More</div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div style={{marginTop: "16px"}} className="row">
                              <div className="col-md-3">
                                <img className="feed-image"
                                  src="https://cdn.pixabay.com/photo/2016/06/13/08/03/social-media-1453843_960_720.jpg"
                                  data-bindattr-1744="1744" width="100%" height="auto" />
                              </div>
                              <div className="col-md-9">
                                <div className="feed-content">
                                  <div className="title">New Chat Widget</div>
                                  <div className="meta">Sat May 22 2021</div>
                                  <div className="p-style ">Now you can share a video, qualify leads or offer a search
                                    bar in
                                    your widget with...!
                                  </div>
                                  <a>
                                    <div className="more">Read More</div>
                                  </a>
                                </div>
                              </div>
                            </div>

                          </div>








                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div> */}
      <div className="row auto_margin mt-5">
        <div className="col-md-12 col-xl-12 col-sm-12 col-lg-12 col-xxl-12">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-md-12 col-xl-12 col-sm-12 col-lg-12 col-xxl-12">
                  <h5 className="font-weight-bolder mb-0 mt-1">
                    Monthly Payment Overview </h5>
                  {/* <DashboardLineMainChart /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

 </>

  );
}
