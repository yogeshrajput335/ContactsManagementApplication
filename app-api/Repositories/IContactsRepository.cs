using System.Text.Json;
using ContactsApi.Models;

namespace ContactsApi.Repositories
{
    public interface IContactsRepository
    {

        public  Task<List<Contact>> GetContactsAsync();
        public  Task<Contact> GetContactAsync(int id);

        public  Task AddContactAsync(Contact contact);

        public  Task UpdateContactAsync(Contact contact);

        public  Task DeleteContactAsync(int id);
    }
}
