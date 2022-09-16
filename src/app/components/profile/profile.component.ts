import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/Services/notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';


declare var $:any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


   AllNotes:any
   token:any
   decoded:any
  note: any;
  constructor(private _Router:Router ,private _NotesService:NotesService) {


    this.token =localStorage.getItem('TOKEN');
    this.decoded =jwt_decode(this.token) ;

    this.getAllNotes();

    if(!localStorage.getItem('TOKEN')){
      this._Router.navigate(['/signin'])
    }
   }

   getAllNotes(){
    let data ={
      token:this.token,
      userID:this.decoded._id
    }
  
       this._NotesService.getAllNotes(data).subscribe(response=>
        {
      console.log(response)

          this.AllNotes=response.Notes
        })
   }
   
   AddNote=new FormGroup({
    title:new FormControl('',Validators.required),
    desc:new FormControl('',Validators.required)

    })
    EditNote=new FormGroup({
      title:new FormControl('',Validators.required),
      desc:new FormControl('',Validators.required)
  
      })
    addData(){
      

      let data = {
        title:this.AddNote.value.title,
        desc:this.AddNote.value.desc,
        token:this.token,
        citizenID:this.decoded._id

       }


      this._NotesService.addNote(data).subscribe(res=>{
          if(res.message=='success'){

            $("#AddNote").modal("hide");
            this.getAllNotes();
            this.AddNote.reset()
          
          }
      })
      // console.log(this.AddNote.value);      
      
    } 

    // =========================== delete note =====================================
    noteId:any
       getID(id:any){
        this.noteId=id
        console.log(id)
       }


    

       deleteNote() {
        let data = {
          token: this.token,
          NoteID: this.noteId,
        };

        
        this._NotesService.deleteNote(data).subscribe(res=>{
          console.log(res)
          if(res.message=='deleted'){
            $("#DeleteNote").modal("hide");
              this.getAllNotes()
          }
        })
       }

           // =========================== edit note =====================================


    
            setValue()
            {
              for (let index = 0; index < this.AllNotes.length; index++) {
                if(this.AllNotes[index]._id==this.noteId)
                {
                  console.log(this.AllNotes[index]);
      
                  this.EditNote.controls['title'].setValue(this.AllNotes[index].title)
                  this.EditNote.controls['desc'].setValue(this.AllNotes[index].desc)

                }
                 }
            }

         
  editNote()
  {
    let data={
      title:this.EditNote.value.title,
      desc:this.EditNote.value.desc,
      NoteID:this.noteId,
      token:this.token
    }

    this._NotesService.updateNote(data).subscribe(res=>{
      console.log(res);
      if(res.message=='updated')
     {
      $("#EditNote").modal("hide");
      this.getAllNotes();
      this.AddNote.reset()

      

     }
      
    })
  }
            
    
    ngOnInit(): void {
    }

    

}
