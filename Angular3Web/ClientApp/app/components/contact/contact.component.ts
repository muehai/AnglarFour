﻿import { Component, OnInit } from '@angular/core';
import { Contact } from '../../_models/index';
import { ContactService } from '../../_service/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

class ContactInfo implements Contact {

    constructor(public contactId?: number,
                public firstName?: string,
                public lastName?: string,
                public email?:string,
                public phone?:string) { } //Message for 
    
}


@Component({
    selector: 'contact',
    templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {
    
    private rowData: any[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;
    newContact: boolean;
    contact: Contact = new ContactInfo();
    contacts: Contact[];
    public editContactId: any;
    fullName: string;

    constructor(private contactService: ContactService, private toastrService: ToastrService) {

    }

   ngOnInit(): void {
        this.editContactId = 0;
        this.loadData();
    }

   loadData() {
       this.contactService.GetContacts()
           .subscribe(res => {
               this.rowData = res.result;
           });
   }

   showDialogToAdd() {
       this.newContact = true;
       this.editContactId = 0;
       this.contact = new ContactInfo();
       this.displayDialog = true;
   }
   // Add contact to DB
   showDialogToEdit(contact: Contact) {
       this.newContact = false;
       this.contact = new ContactInfo();
       this.contact.contactId = contact.contactId;
       this.contact.firstName = contact.firstName;
       this.contact.lastName = contact.lastName;
       this.contact.email = contact.email;
       this.contact.phone = contact.phone;
       this.displayDialog = true;
   }


   //onRowSelect(event) {
   //}
    //Save data to database
   save() {
       this.contactService.SaveContact(this.contact)
          .subscribe(response => {
               this.contact.contactId > 0 ? this.toastrService.success('Data updated Successfully') :
               this.toastrService.success('Data inserted Successfully');
               this.loadData();
           });
       this.displayDialog = false;
   }

   cancel() {
       this.contact = new ContactInfo();
       this.displayDialog = false;
   }

   showDialogToDelete(contact: Contact) {
       this.fullName = contact.firstName + ' ' + contact.lastName;
       this.editContactId = contact.contactId;
       this.displayDeleteDialog = true;
   }

   okDelete(isDeleteConfirm: boolean) {
       if (isDeleteConfirm) {
           this.contactService.deleteContac(this.editContactId)
               .subscribe(response => {
                   this.editContactId = 0;
                   this.loadData();
               });
           this.toastrService.error('Data Deleted Successfully');
       }
       this.displayDeleteDialog = false;
   }

    

}
