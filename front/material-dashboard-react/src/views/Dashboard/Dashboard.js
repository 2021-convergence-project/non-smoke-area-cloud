import React, { useRef, useEffect } from "react";
import { toJS } from 'mobx';
import { observer } from 'mobx-react'
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Accessibility from "@material-ui/icons/Accessibility";
import Code from "@material-ui/icons/Code";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import {
  dailySalesChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import dashboardStore from "../../store/DashboardStore";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment-timezone'

const useStyles = makeStyles(styles);



const Dashboard = observer(() => {
  const classes = useStyles();

  // 지도
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new window.kakao.maps.LatLng(37.50970376505139, 127.05552179779437), //지도의 중심좌표.
    level: 4, //지도의 레벨(확대, 축소 정도)
  };
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스

  useEffect(() => {
    dashboardStore.selectMode();
    dashboardStore.selectBoardAll();
  }, []);

  useEffect(() => {
    // 지도
    var map = new window.kakao.maps.Map(container.current, options);

    var positions = [];
    for (var j = 0; j < toJS(dashboardStore).splitResult.length; j++){
      if (j>10) break;
      positions.push({latlng : new window.kakao.maps.LatLng(toJS(dashboardStore).splitResult[j].latitude, toJS(dashboardStore).splitResult[j].longitude)})
    }
    // console.log(positions);

    for (var k = 0; k < positions.length; k++) {
      // 마커를 생성합니다
      var marker = new window.kakao.maps.Marker({
        map: map,
        position: positions[k].latlng, // 마커를 표시할 위치
      });
    }

    return () => { marker };
  })

  const columns = [
    { field: 'time', headerName: '시간', width: 200 },
    { field: 'latitude', headerName: '위도', width: 150 },
    { field: 'longitude', headerName: '경도', width: 150 },
  ]

  const allCount = [];
  toJS(dashboardStore).boards.forEach((board) => {
    allCount.push(
      { id: board.id, time: moment(board.time).tz('Europe/London').format('YY-MM-DD, h:mm:ss A '), latitude: board.latitude, longitude: board.longitude }
    );
  });

  const ftCount = [];
  toJS(dashboardStore).boards.forEach((board) => {
    if (moment().tz('Europe/London').subtract(1, 'days') < moment(board.time).tz('Europe/London')) {
      ftCount.push(
        { id: board.id, time: moment(board.time).tz('Europe/London').format('LTS'), latitude: board.latitude, longitude: board.longitude }
      );
    }
  });

  const todayCount = [];
  toJS(dashboardStore).boards.forEach((board) => {
    if (moment().tz('Europe/London').format("YY.MM.DD") === moment(board.time).tz('Europe/London').format("YY.MM.DD")) {
      todayCount.push(
        { id: board.id, time: moment(board.time).tz('Europe/London').format(), latitude: board.latitude, longitude: board.longitude }
      );
    }
  });

  const sevendaysCount = [];
  toJS(dashboardStore).boards.forEach((board) => {
    if (moment().tz('Europe/London').subtract(7, 'day').format("YY.MM.DD") < moment(board.time).tz('Europe/London').format("YY.MM.DD")) {
      sevendaysCount.push(
        { id: board.id, time: moment(board.time).tz('Europe/London').tz('Europe/London').format(), latitude: board.latitude, longitude: board.longitude }
      );
    }
  });

  const thirtydaysCount = [];
  toJS(dashboardStore).boards.forEach((board) => {
    if (moment().tz('Europe/London').subtract(30, 'day').format("YY.MM.DD") < moment(board.time).tz('Europe/London').format("YY.MM.DD")) {
      thirtydaysCount.push(
        { id: board.id, time: moment(board.time).tz('Europe/London').tz('Europe/London').format(), latitude: board.latitude, longitude: board.longitude }
      );
    }
  });

  const meh = [];
  const cwh = [];
  const th = [];
  const rh = [];
  const dnh = [];
  const seh = [];
  const hh = [];
  const sph = [];
  const myh = [];
  const cnh = [];
  const dgh = [];
  const ph = [];
  const twelve = [];

  toJS(dashboardStore).boards.forEach((board) => {  
    if ((moment(board.time).tz('Europe/London').format("HH") >= "23") || (moment(board.time).tz('Europe/London').format("HH") < "01")) {
      meh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "01") || (moment(board.time).tz('Europe/London').format("HH") < "03")) {
      cwh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "03") || (moment(board.time).tz('Europe/London').format("HH") < "05")) {
      th.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "05") || (moment(board.time).tz('Europe/London').format("HH") < "07")) {
      rh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "07") || (moment(board.time).tz('Europe/London').format("HH") < "09")) {
      dnh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "09") || (moment(board.time).tz('Europe/London').format("HH") < "11")) {
      seh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "11") || (moment(board.time).tz('Europe/London').format("HH") < "13")) {
      hh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "13") || (moment(board.time).tz('Europe/London').format("HH") < "15")) {
      sph.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "15") || (moment(board.time).tz('Europe/London').format("HH") < "17")) {
      myh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "17") || (moment(board.time).tz('Europe/London').format("HH") < "19")) {
      cnh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if ((moment(board.time).tz('Europe/London').format("HH") <= "19") || (moment(board.time).tz('Europe/London').format("HH") < "21")) {
      dgh.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else {
      ph.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
  });

  twelve.push(meh.length);
  twelve.push(cwh.length);
  twelve.push(th.length);
  twelve.push(rh.length);
  twelve.push(dnh.length);
  twelve.push(seh.length);
  twelve.push(hh.length);
  twelve.push(sph.length);
  twelve.push(myh.length);
  twelve.push(cnh.length);
  twelve.push(dgh.length);
  twelve.push(ph.length);

  let timeData = {
    labels: ["1am", "3am", "5am", "7am", "9am", "11am", "13pm", "15pm", "17pm", "19pm", "21pm", "23pm"],
    series: [twelve],
  }
  // console.log(twelve);

  const mon = [];
  const tue = [];
  const wed = [];
  const thu = [];
  const fri = [];
  const sat = [];
  const sun = [];
  const week = [];
  toJS(dashboardStore).boards.forEach((board) => {
    if (moment(board.time).tz('Europe/London').format("ddd") === "Mon") {
      mon.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if (moment(board.time).tz('Europe/London').format("ddd") === "Tue") {
      tue.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if (moment(board.time).tz('Europe/London').format("ddd") === "Wed") {
      wed.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if (moment(board.time).tz('Europe/London').format("ddd") === "Thu") {
      thu.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if (moment(board.time).tz('Europe/London').format("ddd") === "Fri") {
      fri.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else if (moment(board.time).tz('Europe/London').format("ddd") === "Sat") {
      sat.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
    else {
      sun.push(
        { id: board.id, time: board.time, latitude: board.latitude, longitude: board.longitude }
      );
    }
  });
  week.push(mon.length);
  week.push(tue.length);
  week.push(wed.length);
  week.push(thu.length);
  week.push(fri.length);
  week.push(sat.length);
  week.push(sun.length);

  let weekData = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    series: [week],
  }

  return (
    <div>
      
    <h4 style={{ textAlign:"left", color:"red" }}><b>상위 적발 지역 10곳</b></h4>
      <div style={{ height: "50vh" }} ref={container}></div>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>오늘 적발 건수</p>
              <h3 className={classes.cardTitle}>{todayCount.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>지난 7일간 적발 건수</p>
              <h3 className={classes.cardTitle}>{sevendaysCount.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>총 적발 건수</p>
              <h3 className={classes.cardTitle}>{allCount.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={timeData}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>시간 대 별 적발 건수</h4>
              <p className={classes.cardCategory}>2시간 간격으로 적발 건수 집계</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={weekData}
                type="Bar"
                options={dailySalesChart.options}
                responsiveOptions={dailySalesChart.responsiveOptions}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>요일 별 적발 건수</h4>
              <p className={classes.cardCategory}>자정을 기준으로 일일 적발 건수 집계</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <Accordion>
              <AccordionSummary
                expandIcon={<Code />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>적발 기록</h4>
                  <p className={classes.cardCategoryWhite}>
                    지난 24시간 동안
                  </p>
                </CardHeader>
              </AccordionSummary>
              <AccordionDetails>
                <CardBody>
                  <DataGrid style={{ height: 500 }}
                    rows={ftCount.reverse()}
                    columns={columns}
                    pageSize={5}
                    hideFooterSelectedRowCount={true}
                  />
                </CardBody>
              </AccordionDetails>
            </Accordion>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card plain>
            <Accordion>
              <AccordionSummary
                expandIcon={<Code />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <CardHeader plain color="primary">
                  <h4 className={classes.cardTitleWhite}>적발 기록</h4>
                  <p className={classes.cardCategoryWhite}>
                    모든 기록기간 동안
                  </p>
                </CardHeader>
              </AccordionSummary>
              <AccordionDetails>
                <CardBody>
                  <DataGrid style={{ height: 500 }}
                    rows={allCount.reverse()}
                    columns={columns}
                    pageSize={5}
                    hideFooterSelectedRowCount={true}
                  />
                </CardBody>
              </AccordionDetails>
            </Accordion>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
});

export default Dashboard;