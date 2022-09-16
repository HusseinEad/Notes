import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseURL='https://routeegypt.herokuapp.com/';

  constructor(private _HttpClient:HttpClient) { }



  getAllNotes(data:any):Observable<any>{
     return  this._HttpClient.post(this.baseURL+'getUserNotes',data)
  }
  addNote(data:any):Observable<any>{
    return  this._HttpClient.post(this.baseURL+'addNote',data)
 }
 deleteNote(data:any):Observable<any>{
  let obtion={
    headers:new HttpHeaders({}),
    body:{
      NoteID:data.NoteID,
      token:data.token
    }
  }
  return  this._HttpClient.delete(this.baseURL+'deleteNote',obtion)
}
updateNote(data:any):Observable<any>{
  // let obtion={
  //   headers:new HttpHeaders({}),
  //   body:{
  //     NoteID:data.noteId,
  //     token:data.token,
  //     title:data.title,
  //     desc:data.desc
  //   }
  // }

  return  this._HttpClient.put(this.baseURL+'updateNote',data)
}
}
