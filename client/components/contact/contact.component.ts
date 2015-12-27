import {COMMON_DIRECTIVES, COMMON_PIPES, Validators,
ControlGroup, Control} from 'angular2/common';
import {Component} from 'angular2/core';

import {Observable} from 'rxjs/Observable';

import {Contact} from '../../core/dto';
import {ContactService} from './contact.service';
import {ContactFormComponent} from './contact-form.component';
import {CustomOrderByPipe} from '../../pipes/CustomOrderByPipe';

@Component({
  selector: 'contact',
  templateUrl: './components/contact/contact.component.html',
  directives: [ContactFormComponent],
  pipes: [CustomOrderByPipe]
})
export class ContactComponent {

  contacts: Contact[];
  selectedContact: Contact;

  constructor(private contactService: ContactService) {
    this.reset();
  }

  remove(event: Event, data: Contact) {

    event.stopPropagation();

    this.contactService.removeOneById(data._id)
      .subscribe((res: Contact) => {
        this.reset();
      });
  }

  select(id: string) {
    this.contactService.findOneById(id)
      .subscribe((res: Contact) => {
        this.selectedContact = res;
      });
  }

  reset() {
    this.selectedContact = {};
    this.find();
  }

  find() {
    this.contactService.find().subscribe((res: Contact[]) => {
      this.contacts = res;
    });
  }

}