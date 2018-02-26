using System;
using BusinessLibrary.Model.Contact;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace BusinessLibrary.Repository
{
    public interface IContactRepository
    {
        Task<List<Contact>> GetAllContacts();
        //Add new contact to DB
        Task<bool> SaveContact(Contact contacts);
        // Delete user from database
        Task<bool> DeletContact(int Id);
    }
}
