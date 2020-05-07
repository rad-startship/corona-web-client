import { TenantService } from './../service/tenant.service';
import { RoleService } from './../service/role.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Role } from './../model/role';
import { Tenant } from './../model/tenant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class RoleFormComponent implements OnInit {

  roles: Role[];
  tenants: Tenant[];
  users: User[];
  permissions: string[];

  model: Role;
  submitted = false;
  subitMsg = "";

  heroForm: FormGroup;
  
  constructor(private router: Router,
              private formBuilder: FormBuilder, 
              private userService: UserService,
              private roleService: RoleService,
              private tenantsService: TenantService) 
  {
    this.model = new Role("", "", []);
    this.heroForm = this.formBuilder.group({}); 
  }

  ngOnInit() {
    this.users   = this.userService.getUsersSample();
    this.roles   = this.roleService.getRolesSample();
    this.tenants = this.tenantsService.getTenantsSample();
    this.permissions = ["read", "write", "all"]
  } 
 
  onSubmit() 
  {
    this.submitted = true;
    console.log(this.model);
    this.subitMsg = 'Role ' + this.model.name + ' has been created';
    this.roleService.save(this.model);

    setTimeout(() => 
    {
      this.router.navigate(['/roles']);
    },
    3000);
  }

  get diagnostic() { 
    return JSON.stringify(this.model); 
  }
}
