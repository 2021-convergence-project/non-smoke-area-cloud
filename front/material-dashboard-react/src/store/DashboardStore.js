import { makeAutoObservable, runInAction } from "mobx";
import DashboardApi from "api/DashboardApi";

class DashboardStore {
  boards = [];
  splitResult = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }


  // setBoardProps(id, value) {
  //   this.board = { ...this.board, [id]: value }
  // }

  async selectBoardAll() {
    try {
      const results = await DashboardApi.dashboardList();
      runInAction(() => this.boards = results);
    } catch (error) {
      console.log(error);
    }
  }  

  async selectMode(){
    try {
      const dashs = await DashboardApi.dashboardList();

      // 0. 위경도 합치기
      const tude = [];
      for (var i = 0; i < dashs.length; i ++){
        tude.push(dashs[i].latitude + ', ' + dashs[i].longitude);
      }

  // 1. 출연 빈도 구하기 
  const counts = tude.reduce((pv, cv)=>{
   pv[cv] = (pv[cv] || 0) + 1; return pv; 
  }, {}); 
  // 2. 요소와 개수를 표현하는 배열 생성 => [ [요소: 개수], [요소: 개수], ...] 
  const array = []; 
  for (let key in counts) { 
    array.push([key, counts[key]]); 
  } 
  // 3. 출현 빈도별 정리하기 
  array.sort((first, second) => { 
    // 정렬 순서 바꾸려면 return first[1] - second[1]; 
    return second[1] - first[1]; 
  });

      const split = [];
      const splitResult = [];
      // 4. 최빈값 위경도 나누기
      for (var j = 0; j< array.length; j ++){
        split.push(array[j][0].split(', '));
        splitResult.push({latitude: split[j][0], longitude : split[j][1]})
      }
      
      runInAction(()=>this.splitResult = splitResult);
    } catch(error) {
      console.log(error);
    }
  }
}

export default new DashboardStore();

// import { observable, runInAction, action } from "mobx";
// import DashboardApi from "api/DashboardApi";

// const DashboardStore = observable({
//   board : {},
//   boards : [],

// selectBoardAll: action(async () => {
//     try {
//       const results = await DashboardApi.dashboardList();
//       runInAction(() => {DashboardStore.boards = results.data.boards;});
//     } catch (err) {
//       console.log(err);
//     }
//   })
// });
// export default new DashboardStore();