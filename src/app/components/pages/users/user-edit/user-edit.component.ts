import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserEditService } from './services/user-edit.service';
import { AreaEdit } from './interfaces/area-edit.interface';
import { StateEdit } from './interfaces/state-edit.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public userForm: FormGroup;
  public Titulo:string = 'Editar usuario';

  states!: StateEdit[];
  areas!: AreaEdit[];

  constructor(
    private editUserSvc: UserEditService, 
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    public router: Router 
  ) {
    this.userForm = this.formBuilder.group({
      idusuarios: [''],
      documento: [''],
      nombres: [''],
      apellidos: [''],
      fecha_nacimiento: [''],
      email: [''],
      area: [''],
      salario: [''],
      estado: ['']
    })
  }

  formmattingDate(date: Date) {
    let newData = new Date(date);
    let result = newData.toLocaleDateString();
    let data = result.split('/');
    let day = data[0].length === 1 ? `0${data[0]}` : data[0]
    let mounth = data[1].length === 1 ? `0${data[1]}` : data[1]
    let dataReturn = `${data[2]}-${mounth}-${day}`;
    return dataReturn;
  }

  ngOnInit(): void {
    this.editUserSvc.getAreas()
    .pipe(
      tap( res => this.areas = res)
    )
    .subscribe();

    this.editUserSvc.getStates()
    .pipe(
      tap( res => this.states = res)
    )
    .subscribe();

    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.editUserSvc.getUser(Number(id))
    .pipe(
      tap( res => 
        this.userForm = this.formBuilder.group({
          idusuarios: res.idusuarios,
          documento: res.documento,
          nombres: res.nombres,
          apellidos: res.apellidos,
          fecha_nacimiento: this.formmattingDate(res.fecha_nacimiento),
          email: res.email,
          area: res.area,
          salario: res.salario,
          estado: res.estado
        })
      )
    )
    .subscribe();
  }
  
  onSubmit() {
    this.editUserSvc.putUser(this.userForm.value.idusuarios,this.userForm.value)
    .pipe(
      tap( res => this.router.navigate(['/users']))
    )
    .subscribe();
  }
}
