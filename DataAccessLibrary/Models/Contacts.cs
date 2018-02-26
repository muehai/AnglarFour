using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLibrary.Models
{
    public partial class Contacts
    {
        public int ContactsId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }

    }
}
