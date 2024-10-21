import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/Models/Contact';
import { ContactService } from 'src/app/Services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[] = [];
  @Input() title="";
  displayStyle = "none"; 
  displayDeleteStyle = "none"; 
  contactForm: FormGroup;
  editContactId: number | null = null;
  deleteContactId: number | null = null;

  constructor(private fb: FormBuilder,private contactService: ContactService) { 
    this.contactForm = this.fb.group({ 
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
      this.contactService.getContacts().subscribe((data) => {
          this.contacts = data;
      });
  }
  
  editContact(contact: Contact) {
    this.editContactId = contact.id;
    this.contactForm.patchValue(contact);
    this.displayStyle = "block"; 
  }
  deleteContact(id:number){
    console.log("Open confirmation to delete contact");
  }
  
  openPopup() { 
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
    this.contactForm.reset();
  } 
  openDeletePopup(contactId: number) { 
    this.deleteContactId = contactId;
    this.displayDeleteStyle = "block"; 
  } 
  closeDeletePopup(){ 
    this.displayDeleteStyle = "none"; 
  } 
  updateContact(){
    if (this.contactForm.valid && this.editContactId) {
      const updatedContact = { id: this.editContactId, ...this.contactForm.value };
      this.contactService.updateContact(updatedContact).subscribe(() => {
          this.loadContacts();
          this.contactForm.reset();
          this.editContactId = null;
          this.displayStyle = "none"; 
      });
  }
      
  }
  addContact(){
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe((data) => {
          this.contacts.push(data);
          this.contactForm.reset();
          this.displayStyle = "none"; 
      });
    }
  }
  DeleteContact(){
    if(this.deleteContactId){
      this.contactService.deleteContact(this.deleteContactId).subscribe(() => {
        this.loadContacts();
        this.displayDeleteStyle = "none"; 
    });
    }else {
      console.log("Contact not selected");
      this.displayDeleteStyle = "none"; 
    }
    
  }
}
