/*Lines 2–4: We import field references, same as in the previous examples.
Line 5: We import the getAccounts function from the AccountController class.
Line 13: We use @wire with the getAccounts function to retrieve the data.
Line 14: We store the result in the accounts property. If the operation succeeds, the records are accessible on accounts.data. 
If it fails, the error surfaces in accounts.error.*/
import { LightningElement, wire } from 'lwc';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { reduceErrors } from 'c/ldsUtils';
const COLUMNS = [
    { label: 'FirstName', fieldName: FirstName.fieldApiName, type: 'text' },
    { label: 'LastName', fieldName: LastName.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: Email.fieldApiName, type: 'text' }
];
export default class contactList extends LightningElement {
    columns = COLUMNS;
    @wire(getContacts)
    Contacts;

    get errors() {
        return (this.Contacts.error) ?
            reduceErrors(this.Contacts.error) : [];
    }
}