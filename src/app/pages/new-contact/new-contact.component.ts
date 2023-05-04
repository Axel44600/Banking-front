import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../services/services/contact.service";
import {ContactDto} from "../../services/models/contact-dto";
import {HelperService} from "../../services/helper/helper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {

  contact: ContactDto = {};
  errorMessages: Array<string> = [];

  constructor(
    private contactService: ContactService,
    private helperService: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const contactId = this.activatedRoute.snapshot.params['idContact'];
    if (contactId) {
      this.contactService.findById2({
        'id': this.activatedRoute.snapshot.params['idContact']
      }).subscribe({
        next: (data) => {
          this.contact = data;
        }
      });
    }
  }

  save() {
    this.errorMessages = [];
    this.contact.userId = this.helperService.userId;
    this.contactService.save2({
      body: this.contact
    }).subscribe({
      next: async () => {
        await this.router.navigate(['user/my-contact-list']);
      },
      error: (err) => {
        this.errorMessages = err.error.formatValidationErrors;
      }
    });

  }

  async cancel() {
    await this.router.navigate(['user/my-contact-list']);
  }

}
