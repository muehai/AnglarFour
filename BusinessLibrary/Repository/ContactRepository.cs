using System;
using DataAccessLibrary.Models;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using BusinessLibrary.Model;
using System.Threading.Tasks;
using System.Linq;
using BusinessLibrary.Model.Contact;

namespace BusinessLibrary.Repository
{
    //Add the message t reposit
    public class ContactRepository: IContactRepository
    {
        
            public async Task<List<Contact>> GetAllContacts()
            {
                using (ContactDBContext db = new ContactDBContext())
                {
                    return await (from a in db.Contacts
                                  select new Contact
                                  {
                                      ContactId = a.ContactsId,
                                      FirstName = a.FirstName,
                                      LastName = a.LastName,
                                      Email = a.Email,
                                      Phone = a.Phone
                                  }).ToListAsync();

                }
            }

            public async Task<bool> SaveContact(Contact model)
            {
                using (ContactDBContext db = new ContactDBContext())
                {
                    Contacts contact = db.Contacts.Where(x => x.ContactsId == model.ContactId).FirstOrDefault();
                    if (contact == null)
                    {
                        contact = new Contacts()
                        {
                            FirstName = model.FirstName,
                            LastName = model.LastName,
                            Email = model.Email,
                            Phone = model.Phone
                        };
                        db.Contacts.Add(contact);

                    }
                    else
                    {
                        contact.FirstName = model.FirstName;
                        contact.LastName = model.LastName;
                        contact.Email = model.Email;
                        contact.Phone = model.Phone;
                    }

                    return await db.SaveChangesAsync() >= 1;
                }
            }
            
           
            public async Task<bool> DeletContact(int id)
            {
                using (ContactDBContext db = new ContactDBContext())
                {

                    Contacts contact = db.Contacts.Where(x => x.ContactsId == id).FirstOrDefault();
                    if (contact != null)
                    {
                        db.Contacts.Remove(contact);
                    }
                    return await db.SaveChangesAsync() >= 1;
                }
            }


        

    }
}
