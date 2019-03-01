import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectionValidator} from './../customvalidators/app.custom.validators';
import { PersonalInfo } from './../models/app.personalinfo.model';
import { PersonalInfoService } from './../services/app.personalinfo.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.css']
})
export class PersonalinfoComponent implements OnInit {

  userId: any;
  personalInfo: PersonalInfo;
  frmPrsninfo: FormGroup;
  token: any;
  error: any;
  success: any;
  roleId:any;

    constructor(private route: ActivatedRoute, private personalInfoserv: PersonalInfoService) {

        this.route.queryParams.subscribe(params => {
              this.userId = params['userId'];
        });

        this.roleId = sessionStorage.getItem('roleId');
        this.token = sessionStorage.getItem('token');

        this.personalInfo = new PersonalInfo('', '', '', '', '', '', 0, '', '', '', '', '', '', 0, 0, 0, '', '', '', '', 0, 0);
        this.error = '';
        this.success = '';

        this.frmPrsninfo = new FormGroup({
          personinfoId: new FormControl(this.personalInfo.personalinfoId
                                      ),

          firstName: new FormControl(this.personalInfo.firstName,
                                        Validators.compose([
                                          Validators.required,
                                          Validators.pattern('[a-zA-Z ]*'),
                                        ])
                                      ),
          middleName: new FormControl(this.personalInfo.middleName,
                                        Validators.compose([
                                          Validators.required,
                                          Validators.pattern('[a-zA-Z ]*'),
                                        ])
                                      ),
          lastName: new FormControl(this.personalInfo.lastName,
                                        Validators.compose([
                                          Validators.required,
                                          Validators.pattern('[a-zA-Z ]*'),
                                        ])
                                      ),
          gender: new FormControl(this.personalInfo.gender,
                                        Validators.compose([
                                          SelectionValidator.checkSelection
                                        ])),
          dateOfBirth: new FormControl(),
          age: new FormControl(this.personalInfo.age,
                                  Validators.compose([
                                    Validators.required,
                                    Validators.pattern('[0-9]+'),
                                  ])
                                ),
          flatNumber: new FormControl(this.personalInfo.flatNumber,
                                      Validators.compose([
                                        Validators.required
                                      ])
                                    ),
          societyName: new FormControl(this.personalInfo.societyName,
                                        Validators.compose([
                                          Validators.required
                                        ])
                                      ),
          areaName: new FormControl(this.personalInfo.areaName,
                                      Validators.compose([
                                        Validators.required
                                      ])
                                    ),
          city: new FormControl(this.personalInfo.city,
                                  Validators.compose([
                                    Validators.required
                                  ])
                              ),
          state: new FormControl(this.personalInfo.state,
                                  Validators.compose([
                                    Validators.required
                                  ])
                                ),
          email: new FormControl(this.personalInfo.email,
                                  Validators.compose([
                                    Validators.required,
                                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
                                  ])
                                ),
          pincode: new FormControl(this.personalInfo.pincode,
                                    Validators.compose([
                                      Validators.required
                                    ])
                                  ),
          phoneNo: new FormControl(),
          mobileNo: new FormControl(this.personalInfo.mobileNo,
                                      Validators.compose([
                                        Validators.required,
                                        Validators.pattern('[0-9]+'),
                                        Validators.maxLength(10),
                                        Validators.minLength(10)
                                      ])
                                    ),
          physicalDisability: new FormControl(),
          maritalStatus: new FormControl(this.personalInfo.maritalStatus,
                                          Validators.compose([
                                            SelectionValidator.checkSelection
                                          ])),
          education: new FormControl(this.personalInfo.education,
                                      Validators.compose([
                                        Validators.required
                                      ])
                                    ),
          birthSign: new FormControl()
        });
    }

  ngOnInit() {
            this.personalInfoserv.getPersonalInfo(this.token).subscribe(
                                              (resp: Response) => {

                                                  if (resp.json().status === 200){
                                                      console.log('PersonalInfo :', resp.json().data);
                                                  }
                                              },
                                              error =>{
                                                console.log(`Error Occured ${error}`);
                                              }
                                          )

  }

  addPersonalInfo(): void{
    this.personalInfo = this.frmPrsninfo.value;
    this.personalInfo.userId = this.userId;
    this.personalInfo.roleId = this.roleId;
    //console.log('PerInfo :', this.personalInfo)

    this.personalInfoserv.addPersonalInfo(this.personalInfo, this.token).subscribe(
                                                                    (resp: Response) => {

                                                                        if (resp.json().status === 200){
                                                                            this.success = resp.json().message;
                                                                            this.error = '';
                                                                        } else {
                                                                          this.error = resp.json().message;
                                                                          this.success = '';
                                                                        }
                                                                    },
                                                                    error =>{
                                                                      console.log(`Error Occured ${error}`);
                                                                    }
                                                                )
  }

}
