import { Component } from '@angular/core';
import { CustomerProfileService } from '../../shared/service/CustomerServices/customer-profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent{
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  email : string = '';
  verified : string = '';

  ngOnInit() {
    this.getProfile();
 }
  
  constructor(private profileService : CustomerProfileService){}

  getProfile(){
    this.profileService.getProfile().subscribe(
      (data : string[]) => {
        [this.username,this.firstName, this.lastName,this.email,this.verified] = data;
        console.log(data)
      }
    )
  }
}
