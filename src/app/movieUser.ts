import { ParseSourceFile } from "@angular/compiler";

export class movieUser {
    id: number;
    firstName: string;
    lastName:string
    email: string;
    password: string;
    // Other properties as needed
  
    constructor(
      id: number = 0,
      firstName: string = '',
      lastName: string = '',
      email: string = '',
      password: string = ''
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }
   

  }
  