using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTOS
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specifiy password length is between 4 and 8 characters")]
        public string Password { get; set; }
    }
}