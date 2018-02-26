using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLibrary.Model.Contact
{
    //Add the to
    public class Contact
    {
        public int ContactId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
    }
}
