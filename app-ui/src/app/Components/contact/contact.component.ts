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
  newContact(){
    console.log("Open dialog for new contact");
  }
  editContact(contact: Contact) {
    this.editContactId = contact.id;
    this.contactForm.setValue({
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
    });
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
  } 
  openDeletePopup(contactId: number) { 
    this.deleteContactId = contactId;
    this.displayDeleteStyle = "block"; 
  } 
  closeDeletePopup(){ 
    this.displayDeleteStyle = "none"; 
  } 
  updateContact(){
    this.contacts.push(
      {
        id:1,
        firstname:this.contactForm.value.firstname,
        lastname:this.contactForm.value.lastname,
        email:this.contactForm.value.email
      })
      this.displayStyle = "none"; 
  }
  addContact(){
    this.contacts.push(
      {
        id:1,
        firstname:this.contactForm.value.firstname,
        lastname:this.contactForm.value.lastname,
        email:this.contactForm.value.email
      })
      this.displayStyle = "none"; 
  }
  DeleteContact(){
    if(this.deleteContactId){
      console.log("Contact selected");
    }else {
      console.log("Contact not selected");
    }
    this.displayDeleteStyle = "none"; 
  }
}
