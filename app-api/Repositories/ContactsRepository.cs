using System.Text.Json;
using ContactsApi.Models;

namespace ContactsApi.Repositories
{
    public class ContactsRepository : IContactsRepository
    {
        private const string FilePath = "Data/contacts.json";

        public async Task<List<Contact>> GetContactsAsync()
        {
            using var stream = new FileStream(FilePath, FileMode.Open, FileAccess.Read);
            return await JsonSerializer.DeserializeAsync<List<Contact>>(stream) ?? new List<Contact>();
        }

        public async Task<Contact> GetContactAsync(int id)
        {
            var contacts = await GetContactsAsync();
            return contacts.FirstOrDefault(c => c.Id == id);
        }

        public async Task AddContactAsync(Contact contact)
        {
            var contacts = await GetContactsAsync();
            contact.Id = contacts.Count > 0 ? contacts.Max(c => c.Id) + 1 : 1; 
            contacts.Add(contact);
            await SaveContactsAsync(contacts);
        }

        public async Task UpdateContactAsync(Contact contact)
        {
            var contacts = await GetContactsAsync();
            var index = contacts.FindIndex(c => c.Id == contact.Id);
            if (index >= 0)
            {
                contacts[index] = contact;
                await SaveContactsAsync(contacts);
            }
        }

        public async Task DeleteContactAsync(int id)
        {
            var contacts = await GetContactsAsync();
            var contact = contacts.FirstOrDefault(c => c.Id == id);
            if (contact != null)
            {
                contacts.Remove(contact);
                await SaveContactsAsync(contacts);
            }
        }

        private async Task SaveContactsAsync(List<Contact> contacts)
        {
            using var stream = new FileStream(FilePath, FileMode.Create, FileAccess.Write);
            await JsonSerializer.SerializeAsync(stream, contacts);
        }
    }
}
