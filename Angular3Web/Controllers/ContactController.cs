using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BusinessLibrary.Repository;
using BusinessLibrary.Model.Contact;


namespace Angular3Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Contact")]
    public class ContactController : Controller
    {
        //Add DI to test injections
        private IContactRepository _Repository;
        public ContactController(IContactRepository contactRepository)
        {
            _Repository = contactRepository;
        }


        //Get data 
        [HttpGet, Produces("application/json")]
        public async Task<IActionResult> GetContacts()
        {
            var data = await _Repository.GetAllContacts();
            return Json(new { result = data }); // Return to data as json
        }

        //Add to  Ef Database 
        [HttpPost, Produces("Application/json")]
        public async Task<IActionResult> SaveContact([FromBody] Contact contact)
        {
            return Json(await _Repository.SaveContact(contact));
        }

        //Delete data by passing item id
        [HttpDelete]
        public async Task<IActionResult> DeleteContactById(int Id)
        {
            return Json(await _Repository.DeletContact(Id)); 
        }


    }
}