import { ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pagamento } from './model/pagamento-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'Pagamentos';
  constructor(
    private AppService: AppService,
    private _changeRef: ChangeDetectorRef
  ) {}
  data: Pagamento[] = [];

  CartaoForm: FormGroup;

  submitted = false;
  EventValue: any = 'Salvar';

  ngOnInit(): void {
    this.getdata();

    this.CartaoForm = new FormGroup({
      Id: new FormControl(0),
      NomeTitular: new FormControl('', [Validators.required]),
      NumeroCartao: new FormControl('', [Validators.required]),
      DataExpiracao: new FormControl('', [Validators.required]),
      CVV: new FormControl('', [Validators.required]),
    });
  }

  ngDoCheck() {
    this._changeRef.markForCheck();
  }

  getdata() {
    this.AppService.getData().subscribe((data: Pagamento[]) => {
      debugger
      this.data = data;
    });
  }

  deleteData(id: number) {
    this.AppService.deleteData(id).subscribe((data: any[]) => {
      this.data = data;
      this.getdata();
    });
  }

  Save() {
    debugger;
    this.submitted = true;
    if (this.CartaoForm.invalid) {
      return;
    }
    this.AppService.postData(this.CartaoForm.value).subscribe((data: Pagamento[]) => {
      this.data = data;
      this.resetFrom();
      }
    );

    this.getdata();
  }

  Update() {
    this.submitted = true;
    if (this.CartaoForm.invalid) {
      return;
    }
    this.AppService.putData(
      this.CartaoForm.value.Id,
      this.CartaoForm.value
    ).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();
    });
  }

  EditData(Data: any) {
    this.CartaoForm.controls['Id'].setValue(Data.id);
    this.CartaoForm.controls['NomeTitular'].setValue(Data.nomeTitular);
    this.CartaoForm.controls['NumeroCartao'].setValue(Data.numeroCartao);
    this.CartaoForm.controls['DataExpiracao'].setValue(Data.dataExpiracao);
    this.CartaoForm.controls['CVV'].setValue(Data.cvv);
    this.EventValue = 'Atualizar';
  }
  resetFrom() {
    this.getdata();
    this.CartaoForm.reset();
    this.EventValue = 'Salvar';
    this.submitted = false;
  }
}
