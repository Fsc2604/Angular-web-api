import { ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import {AppService} from './app.service';  
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Pagamentoo } from './Pagamentoo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-webapi';
  constructor(private AppService: AppService,private _changeRef: ChangeDetectorRef) { }  
  data: Pagamentoo[] = [];  
  CartaoForm!: FormGroup;
  submitted = false;   
  EventValue: any = "Salvar";    
  ngOnInit(): void {  
    this.getdata();    
    
    this.CartaoForm = new FormGroup({  
      Id: new FormControl(null),  
      NomeTitular: new FormControl("",Validators.required),        
      NumeroCartao: new FormControl("",Validators.required),  
      DataExpiracao:new FormControl("",Validators.required),  
      CVV: new FormControl("",[Validators.required]),  
    })   
  } 
  ngDoCheck() {
    this._changeRef.markForCheck();
  }
  getdata() {  
    this.AppService.getData().subscribe((data: any) => {  
      this.data = data;  
    })  
}
deleteData(id: string) {  
  this.AppService.deleteData(id).subscribe((data: any) => {  
    this.data = data;  
    this.getdata();  
  })  
}
Save() {   
  debugger;
  this.submitted = true;      
   if (this.CartaoForm.invalid) {  
          return;  
   }  
  this.AppService.postData(this.CartaoForm.value).subscribe((data: any) => {  
    this.data = data;  
    this.resetFrom(); 
      
  })  
}  
Update() {   
  this.submitted = true;      
  if (this.CartaoForm.invalid) {  
   return;  
  }        
  this.AppService.putData(this.CartaoForm.value.Id,
           this.CartaoForm.value).subscribe((data: any) => {  
    this.data = data;  
    this.resetFrom();  
  })  
}  
EditData(Data: { Id:String; NomeTitular:String; NumeroCartao: String; DataExpiracao: String; CVV: String; }) {  
  this.CartaoForm.controls["Id"].setValue(Data.Id);  
  this.CartaoForm.controls["NomeTitular"].setValue(Data.NomeTitular);      
  this.CartaoForm.controls["NumeroCartao"].setValue(Data.NumeroCartao);  
  this.CartaoForm.controls["DataExpiracao"].setValue(Data.DataExpiracao);  
  this.CartaoForm.controls["CVV"].setValue(Data.CVV);  
  this.EventValue = "Atualizar";  
}    
resetFrom()  
{     
  this.getdata();  
  this.CartaoForm.reset();  
  this.EventValue = "Salvar";  
  this.submitted = false;   
} 
}

