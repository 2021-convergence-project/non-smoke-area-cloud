import { makeAutoObservable, runInAction } from "mobx";
import DashboardApi from "api/DashboardApi";

class DashboardStore {
  board = {};
  boards = [];
  boardFilter = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }


  // setBoardProps(id, value) {
  //   this.board = { ...this.board, [id]: value }
  // }


  changeBoardFilter(boardFilter) {
    this.boardFilter = boardFilter;
  }

  async selectBoardAll() {
    try {
      const results = await DashboardApi.dashboardList();
      runInAction(() => this.boards = results);
      // console.log(this.boards[1].time);
    } catch (error) {
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