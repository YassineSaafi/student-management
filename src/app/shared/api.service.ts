import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http :HttpClient) { }

  postEtudiant(data :any){
    return this.http.post<any>("http://localhost:3000/etudiant/",data)
    .pipe(map((res:any)=>{
      return res;}
   )
    )
  }
  getEtudiant():Observable<any>{
    return this.http.get<any>("http://localhost:3000/etudiant/")
    .pipe(map((res:any)=>{
      return res;}
   )
    )
  }
  updateE(data :any,id:number){
    return this.http.put<any>("http://localhost:3000/etudiant/"+id,data)
    .pipe(map((res:any)=>{
      return res;}
   )
    )
  }
  deleteEtudiant(id : number){
   this.http.delete<any>("http://localhost:3000/etudiant/"+id)
    .pipe(map((res:any)=>{
      return res;}
   )
    )
  }
}
