import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { etudiantModel } from './etudiant.model';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  formValue !:FormGroup;
  etudiantmodelobject :etudiantModel=new etudiantModel();
  etudiantData !:any;
  

  constructor(private formBuillder:FormBuilder,
  private api:ApiService ) 
  { }

  ngOnInit(): void {
    this.formValue=this.formBuillder.group({
     nom :[''],
      prenom :[''],
     mail :[''],
      moyenne :[''],  
    })
    this.getAllEtudiant();
  }
    postEtudiantdetails(){
      this.etudiantmodelobject.nom=this.formValue.value.nom
    this.etudiantmodelobject.prenom=this.formValue.value.prenom
     this.etudiantmodelobject.mail=this.formValue.value.mail
     this.etudiantmodelobject.moyenne=this.formValue.value.moyenne
      this.api.postEtudiant(this.etudiantmodelobject)
      .subscribe(res=>{
        console.log(res)
        alert("Etudiant Ajouter avec succés")
        let ref =document.getElementById('concel')
        ref?.click(); 
        this.formValue.reset();
        this.getAllEtudiant();
      },
      err=>{
        alert("Echec !!!")
      }
      )
    }   
      getAllEtudiant(){
        this.api.getEtudiant()
        .subscribe(res=>{
          this.etudiantData = res;
        } 
          )
      }
     
       
         editEtudiant(e:any)
          {
            this.etudiantmodelobject.id=e.id;
            this.formValue.controls['nom'].setValue(e.nom);
            this.formValue.controls['prenom'].setValue(e.prenom);
            this.formValue.controls['mail'].setValue(e.mail);
            this.formValue.controls['moyenne'].setValue(e.moyenne);

          }
  updateEtudiant(){
            this.etudiantmodelobject.nom=this.formValue.value.nom;
             this.etudiantmodelobject.prenom=this.formValue.value.prenom;
             this.etudiantmodelobject.mail=this.formValue.value.mail;
             this.etudiantmodelobject.moyenne=this.formValue.value.moyenne;
              this.api.updateE(this.etudiantmodelobject,this.etudiantmodelobject.id)
                           
            .subscribe(res =>{
              alert('mise a jour avec succés') 
              this.formValue.reset();
              this.getAllEtudiant();
            })
          }
        
      
         delete(id:any){
             this.api.deleteEtudiant(id);
             console.log("sayéé");
          }
        
        }