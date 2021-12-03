import axios from 'axios';
class DashboardApi{
  URL = '/dashboard/';

  dashboardList(){
    return axios.get(this.URL).then((response)=>response.data).catch((error)=>console.log(error));
  }
}

export default new DashboardApi();