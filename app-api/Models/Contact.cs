using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Models
{
    public class Contact
    {
        public int Id { get; set; } 

        [Required]
        public string Firstname { get; set; }

        [Required]
        public string Lastname { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}