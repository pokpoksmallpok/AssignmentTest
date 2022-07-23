import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAssignmentService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  loadChart() { 
    let headers = new HttpHeaders();
    return this.http.get(this.baseUrl+'api/Assignment/load' , { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }); 
    
  }

  loadList(data:any) {
    let headers = new HttpHeaders();
    return this.http.post(this.baseUrl + 'api/Assignment/list', JSON.stringify(data), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });

  }

  loadListStatus() {
    let headers = new HttpHeaders();
    return this.http.get(this.baseUrl + 'api/Assignment/listStatus', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });

  }

  deleteData(data: any) {
    let headers = new HttpHeaders();
    return this.http.post(this.baseUrl + 'api/Assignment/delete', JSON.stringify(data), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }); 

  }

  addData(data: any) { 
    let headers = new HttpHeaders();
    return this.http.post(this.baseUrl + 'api/Assignment/add', JSON.stringify(data) , { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }); 
  }

}
