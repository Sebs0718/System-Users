import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AreaCreate } from './interfaces/area-create.interface';
import { UserCreateService } from './services/user-create.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public userForm: FormGroup;
  public Titulo:string = 'Crear usuario';

  areas!: AreaCreate[];

  constructor(
    private createUserSvc: UserCreateService, 
    public formBuilder: FormBuilder,
    public router: Router 
  ) { 
    this.userForm = this.formBuilder.group({
      documento: [''],
      nombres: [''],
      apellidos: [''],
      fecha_nacimiento: [''],
      email: [''],
      area: [''],
      salario: ['']
    })
  }

  ngOnInit(): void {
    this.createUserSvc.getAreas()
    .pipe(
      tap( res => this.areas = res)
    )
    .subscribe();
  }

  onSubmit() {
    this.createUserSvc.postUser(this.userForm.value)
    .pipe(
      tap( res => this.router.navigate(['/users']))
    )
    .subscribe();
  }

}
